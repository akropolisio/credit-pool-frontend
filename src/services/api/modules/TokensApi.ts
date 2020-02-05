import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, first as firstOperator } from 'rxjs/operators';
import BN from 'bn.js';
import * as R from 'ramda';
import { autobind } from 'core-decorators';

import { memoize } from 'utils/decorators';
import { createErc20 } from 'generated/contracts';
import { Token, ITokenInfo } from 'model/types';
import { ETH_NETWORK_CONFIG } from 'env';

import { Contracts, Web3ManagerModule } from '../types';
import { TransactionsApi } from './TransactionsApi';

function getCurrentValueOrThrow<T>(subject: BehaviorSubject<T | null>): NonNullable<T> {
  const value = subject.getValue();

  if (value === null || value === undefined) {
    throw new Error('Subject is not contain non nullable value');
  }

  return value as NonNullable<T>;
}

function first<T>(input: Observable<T>): Promise<T> {
  return input.pipe(firstOperator()).toPromise();
}

export class TokensApi {
  private readonlyContracts: Pick<Contracts, 'dai' | 'ptk'>;
  private txContracts = new BehaviorSubject<null | Pick<Contracts, 'dai' | 'ptk'>>(null);

  constructor(private web3Manager: Web3ManagerModule, private transactionsApi: TransactionsApi) {
    this.readonlyContracts = {
      dai: createErc20(this.web3Manager.web3, ETH_NETWORK_CONFIG.contracts.dai),
      ptk: createErc20(this.web3Manager.web3, ETH_NETWORK_CONFIG.contracts.ptk),
    };

    this.web3Manager.txWeb3
      .pipe(
        map(
          txWeb3 =>
            txWeb3 && {
              dai: createErc20(txWeb3, ETH_NETWORK_CONFIG.contracts.dai),
              ptk: createErc20(txWeb3, ETH_NETWORK_CONFIG.contracts.ptk),
            },
        ),
      )
      .subscribe(this.txContracts);
  }

  @autobind
  public async approveAllPtk(fromAddress: string, spender: string) {
    const allowance = await first(
      this.readonlyContracts.ptk.methods.allowance({
        _owner: fromAddress,
        _spender: spender,
      }),
    );

    const minAllowance = new BN(2).pow(new BN(250));

    if (allowance.lt(minAllowance)) {
      const maxAllowance = new BN(2).pow(new BN(256)).subn(1);
      await this.approvePtk(fromAddress, spender, maxAllowance);
    }
  }

  @autobind
  private async approvePtk(fromAddress: string, spender: string, value: BN): Promise<void> {
    const txPtk = getCurrentValueOrThrow(this.txContracts).ptk;

    const promiEvent = txPtk.methods.approve(
      { _spender: spender, _value: value },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('ptk.approve', promiEvent, {
      spender,
      fromAddress,
      value,
    });

    await promiEvent;
  }

  @autobind
  public async approveDai(fromAddress: string, spender: string, value: BN): Promise<void> {
    const txDai = getCurrentValueOrThrow(this.txContracts).dai;

    const promiEvent = txDai.methods.approve(
      { _spender: spender, _value: value },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('dai.approve', promiEvent, {
      spender,
      fromAddress,
      value,
    });

    await promiEvent;
  }

  @memoize(R.identity)
  @autobind
  public getTokenInfo$(token: Token): Observable<ITokenInfo> {
    return combineLatest([
      this.readonlyContracts[token].methods.symbol(),
      this.readonlyContracts[token].methods.decimals(),
    ]).pipe(
      map(([tokenSymbol, decimals]) => ({ symbol: tokenSymbol, decimals: decimals.toNumber() })),
    );
  }

  @memoize((token: Token, address: string) => token + address)
  @autobind
  public getBalance$(token: Token, address: string): Observable<BN> {
    return this.readonlyContracts[token].methods.balanceOf(
      { _owner: address },
      { Transfer: [{ filter: { _from: address } }, { filter: { _to: address } }] },
    );
  }
}
