import React, { useEffect, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import "./root.css";
import TodoItem from "./components/TodoItem"; 

interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

const Root: React.FC = (props) => {
  const [listTodo, setListTodo] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>("All");

  const getListFromStorage = () => {
    const storageList = localStorage.getItem("list");
    const list: Todo[] = storageList ? JSON.parse(storageList) : [];
    if (!list.length) return;
    setListTodo(list);
  };

  const handleToggleTodo = (id: string) => {
    const list = listTodo.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });

    localStorage.setItem("list", JSON.stringify(list));
    setListTodo(list);
  };

  const filteredTodos = listTodo.filter((todo) => {
    if (filter === "All") return true;
    if (filter === "Active") return !todo.isCompleted;
    if (filter === "Completed") return todo.isCompleted;
    return true;
  });

  useEffect(() => {
    getListFromStorage();
  }, []);

  return (
    <section className="section-container">
      <BrowserRouter>
        <Link to={"/create-todo"}>
          <h4>Create new todo</h4>
        </Link>
      </BrowserRouter>
      <div>
        <h1 className="heading">Todo List</h1>
        <div className="filter-buttons">
          <button onClick={() => setFilter("All")}>All</button>
          <button onClick={() => setFilter("Active")}>Active</button>
          <button onClick={() => setFilter("Completed")}>Completed</button>
        </div>
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              isCompleted={todo.isCompleted}
              onToggle={handleToggleTodo}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Root;
