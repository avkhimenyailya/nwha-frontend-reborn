import React, { FC } from 'react';
import classes from './PairTraits.module.css';
import { ProfilePairTraits } from '../../../../models/ProfileTraits';
import profileTraits from '../ProfileTraits';
import { traits } from '../../../../mock-data/data';


interface PairTraitsProps {
    pair: ProfilePairTraits;
}

const PairTraits: FC<PairTraitsProps> = ({ pair }: PairTraitsProps) => {

    const getTraitNameByTraitId = (traitId: number) => {
        return traits.find(t => t.id === traitId)?.name;
    };

    const getSymbolChart = (value: number) => {
        let result: string = '';
        for (let i = 0; i < 100; i++) {
            if (i % 10 === 0) {
                if (value >= i && value < (i + 10)) {
                    result += '—';
                } else {
                    result += '*';
                }
            }
        }
        return result;
    };

    return (
        <div className={ classes.pair }>
            <p className={ classes.traitName }>{ getTraitNameByTraitId(pair.profileTraitFirst.traitId) }</p>
            <p className={ classes.symbolChart }> влада еще думает </p>
            <p className={ classes.traitName }>{ getTraitNameByTraitId(pair.profileTraitSecond.traitId) }</p>
        </div>
    );
};

export default PairTraits;