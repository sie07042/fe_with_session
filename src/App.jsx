//react 패키지로부터 useState 함수를 가져온다.
import { useState, useEffect } from 'react'
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import axios from 'axios'

import './App.css'

// axios 기본 설정: 쿠키를 포함하여 요청 전송
axios.defaults.withCredentials = true;

function App() {
  // state를 정의하고 초기화한다.
  // const [count, setCount] = useState(0) //count라는 상태를 정의하고 초기값을 0으로 설정한다.
  
  // 상태 정의하기
  //const [상태명, 상태를 변경하는 함수] = useState(초기값);

// 상태(state)의 특징
// 상태값이 변경되면 페이지의 컴포넌트가 다시 렌더링된다.

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    try {
      // 서버 세션에서 사용자 정보 가져오기
      const response = await axios.get('/api/users/session', {
        withCredentials: true
      });
      console.log('세션 정보 조회 성공:', response.data);
      
      // 응답 구조: { status, message, content: { id, email, nick_name } }
      if (response.data && response.data.status === 'success' && response.data.content) {
        const content = response.data.content;
        const userData = {
          id: content.id,
          nick_name: content.nick_name,
          email: content.email
        };
        console.log('사용자 데이터 설정:', userData);
        setUser(userData);
      } else {
        console.log('세션 정보 없음: content가 없거나 status가 success가 아님');
        setUser(null);
      }
    } catch (error) {
      console.log('세션 정보 없음 또는 오류:', error.response?.status);
      setUser(null);
    }
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 또는 location 변경 시 사용자 정보 로드
    console.log('Home 컴포넌트 useEffect 실행, location:', location.pathname);
    loadUser();

    // 커스텀 이벤트 리스너 추가 (같은 탭에서의 변경 감지)
    const handleUserUpdate = () => {
      console.log('userUpdated 이벤트 수신');
      loadUser();
    };
    window.addEventListener('userUpdated', handleUserUpdate);

    return () => {
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청 (선택사항)
      await axios.post('/api/users/logout', {}, {
        withCredentials: true
      }).catch(() => {
        // 로그아웃 엔드포인트가 없어도 무시
      });
    } catch (error) {
      // 로그아웃 실패해도 계속 진행
      console.log('로그아웃 요청 실패:', error);
    }
    
    setUser(null);
    // 사용자 정보 업데이트 이벤트 발생
    window.dispatchEvent(new Event('userUpdated'));
  };

  return (
    <>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        gap: '20px'
      }}>
        {user ? (
          <>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
              환영합니다, {user.nick_name}님!
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
              로그인되어 있습니다.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button 
                onClick={() => navigate('/signup')}
                style={{
                  padding: '12px 30px',
                  fontSize: '1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
              >
                회원가입
              </button>
              <button 
                onClick={handleLogout}
                style={{
                  padding: '12px 30px',
                  fontSize: '1rem',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
              >
                로그아웃
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
              환영합니다!
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
              로그인하거나 회원가입을 진행해주세요.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button 
                onClick={() => navigate('/login')}
                style={{
                  padding: '12px 30px',
                  fontSize: '1rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
              >
                로그인
              </button>
              <button 
                onClick={() => navigate('/signup')}
                style={{
                  padding: '12px 30px',
                  fontSize: '1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
              >
                회원가입
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App
