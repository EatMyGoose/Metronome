import { subdivision2NameMap, timeSignature2NameMap } from "../Types/constants"
import { IMetronomeProfile } from "../Types/settings"
import { ClassSelect } from "../Types/util"


export interface IProfileRow extends IMetronomeProfile
{
    darkmode: boolean
    index: number
    onDelete: (idx: number) => void
    onLoad: (profile: IMetronomeProfile) => void
}

export function ProfileRow(props: IProfileRow)
{
    const timeSignatureName: string = timeSignature2NameMap.get(props.timeSignature) || "";
    const subdivisionName: string = subdivision2NameMap.get(props.subdivision) || "";

    return (
        <div className="tile tile-centered">
            <div className="tile-content">
                <div className="tile-title">{props.name}</div>
                <small className="tile-subtitle text-gray">BPM: {props.bpm}, {subdivisionName}, {timeSignatureName} </small>
            </div>
            <div className="tile-action">
                <div className="dropdown dropdown-right">
                    <button className="btn btn-link dropdown-toggle">
                        <i className="icon icon-more-vert"></i>
                    </button>
                    <ul className={`menu ${ClassSelect(props.darkmode, "bg-dark", "")}`}>
                        <li className="menu-item">
                            <a href="#" onClick={()=>props.onLoad(props)}>Load</a>
                        </li>

                        <li className="menu-item">
                            <a href="#" onClick={()=>props.onDelete(props.index)}>Delete</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}