import { useState, useEffect, useId } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from './tag-editor.module.css'

// expects a props.mode = 1 or 0
// 1 for editing, 0 for displaying
function TagEditor(props) {

    // localCopy of the tagList to fix display issues
    const [localTagList, setLocalTagList] = useState([])

    useEffect(() => { setLocalTagList(props.tagList) }, [])

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
        setLocalTagList((prev) => {

            let indexOfTagContent = prev.findIndex((value) => { return value == tagContent });
            prev[indexOfTagContent] = 'x';

            // console.log(prev)

            return prev;
        })

    }

    return (
        <div className={``}>

            <div className={` flex flex-row ${localTagList.length > 0 && 'gap-2'} items-center`}>
                {/* tags */}
                <div className={`${styles.tagListContainer} flex flex-row gap-2`} >

                    {localTagList && localTagList.map((tag, index) => {
                        return (
                            tag != "x" && <TagComponent key={index} content={tag} onDelete={onTagDelete} />
                        );
                    })}

                </div>

                {props.mode &&
                    <div className={``}>

                        <input
                            className={`w-24 placeholder-gray-400`}
                            type={"text"} onChange={onTagChange} 
                            value={currentTagContent} 
                            placeholder={"Add Tag ..."} 
                            onKeyDown={onKeyDown}
                        />

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
        <div onMouseOver={onMouseOver} onMouseOut={onMouseOut}
            className={` ${styles.tagComponent} group flex px-4 h-8 cursor-pointer hover:pl-2 hover:pr-6 bg-indigo-100 relative rounded-full transition-all text-sm  items-center not-italic`}
        >
            <div className={` font-ui`}>
                {tagContent}
            </div>


            {shouldShowButton &&
                <div className={`${styles.tagButtonContainer} absolute h-6 flex justify-center items-center right-0.5`}>
                    <button onClick={() => { props.onDelete(tagContent) }} className={` bg-opacity-50 rounded-full w-5 h-5 transition-all hover:text-red-600 hover:bg-purple-100 flex justify-center items-center`} >
                        <FontAwesomeIcon icon={faClose} className={` text-sm leading-none`} />
                    </button>
                </div>
            }


        </div>
    )
}



export { TagEditor, TagComponent }