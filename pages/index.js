import { useEffect, useState } from "react"

import InputNote from "../components/input-note-component"
import NoteCard from "../components/note-card-component"


export default function keepHome(){

    // a place to keep all our notes
    const [localNotes, setLocalNotes] = useState([1,2,3]);

    // fetch notes

    // useEffect(()=>{
        
    // }, [])


    return (
    <div className={"container"}>
        <InputNote />

        {localNotes.map((noteIndex, note)=>{
            return (<NoteCard key={noteIndex}/>)
        })}

    </div>)
}