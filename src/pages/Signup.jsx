import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// axios 기본 설정: 쿠키를 포함하여 요청 전송
axios.defaults.withCredentials = true;

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nick_name: ''
  });
  const [errorMessage, setErrorMessage] = useState(''); // 실패 메시지 상태
  const [loading, setLoading] = useState(false); // 로딩 상태

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrorMessage(''); // 입력할 때 에러 메시지 초기화
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 패스워드 확인 검증
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('패스워드가 일치하지 않습니다.');
      return;
    }

    const signupData = {
      email: formData.email,
      password: formData.password,
      nick_name: formData.nick_name
    };

    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', signupData);
      console.log('회원가입 성공:', response.data);
      alert('회원가입이 완료되었습니다!');
      navigate('/');
    } catch (error) {
      console.error('회원가입 실패:', error.response || error);
      setErrorMessage(error.response?.data?.message || '회원가입에 실패했습니다. 다시 시도해주세요.');
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
          회원가입
        </h1>
        <form onSubmit={handleSubmit}>
          {/* 이메일 */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold',textAlign: 'left' }}>이메일</label>
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
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold',textAlign: 'left' }}>패스워드</label>
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

          {/* 패스워드 확인 */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold',textAlign: 'left' }}>패스워드 확인</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
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
              placeholder="패스워드를 다시 입력하세요"
            />
          </div>

          {/* 사용자 이름 */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold',textAlign: 'left' }}>사용자이름</label>
            <input
              type="text"
              name="nick_name"
              value={formData.nick_name}
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
              placeholder="사용자이름을 입력하세요"
            />
          </div>

          {/* 에러 메시지 표시 */}
          {errorMessage && (
            <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>
              {errorMessage}
            </div>
          )}

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '1rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '10px',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#218838')}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#28a745')}
          >
            {loading ? '가입 중...' : '회원가입'}
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

export default Signup;
