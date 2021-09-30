import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from '../_actions/user_action';

// eslint-disable-next-line import/no-anonymous-default-export
export default function(SpecificComponent, option, adminRoute = null){
    // option 파라미터 설명.
    // null => 아무나 출입이 가능함
    // true => 로그인한 유저만 출입이 가능
    // false => 로그인한 유저는 출입이 불가능한 페이지
    // adminRoute 항목에 true 할경우, 어드민 유저만 진입이 가능함.

    function AuthenticationCheck(props){

        const dispatch = useDispatch();

        useEffect(()=>{

            dispatch(auth()).then(response=>{
                console.log(response)

                // 로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login')
                    }
                }else{
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    }else{
                        if(option === false){
                            props.history.push('/')
                        }
                    }

                }

            })

        }, [])

        return (
            <SpecificComponent {...props} />
        )

    }

    return AuthenticationCheck
}