import * as React from 'react';

import { Metric, Label, FormattedAmount } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { liquidityAmount } from 'utils/mock';

const tKeys = tKeysAll.components.metrics;

export function LoanVolumeRequested() {
  const { t } = useTranslate();

  return (
    <Metric
      title={<Label withComingSoon>{t(tKeys.loanVolumeRequested.getKey())}</Label>}
      value={<FormattedAmount sum={liquidityAmount} />}
    />
  );
}
