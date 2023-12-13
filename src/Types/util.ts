import { TSubdivision, TTimeSignature } from "./types";


const timeSignature2BeatsPerMeasureMap = new Map<TTimeSignature, number>(
    [
        ["4_4", 4],
        ["3_4", 3],
        ["2_4", 2],
    ]
);

const subdivisionMultiplierMap = new Map<TSubdivision, number>(
    [
        ["crotchet", 1.0],
        ["quaver", 2.0],
        ["triplet", 3.0],
        ["semi_quaver", 4.0]
    ]
);

export function GetIntervalSeconds(
    bpm: number, 
    subdivision: TSubdivision) : number
{
    const subdivisionMultiplier: number = subdivisionMultiplierMap.get(subdivision) || 1.0;

    return 60 / (bpm * subdivisionMultiplier);
}

export function GetBeatsPerMeasure(
    subdivision: TSubdivision,
    timeSignature: TTimeSignature ): number
{
    if(subdivision === "crotchet")
    {
        return timeSignature2BeatsPerMeasureMap.get(timeSignature) || 4;
    }
    else
    {
        return subdivisionMultiplierMap.get(subdivision) || 1.0;
    }
}

export function ClassSelect(takeFirst: boolean, class1: string, class2: string)
{
    return takeFirst? class1 : class2;
}