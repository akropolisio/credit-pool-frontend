import * as React from 'react';
import cn from 'classnames';

import { makeStyles } from 'utils/styles';

import { ChartMock } from '../ChartMock/ChartMock';
import { ChartProfit } from '../ChartProfit/ChartProfit';

type Props = {
  value?: string;
  variant?: 'decrease' | 'increase';
  sign?: '+' | '-';
};

export function ChartBlock(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.chartBlock}>
      <div className={cn({ [classes.chart]: props?.variant })}>
        <ChartMock />
      </div>
      {props && <ChartProfit {...props} />}
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    chartBlock: {
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'flex-end',
    },
    chart: {
      marginLeft: 20,
    },
  }),
  { name: 'ChartBlock' },
);
