import styles from './Video.module.css'; 

export function Dashboard() {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.videoList}></div>
      <div className={styles.header}></div>
      <div className={styles.video1}></div>
      <div className={styles.video2}></div>
      <div className={styles.result}></div>
    </div>
  );
}
