import * as React from 'react';
import * as R from 'ramda';

import { PieChart, Props as PieChartProps } from 'components/PieChart/PieChart';

import { useStyles } from './CompositionChart.style';

type Props = {
  title: React.ReactNode;
  labelColors: string[];
};

function CompositionChart({
  title,
  sectorColors,
  labelColors,
  chartData,
}: Props & Omit<PieChartProps, 'size'>) {
  const classes = useStyles();

  const sortedData = React.useMemo(() => {
    const sortByValue = R.descend(R.prop('value'));
    return R.sort(sortByValue, chartData);
  }, [chartData]);

  const renderLegend = React.useCallback(
    () => (
      <ul className={classes.legend}>
        {sortedData.map(({ label }, index) => (
          <li
            className={classes.legendItem}
            key={label}
            style={{ color: (labelColors && labelColors[index]) || sectorColors[index] }}
          >
            <span className={classes.label}>0%&nbsp;{label}</span>
          </li>
        ))}
      </ul>
    ),
    [sortedData],
  );

  return (
    <div className={classes.root}>
      <div className={classes.title}>{title}</div>
      <div className={classes.chartContainer}>
        <div className={classes.chart}>
          <PieChart
            chartData={chartData}
            sectorColors={sectorColors}
            startAngle={90}
            endAngle={-270}
            paddingAngle={5}
          />
        </div>
        {renderLegend()}
      </div>
    </div>
  );
}

export { CompositionChart };
