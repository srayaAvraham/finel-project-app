import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentVideo, getPatientVideo} from "./videoSlice";
import { userSelector } from "../../features/user/userSlice";
import { useEffect } from 'react';
const { Meta } = Card;

export const Video = ({video}) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  useEffect(() => {

      dispatch(getPatientVideo({id:video._id, userId: user.id }))
    },[])

  const handleClick = (id) => {
      dispatch(setCurrentVideo(id))
      dispatch(getPatientVideo({id, userId: user.id }))
  }


    return (
        <Card
        onClick={() => {handleClick(video._id)}}
        style={{ width: '90%', height: '50%', margin: "auto", marginBottom: 15 }}
        cover={
          <img
          // style={{ width: '80%', }}
            alt="example"
            src={video.thumbnail}
          />
        }
      >
        <Meta
        //   avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={video.title}
          description={video.description}
        />
      </Card>
    )
}
