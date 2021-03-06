import * as React from 'react';
import BN from 'bn.js';

import { Status, usePledgeSubscription } from 'generated/gql/pool';
import { isEqualHex } from 'utils/hex';
import { bnToBn } from 'utils/bn';
import { makeStyles, useTheme } from 'utils/styles';
import { Grid, Loading } from 'components';
import { getPledgeId } from 'model';
import {
  ActivateLoanButton,
  UnlockCollateralButton,
  CancelProposalButton,
} from 'features/changeLoanState';
import { UnstakingButton } from 'features/unstake';
import { LoanRepayingButton } from 'features/repayLoan';
import { AvailableForUnlock } from 'features/metrics';

import { PartialDebt } from './types';

interface IProps {
  debt: PartialDebt;
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
  const classes = useStyles();
  const theme = useTheme();

  const pledgeHash = React.useMemo(() => getPledgeId(account, borrower.id, proposalId), [
    account,
    borrower.id,
    proposalId,
  ]);
  const pledgeGqlResult = usePledgeSubscription({ variables: { pledgeHash } });

  const pInterest = new BN(pledgeGqlResult.data?.pledge?.pInterest || '0');
  const pLocked = new BN(pledgeGqlResult.data?.pledge?.pLocked || '0');

  const isMyLoan = isEqualHex(borrower.id, account);

  const isAvailableForUnstake = status === Status.Proposed && !isMyLoan && pLocked.gtn(0);
  const isAvailableForProposalCanceling = status === Status.Proposed && isMyLoan;
  const isAvailableForActivation =
    isMyLoan && status === Status.Proposed && bnToBn(stakeProgress).gten(100);

  const isAvailableForRepay =
    isMyLoan && (status === Status.Executed || status === Status.PartiallyRepayed);
  const isAvailableForUnlock = pInterest.gtn(0);

  const commonProps = {
    variant: 'outlined',
    color: 'primary',
    size: 'small',
    backgroundColor: theme.palette.background.paper,
    fullWidth: false,
  } as const;

  const actions = [
    isAvailableForActivation ? (
      <ActivateLoanButton
        borrower={borrower.id}
        proposalId={proposalId}
        loanAmount={total}
        {...commonProps}
      >
        Activate
      </ActivateLoanButton>
    ) : null,
    isAvailableForProposalCanceling ? (
      <CancelProposalButton borrower={borrower.id} proposalId={proposalId} {...commonProps}>
        Cancel
      </CancelProposalButton>
    ) : null,
    isAvailableForRepay && lastUpdate && debtId ? (
      <LoanRepayingButton debtId={debtId} lastPaymentDate={lastUpdate} {...commonProps} />
    ) : null,
    isAvailableForUnstake ? (
      <UnstakingButton
        borrower={borrower.id}
        proposalId={proposalId}
        loanSize={total}
        {...commonProps}
      />
    ) : null,
    isAvailableForUnlock && debtId ? (
      <>
        <div className={classes.sum}>
          <AvailableForUnlock borrower={borrower.id} debtId={debtId} />
        </div>
        <UnlockCollateralButton
          borrower={borrower.id}
          proposalId={proposalId}
          debtId={debtId}
          {...commonProps}
        />
      </>
    ) : null,
  ].filter(Boolean);

  return (
    <div className={classes.root}>
      <Loading gqlResults={pledgeGqlResult}>
        {actions.length ? (
          <Grid container spacing={1}>
            {actions.map((action, index) => (
              <Grid item key={index}>
                {action}
              </Grid>
            ))}
          </Grid>
        ) : null}
      </Loading>
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {},
    sum: {
      marginBottom: 10,
    },
  }),
  { name: 'ActionCells' },
);
