
import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faPen, faFloppyDisk } from "@fortawesome/free-solid-svg-icons"

import styles from './index.module.css'
import { TagEditor } from '../input-note-component/tag-editor'



export default function NoteCard(props) {


    // the content of the Item
    const [note, setNote] = useState(props.noteContent)

    // setNote((prev) => {
    //     return { ...prev, tags: JSON.parse(prev.tags) }
    // })


    //


    const [tagList, setTagList] = useState(JSON.parse(props.noteContent.tags))

    // update note when tagList changes
    useEffect(() => { setNote((prev) => { return { ...prev, tags: tagList } }) }, [tagList])

    // should show card buttons
    const [shouldShowButtons, setShowButtons] = useState(false)

    // behavioral states
    const [isNoteBeingEdited, setEditState] = useState(false)

    // is the note deleted
    const [isNoteDeleted, setNoteDeleted] = useState(false);

    // useEffect(()=>{
    //     // setTagList(props.noteContent.tags)

    //     console.log("the content of this note is ", JSON.parse(props.noteContent.tags))
    // }, [])

    const onCardHover = () => { setShowButtons(true) }
    const onCardOut = () => { setShowButtons(false) }

    const onTitleChange = (e) => { setNote((prev) => { return { ...prev, title: e.target.innerText } }) }

    const editNote = () => {

        if (isNoteBeingEdited) {
            // if the note is being edited we submit a put request to the backend

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            let urlencoded = new URLSearchParams();
            urlencoded.append("_id", note._id);
            urlencoded.append("title", note.title);
            urlencoded.append("body", note.body);
            urlencoded.append("tags", JSON.stringify(note.tags))
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
    const onBodyInput = (e) => {
        // console.log("bodyHtml has changed: ", e);
        setNote((prev) => {
            return { ...prev, body: e.target.innerText }
        })
    }


    // const setTagList = (tagList) => {
    //     setNote((prev) => {
    //         return { ...prev, tags: tagList }
    //     })
    // }

    //displays content editable values
    useEffect(() => {
        document.getElementById(note._id + "title").innerText = note.title;
        document.getElementById(note._id + "body").innerText = note.body;

    }, [])

    // useEffect(()=>{
    //     console.log(`note-card-component ${tagList}`)
    // }, [tagList])




    return (

        <div className={`w-100 `}>

            {!isNoteDeleted && <div className={`p-4 flex flex-col gap-4 border rounded-lg`} onMouseOver={onCardHover} onMouseOut={onCardOut}>

                <div className={``} >
                    {/* <input type="text" className={styles.cardTitle} readOnly={!isNoteBeingEdited} onChange={onTitleChange} value={note.title} /> */}

                    <div
                        id={note._id + "title"}

                        readOnly={!isNoteBeingEdited}

                        onInput={onTitleChange}

                        contentEditable={isNoteBeingEdited}

                        suppressContentEditableWarning={true}
                        
                        className={` text-xl font-semibold`}
                    ></div>

                </div>

                <div className={styles.bodyContainer}>
                    {/* <textarea  className={styles.cardBody} readOnly={!isNoteBeingEdited} onChange={onBodyChange} value={note.body} /> */}
                    <div id={note._id + "body"} onInput={onBodyInput} contentEditable={isNoteBeingEdited} suppressContentEditableWarning={true}>
                        {/* {note.body} */}
                    </div>
                </div>

                {shouldShowButtons &&
                    <div className={`${styles.cardButtons} group`}>
                        <button className={`group-hover:text-teal-700`} onClick={editNote}>
                            <FontAwesomeIcon icon={isNoteBeingEdited ? faFloppyDisk : faPen} />
                        </button>
                        <button className={`group-hover:text-red-400`} onClick={onDelete}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    </div>
                }

                {note.tags.length > 0 &&
                    <>
                        <TagEditor tagList={tagList} setTagList={setTagList} mode={isNoteBeingEdited} />
                    </>

                }
            </div>
            }
        </div>


    )
}