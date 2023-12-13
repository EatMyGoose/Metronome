import "./AppHeader.css"
import React from "react"
import { ClassSelect } from "./Types/util";
import rat from "./assets/Rat.png"

interface IAppHeader
{
    darkMode: boolean,
    setDarkMode: (mode: boolean) => void
}

export function Appheader(props: IAppHeader)
{
    const [spinning, setSpinning] = React.useState<boolean>(false);

    const headerText = (
        <>
            <h2 className="hide-xs">Metronome</h2>
            <h3 className="show-xs pt-1">Metronome</h3>
        </>
    );

    return (
        <div>
            <header className={`navbar app-header-container ${ClassSelect(props.darkMode, "bg-dark", "bg-gray")}`}>
                <section className={"navbar-section " + ClassSelect(props.darkMode, "", "text-primary")}>
                    {headerText}
                </section>

                <section className="navbar-center">
                    <div 
                        className="s-circle app-header-icon-container bg-primary"
                        onClick={() => setSpinning(true)}
                    >
                        <img 
                            className={`app-header-icon ${spinning? "app-header-icon-rotate": ""}`} 
                            src={rat}
                        />
                    </div>
                </section>
                <section className="navbar-section">
                    <label className="form-switch">
                        <input 
                            type="checkbox" 
                            checked={props.darkMode}
                            onChange={()=> props.setDarkMode(!props.darkMode)}
                        />
                        <i className="form-icon"></i> <span className="text-small">Dark Mode</span>
                    </label>
                </section>
            </header>
        </div>
    );
}