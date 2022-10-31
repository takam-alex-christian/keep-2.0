
import { useEffect, useState } from 'react'

// tmp
import { ContentBlock, Editor, EditorState } from 'draft-js'
// import ''

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faPen, faFloppyDisk } from "@fortawesome/free-solid-svg-icons"

import styles from './index.module.css'



export default function NoteCard(props) {

    // the content of the Item
    const [note, setNote] = useState(props.noteContent)

    // tmp states for editor
    const [bodyEditorState, setBodyEditorState ] = useState(()=> EditorState.createEmpty())



    // should show card buttons
    const [shouldShowButtons, setShowButtons] = useState(false)

    // behavioral states
    const [isNoteBeingEdited, setEditState] = useState(false)

    // is the note deleted
    const [isNoteDeleted, setNoteDeleted] = useState(false);


    const onCardHover = () => { setShowButtons(true) }
    const onCardOut = () => { setShowButtons(false) }

    const onTitleChange = (e) => { setNote((prev) => { return { ...prev, title: e.target.value } }) }
    
    // works with the text area implementation
    // const onBodyChange = (e) => { setNote((prev) => { return { ...prev, body: e.target.value } }) }


    const editNote = () => {

        if (isNoteBeingEdited) {
            // if the note is being edited we submit a put request to the backend

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            let urlencoded = new URLSearchParams();
            urlencoded.append("_id", note._id);
            urlencoded.append("title", note.title);
            urlencoded.append("body", note.body);
            // just not needed yet
            // urlencoded.append("tags", note.tags? note.tags : [])

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

    // on body div input
    const onBodyInput = (e)=>{
        // console.log("bodyHtml has changed: ", e);
        setNote((prev)=>{
            return {...prev, body: document.getElementById(note._id).innerText}
        })
    }


    useEffect(()=>{
        document.getElementById(note._id).innerText = note.body;
    },[])


    


    return (

        <>
            {!isNoteDeleted && <div className={styles.noteCardContainer} onMouseOver={onCardHover} onMouseOut={onCardOut}>
                <div className={styles.titleContainer}>
                    <input type="text" className={styles.cardTitle} readOnly={!isNoteBeingEdited} onChange={onTitleChange} value={note.title} />
                </div>
                <div className={styles.bodyContainer}>
                    {/* <textarea  className={styles.cardBody} readOnly={!isNoteBeingEdited} onChange={onBodyChange} value={note.body} /> */}
                    <div id={note._id} onInput={onBodyInput} contentEditable={isNoteBeingEdited} suppressContentEditableWarning={true}>
                        
                    </div>
                </div>
                {shouldShowButtons &&
                    <div className={styles.cardButtons}>
                        <button onClick={editNote}>
                            <FontAwesomeIcon icon={isNoteBeingEdited ? faFloppyDisk : faPen} />
                        </button>
                        <button onClick={onDelete}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    </div>
                }
                { note.tags.length > 0 && 
                    
                    <div className={""}>
                        {JSON.parse( note.tags).map((tag, index)=>{
                            return (
                            <div key={index} className=''>
                                {tag}
                            </div>)
                        })}
                    </div>

                }
            </div>
            }
        </>


    )
}