import React, { FC } from 'react';
import classes from './PairTraits.module.css';
import { ProfilePairTraits } from '../../../../models/ProfileTraits';


interface PairTraitsProps {
    pair: ProfilePairTraits;
}

const PairTraits: FC<PairTraitsProps> = ({ pair }: PairTraitsProps) => {

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
            <p className={ classes.symbolChart }> { getSymbolChart(pair.profileTraitFirst?.value) } </p>
        </div>
    );
};

export default PairTraits;