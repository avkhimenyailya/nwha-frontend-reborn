export interface ProfileTraits {
    value: number
    profileId: number,
    traitName: string,
}

export interface ProfilePairTraits {
    firstProfileTrait: ProfileTraits;
    secondProfileTrait: ProfileTraits;
}