import * as React from 'react';
import BN from 'bn.js';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { BalanceChart } from 'components/BalanceChart/BalanceChart';
import { Growth } from 'components/Growth/Growth';
import { FormattedBalance } from 'components/FormattedBalance/FormattedBalance';

import { useStyles } from './Chart.style';

interface IProps {
  title: string;
  members: string[];
  balance: BN;
  balanceDayAgo: BN;
  chartPoints: IChartPoint[];
}

export interface IChartPoint {
  date: number;
  value: number;
}

const Chart = (props: IProps) => {
  const { title, members, balance, balanceDayAgo, chartPoints } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        {/* <Box mb={3}> */}
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={6}>
            <Typography className={classes.title} variant="subtitle2">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container wrap="nowrap" direction="row-reverse">
              <div className={classes.membersCount}>
                <Typography variant="subtitle2">{members.length}</Typography>
              </div>
              {members.slice(0, 3).map(item => (
                <Avatar key={item} className={classes.avatar}>
                  <Jazzicon diameter={40} seed={jsNumberForAddress(item)} />
                </Avatar>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.balanceValue} variant="h4">
              <FormattedBalance sum={balance} token="dai" />{' '}
              <Growth className={classes.growth} previous={balanceDayAgo} current={balance} />
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.graphic}>
          <BalanceChart points={chartPoints} />
        </div>
      </CardContent>
    </Card>
  );
};

export { Chart };
