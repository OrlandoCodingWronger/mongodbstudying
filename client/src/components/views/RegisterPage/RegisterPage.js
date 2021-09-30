import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter} from 'react-router-dom'

function RegisterPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault(); // 페이지의 리프레쉬를 방지하는 코드.

        if(Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }
        // 디스패치를 이용하여 액션을 날린다.
        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success){
                    props.history.push("/login")
                }else{
                    alert("Failed to sign up!")
                }
            })

      
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>

            <form style={{ display:"flex", flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >
                <lable>Email</lable>
                <input type="email" value={Email} onChange={onEmailHandler} />
                
                <lable>Name</lable>
                <input type="text" value={Name} onChange={onNameHandler} />
                
                <lable>Password</lable>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <lable>Confirm Password</lable>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button type="submit">
                    회원 가입
                </button>


            </form>
        
        </div>
    );
}

export default withRouter(RegisterPage);