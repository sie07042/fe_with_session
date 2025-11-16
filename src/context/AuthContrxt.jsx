import { useState, useEffect} from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";





function AuthProvider({children}){


    const checkSession = async() => {
        try{
            const response = await axios.get(
                "/api/users/session",
                {
                    withCredentials:true,
                }
            );
            if (response.data.status === "success"){
                // 응답 구조에 따라 data 또는 content 사용
                const userData = response.data.data || response.data.content;
                if(userData)
                    setUser(userData);
                else
                    setUser(null);
            } else{
                setUser(null);
            }
        } catch{
            setUser(null);
        }
    };

    const [user, setUser] = useState(null);


    useEffect(()=> {
        // 처리할 함수
        checkSession();
    }, []); // 이벤트를 빈 배열로 두며 AuthProvider가 처음 실행될때 이벤트가 발생한다




    function login(userInfo){
        setUser(userInfo);
    }

    async function logout(){
        try{
            await axios.post(
                "/api/user/logout",
                {},
                {
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    withCredentials:true,
                }
            );
        } catch{
            // 로그아웃 실패해도 계속 진행
        } finally {
            // 로그아웃 요청 성공/실패와 관계없이 사용자 상태 초기화
            setUser(null);
        }
    }   //Logout

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}


export default AuthProvider;