import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// axios 기본 설정: 쿠키를 포함하여 요청 전송
axios.defaults.withCredentials = true;

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: formData.email,
      password: formData.password
    };

    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', loginData, {
        withCredentials: true
      });
      console.log('로그인 성공:', response.data);
      
      alert('로그인에 성공했습니다!');
      navigate('/');
      
      // navigate 후에 이벤트 발생 (Home 컴포넌트가 마운트된 후)
      setTimeout(() => {
        window.dispatchEvent(new Event('userUpdated'));
      }, 200);
    } catch (error) {
      console.error('로그인 실패:', error.response || error);
      setErrorMessage(error.response?.data?.message || '로그인에 실패했습니다. 이메일과 패스워드를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px', textAlign: 'center' }}>
          로그인
        </h1>
        <form onSubmit={handleSubmit}>
          {/* 이메일 */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', textAlign: 'left' }}>
              이메일
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '1rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
              placeholder="이메일을 입력하세요"
            />
          </div>

          {/* 패스워드 */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', textAlign: 'left' }}>
              패스워드
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '1rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
              placeholder="패스워드를 입력하세요"
            />
          </div>

          {/* 에러 메시지 표시 */}
          {errorMessage && (
            <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>
              {errorMessage}
            </div>
          )}

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '10px',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#007bff')}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>

          {/* 취소 버튼 */}
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '1rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
          >
            취소
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

