import { useState } from "react"

import {TagEditor} from "../components/input-note-component/tag-editor"

export default function sampleCard(){
    const [content, setContent] = useState({title: "default title", body: "default body"})
    return (
    <> 
    <TagEditor />
    
    
    </>)
}