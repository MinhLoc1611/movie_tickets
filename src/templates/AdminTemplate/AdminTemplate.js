import { useEffect, useState } from "react";
import { Redirect, Route, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { TOKEN, USER_LOGIN } from "../../util/settings/confis";
import { notifiFunction } from "../../util/Notification/notifiMovie";
import { FileOutlined, UserOutlined, FileAddOutlined, UserAddOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {history} from '../../App'
import _ from "lodash";

const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Users', '1', <UserOutlined />, [
        getItem((<NavLink to='/admin/users'>Users</NavLink>),'5',<UserOutlined />),
        getItem((<NavLink to='/admin/users/adduser'>Add User</NavLink>),'6',<UserAddOutlined />)
    ]),
    getItem('Films', '2', <FileOutlined />, [
        getItem((<NavLink to='/admin/films'>Films</NavLink>), '3',<FileOutlined />),
        getItem((<NavLink to='/admin/films/addnew'>Add new</NavLink>), '4',<FileAddOutlined/>)
    ])
];

export const AdminTemplate = (props) => {
    const { Component, ...restProps } = props;
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    if (!localStorage.getItem(USER_LOGIN)) {
        notifiFunction('warning','Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />
    }

    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        notifiFunction('warning','Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />

    }

    const operations = <>
        {!_.isEmpty(userLogin) ? <> <button onClick={() => {
            history.push('/profile')
        }}> <div style={{ width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="text-2xl uppercase mr-3 rounded-full bg-red-200">{userLogin.taiKhoan.substr(0, 1)}</div></button> <button onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            history.push('/home');
            window.location.reload();
        }} className="text-blue-800">Đăng xuất</button> </> : ''}
    </>

    return <Route {...restProps} render={(propsRoute) => {
        return <>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div onClick={()=>{
                         history.push('/home')
                    }} className="logo p-5 cursor-pointer">
                        <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="..." />
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                </Sider>
                <Layout className="site-layout">
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <div className="text-right pr-10 pt-1">{operations}</div>
                    </Header>
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >
                        <Breadcrumb
                            style={{
                                margin: '16px 0',
                            }}
                        >
                        </Breadcrumb>
                        <div
                            style={{
                                padding: 24,
                                minHeight: '85vh',
                                background: colorBgContainer,
                            }}
                        >
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                </Layout>
            </Layout>

        </>
    }} />
}