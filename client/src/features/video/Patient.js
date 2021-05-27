import { useSelector } from 'react-redux';
import { Player } from './Player';
import { UploadVideo } from './Upload';
import { currentVideo } from './videoSlice';

export const Patient = () => {
    const current = useSelector(currentVideo);
    return (
            <UploadVideo/>
            // <Player url={current.filePath}/>
    )
}