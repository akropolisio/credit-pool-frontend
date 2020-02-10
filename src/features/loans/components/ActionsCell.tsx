import * as React from 'react';
import BN from 'bn.js';

import { Debt, Status, usePledgeSubscription } from 'generated/gql/pool';
import { isEqualHex } from 'utils/hex';
import { bnToBn } from 'utils/bn';
import { Grid, Loading, ModalButton, Hint } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { getLoanDuePaymentDate, getPledgeId } from 'model';
import { ActivateLoanButton, RepayButton, UnstakeButton } from 'features/cashExchange';

interface IProps {
  debt: Debt;
  account: string;
}

export function ActionsCell({ debt, account }: IProps) {
  const {
    total,
    borrower,
    debt_id: debtId,
    last_update: lastUpdate,
    status,
    stakeProgress,
    proposal_id: proposalId,
  } = debt;
  const isMyLoan = isEqualHex(borrower, account);

  const api = useApi();
  const [config, configMeta] = useSubscribable(() => api.loanModule.getConfig$(), []);

  const pledgeHash = React.useMemo(() => getPledgeId(account, borrower, proposalId), [
    account,
    borrower,
    proposalId,
  ]);
  const pledgeGqlResult = usePledgeSubscription({ variables: { pledgeHash } });

  const interest = new BN(pledgeGqlResult.data?.pledge?.lInterest || '0');
  const locked = new BN(pledgeGqlResult.data?.pledge?.lLocked || '0');

  const duePaymentDate =
    config && getLoanDuePaymentDate(lastUpdate, config.debtRepayDeadlinePeriod)?.getTime();
  const isDuePaymentExpired = duePaymentDate && duePaymentDate < Date.now();

  const isAvailableForLiquidation = status !== Status.Closed && isDuePaymentExpired;

  const isAvailableForActivation =
    isMyLoan && status === Status.Proposed && bnToBn(stakeProgress).lten(100);

  const isAvailableForRepay =
    isMyLoan && (status === Status.Executed || status === Status.PartiallyRepayed);

  const isAvailableForUnstake =
    status === Status.Proposed && !isEqualHex(account, borrower) && locked.gtn(0);
  const isAvailableForUnlock = interest.gtn(0);

  const commonProps = {
    variant: 'contained',
    color: 'primary',
    size: 'small',
    fullWidth: true,
    children: () => <Hint>Coming soon</Hint>,
  } as const;

  const actions = [
    isAvailableForActivation ? (
      <ActivateLoanButton borrower={borrower} proposalId={proposalId} {...commonProps}>
        Activate
      </ActivateLoanButton>
    ) : null,
    isAvailableForRepay && debtId ? (
      <RepayButton account={borrower} debtId={debtId} {...commonProps} />
    ) : null,
    isAvailableForUnstake ? (
      <UnstakeButton
        borrower={borrower}
        proposalId={proposalId}
        loanSize={total}
        {...commonProps}
      />
    ) : null,
    isAvailableForUnlock ? <ModalButton content="Unlock" {...commonProps} /> : null,
    isAvailableForLiquidation ? <ModalButton content="Liquidate" {...commonProps} /> : null,
  ].filter(Boolean);

  return (
    <Loading meta={configMeta} gqlResults={pledgeGqlResult}>
      {actions.length ? (
        <Grid container spacing={1}>
          {actions.map((action, index) => (
            <Grid xs item key={index}>
              {action}
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Loading>
  );
}