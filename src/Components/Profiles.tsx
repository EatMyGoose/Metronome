import React from "react"
import { IMetronomeProfile } from "../Types/settings"
import { ProfileRow } from "./ProfileRow"
import { AddProfileModal } from "./AddProfileModal"
import { ClassSelect } from "../Types/util"
import { useInvalidate } from "../Hooks/useInvalidate"

export interface IProfile
{
    profiles: IMetronomeProfile[]
    darkmode: boolean,
    onLoadProfile(newProfile: IMetronomeProfile): void
    onDeleteProfile(newProfileList: IMetronomeProfile[]): void
    onAddProfile(newName: string) : void
}

export function Profile(props: IProfile)
{
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const {id, invalidate} = useInvalidate();

    function onRowDeleted(index: number) : void
    {
        const filteredArr = props.profiles.filter((_, idx) => idx !== index);
        props.onDeleteProfile(filteredArr);
    }

    function onLoadProfile(newProfile: IMetronomeProfile)
    {
        props.onLoadProfile(newProfile);
        invalidate();
    }

    return (
        <div className="card-body">
            <h3 className="d-inline-block">Profiles</h3> 
            <button 
                className={`btn inline-block float-right ${ClassSelect(props.darkmode, "bg-dark", "")}`}
                onClick={() => setShowModal(true)}
            >
                Save Current Profile
            </button>

            <AddProfileModal
                darkmode={props.darkmode}
                key={props.profiles.length}
                show={showModal}
                onClose={()=>setShowModal(false)}
                onAddProfile={props.onAddProfile}
            />

            {
                props.profiles.map((p, idx) => {
                    return <ProfileRow
                        key={`${p.name} -- ${idx} -- ${id}`}
                        darkmode={props.darkmode}
                        index={idx}
                        name={p.name}
                        bpm={p.bpm}
                        timeSignature={p.timeSignature}
                        subdivision={p.subdivision}
                        onDelete={onRowDeleted}
                        onLoad={onLoadProfile}
                    />;
                })
            } 
            
        </div>
    )
}