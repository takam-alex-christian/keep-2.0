import { useState, useEffect, useId } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from './tag-editor.module.css'

// expects a props.mode = 1 or 0
// 1 for editing, 0 for displaying
function TagEditor(props) {

    // localCopy of the tagList to fix display issues
    const [localTagList, setLocalTagList] = useState([])
    
    useEffect(()=>{ setLocalTagList(props.tagList)}, [])

    // tag input field state
    // display this instead
    const [currentTagContent, setCurrentTagContent] = useState("")

    const onTagChange = (e) => {
        setCurrentTagContent(e.target.value);
    }

    const onKeyDown = (e) => {

        if (e.key.toLowerCase() == 'enter' || e.key.toLowerCase() == 'tab') {
            e.preventDefault()
            // for the parent component
            props.setTagList((prev) => {
                return [...prev, currentTagContent]
            })

            // for display through Array.prototype.map
            setLocalTagList((prev) => {
                prev.push(currentTagContent);
                return prev;
            })

            setCurrentTagContent("")
        }

    }

    const onTagDelete = (tagContent) => {

        let newArray = localTagList.filter((value) => {
            return value != tagContent
        })


        props.setTagList(newArray)

        // the display tagList
        // this is a temporary solution to changing array sizes due to the filter function
        setLocalTagList((prev)=>{
            
            let indexOfTagContent = prev.findIndex((value)=>{return value == tagContent});
            prev[indexOfTagContent] = 'x';

            // console.log(prev)

            return prev;
        })

    }

    return (
        <div className={``}>

            <div className={` ${styles.tagEditorContainer}`}>
                {/* tags */}
                <div className={styles.tagListContainer} >

                    {localTagList && localTagList.map((tag, index) => {
                        return (
                            tag != "x" && <TagComponent key={index} content={tag} onDelete={onTagDelete} />
                        );
                    })}

                    {/* {
                        useEffect(() => {
                            if (localTagList) {
                                localTagList.map((eachTag, index) => {
                                    return (
                                        <TagComponent key={index} content={eachTag} onDelete={onTagDelete} />
                                    );
                                })
                            }

                        }, [localTagList])
                    } */}

                </div>

                {props.mode &&
                    <div className={` ${styles.tagInputContainer}`}>
                        {/* the place holder */}
                        {/* <form onSubmit={onFormSubmit}> */}

                        <input className={`${styles.tagInputField}`} type={"text"} onChange={onTagChange} value={currentTagContent} placeholder={"Add Tag ..."} onKeyDown={onKeyDown} />
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

    // tag content
    const [tagContent, setTagContent] = useState(props.content)

    const onMouseOver = (e) => { setShouldShowButton(true); }

    const onMouseOut = (e) => { setShouldShowButton(false); }

    return (
        <div onMouseOver={onMouseOver} onMouseOut={onMouseOut} className={` ${styles.tagComponent}`}>

            {tagContent}

            {shouldShowButton &&
                <div className={`${styles.tagButtonContainer}`}>
                    <button onClick={() => { props.onDelete(tagContent) }} >
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
            }


        </div>
    )
}



export { TagEditor, TagComponent }