import React, { useState } from "react";
import classes from  "./app.css";
import firebase from "firebase"
function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className={classes.todo}
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}

      <div>
        <button onClick={() => completeTodo(index)}>Finished</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        placeholder="Add To-Do"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: "Learn Reactjs",
      isCompleted: false
    },
    {
      text: "Play cricket",
      isCompleted: false
    },
    {
      text: "Meet friends",
      isCompleted: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className={classes.app}>
    <p style={{float:"right"}}>Signed in as <br/> {firebase.auth().currentUser.displayName} 
    
    </p>
      <div className={classes.todolist}>
      <button style={{float:"right"}} onClick={() => firebase.auth().signOut()}>Sign out!</button>
      <h1 style={{textAlign:"center",color:"#8c20ee"}}>TODO LIST</h1>
     
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
