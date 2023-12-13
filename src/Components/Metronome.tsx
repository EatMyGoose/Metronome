import "./Metronome.css"

import { TSubdivision, TTimeSignature } from '../Types/types'
import { DropdownList } from "./DropdownList"
import { subdivision2Name, timeSignature2Name } from "../Types/constants"
import { ClassSelect } from "../Types/util"

interface IMetronome
{
    bpm: number,
    setBpm: (newBpm: number) => void

    play: boolean,
    setPlay: (shouldPlay: boolean) => void

    timeSignature: TTimeSignature,
    setTimeSignature: (newSignature: TTimeSignature) => void

    subdivision: TSubdivision 
    setSubdivision: (newSubdivision: TSubdivision) => void

    volume: number
    setVolume: (newVolume: number) => void

    darkmode: boolean

    className?: string
    style?: React.CSSProperties
}

const maxBpm: number = 200;
const minBpm: number = 30;

export function Metronome(props: IMetronome)
{
    function TrySetBpm(newBpm: number)
    {
        if(newBpm >= minBpm && newBpm <=maxBpm)
        {
            props.setBpm(newBpm);
        }
    }

    function handleSliderChanged(e: React.ChangeEvent<HTMLInputElement>)
    {
        const newBpm: number | undefined = Number.parseInt(e.target.value);

        if(newBpm) TrySetBpm(newBpm);
    }

    function handleVolumeChanged(e: React.ChangeEvent<HTMLInputElement>)
    {
        const newVolume: number | undefined = Number.parseFloat(e.target.value);

        if(newVolume !== undefined) props.setVolume(newVolume);
    }

    const playButtonText = (props.play === true)? "Stop" : "Start";

    const dropdownListClasses = ClassSelect(props.darkmode, "text-dark", "");
    const buttonClassess = ClassSelect(props.darkmode, "btn-primary", "");

    return (
        <div 
            className={`card metronome-container ${props.className || ""} ${ClassSelect(props.darkmode, "bg-dark metronome-no-border", "")}`}
            style={props.style}
        >
            <div className="card-body">
                <h1>{props.bpm} BPM</h1>
                <div>
                    <input 
                        className={"slider"}
                        type="range"
                        min={minBpm}
                        max={maxBpm}
                        value={props.bpm}
                        onChange={handleSliderChanged}
                    />
                </div>
                <div style={{paddingTop:"4px", display:"flex", justifyContent:"center"}}>
                    <div className="d-inline px-2">
                        <button 
                            className={`btn btn-action s-circle ${buttonClassess}`}
                            onClick={() => TrySetBpm(props.bpm - 1)}
                        >
                            <i className="icon icon-minus"/>
                        </button>
                    </div>
                    <div className="d-inline px-2">
                        <button 
                            className={`btn btn-action s-circle ${buttonClassess}`}
                            onClick={() => TrySetBpm(props.bpm + 1)}
                        >
                            <i className="icon icon-plus"/>
                        </button>
                    </div>
                </div>
                
                
                <div className="py-2">
                    <label className="form-label">Time Signature</label>
                    <DropdownList
                        className={dropdownListClasses}
                        currentValue={props.timeSignature}
                        onValueChanged={props.setTimeSignature as (_: string) => void}
                        options={timeSignature2Name}
                    />
                </div>

                <div className="py-2">
                    <label className="form-label">Subdivision</label>
                    <DropdownList
                        className={dropdownListClasses}
                        currentValue={props.subdivision}
                        onValueChanged={props.setSubdivision as (_: string) => void}
                        options={subdivision2Name}
                    />
                </div>

                <div>
                    <label className="form-label">Volume</label>
                    <input 
                        className="slider"
                        type="range"

                        min={0}
                        max={2}
                        step={0.05}

                        value={props.volume}
                        onChange={handleVolumeChanged}
                    />
                </div>
                

                <div className="py-2">
                    <button 
                        className='btn btn-block btn-primary'
                        onClick={()=> props.setPlay(!props.play)}
                    >
                        {playButtonText}
                    </button>
                </div>
            </div>
        </div>
    )
}