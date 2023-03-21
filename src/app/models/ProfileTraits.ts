export interface ProfileTraits {
    id: number,
    traitId: number,
    value: number
}

export interface ProfilePairTraits {
    profileTraitFirst: ProfileTraits;
    profileTraitSecond: ProfileTraits;
}