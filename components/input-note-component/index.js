
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faArrowsRotate, faClose } from "@fortawesome/free-solid-svg-icons"

// importing custom module styles
import styles from './index.module.css'
import { useState, useId, useEffect } from "react"

// custom components
import { TagEditor } from './tag-editor'

export default function InputNote(props) {

    const ids = {
        titleEditor: useId(),
        bodyEditor: useId()
    };


    // new note content
    const [noteContent, setNoteContent] = useState({ title: "", body: "" })

    const [isBeingEdited, setIsBeingEdited] = useState({
        title: false,
        body: false,
        tags: false
    })

    useEffect(() => {
        console.log("title: ", ids.titleEditor)
        console.log("body: ", ids.bodyEditor)

    }, [])

    // was the note submited added ? 
    const [isNoteAdded, setNoteAdded] = useState(false);

    // // what was the response of the backend to the note?
    // const [noteResponse, setNoteResponse] = useState({});



    // list of tags
    const [tagList, setTagList] = useState([]);

    const onTitleChange = (e) => {


        setNoteContent((prev) => {
            return { ...prev, title: e.target.innerText }
        })

        // e.target.innerText seems to work better than noteContent.body
        if (isBeingEdited.title == false && e.target.innerText != '') {

            setIsBeingEdited((prev) => {
                return { ...prev, title: true };
            })

        } else if (e.target.innerText == '') {

            setIsBeingEdited((prev) => {
                return { ...prev, title: false };
            })

        }

    }

    const onBodyChange = (e) => {

        setNoteContent((prev) => {
            return { ...prev, body: e.target.innerText }
        })

        // e.target.innerText seems to work better than noteContent.body
        if (isBeingEdited.body == false && e.target.innerText != '') {

            setIsBeingEdited((prev) => {
                return { ...prev, body: true };
            })

        } else if (e.target.innerText == '') {

            setIsBeingEdited((prev) => {
                return { ...prev, body: false };
            })

        }

    }

    const submitNewNote = (e) => {
        e.preventDefault()

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("title", noteContent.title);
        urlencoded.append("body", noteContent.body);
        urlencoded.append("tags", JSON.stringify(tagList))

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

                    // reset form states
                    setNoteContent({ title: "", body: "" })

                    setTagList([])

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
        <div className={`p-4 border rounded-lg`}>
            <form action="/notes" method="POST" onSubmit={submitNewNote}>
                <div className={`flex flex-col gap-4`}>

                    <div className={`flex flex-col text-lg font-medium`}>

                        {!isBeingEdited.title &&
                            <div className={`absolute text-gray-400 `}>Title</div>
                        }

                        {/* <input onChange={onTitleChange} className={styles.titleInput} name="title" type="text" value={noteContent.title} placeholder="Title here" /> */}
                        <div
                            id={ids.titleEditor}

                            onInput={onTitleChange}

                            contentEditable={true}

                            suppressContentEditableWarning={true}

                            name="title"

                            className={`z-10 font-text`}></div>
                    </div>

                    <div className={'flex flex-col text-base font-normal'}>
                        {/* <textarea onChange={onBodyChange} className={styles.bodyInput} name="body" value={noteContent.body} placeholder="Take a note" /> */}
                        {/* body editor placeholder */}

                        {!isBeingEdited.body &&
                            <div className={` absolute text-gray-400`}>
                                Take a note
                            </div>
                        }

                        <div id={ids.bodyEditor} contentEditable={true} suppressContentEditableWarning={true} onInput={onBodyChange} name={"body"} className={`z-10 font-text`}>
                        </div>
                    </div>

                    <div>
                        <TagEditor tagList={tagList} setTagList={setTagList} mode={true} />
                    </div>

                    <div className={styles.buttonContainer}>
                        <button type="submit" className={`bg-indigo-700 text-gray-100 hover:bg-sky-700`}><FontAwesomeIcon icon={faPlus} /></button>
                        <button type="button"><FontAwesomeIcon icon={faArrowsRotate} /></button>

                        <div className={styles.alertContainer}>

                        </div>
                    </div>
                </div>

            </form>

        </div>
    )
}