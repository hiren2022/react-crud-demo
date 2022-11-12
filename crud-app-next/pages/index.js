import styles from '../styles/Home.module.css'
import Users from "../Components/User/Users";

export default function Home() {
  return (
    <div className={styles.container}>
        <Users/>
    </div>
  )
}
