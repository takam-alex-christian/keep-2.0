import { useState, useEffect, useId } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import styles from './tag-editor.module.css'


function TagEditor() {

    const inputId = useId()

    //input tags 
    const [tagList, setTagList] = useState(['hello', 'sample'])

    // tag input field state
    const [currentTagContent, setCurrentTagContent] = useState("")

    const onTagInput = (e) => {
        setCurrentTagContent(e.target.value);
    }

    const onFormSubmit = (e) => {

        e.preventDefault();

        setTagList((prev) => {
            return [...prev, currentTagContent]
        })

        setCurrentTagContent("")

    }

    return (
        <div className={``}>

            <div className={` ${styles.tagEditorContainer}`}>
                {/* tags */}
                <div className={styles.tagListContainer}>

                    {tagList.length > 0 && tagList.map((eachTag, index) => {
                        return (
                            <TagComponent key={index} content={eachTag} />
                        );
                    })}

                </div>


                <div className={` ${styles.tagInputContainer}`}>
                    {/* the place holder */}
                    <form onSubmit={onFormSubmit}>

                        <input id={inputId} className={`${styles.tagInputField}`} type={"text"} onInput={onTagInput} value={currentTagContent} placeholder={"Add Tag ..."} />

                    </form>
                </div>

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



export {TagEditor, TagComponent}