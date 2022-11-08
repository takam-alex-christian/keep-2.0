import { useEffect, useState } from "react"

import InputNote from "../components/input-note-component"
// import NoteCard from "../components/note-card-component"
import NotesContainer from "../components/notes-container-component";


import styles from './index.module.css'


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
        <div className={`flex justify-center`}>


            <div className={`${styles.container}`}>
                {/* side */}
                <div className={`w-4/12`}>
                    menu
                </div>

                <div className={"flex flex-col gap-2 w-8/12"}>
                    <div className={`p-4 text-xl font-semibold`}>
                        <div>
                            My Notes
                        </div>
                    </div>

                    <InputNote onNoteAdded={setAddedNotes} />

                    {/* <div className={``}>
                {addedNotes.length>0 && addedNotes.map((note)=>{
                    return(<NoteCard key={note._id} noteContent={note} />)
                })}
                {localNotes.map((note) => {
                    return (<NoteCard key={note._id} noteContent={note} />)
                })}
            </div> */}

                    <NotesContainer localNotes={localNotes} addedNotes={addedNotes} />

                </div>
            </div>
        </div>

    )
}