import * as React from 'react';

import { Metric, Label, Grid, ComingSoon } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';

const tKeys = tKeysAll.components.metrics;

const valueMock = '1-365 days';

export function LoanTerm() {
  const { t } = useTranslate();

  return (
    <div style={{ position: 'relative' }}>
      <ComingSoon position="overlay" />
      <Grid container>
        <Metric title={<Label>{t(tKeys.loanTerm.getKey())}</Label>} value={valueMock} />
      </Grid>
    </div>
  );
}
