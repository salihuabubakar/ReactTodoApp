import { Button } from "@mui/material";
import { useState, useEffect } from "react";

const App = () => {
  const [inputText, setInputText] = useState("");
   const [todos, setTodos] = useState([]);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setInputText(inputValue)
  }

   const saveToLocalStorage = (todo) => {
     localStorage.setItem("Todos", JSON.stringify(todo));
   };

    useEffect(() => {
      let getTodoFromLocalStorage = localStorage.getItem("Todos");
      getTodoFromLocalStorage = JSON.parse(getTodoFromLocalStorage);
      if (getTodoFromLocalStorage) {
        setTodos(getTodoFromLocalStorage);
      }
    }, []);

  const handleBtn = () => {
    const newTodo = (todo)=>{
      return [...todo, inputText];
    } 
    setTodos(newTodo)
    saveToLocalStorage(newTodo(todos));
    setInputText("")
  }

  const removeTodoBtn = (id) => {
    const todoRemove = todos.filter((item, index) => {
      return index !== id;
    }) 
    setTodos(todoRemove)
    console.log(id)
    //saveToLocalStorage(setTodos(todos))
  }


 
  return (
    <div className="App">
      <div className="Heading">
        <h1>Todo's</h1>
      </div>
      <div className="InputBox">
        <input name="input" onChange={handleChange} value={inputText} type="text" />
        <button onClick={handleBtn}>Add</button>
      </div>
      <div className="Contents">
        <ul>
          {todos.map((item, index) => {
           return <li id={index} key={index}>{item} <span> <Button onClick={() => removeTodoBtn(index)}>Delete</Button> </span></li>
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
