import { useSelector, useDispatch  } from "react-redux";
import { List, Avatar } from 'antd';
import { Video } from "./Video";
import { videoListSelector, videoListStatus, getVideos } from "./videoSlice";
import { useEffect } from "react";


export function VideoList() {
  const dispatch = useDispatch();

  const videoList = useSelector(videoListSelector);
  const videoStatus = useSelector(videoListStatus);

  useEffect(() => {
    console.log(videoStatus)
    if (videoStatus === 'idle') {
      console.log('fetch')
      dispatch(getVideos())
    }
  }, [videoStatus, dispatch]);

  return (
    <List
      itemLayout="horizontal"
      dataSource={videoList}
      // loading={videoStatus}
      renderItem={item => (
        <Video video={item}/>
      )}
    />
  );
}