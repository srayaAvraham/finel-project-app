import { useSelector } from 'react-redux';
import { currentVideo } from './videoSlice';
import styles from './Video.module.css';
import { Player } from './Player';

export const Expert = ({ url }) => {
    const current = useSelector(currentVideo);
    return (
            <Player url={current.videoPath} />
    )
}