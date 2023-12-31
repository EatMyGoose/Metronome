import { isLeft } from "fp-ts/lib/Either";
import { TSubdivision, TTimeSignature } from "./types";
import * as t from 'io-ts'

export interface IMetronomeProfile
{
    name: string,
    
    bpm: number,
    timeSignature: TTimeSignature,
    subdivision: TSubdivision
}

export interface IAppState
{
    darkMode: boolean,
    bpm: number,
    play: boolean,
    timeSignature: TTimeSignature,
    subdivision: TSubdivision,
    volume: number,
    profiles: IMetronomeProfile[]
}

export const defaultAppState : IAppState = {
    darkMode: false,
    bpm: 120,
    play: false,
    timeSignature: "4_4",
    subdivision: "crotchet",
    volume: 1.0,
    profiles: []
};

const timeSignatureValidator = t.union([ t.literal("4_4"), t.literal("3_4"), t.literal("2_4") ]);
const subdivisionValidator = t.union([ t.literal("crotchet"), t.literal("quaver"), t.literal("triplet"), t.literal("semi_quaver") ]);

const metronomeProfileValidator = t.type({
    name: t.string,
    bpm: t.number,
    timeSignature: timeSignatureValidator,
    subdivision: subdivisionValidator
});

const appStateValidator = t.type({
    darkMode: t.boolean,
    bpm: t.number,
    play: t.boolean,
    timeSignature: timeSignatureValidator,
    subdivision: subdivisionValidator,
    volume: t.number,
    profiles: t.array(metronomeProfileValidator)
});

const APP_STATE_KEY = "APP_STATE" as const;

export function LoadAppState() : IAppState
{
    const json = localStorage.getItem(APP_STATE_KEY);

    if(json == null) return defaultAppState;

    const parsed: unknown = JSON.parse(json);

    const decoded = appStateValidator.decode(parsed);

    if(isLeft(decoded))
    {
        console.error(`Invalid format:\n${json}`);
        return defaultAppState;
    }

    return {
        ...decoded.right,
        play: false
    };
}   

export function SaveAppState(appState: IAppState)
{
    localStorage.setItem(APP_STATE_KEY, JSON.stringify(appState));
}


