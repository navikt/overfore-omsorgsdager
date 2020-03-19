import React from 'react';
// import { useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import { Arbeidssituasjon } from '../../../../types/SøknadFormData';
import SummaryList from 'common/components/summary-list/SummaryList';

interface Props {
    arbeidssituasjoner: Arbeidssituasjon[];
}
const ArbeidssituasjonRender = (situasjon: Arbeidssituasjon): React.ReactNode => (
    <div>
        <span>{situasjon}</span>
    </div>
);
const ArbeidsforholdSummary: React.FunctionComponent<Props> = ({ arbeidssituasjoner }) => {
    if (arbeidssituasjoner && arbeidssituasjoner.length === 0) { return null; }
    return (
      <>
          <Box margin="l">
              Arbeidssituasjon
              <SummaryList items={arbeidssituasjoner} itemRenderer={ArbeidssituasjonRender} />
          </Box>
      </>
    );
};

export default ArbeidsforholdSummary;