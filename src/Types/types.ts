
export const TimeSignatures = [
    "4_4",
    "3_4",
    "2_4",
] as const;

export type TTimeSignature = typeof TimeSignatures[number];

export const Subdivision = [
    "crotchet",
    "quaver",
    "triplet",
    "semi_quaver"
] as const;

export type TSubdivision = typeof Subdivision[number];

