import { withFormik } from 'formik';
import React from 'react'
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom'
import * as Yup from 'yup';
import { history } from '../../App';
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID, USER_LOGIN } from '../../util/settings/confis';

function Register(props) {

    const {
        errors,
        handleChange,
        handleSubmit,
    } = props;

    if (localStorage.getItem(USER_LOGIN)) {
        return <Redirect to='/' />
    }

    return (
        <div className="lg:w-1/2 xl:max-w-screen-sm">
            <div className="pt-2 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
                <div onClick={()=>{
                    history.push('/home')
                }} className="cursor-pointer flex items-center">
                    <div>
                        <svg className="w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 225 225" style={{ enableBackground: 'new 0 0 225 225' }} xmlSpace="preserve">
                            <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n                                    .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                " }} />
                            <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                                <g>
                                    <path id="Layer0_0_1_STROKES" className="st0" d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">Cyberlearn</div>
                </div>
            </div>
            <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-12 xl:px-24 xl:max-w-2xl">
                <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold">Đăng Ký</h2>
                <div className="mt-12">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Tài khoản</div>
                            <input name='taiKhoan' onChange={handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập vào tài khoản" />
                            <div className='text-red-500'>{errors.taiKhoan}</div>
                        </div>
                        <div className="mt-2">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    Mật khẩu
                                </div>
                            </div>
                            <input name='matKhau' onChange={handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='password' placeholder="Nhập vào mật khẩu" />
                            <div className='text-red-500'>{errors.matKhau}</div>
                        </div>
                        <div className="mt-2">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    Email
                                </div>
                            </div>
                            <input name='email' onChange={handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='email' placeholder="Nhập vào email" />
                            <div className='text-red-500'>{errors.email}</div>
                        </div>
                        <div className="mt-2">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    Họ tên
                                </div>
                            </div>
                            <input name='hoTen' onChange={handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='text' placeholder="Nhập vào họ tên" />
                            <div className='text-red-500'>{errors.hoTen}</div>
                        </div>
                        <div className="mt-2">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    Số điện thoại
                                </div>
                            </div>
                            <input name='soDt' onChange={handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='number' placeholder="Nhập vào số điện thoại" />
                            <div className='text-red-500'>{errors.soDt}</div>
                        </div>
                        <div className="mt-10">
                            <button type='submit' className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg">
                                Đăng ký
                            </button>
                            <div className="mt-8 text-sm font-display font-semibold text-gray-700 text-center">
                                Bạn đã có tài khoản ? <NavLink to='/login' className="cursor-pointer text-indigo-600 hover:text-indigo-800">Đăng nhập</NavLink>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const RegisterWithFormik = withFormik({
    mapPropsToValues: () => ({
        taiKhoan:'',
        matKhau: '',
        email: '',
        hoTen:'',
        maNhom:GROUPID,
        soDt:''
    }),
    validationSchema: Yup.object().shape({
        taiKhoan:Yup.string().required('Tài khoản không được bỏ trống !').max(32, 'Tài khoản tối đa 32 ký tự'),
        email: Yup.string().required('Email không được bỏ trống !').email('email không hợp lệ !'),
        matKhau: Yup.string().min(6, 'Mật khẩu tối thiểu 6 ký tự').max(32, 'Mật khẩu tối đa 32 ký tự'),
        hoTen:Yup.string().required('Họ tên không được bỏ trống !').max(32, 'Họ tên tối đa 32 ký tự'),
        soDt:Yup.string().min(9, 'Số điện thoại tối thiểu 9 số').max(11, 'Số điện thoại tối đa 11 số'),
    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        setSubmitting(true)
        props.dispatch(dangKyAction(values))
    },

    displayName: 'Register movie',
})(Register);

export default connect()(RegisterWithFormik);