import React from "react"
import { IAppState, SaveAppState } from "../Types/settings";

export function useSaveState(appState: IAppState)
{
    React.useEffect(
        () => {
            SaveAppState(appState);
        }
    , [...Object.values(appState)])
}