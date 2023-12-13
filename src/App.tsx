import "./App.css"
import "spectre.css"
import "spectre.css/dist/spectre-exp.css"
import "spectre.css/dist/spectre-icons.css"

import { Metronome } from "./Components/Metronome"
import React from 'react'
import { TSubdivision, TTimeSignature } from "./Types/types"
import { useMetronomeSynth } from "./Hooks/useMetronomeSynth"
import { Appheader } from "./AppHeader"
import { IAppState, LoadAppState } from "./Types/settings"
import { useSaveState } from "./Hooks/useSaveState"
import { useClassToggle } from "./Hooks/useClassToggle"

const initialState: IAppState = LoadAppState();

function App() {
  const [darkMode, setDarkMode] = React.useState<boolean>(initialState.darkMode);

  const [bpm, setBpm] = React.useState<number>(initialState.bpm);
  const [play, setPlay] = React.useState<boolean>(initialState.play);
  const [timeSignature, setTimeSignature] = React.useState<TTimeSignature>(initialState.timeSignature);
  const [subdivision, setSubdivision] = React.useState<TSubdivision>(initialState.subdivision);
  const [volume, setVolume] = React.useState<number>(initialState.volume);

  useMetronomeSynth(
    play,
    bpm,
    subdivision,
    timeSignature,
    volume
  ); 

  useSaveState({
    darkMode,
    bpm,
    play,
    timeSignature,
    subdivision,
    volume
  });

  useClassToggle(document.body, darkMode, "bg-darkmode");
  
  return (
    <>
      <Appheader
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Metronome
        style={{marginTop:"1em"}}
        className="p-centered"
        bpm={bpm}
        setBpm={setBpm}
        play={play}
        setPlay={setPlay}
        timeSignature={timeSignature}
        setTimeSignature={setTimeSignature}
        subdivision={subdivision}
        setSubdivision={setSubdivision}
        volume={volume}
        setVolume={setVolume}
        darkmode={darkMode}
      />
    </>
  )
}

export default App

