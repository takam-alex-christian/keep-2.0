

import NoteCard from '../note-card-component/index'

// custom styles
import styles from './index.module.css'

export default function NotesContainer(props) {

    const addedNotes = props.addedNotes;
    const localNotes = props.localNotes;


    return (

        <>
            <div className={`${styles.notesContainer} flex flex-col gap-2`}>
                {addedNotes.length > 0 && addedNotes.map((note) => {
                    return (<NoteCard key={note._id} noteContent={note} />)
                })}
                {localNotes.map((note) => {
                    return (<NoteCard key={note._id} noteContent={note} />)
                })}
            </div>
        </>

    )
}