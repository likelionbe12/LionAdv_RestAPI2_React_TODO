import { useState, useEffect } from 'react';
import axios from 'axios';

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://192.168.56.104:8000/api/todos/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Todo 목록 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://192.168.56.104:8000/api/todos/',
        { title: newTodo },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error('Todo 추가 실패:', error);
    }
  };

  const handleToggleTodo = async (id, completed) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://192.168.56.104:8000/api/todos/${id}/`,
        { is_completed: completed },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("잘 작동 되는 군요!!");
      fetchTodos();
    } catch (error) {
      console.error('Todo 수정 실패:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          할 일 목록
        </h1>

        <form onSubmit={handleAddTodo} className="mb-8 flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="새로운 할 일을 입력하세요"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-200 
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
              placeholder-gray-400 transition-all duration-200"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-purple-500 text-white rounded-lg
              hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 
              focus:ring-offset-2 transition-all duration-200 font-medium"
          >
            추가
          </button>
        </form>

        <div className="space-y-2">
          {todos.map(todo => (
            <div
              key={todo.id}
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <label className="flex items-center flex-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={todo.is_completed}
                  onChange={(e) => handleToggleTodo(todo.id, e.target.checked)}
                  className="w-5 h-5 text-purple-500 rounded border-gray-300 
                    focus:ring-purple-500 transition-all duration-200 cursor-pointer"
                />
                <span
                  className={`ml-3 text-gray-800 text-lg ${
                    todo.is_completed ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {todo.title}
                </span>
              </label>
            </div>
          ))}
          {todos.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              할 일이 없습니다. 새로운 할 일을 추가해보세요!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoPage;