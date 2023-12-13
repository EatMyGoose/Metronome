import { AudioFile } from "./AudioFile";

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
