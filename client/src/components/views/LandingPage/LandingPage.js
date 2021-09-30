// 첫 페이지
import React,{useEffect} from 'react';
import axios from 'axios';
import { withRouter} from 'react-router-dom'

function LandingPage(props) {
// 랜딩 페이지에 들어오자 마자 useEffect 함수를 실행하겠다는 이야기.
    useEffect(()=>{
        axios.get('/api/hello')
        // get Request를 서버로 보낸다. 
        // end point는 /api/hello
        .then(response => console.log(response.data))
        // 서버에서 돌아오면 응답을 콘솔창에 띄운다.

        // 서버는 5000포트, 클라이언트는 3000포트를 가지는 형식이 되는데,
        // 이렇게 할 경우 두개의 다른 포트를 가지고 있다 하여 Cors 정책(Cross-Origin Resource Sharing)에 의거하여 Request를 보낼 수 없게 된다.
        // 쉽게 설명하면 서버와 클라이언트는 오리진이 되는데, 각 포트가 다른 오리진들끼리는 기본적으로는 주고받기를 할 수 없게 해 놓은 것이다. 
        // 이는 즉, 보안을 위한 것이다.

        // 상호 조건을 달아주면 해결이 가능하다.
        // 혹은 Proxy

        // proxy란?
        // 클라이언트 <-> 프록시 <-> 인터넷
        // 방화벽, 웹필터, 캐쉬데이터, 공유데이터 제공 기능.
        // 1. 아이피를 Proxy Server에서 임의로 바꿔버릴 수 있다. 그래서 인터넷에서 접근하는 사람의 IP를 모르게 한다.
        // 2. 보내는 데이터도 임의로 바꿀 수 있다.
        
        // >> 사용 이유
        // 1. 회사에서 직원들이나, 집안에서 아이들 인터넷 사용 제어,
        // 2. 캐쉬를 이용해 더 빠른 인터넷 이용 제공
        // 3. 더 나은 보안 제공
        // 4. 이용 제한된 사이트 접근 가능.

    },[])

    const onClickHandler =() =>{
        axios.get('/api/users/logout')
        .then(response =>{
            if(response.data.success){
                props.history.push("/login")
            }else{
                alert('로그아웃 하는데 실패했습니다.')
            }
        })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>


            <button onClick={onClickHandler}> 
                로그아웃
            </button>
        </div>
    );
}

export default withRouter(LandingPage);