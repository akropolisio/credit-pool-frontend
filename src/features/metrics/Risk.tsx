import * as React from 'react';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { Label, FormattedAmount, Metric } from 'components';
import { liquidityAmount } from 'utils/mock';

const tKeys = tKeysAll.components.metrics.risk;

export function Risk() {
  const { t } = useTranslate();

  return (
    <Metric
      title={<Label hint={t(tKeys.description.getKey())}>{t(tKeys.label.getKey())}</Label>}
      value={<FormattedAmount sum={liquidityAmount} />}
    />
  );
}
