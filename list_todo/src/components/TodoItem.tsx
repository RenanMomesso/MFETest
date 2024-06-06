import React from "react";

interface TodoItemProps {
  id: string;
  text: string;
  isCompleted: boolean;
  onToggle: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  isCompleted,
  onToggle,
}) => {
  return (
    <li onClick={() => onToggle(id)} className="todo-item">
      <input type="checkbox" checked={isCompleted} />
      <span className={isCompleted ? "completed" : ""}>{text}</span>
    </li>
  );
};

export default TodoItem;
