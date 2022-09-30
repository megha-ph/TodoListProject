import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TodoList() {
  const [task, setTask] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEdit, setTodoEdit] = useState(null);
  const [editText, setEditText] = useState("");
  // const [post, setPost] = React.useState(null);

  const baseURL = "https://jsonplaceholder.typicode.com/posts/1";
  useEffect(() => {
    // GetpostData();
    const json = localStorage.getItem("task");
    const loadedTodo = JSON.parse(json);
    if (loadedTodo) {
      setTodo(loadedTodo);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(task);
    localStorage.setItem("task", json);
  }, [task]);

  // const GetpostData = () => {
  //   axios.get(baseURL).then((response) => {
  //     setPost(response.data);
  //     GetcommentData(response.data.id)
  //   });
  // };

  // const GetcommentData = () => {
  //   axios.get(baseURL).then((response) => {
  //     setPost(response.data);
  //     GetcommentData(data.id)
  //   });
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTask([...task].concat(newTodo));
    setTodo("");
  };

  const deleteTodo = (id) => {
    let updateTodo = [...task].filter((todo) => todo.id !== id);
    setTask(updateTodo);
  };

  const toggleComplete = (id) => {
    let updateTodo = [...task].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTask(updateTodo);
  };

  const SubmitEdit = (id) => {
    let updateTodo = [...task].map((todo) => {
      if (todo.id === id) {
        todo.text = editText;
      }
      return todo;
    });
    setTask(updateTodo);
    setTodoEdit(null);
  };

  return (
    <div className="todolist">
      <h4>TODO LIST</h4>
      <form onSubmit={handleSubmit}>
        <input type="text" value={todo} placeholder="Add new task" onChange={(event) => setTodo(event.target.value)} />
        <button type="submit">ADD</button>
        <input type="submit" value="submit" />
      </form>

      <div>
        {task.map((todo) => (
          <div key={todo.id} className="todo">
            <div className="todo-text">
              <input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
              {todo.id === todoEdit ? <input type="text" onChange={(event) => setEditText(event.target.value)} /> : <div>{todo.text}</div>}
            </div>
            <div className="todo-actions">
              {todo.id === todoEdit ? (
                <button onClick={() => SubmitEdit(todo.id)}>Submit Edit value</button>
              ) : (
                <button onClick={() => setTodoEdit(todo.id)}>Edit</button>
              )}

              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {/* <div>
        {
          post!=null?
          (<div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>):""
        }
        
      </div> */}
    </div>
  );
}
