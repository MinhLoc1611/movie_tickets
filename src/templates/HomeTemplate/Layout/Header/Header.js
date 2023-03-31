import React from 'react'
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App'
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash'
import { TOKEN, USER_LOGIN } from '../../../../util/settings/confis';

export default function Header() {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

    const { t, i18n } = useTranslation();

    const handleChange = (value) => {
        i18n.changeLanguage(value)
    }

    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <>
                <button onClick={() => {
                    history.push('/login')
                }} className="self-center px-8 py-3 rounded"> {t('signin')} </button>
                <button onClick={() => {
                    history.push('/register')
                }} className="self-center px-8 py-3 font-semibold rounded bg-violet-400 text-gray-900 mr-2"> {t('signup')} </button>
            </>
        }

        return <>
            <button onClick={() => {
                history.push('/profile')
            }} className="self-center px-8 py-3 rounded">{userLogin.taiKhoan}</button>
            <button onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN);
                history.push('/home');
                window.location.reload();
            }} className="text-yellow-500 mr-5">{t('logout')}</button>
        </>
    }

    return (
        <header className="p-4 bg-black/50 text-white fixed w-full z-10">
            <div className="container flex justify-between h-16 mx-auto">
                <NavLink to="/" className="flex items-center p-2">
                    <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt='cyberlearn.vn' />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink activeClassName='border-b-white border-2' to='/home' className="flex items-center px-4 -mb-1 border-b-2 border-transparent ">
                        {t('home')}
                        </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink activeClassName='border-b-white border-2' to='/contact' className="flex items-center px-4 -mb-1 border-b-2 border-transparent ">
                        {t('contact')}
                        </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink activeClassName='border-b-white border-2' to='/news' className="flex items-center px-4 -mb-1 border-b-2 border-transparent ">
                        {t('news')}
                        </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink activeClassName='border-b-white border-2' to='/admin/users' className="flex items-center px-4 -mb-1 border-b-2 border-transparent ">
                        Admin
                        </NavLink>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderLogin()}
                    <Select
                        defaultValue="en"
                        style={{
                            width: 90,
                        }}
                        onChange={handleChange}
                        options={[
                            {
                                value: 'en',
                                label: 'Eng',
                            },
                            {
                                value: 'chi',
                                label: 'Chi',
                            },
                            {
                                value: 'vi',
                                label: 'Vi',
                            }
                        ]}
                    >
                    </Select>
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>

    )
}
