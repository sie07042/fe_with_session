import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        minWidth: '900px',
        padding: '1rem 4rem',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        boxSizing: 'border-box'
      }}
    >
      {/* -------- 왼쪽 메뉴 -------- */}
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
          whiteSpace: 'nowrap'
        }}
      >
        <div
          onClick={() => navigate('/')}
          style={{
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            color: location.pathname === '/' ? '#007bff' : '#333'
          }}
        >
          Home
        </div>

        <div
          onClick={() => navigate('/product')}
          style={{
            cursor: 'pointer',
            color: location.pathname === '/product' ? '#007bff' : '#333',
            transition: 'color 0.3s'
          }}
          onMouseOver={(e) => (e.target.style.color = '#007bff')}
          onMouseOut={(e) =>
            (e.target.style.color =
              location.pathname === '/product' ? '#007bff' : '#333')
          }
        >
          Product
        </div>

        <div
          onClick={() => navigate('/service')}
          style={{
            cursor: 'pointer',
            color: location.pathname === '/service' ? '#007bff' : '#333',
            transition: 'color 0.3s'
          }}
          onMouseOver={(e) => (e.target.style.color = '#007bff')}
          onMouseOut={(e) =>
            (e.target.style.color =
              location.pathname === '/service' ? '#007bff' : '#333')
          }
        >
          Service
        </div>

        <div
          onClick={() => navigate('/about')}
          style={{
            cursor: 'pointer',
            color: location.pathname === '/about' ? '#007bff' : '#333',
            transition: 'color 0.3s'
          }}
          onMouseOver={(e) => (e.target.style.color = '#007bff')}
          onMouseOut={(e) =>
            (e.target.style.color =
              location.pathname === '/about' ? '#007bff' : '#333')
          }
        >
          About
        </div>
      </div>

      {/* -------- 오른쪽 로그인/사용자정보 -------- */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          whiteSpace: 'nowrap'
        }}
      >
        {user ? (
          <>
            <span style={{ fontSize: '0.9rem', color: '#666' }}>
              {user.nick_name}님, 환영합니다
            </span>

            <button
              onClick={() => navigate('/signup')}
              style={{
                padding: '8px 16px',
                fontSize: '0.9rem',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
            >
              회원가입
            </button>

            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              style={{
                padding: '8px 16px',
                fontSize: '0.9rem',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#c82333')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#dc3545')}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '8px 16px',
                fontSize: '0.9rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
            >
              로그인
            </button>

            <button
              onClick={() => navigate('/signup')}
              style={{
                padding: '8px 16px',
                fontSize: '0.9rem',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;

