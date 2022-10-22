import { useEffect, useState } from "react"

import InputNote from "../components/input-note-component"
import NoteCard from "../components/note-card-component"


export default function keepHome() {

    // a place to keep all our notes
    const [localNotes, setLocalNotes] = useState([]);

    // a place where we store all notes we add ourself
    const [addedNotes, setAddedNotes] = useState([])

    // should reload
    const [refresh, setRefresh] = useState(false)

    // fetch notes

    useEffect(() => {

        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("/notes", requestOptions)
            .then(response => response.json())
            .then(result => setLocalNotes(result))
            .catch(error => console.log('error fetching the data', error));

    }, [])



    return (
        <div className={"container"}>
            <InputNote onNoteAdded={setLocalNotes} />

            <div className={"notesContainer"}>
                
                {localNotes.map((note, noteIndex) => {
                    return (<NoteCard key={noteIndex} noteContent={note} />)
                })}
            </div>

        </div>
    )
}