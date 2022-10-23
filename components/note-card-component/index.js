
import { useEffect, useState } from 'react'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faPen, faFloppyDisk } from "@fortawesome/free-solid-svg-icons"

import styles from './index.module.css'



export default function NoteCard(props) {

    // the content of the Item
    const [note, setNote] = useState(props.noteContent)

    // behavioral states
    const [isNoteBeingEdited, setEditState] = useState(false)

    // is the note deleted
    const [isNoteDeleted, setNoteDeleted] = useState(false);


    const onTitleChange = (e) => { setNote((prev) => { return { ...prev, title: e.target.value } }) }
    const onBodyChange = (e) => { setNote((prev) => { return { ...prev, body: e.target.value } }) }

    const editNote = () => {

        if (isNoteBeingEdited) {
            // if the note is being edited we submit a put request to the backend

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            let urlencoded = new URLSearchParams();
            urlencoded.append("_id", note._id);
            urlencoded.append("title", note.title);
            urlencoded.append("body", note.body);

            let requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            fetch("/notes", requestOptions)
                .then(response => response.json())
                .then(result => {
                    // we can activate a visual alert here
                    
                    //we stop editing the note 
                    setEditState(false);

                    console.log(result)
                })
                .catch(error => console.log('error', error));


        } else {
            setEditState(true)
        }
    }
    // const stopEditing = ()=> {setEditState(false)}


    const onDelete = () => {
        setNoteDeleted(true)

        // we send a delete request
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("_id", note._id);

        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("/notes", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.message === "success") {
                    setNoteDeleted(true);
                }
            })
            .catch(error => console.log('error deleting note', error));


    }



    return (

        <>
            {!isNoteDeleted && <div className={styles.noteCardContainer}>
                <div className={styles.titleContainer}>
                    <input type="text" className={styles.cardTitle} readOnly={!isNoteBeingEdited} onChange={onTitleChange} value={note.title} />
                </div>
                <div className={styles.bodyContainer}>
                    <textarea className={styles.cardBody} readOnly={!isNoteBeingEdited} onChange={onBodyChange} value={note.body} />
                </div>
                <div className={styles.cardButtons}>
                    <button onClick={editNote}>
                        <FontAwesomeIcon icon={ isNoteBeingEdited? faFloppyDisk: faPen} />
                    </button>
                    <button onClick={onDelete}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
            </div>
            }
        </>


    )
}