import { useEffect, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";

export default function Root(props) {
  const [listTodo, setListTodo] = useState([]);
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
      { id: Date.now(), text: newTodo, completed: false },
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
    </section>
  );
}
