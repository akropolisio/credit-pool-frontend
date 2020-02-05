import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import BN from 'bn.js';

import { Status } from 'generated/gql/pool';
import { useApi } from 'services/api';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { StakeButton } from 'features/cashExchange';
import { CashMetric, Metric, ShortAddress, ActivitiesCard, Loading } from 'components';
import { LendIcon } from 'components/icons';
import { useSubscribable } from 'utils/react';
import { formatBalance } from 'utils/format';

import { useStyles } from './LoanApplicationCard.style';
import { Progress } from '../Progress/Progress';

const tKeys = tKeysAll.features.loanApplications;

interface IProps {
  lendValue: string;
  borrower: string;
  aprValue: string;
  stakedValue: string;
  expansionPanelDetails: string;
  status: Status;
  proposalId?: string | null;
}

const LoanApplicationCard = memo(function LoanApplicationCard(props: IProps) {
  const {
    lendValue,
    borrower,
    proposalId,
    aprValue,
    stakedValue,
    expansionPanelDetails,
    status,
  } = props;

  const classes = useStyles();
  const { t } = useTranslate();

  const api = useApi();
  const [aprDecimals, aprDecimalsMeta] = useSubscribable(
    () => api.loanModule.getAprDecimals$(),
    [],
    0,
  );
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, []);

  const metricsList = React.useMemo(
    () => [
      <CashMetric
        title={t(tKeys.lend.getKey())}
        value={lendValue}
        token="dai"
        icon={<LendIcon className={classes.lendIcon} />}
      />,
      <Metric title={t(tKeys.to.getKey())} value={<ShortAddress address={borrower} />} />,
      <Metric
        title={t(tKeys.apr.getKey())}
        value={
          <Loading meta={aprDecimalsMeta}>
            {formatBalance({ amountInBaseUnits: aprValue, baseDecimals: aprDecimals })}%
          </Loading>
        }
      />,
      <span className={classes.highlightedMetric}>
        <CashMetric title={t(tKeys.staked.getKey())} value={stakedValue} token="dai" />
      </span>,
    ],
    [t, lendValue, borrower, aprValue, stakedValue, aprDecimals, aprDecimalsMeta],
  );

  const rawProgressInPercents = new BN(stakedValue).muln(10000).div(new BN(lendValue));
  const progressInPercents = Math.min(100, rawProgressInPercents.toNumber() / 100);
  const isCollateralReceived = progressInPercents === 100;
  const isMyProposal = !!account && account.toLowerCase() === borrower.toLowerCase();

  const asideContent = React.useMemo(
    () => (
      <Grid container spacing={2} justify="center" direction="column">
        <Grid item>
          <Progress progressInPercents={progressInPercents} />
        </Grid>
        {proposalId && (
          <Grid item>
            <Loading meta={accountMeta} progressVariant="linear">
              <StakeButton
                proposalId={proposalId}
                borrower={borrower}
                disabled={isCollateralReceived || isMyProposal}
                variant="contained"
                color="primary"
                fullWidth
              />
            </Loading>
          </Grid>
        )}
      </Grid>
    ),
    [t, status, progressInPercents, isMyProposal, accountMeta],
  );

  return (
    <ActivitiesCard
      metricsList={metricsList}
      expansionPanelDetails={expansionPanelDetails}
      asideContent={asideContent}
    />
  );
});

export { LoanApplicationCard };
