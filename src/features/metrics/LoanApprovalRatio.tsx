import * as React from 'react';

import { Metric, Label, FormattedAmount, ChartBlock } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { percentAmount } from 'utils/mock';

const tKeys = tKeysAll.components.metrics;

export function LoanApprovalRatio() {
  const { t } = useTranslate();

  return (
    <Metric
      title={<Label hasComingSoonLabel>{t(tKeys.loanApprovalRatio.getKey())}</Label>}
      value={<FormattedAmount sum={percentAmount} />}
      chart={<ChartBlock />}
    />
  );
}
