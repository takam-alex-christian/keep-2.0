
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faArrowsRotate, faClose } from "@fortawesome/free-solid-svg-icons"

// importing custom module styles
import styles from './index.module.css'
import { useState } from "react"

// custom components
import { TagEditor } from './tag-editor'

export default function InputNote(props) {

    // new note content
    const [noteContent, setNoteContent] = useState({ title: "", body: "" })

    // was the note submited added ? 
    const [isNoteAdded, setNoteAdded] = useState(false);

    // what was the response of the backend to the note?
    const [noteResponse, setNoteResponse] = useState({});



    // tags states
    const [tagList, setTagList] = useState([]);





    const onTitleChange = (e) => {
        setNoteContent((prev) => {
            return { ...prev, title: e.target.value }
        });
    }

    const onBodyChange = (e) => {
        setNoteContent((prev) => {
            return { ...prev, body: e.target.value }
        })
    }

    const submitNewNote = (e) => {
        e.preventDefault()

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("title", noteContent.title);
        urlencoded.append("body", noteContent.body);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("/notes", requestOptions)
            .then(response => response.json())
            .then(result => {

                // if node is added successfully
                if (result.message && result.message === 'success') {

                    props.onNoteAdded((prev) => {
                        // let's reverse the order of the added notes array

                        prev.unshift(result.note);

                        return [...prev];
                    })
                    setNoteContent({ title: "", body: "" })
                    console.log("node added successfully")


                }

            })
            .catch(error => console.log('error', error));

        // if(noteResponse.message === 'success'){
        //     props.onNoteAdd(true)
        //     console.log("note is being added")
        // }

    }

    return (
        <div className={styles.inputNoteContainer}>
            <form action="/notes" method="POST" onSubmit={submitNewNote}>
                <div className={styles.formContainer}>

                    <div className={styles.titleContainer}>
                        <input onChange={onTitleChange} className={styles.titleInput} name="title" type="text" value={noteContent.title} placeholder="Title here" />
                    </div>

                    <div className={styles.bodyContainer}>
                        <textarea onChange={onBodyChange} className={styles.bodyInput} name="body" value={noteContent.body} placeholder="Take a note" />
                    </div>

                    <div>
                        <TagEditor />
                    </div>

                    <div className={styles.buttonContainer}>
                        <button type="submit"><FontAwesomeIcon icon={faPlus} /></button>
                        <button type="button"><FontAwesomeIcon icon={faArrowsRotate} /></button>

                        <div className={styles.alertContainer}>

                        </div>
                    </div>
                </div>

            </form>

         {/* temp, subjected to future edit. unsafe */}
         {/* <TagEditor /> */}

        </div>
    )
}