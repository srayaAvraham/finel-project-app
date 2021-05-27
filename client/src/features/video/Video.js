import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentVideo} from "./videoSlice";

const { Meta } = Card;

export const Video = ({video}) => {
  const dispatch = useDispatch();

  const handleClick = (id) => {
      dispatch(setCurrentVideo(id))
  }

    return (
        <Card
        onClick={() => {handleClick(video._id)}}
        style={{ width: '50%', height: '50%' }}
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
          title="Card title"
          description="This is the description"
        />
      </Card>
    )
}
