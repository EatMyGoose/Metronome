import React from "react"
import { MetronomeAudioSynth } from "../MetronomeSynth/MetronomeSynth";
import { GetBeatsPerMeasure, GetIntervalSeconds } from "../Types/util";
import { TSubdivision, TTimeSignature } from "../Types/types";
import { Throttle } from "../Types/throttle";


export function useMetronomeSynth(
    play: boolean,
    bpm: number,
    subdivision: TSubdivision,
    timeSignature: TTimeSignature,
    volume: number)
{
    const metronomeSynth = React.useMemo(() => new MetronomeAudioSynth(), []);

    const actionThrottle = React.useMemo(() => new Throttle(300), []);

    React.useEffect(
        () => {
            metronomeSynth.Stop();
        }, []
    );

    React.useEffect( () => {
            if(play)
            {
                const intervalSeconds = GetIntervalSeconds(bpm, subdivision);
                const beatsPerMeasure = GetBeatsPerMeasure(subdivision, timeSignature);
                const action = () => metronomeSynth.Start(intervalSeconds, beatsPerMeasure);
                actionThrottle.QueueAction(action);
            }
            else
            {
                actionThrottle.CancelPendingAction();
                metronomeSynth.Stop();
            }
        }, [play, bpm, subdivision, timeSignature]
    );

    React.useEffect(
        () => {
            metronomeSynth.SetGain(volume);
        }, [volume]
    );
}