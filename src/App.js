import React, { useState } from "react";
import "./App.css";
import { useTodos } from "./hooks/useTodos";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

function App() {
  const { todos, addTodo, completeTodo, removeTodo } = useTodos();
  return (
    <div className="app">
      <div className="todo-list">
        <TodoForm addTodo={addTodo} />
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
