import { useState } from "react"

import {TagEditor} from "../components/input-note-component/tag-editor"

export default function sampleCard(){
    const [content, setContent] = useState({title: "default title", body: "default body"})
    return (
    <> 
        <textarea onInput={(e)=>{
            console.log("simple height: ", e.target.scrollHeight);
            e.target.style.height = e.target.scrollHeight;
        }} style={{'height': 'auto'}} >

        </textarea>
    </>)
}