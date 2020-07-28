import * as React from 'react';

import { Metric, Label, ChartBlock, ComingSoon } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';

const tKeys = tKeysAll.components.metrics;

const valueMock = '15.40';

export function AverageLoanAPY() {
  const { t } = useTranslate();

  return (
    <div style={{ position: 'relative' }}>
      <ComingSoon position="overlay" />
      <Metric
        title={<Label>{t(tKeys.averageLoanAPY.getKey())}</Label>}
        value={valueMock}
        chart={<ChartBlock value="1234" variant="increase" sign="+" />}
      />
    </div>
  );
}
