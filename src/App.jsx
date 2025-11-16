//react 패키지로부터 useState 함수를 가져온다.
import {Routes, Route, useLocation} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Nav from './pages/Nav'
import axios from 'axios'
import AuthProvider from './context/AuthContrxt.jsx'
import useAuth from "./hooks/useAuth.js"

import './App.css'

// axios 기본 설정: 쿠키를 포함하여 요청 전송
axios.defaults.withCredentials = true;

// 상태(state)의 특징
// 상태값이 변경되면 페이지의 컴포넌트가 다시 렌더링된다.

function Home() {
  // const {user, login, logout} = useAuth();

  // if (user) {
  //   // 유저 정보가 있다는 것은 로그인된 상황이다.
  //   return(
  //   <>
  //     <div className='home-container'>
  //       <p>
  //         <strong>{user.nick_name}</strong>님, 반갑습니다.
  //       </p>

  //       <button
  //         onClick={login}
  //         className='px-5 py-2 bg-red-200 rounded-md'
  //       >
  //         로그인
  //       </button>
  //       <button
  //         onClick={logout}
  //         className='px-5 py-2 bg-red-200 rounded-md'
  //       >
  //         로그아웃
  //       </button>

  //     </div>
  //   </>
  //   );
  // }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: 'calc(100vh - 80px)',
      gap: '20px',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
        환영합니다!
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
        홈페이지에 오신 것을 환영합니다.
      </p>
    </div>
  )
}

function Product() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: 'calc(100vh - 80px)',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Product</h1>
      <p style={{ fontSize: '1.2rem' }}>제품 페이지입니다.</p>
    </div>
  )
}

function Service() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: 'calc(100vh - 80px)',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Service</h1>
      <p style={{ fontSize: '1.2rem' }}>서비스 페이지입니다.</p>
    </div>
  )
}

function About() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: 'calc(100vh - 80px)',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>About</h1>
      <p style={{ fontSize: '1.2rem' }}>회사 소개 페이지입니다.</p>
    </div>
  )
}

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <AuthProvider>
      {!hideNavbar && <Nav />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Product />} />
        <Route path='/service' element={<Service />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
