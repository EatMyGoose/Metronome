export class AudioFile
{
    private url: string;
    private context: AudioContext;
    private data: Float32Array = new Float32Array(1);
    private ready: boolean = false;
    private sampleRate: number = 1;

    constructor(_url: string, _audioContext: AudioContext)
    {
        this.url = _url;
        this.context = _audioContext;
        this.Load();
    }

    private Load()
    {
        fetch(this.url)
            .then((res) => res.arrayBuffer())
            .then((arrBuffer) => this.context.decodeAudioData(arrBuffer))
            .then( float32Buffer => {
                this.data = float32Buffer.getChannelData(0);
                this.sampleRate = float32Buffer.sampleRate;
                this.ready = true;
                console.log(`${this.url} ready`);
            });
    }

    GetSampleRate() : number
    {
        return this.sampleRate;
    }

    IsReady(): boolean
    {
        return this.ready;
    }

    GetBuffer() : Float32Array
    {
        return this.data;
    }
}