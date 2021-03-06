import * as React from 'react';

import { NewTable, Label, AccountAddress, FormattedAmount, Box } from 'components';
import { LiquidityAmount, PercentAmount } from 'model/entities';

import { DueDateCell } from './DueDateCell';
import { ActionsCell } from './ActionsCell';
import { MyCollateralCell } from './MyCollateralCell';
import { MyAPYCell } from './MyAPYCell';
import { PartialDebt } from './types';

export type UserDebt = {
  borrower: string;
  body: LiquidityAmount;
  lStaked: LiquidityAmount;
  apr: PercentAmount;
  dueDate: Date | null;
  rawDebt: PartialDebt;
};

export const makeTableColumns = (
  account: string,
  filter: 'issued' | 'pending',
): Array<NewTable.models.Column<UserDebt>> => [
  {
    renderTitle: () => 'Lend to',
    cellContent: {
      kind: 'simple',
      render: debt => <AccountAddress address={debt.borrower} size="small" />,
    },
  },

  {
    renderTitle: () => 'Total loan sum',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: debt => <FormattedAmount sum={debt.body} variant="plain" />,
    },
  },

  {
    renderTitle: () => (
      <Label inline hint="Interest rate info">
        Interest rate
      </Label>
    ),
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: debt => <FormattedAmount sum={debt.apr} variant="plain" />,
    },
  },

  {
    renderTitle: () => 'Due date',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: debt => <DueDateCell dueDate={debt.dueDate} />,
    },
  },

  {
    renderTitle: () => 'My APY',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: debt => <MyAPYCell loanAPR={debt.apr} debt={debt.rawDebt} account={account} />,
    },
  },

  {
    renderTitle: () => (
      <Label inline hint="My collateral info">
        My collateral
      </Label>
    ),
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: debt => (
        <MyCollateralCell
          debt={debt.rawDebt}
          account={account}
          loanRequested={debt.body}
          lStaked={debt.lStaked}
        />
      ),
    },
  },

  {
    renderTitle: () => <>{filter === 'issued' && 'Available For Withdrawal'}</>,
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: debt => (
        <Box display="inline-flex" justifyContent="flex-end" minWidth={160}>
          <ActionsCell debt={debt.rawDebt} account={account} />
        </Box>
      ),
    },
  },
];
