import BN from 'bn.js';

import { formatBalance } from 'utils/format';
import { IToBN, IToFraction } from 'model/types';

import { Amount } from './Amount';
import { Currency } from './Currency';

const uniqType = Symbol('LiquidityAmount type');

export class LiquidityAmount extends Amount<Currency> {
  public _type: typeof uniqType = uniqType;

  // eslint-disable-next-line class-methods-use-this
  public makeAmount(amount: string | BN | IToBN | IToFraction, currency: Currency): this {
    return new LiquidityAmount(amount, currency) as this;
  }

  public toFormattedString(precision: number = 2, withSymbol = true): string {
    return formatBalance({
      amountInBaseUnits: this.toBN(),
      tokenSymbol: withSymbol ? this.currency.symbol : undefined,
      baseDecimals: this.currency.decimals,
      precision,
      symbolPosition: 'start',
    });
  }
}