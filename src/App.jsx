import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
function App() {  
  // 토큰이 있는지 확인하여 페이지 결정
  const token = localStorage.getItem('token');
  return (
    <>
      <div>
        {token ? <TodoPage /> : <LoginPage />}
      </div>
    </>
  )
}

export default App
