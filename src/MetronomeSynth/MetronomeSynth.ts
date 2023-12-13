import { GenerateMetronomeBuffer } from "./BufferBuilder";

import onBeat from "../assets/OnBeat.wav"
import offBeat from "../assets/OffBeat.wav"
import { AudioFile } from "./AudioFile";

export class MetronomeAudioSynth
{
    private audioContext = new AudioContext();
    private gainNode = this.audioContext.createGain();
    private sampleRateHz: number = 44100;
    private activeBufferSource : AudioBufferSourceNode = this.audioContext.createBufferSource();
    private isPlaying: boolean = false;

    private onBeatFile = new AudioFile(onBeat, this.audioContext);
    private offBeatFile = new AudioFile(offBeat, this.audioContext);

    private AllocateBuffer(durationSeconds: number) : AudioBuffer
    {
        return this.audioContext.createBuffer(
            1, 
            Math.floor(this.sampleRateHz * durationSeconds),
            this.sampleRateHz
        );
    }

    private ConnectSourceBuffer(src: AudioBufferSourceNode) : void
    {   
        this.gainNode.disconnect();
        src.connect(this.gainNode);

        this.gainNode.connect(this.audioContext.destination);
    }  

    Start(intervalSeconds: number, nRepeats: number)
    {
        this.Stop();

        this.isPlaying = true;
        this.audioContext.resume();
        
        this.activeBufferSource = this.audioContext.createBufferSource();

        const totalDurationSeconds = intervalSeconds * nRepeats;
        const newbuffer = this.AllocateBuffer(totalDurationSeconds);

        const rBuffer = newbuffer.getChannelData(0);

        GenerateMetronomeBuffer(
            this.onBeatFile,
            this.offBeatFile,
            this.sampleRateHz, 
            rBuffer, 
            intervalSeconds, 
            nRepeats
        );

        this.activeBufferSource.buffer = newbuffer;

        this.ConnectSourceBuffer(this.activeBufferSource);
        
        this.activeBufferSource.loop = true;
        this.activeBufferSource.start();
    }

    Stop()
    {
        if(this.isPlaying)
        {
            this.activeBufferSource.stop();
        }
        this.activeBufferSource.disconnect();
        this.gainNode.disconnect();
        this.isPlaying = false;
    }

    GetGain() : number
    {
        return this.gainNode.gain.value;
    }

    SetGain(_gain: number): void
    {
        this.gainNode.gain.value = _gain;
    }
}
