import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { USER_LOGIN } from "../../util/settings/confis";


export const CheckoutTemplate = (props) =>{

    const {Component,...restProps} = props;

    useEffect(()=>{
        window.scrollTo(0,0)
    })

    if(!localStorage.getItem(USER_LOGIN)){
        return <Redirect to='/login'/>
    }

    return <Route {...restProps} render ={(propsRoute)=>{
        return <>
            <Component {...propsRoute}/>
        </>
    }} />

}

