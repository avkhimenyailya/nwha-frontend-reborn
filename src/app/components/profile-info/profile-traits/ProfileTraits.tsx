import React, { FC } from 'react';
import classes from './ProfileTraits.module.css';
import { ProfilePairTraits } from '../../../models/ProfileTraits';
import PairTraits from './pair-traits/PairTraits';

interface ProfileTraitsProps {
    pairsTraits: ProfilePairTraits[];
}

const ProfileTraits: FC<ProfileTraitsProps> = ({ pairsTraits }: ProfileTraitsProps) => {
    return (
        <div className={ classes.container }>
            { pairsTraits.map(pair => <PairTraits pair={ pair }/>) }
        </div>
    );
};

export default ProfileTraits;