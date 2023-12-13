import { AudioFile } from "./AudioFile";

//const baseFreqHz: number = 440; 
//const pulseDurationSeconds: number = 0.20;
//const semitoneRatio: number = Math.pow(2, 1/12);
//
//function Lerp(
//    x: number, 
//    xStart: number, 
//    yStart: number,
//    xEnd: number,
//    yEnd: number)
//{
//    const frac = (x - xStart) / (xEnd - xStart);
//    return (frac * yEnd) + ((1.0 - frac) * yStart);
//}
//
//
//
//function GetADSREnvelop(
//    idx: number, 
//
//    startingIdx: number,
//
//    attackEndIdx: number,
//    attackCoeff: number,
//
//    decayEndIdx: number,
//
//    sustainEndIdx: number, 
//    sustainCoeff: number,
//
//    releaseEndIdx: number): number
//{
//    if(idx <= attackEndIdx)
//    {
//        return Lerp(
//            idx, 
//            startingIdx, 0,
//            attackEndIdx, attackCoeff
//        );
//    }
//    else if(idx <= decayEndIdx)
//    {
//        return Lerp(
//            idx, 
//            attackEndIdx, attackCoeff,
//            decayEndIdx, sustainCoeff
//        );
//    }
//    else if(idx <= sustainEndIdx)
//    {
//        return sustainCoeff;
//    }
//    else if(idx <= releaseEndIdx)
//    {
//        return Lerp(
//            idx, 
//            decayEndIdx, sustainCoeff,
//            releaseEndIdx, 0.0
//        );
//    }
//    else
//    {
//        return 0.0;
//    }
//}
//
//function WriteSquarePulse(
//    frequencyHz: number,
//    positionSeconds: number,
//    sampleRateHz: number, 
//    durationSeconds: number,
//    buffer: Float32Array) : void
//{
//    const startingIdx = Math.floor(positionSeconds * sampleRateHz);
//    const endingIdx = Math.floor((positionSeconds + durationSeconds) * sampleRateHz);
//    const endingIdxClamped = Math.min(endingIdx, buffer.length);
//
//    const coeff: number = (1 / sampleRateHz) * 2 * Math.PI * frequencyHz;
//
//    const attackFrac = 0.05;
//    const decayFrac = 0.2;
//    const sustainFrac = 0;
//
//    const attackEndIdx =  startingIdx + durationSeconds * (attackFrac) * sampleRateHz;
//    const decayEndIdx =  startingIdx + durationSeconds * (attackFrac + decayFrac) * sampleRateHz;
//    const sustainEndIdx =  startingIdx + durationSeconds * (attackFrac + decayFrac + sustainFrac) * sampleRateHz;
//    const releaseEndIdx = startingIdx + durationSeconds * sampleRateHz;
//
//    console.log(`${startingIdx}, ${endingIdxClamped}, dist=${endingIdxClamped - startingIdx}`)
//    for(let idx = startingIdx; idx < endingIdxClamped; idx++)
//    {
//        const adsrCoeff = GetADSREnvelop(
//            idx, 
//            startingIdx, 
//            attackEndIdx, 1.0, 
//            decayEndIdx,
//            sustainEndIdx, 0.7,
//            releaseEndIdx
//        );
//        
//        //console.assert(adsrCoeff >= 0.0 && adsrCoeff <= 1.0);
//
//        const sinVal: number = Math.sin((idx - startingIdx) * coeff);
//        const value = adsrCoeff * sinVal * 0.5;
//        buffer[idx] += value;
//    }
//}
//
//function WriteTick(
//    positionSeconds: number,
//    sampleRateHz: number,
//    buffer: Float32Array) : void
//{
//    WriteSquarePulse(
//        baseFreqHz * semitoneRatio, 
//        positionSeconds, 
//        sampleRateHz, 
//        pulseDurationSeconds, 
//        buffer
//    );
//}
//
//function WriteTock(
//    positionSeconds: number, 
//    sampleRateHz: number,
//    buffer: Float32Array) : void
//{
//    WriteSquarePulse(
//        baseFreqHz, 
//        positionSeconds, 
//        sampleRateHz, 
//        pulseDurationSeconds, 
//        buffer
//    );
//}

function PlaySound(
    file: AudioFile, 
    outputBuffer: Float32Array, bufferSampleRate: number,
    positionSeconds: number) : void
{
    const fileBuffer = file.GetBuffer();
    const fileSampleRate = file.GetSampleRate();

    const fileDurationSeconds = 0.5 * (fileBuffer.length / fileSampleRate);

    const startingIdx = Math.floor(positionSeconds * bufferSampleRate);

    const rawEndingIdx = (positionSeconds + fileDurationSeconds) * bufferSampleRate;
    const endingIdx: number = Math.min(
        rawEndingIdx,
        outputBuffer.length
    );

    for(let i = startingIdx; i < endingIdx; i++)
    {
        const fileTimeSeconds: number = (i - startingIdx) / bufferSampleRate;
        const fileSampleIdx = fileTimeSeconds * fileSampleRate;

        const leftSampleIdx = Math.floor(fileSampleIdx);
        const leftSample = fileBuffer[leftSampleIdx];
        
        outputBuffer[i] += leftSample;
    }
}

export function GenerateMetronomeBuffer(
    tickFile: AudioFile,
    tockFile: AudioFile,
    sampleRate : number,
    buffer: Float32Array,
    intervalSeconds: number, 
    nRepeats: number)
{
    //const length = buffer.length / sampleRate;
    //console.log(`${nRepeats}, ${intervalSeconds}, ${length}`);
    for(let i = 0; i < buffer.length; i++)
    {
        //For whatever reason, the web audio API requires the buffer to be
        //filled with non-zeroes, otherwise no sound will play
        buffer[i] = 0.000001 * Math.sin((i / sampleRate) * 100 * Math.PI * 2);
    }

    for(let i = 0; i < nRepeats; i++)
    {
        const positionSeconds: number = intervalSeconds * i;
        //console.log(positionSeconds);
        if(i === 0)
        {
            PlaySound(tickFile, buffer, sampleRate, positionSeconds);
        }
        else
        {
            PlaySound(tockFile, buffer, sampleRate, positionSeconds);
        }
    }
}
