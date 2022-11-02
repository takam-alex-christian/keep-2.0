import { useState, useEffect, useId } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from './tag-editor.module.css'

// expects a props.mode = 1 or 0
// 1 for editing, 0 for displaying
function TagEditor(props) {

    const inputId = useId()

    // tag input field state
    const [currentTagContent, setCurrentTagContent] = useState("")

    const onTagChange = (e) => {
        setCurrentTagContent(e.target.value);
    }

    const onKeyDown = (e) => {

        if (e.key.toLowerCase() == 'enter' || e.key.toLowerCase() == 'tab') {
            e.preventDefault()
            props.setTagList((prev) => {
                return [...prev, currentTagContent]
            })

            setCurrentTagContent("")
        }

    }

    return (
        <div className={``}>

            <div className={` ${styles.tagEditorContainer}`}>
                {/* tags */}
                <div className={styles.tagListContainer}>

                    {props.tagList && props.tagList.map((eachTag, index) => {
                        return (
                            <TagComponent key={index} content={eachTag} />
                        );
                    })}

                </div>

                {props.mode &&
                    <div className={` ${styles.tagInputContainer}`}>
                        {/* the place holder */}
                        {/* <form onSubmit={onFormSubmit}> */}

                        <input id={inputId} className={`${styles.tagInputField}`} type={"text"} onChange={onTagChange} value={currentTagContent} placeholder={"Add Tag ..."} onKeyDown={onKeyDown} />
                        {/* <button type={"submit"}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button> */}
                        {/* </form> */}
                    </div>
                }


                {/* tagEditor Button */}

            </div>
        </div>

    );
}



function TagComponent(props) {

    const [shouldShowButton, setShouldShowButton] = useState(false);


    const onMouseOver = (e) => { setShouldShowButton(true); }

    const onMouseOut = (e) => { setShouldShowButton(false); }

    return (
        <div onMouseOver={onMouseOver} onMouseOut={onMouseOut} className={` ${styles.tagComponent}`}>

            {props.content}
            {shouldShowButton &&
                <div className={`${styles.tagButtonContainer}`}>
                    <button>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
            }


        </div>
    )
}



export { TagEditor, TagComponent }