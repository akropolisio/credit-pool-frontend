import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { map } from 'rxjs/operators';
import BN from 'bn.js';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { min } from 'utils/bn';

import { PTokenExchanging } from '../../components/PTokenExcahnging/PTokenExcahnging';

type IProps = React.ComponentPropsWithoutRef<typeof Button> & {
  maxStakeSize: string;
  proposalId: string;
  borrower: string;
};

const tKeys = tKeysAll.features.cashExchange.stakeButton;

function StakeButton(props: IProps) {
  const { maxStakeSize, borrower, proposalId, ...restProps } = props;
  const { t } = useTranslate();
  const api = useApi();

  const getMaxSourceValue = useCallback(
    (account: string) =>
      api.fundsModule.getPtkBalanceInDai$(account).pipe(map(balance => min(balance, maxStakeSize))),
    [maxStakeSize],
  );

  const onStakeRequest = useCallback(
    (address: string, values: { sourceAmount: BN }): Promise<void> => {
      return api.loanModule.stakePtk(address, { borrower, proposalId, ...values });
    },
    [borrower, proposalId],
  );

  return (
    <ModalButton content={t(tKeys.buttonTitle.getKey())} fullWidth {...restProps}>
      {({ closeModal }) => (
        <PTokenExchanging
          title={t(tKeys.formTitle.getKey())}
          sourcePlaceholder={t(tKeys.placeholder.getKey())}
          getMaxSourceValue={getMaxSourceValue}
          confirmMessageTKey={tKeys.confirmMessage.getKey()}
          onExchangeRequest={onStakeRequest}
          onCancel={closeModal}
        />
      )}
    </ModalButton>
  );
}

export { StakeButton };
