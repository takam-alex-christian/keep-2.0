
import { useEffect, useState } from 'react'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faPen} from "@fortawesome/free-solid-svg-icons"

import styles from './index.module.css'



export default function NoteCard(props){

    // the content of the Item
    const [note, setNote] = useState(props.noteContent)

    // behavioral states
    const [isNoteBeingEdited, setEditState] = useState(false)

    const onTitleChange = (e)=>{setNote((prev)=>{return {...prev, title: e.target.value}})}
    const onBodyChange = (e)=>{setNote((prev)=>{return {...prev, body: e.target.value}})}

    const editNote = ()=>{setEditState(true)}
    // const stopEditing = ()=> {setEditState(false)}

    
    

    return (

        <div className={styles.noteCardContainer}>
            <div className={styles.titleContainer}>
                <input type="text" className={styles.cardTitle} readOnly={!isNoteBeingEdited} onChange={onTitleChange} value={note.title}/>
            </div>
            <div className={styles.bodyContainer}>
                <textarea className={styles.cardBody} readOnly={!isNoteBeingEdited} onChange={onBodyChange} value={note.body}/>
            </div>
            <div className={styles.cardButtons}>
                <button onClick={editNote}>
                    <FontAwesomeIcon icon={faPen} />
                </button>
                <button>
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </div>
        </div>

    )
}