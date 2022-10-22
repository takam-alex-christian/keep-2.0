
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faArrowsRotate } from "@fortawesome/free-solid-svg-icons"

// importing custom module styles
import styles from './index.module.css'

export default function InputNote() {
    return (
        <div className={styles.inputNoteContainer}>
            <form action="/add" method="POST">
                <div className={styles.formContainer}>
                    
                    <div className={styles.titleContainer}>
                        <input className={styles.titleInput} type="text" />
                    </div>

                    <div className={styles.bodyContainer}>
                        <textarea className={styles.bodyInput} />
                    </div>

                    <div className={styles.buttonContainer}>
                        <button type="submit"><FontAwesomeIcon icon={faPlus} /></button>
                        <button type="button"><FontAwesomeIcon icon={faArrowsRotate} /></button>
                        
                        <div className={styles.alertContainer}>
                            
                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}