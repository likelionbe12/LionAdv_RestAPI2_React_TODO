import { useState, useEffect } from 'react';
import axios from 'axios';

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Todo 목록 가져오기
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

  // 컴포넌트가 처음 렌더링될 때 Todo 목록 가져오기
  useEffect(() => {
    fetchTodos();
  }, []);

  // 새 Todo 추가하기
  const handleAddTodo = async (e) => {
    e.preventDefault();

    if (!newTodo.trim()) return; // 빈 내용이면 추가하지 않음

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

      setNewTodo(''); // 입력창 비우기
      fetchTodos(); // 목록 새로고침
    } catch (error) {
      console.error('Todo 추가 실패:', error);
    }
  };

  // Todo 완료 상태 토글
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
      fetchTodos(); // 목록 새로고침
    } catch (error) {
      console.error('Todo 수정 실패:', error);
    }
  };

  return (
    <div>
      <h1>할 일 목록</h1>

      {/* 새 Todo 입력 폼 */}
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="새로운 할 일"
        />
        <button type="submit">추가</button>
      </form>

      {/* Todo 목록 */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.is_completed}
              onChange={(e) => handleToggleTodo(todo.id, e.target.checked)}
            />
            <span style={{
              textDecoration: todo.is_completed ? 'line-through' : 'none'
            }}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoPage;
