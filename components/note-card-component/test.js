import { useState } from "react"

export default function sampleCard(){
    const [content, setContent] = useState({title: "default title", body: "default body"})
    return (<>hello test</>)
}