
import { Layout, Menu } from 'antd';
import { UploadOutlined,StockOutlined,NodeIndexOutlined} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { setWidgets} from "../redux/reducers/widgets.reducer";
import { useState } from 'react';


const { Header, Sider, Content } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const premièreWidget =() => {
    dispatch(setWidgets());
}

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"  onClick={toggle}>
        <img
            src="/SIG_Logo1.png"  // Adjust the path based on the location of your image
            alt="Logo"
            style={{ width: '100%' }}
          />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" onClick={premièreWidget}>
            <NodeIndexOutlined />
            <span>Affaire</span>
          </Menu.Item>
          <Menu.Item key="2">
            <StockOutlined />
            <span>Statistique</span>
          </Menu.Item>
          <Menu.Item key="3">
            <UploadOutlined />
            <span>Cotation</span>
          </Menu.Item>
        </Menu>
      </Sider>
      
    </Layout>
  );
};


export default Sidebar;