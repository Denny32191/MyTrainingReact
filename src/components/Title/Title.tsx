import styles from "./TitleForm.module.scss"
interface TitleProps{
name : string
}


export const Title: React.FC <TitleProps> = ({
    name
}) => {
    return  (
        <div className={styles.text}>
            <h2 className={styles.name}>{name}</h2>
        </div>
    )
}

