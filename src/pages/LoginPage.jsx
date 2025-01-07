import { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://192.168.56.104:8000/api/token/', {
        username,
        password
      });
      localStorage.setItem('token', response.data.access);
      window.location.href = '/';
    } catch (error) {
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-md mx-4 border border-gray-100">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-10">
          로그인
        </h1>
        <form onSubmit={handleLogin} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              사용자명
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border border-gray-200 
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                placeholder-gray-400 transition-all duration-300 bg-white/50"
              placeholder="사용자명을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border border-gray-200 
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                placeholder-gray-400 transition-all duration-300 bg-white/50"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 rounded-xl
              hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 
              focus:ring-offset-2 font-medium transition-all duration-300 shadow-lg hover:shadow-xl
              transform hover:-translate-y-0.5"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;