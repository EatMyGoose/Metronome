import { TSubdivision, TTimeSignature } from "./types";

export const timeSignature2Name: [TTimeSignature, string][] = [
    ["4_4", "4/4"],
    ["3_4", "3/4"],
    ["2_4", "2/4"],
];

export const timeSignature2NameMap = new Map<TTimeSignature, string>(
    [...timeSignature2Name]
);

export const subdivision2Name: [TSubdivision, string][] = [
    ["crotchet", "Quarter-Notes 𝅘𝅥"],
    ["quaver", "Eighth-Notes 𝅘𝅥𝅮𝅘𝅥𝅮"],
    ["triplet", "Triplets 𝅘𝅥𝅮𝅘𝅥𝅮𝅘𝅥𝅮"],
    ["semi_quaver", "Sixteenth-Notes 𝅘𝅥𝅯𝅘𝅥𝅯𝅘𝅥𝅯𝅘𝅥𝅯"],
];

export const subdivision2NameMap = new Map<TSubdivision, string>(
    [...subdivision2Name]
);

