import { useSelector } from 'react-redux';
import { Player } from './Player';
import { UploadVideo } from './Upload';
import { currentVideo } from './videoSlice';

export const Patient = () => {
    const current = useSelector(currentVideo);
    const video =  current && current.patient ? 
        <Player url={current.patient.videoPath}/> :
        <UploadVideo/>
     console.log(current)
    return video;

    
}