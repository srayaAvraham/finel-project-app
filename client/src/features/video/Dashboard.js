import { Expert } from './Expert';
import { Patient } from './Patient';
import styles from './Video.module.css'; 
import { VideoList } from './VideoList';

export function Dashboard() {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.videoList}><VideoList/></div>
      <div className={styles.header}>sdsd</div>
      <div className={styles.video1}><Expert/></div>
      <div className={styles.video2}><Patient/></div>
      <div className={styles.result}>sdc</div>
    </div>
  );
}
