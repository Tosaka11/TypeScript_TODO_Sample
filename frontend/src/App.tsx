import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (!title.trim()) return; // 空のタイトルを防ぐ
    try {
      const response = await axios.post("http://localhost:5000/api/todos", {
        title,
      });
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setTitle("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (id: number, updatedFields: Partial<Todo>) => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, {
        ...todos.find((todo) => todo.id === id),
        ...updatedFields,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedFields } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleEditClick = (id: number, currentTitle: string) => {
    setEditingId(id);
    setEditingTitle(currentTitle);
  };

  const handleSaveClick = async (id: number) => {
    await updateTodo(id, { title: editingTitle });
    setEditingId(null);
    setEditingTitle("");
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <button onClick={() => handleSaveClick(todo.id)}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  className={`todo-title ${todo.completed ? "completed" : ""}`}
                  onClick={() =>
                    updateTodo(todo.id, { completed: !todo.completed })
                  }
                >
                  {todo.title}
                </span>
                <button onClick={() => handleEditClick(todo.id, todo.title)}>
                  Edit
                </button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
