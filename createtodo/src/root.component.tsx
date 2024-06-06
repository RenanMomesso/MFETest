import { useEffect, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function Root(props) {
  const [listTodo, setListTodo] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const getTodoList = () => {
    const todoList = JSON.parse(localStorage.getItem("list"));
    if (todoList) {
      setListTodo(todoList);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    const updatedList = [
      ...listTodo,
      { id: Date.now().toString(), text: newTodo, completed: false },
    ];
    localStorage.setItem("list", JSON.stringify(updatedList));
    setListTodo(updatedList);
    alert("Todo added successfully!");
    setNewTodo("");
  };

  return (
    <section>
      <BrowserRouter>
        <Link
          to={{
            pathname: "/",
          }}
        >
          List todos
        </Link>
      </BrowserRouter>
      <h1>Todo List</h1>

      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      
      <ul>
        {listTodo.map((todo) => (
          <li key={todo.id}>
            {todo.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
