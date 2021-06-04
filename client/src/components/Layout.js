import { Layout, Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { VideoList } from '../features/video/VideoList';
import { UploadModal } from './UploadModal';
import { useState } from 'react';
import { Expert } from '../features/video/Expert';
import { Patient } from '../features/video/Patient';

const { Header, Content, Footer, Sider } = Layout;
export const MyLayout = () => {
  const [visible, setVisible] = useState(false);



  const onCollapse = collapsed => {
    console.log(collapsed);

  };
  return (
    <Layout>
      <Sider fo onCollapse={onCollapse}
        width='300'
        style={{
          margin: 'auto',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="logo" />
        <VideoList />
        <Button
        size='large'
        type="primary"
        icon={<UploadOutlined/>}
        onClick={() => {
          setVisible(true);
        }}
        style={
          {
            position: 'fixed',
            width: '300px',
            bottom: 0,
          }}
      >
        Upload
      </Button>
      <UploadModal
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      />
        {/* <UploadModal styleButton={
          {
            position: 'fixed',
            width: '300px',
            bottom: 0,
          }
        } /> */}
        {/* <Button type="primary"  size={'large'} style={}>
      Primary
    </Button> */}
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '10px auto', overflow: 'initial', width: "90%" ,}}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center', margin: '10px auto', display: "flex", flexWrap: "wrap" }}>
            <div style={{ width: "50%"}}>
            <Expert/>
            </div>
            <div style={{ width: "50%"}}>
            <Patient/>
            </div>
          <br />
        
        </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </Layout>
  )
};
