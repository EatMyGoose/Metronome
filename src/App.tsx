import "./App.css"
import "spectre.css"
import "spectre.css/dist/spectre-exp.css"
import "spectre.css/dist/spectre-icons.css"

import { Metronome } from "./Components/Metronome"
import React from 'react'
import { TSubdivision, TTimeSignature } from "./Types/types"
import { useMetronomeSynth } from "./Hooks/useMetronomeSynth"
import { Appheader } from "./AppHeader"
import { IAppState, IMetronomeProfile, LoadAppState } from "./Types/settings"
import { useSaveState } from "./Hooks/useSaveState"
import { useClassToggle } from "./Hooks/useClassToggle"
import { ClassSelect } from "./Types/util"
import { Profile } from "./Components/Profiles"

const initialState: IAppState = LoadAppState();

function App() {
  const [darkMode, setDarkMode] = React.useState<boolean>(initialState.darkMode);

  const [bpm, setBpm] = React.useState<number>(initialState.bpm);
  const [play, setPlay] = React.useState<boolean>(initialState.play);
  const [timeSignature, setTimeSignature] = React.useState<TTimeSignature>(initialState.timeSignature);
  const [subdivision, setSubdivision] = React.useState<TSubdivision>(initialState.subdivision);
  const [volume, setVolume] = React.useState<number>(initialState.volume);
  const [profiles, setProfiles] = React.useState<IMetronomeProfile[]>(initialState.profiles);

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
    volume,
    profiles
  });

  useClassToggle(document.body, darkMode, "bg-darkmode");
  
  function onLoadProfile(newProfile: IMetronomeProfile)
  {
    setBpm(newProfile.bpm);
    setSubdivision(newProfile.subdivision);
    setTimeSignature(newProfile.timeSignature);
  }

  function onAddProfile(name: string)
  {
    const newProfile: IMetronomeProfile = {
      name,
      bpm,
      timeSignature,
      subdivision
    };

    setProfiles(profiles.concat([newProfile]));
  }

  return (
    <>
      <Appheader
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div
        style={{marginTop:"1em"}}
        className={`card body-container p-centered ${ClassSelect(darkMode, "bg-dark body-no-border", "")}`}
      >
        <Metronome
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

        <div className="pt-2">
          <div className="divider mx-2"/>
        </div>

        <Profile
          profiles={profiles}
          darkmode={darkMode}
          onLoadProfile={onLoadProfile}
          onAddProfile={onAddProfile}
          onDeleteProfile={setProfiles}
        />
      </div>
    </>
  )
}

export default App

