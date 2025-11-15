//react 패키지로부터 StrictMode를 가져온다.
import { StrictMode } from 'react'
//react-dom/client 패키지로부터 createRoot라는  가져온다.
import { createRoot } from 'react-dom/client'
//index.css 파일을 가져온다.
import { BrowserRouter } from 'react-router-dom'
import './index.css'
//App.jsx 파일을 가져온다.
import App from './App.jsx' //App 컴포넌트를 가져온다.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App /> {/* App 컴포넌트를 렌더링한다. */}
    </BrowserRouter>
  </StrictMode>,
)
