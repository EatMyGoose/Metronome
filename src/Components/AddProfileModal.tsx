import "./AddProfileModal.css"
import React from "react"
import { ClassSelect } from "../Types/util";

export interface IAddProfileModal
{
    darkmode: boolean,
    show: boolean
    onAddProfile: (newName: string) => void
    onClose: () => void
}

export function AddProfileModal(props: IAddProfileModal)
{
    const [name, setName] = React.useState<string>("");
    const inputValid = name.length > 0;

    const inputValidationHint: string = (
        inputValid? 
        "":
        "Profile name is required"
    );

    function onNameChanged(e: React.ChangeEvent<HTMLInputElement>)
    {
        setName(e.target.value);
    }

    function onProfileAdded()
    {
        props.onClose();
        props.onAddProfile(name);
    }

    return (
        <div 
            className={`modal modal-sm ${props.show? "active" : ""}`} 
            id="modal-id"
        >
            <a href="#close" className={`modal-overlay ${ClassSelect(props.darkmode, "add-profile-modal-dark-bg", "")}`} aria-label="Close" onClick={props.onClose}/>

            <div className={`modal-container ${ClassSelect(props.darkmode, "bg-dark", "")} ${inputValid? "": "has-error"}`}>
                <div className="modal-header">
                    <a 
                        href="#close" 
                        className={`btn btn-clear float-right ${ClassSelect(props.darkmode,"text-light", "")}`} 
                        aria-label="Close" onClick={props.onClose}
                    />
                    <div className={`modal-title h5 ${ClassSelect(props.darkmode, "text-light", "")}`}>Save Profile</div>
                </div>
                <div className="modal-body">
                    <div className="content">
                        <div className="form-group">
                            <label className="form-label" htmlFor="tb-profile-name">Profile Name</label>
                            <input
                                className="form-input" 
                                type="text" 
                                id="tb-profile-name" 
                                placeholder="Insert Profile Name" 
                                onChange={onNameChanged} 
                                value={name}
                            />
                            <p className="form-input-hint">{inputValidationHint}</p>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button 
                        className="btn btn-primary" 
                        onClick={onProfileAdded}
                        disabled={!inputValid}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}
