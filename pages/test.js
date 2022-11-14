import { useState } from "react"

import {TagEditor} from "../components/input-note-component/tag-editor"


import styles from './index.module.css'

export default function sampleCard(){
    const [content, setContent] = useState({title: "default title", body: "default body"})
    return (
    <> 
    <div className={styles.test}>
        <div>
            left
        </div>
        <div>
            main
        </div>

        <div>
            left
        </div>
        <div>
            main
        </div>
    </div>
       
    </>)
}