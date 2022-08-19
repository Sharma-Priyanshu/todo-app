import React, {useEffect, useState} from "react";
import "./App.css";
import {AiOutlineDelete} from "react-icons/ai"
import {BsCheckLg} from "react-icons/bs"


function App() {
  const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  const [allTodos,setTodos] = useState([]);
  const [newTitle,setNewTitle] = useState("");
  const [newDescription,setNewDescription] = useState("");
  const [completedTodos, setCompleteTodos] = useState([]);

  const handleAddTodo = ()=>{
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }

    let updateTodoArr = [...allTodos];
    updateTodoArr.push(newTodoItem);
    setTodos(updateTodoArr);
    localStorage.setItem('todolist' , JSON.stringify(updateTodoArr));
  };

  const handleDeleteTodo = (index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);

    setTodos(reducedTodo)
    localStorage.setItem('todolist', JSON.stringify(reducedTodo))
  };

  const handleComplete = (index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn  =  dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s ;

    let filterdItem = {
      ...allTodos[index],
      completedOn: completedOn
    }

    let updateCompletedArr =[...completedTodos]
    updateCompletedArr.push(filterdItem);
    setCompleteTodos(updateCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos' , JSON.stringify(updateCompletedArr));

  };const handleDeleteCompletedTodo= (index)=>{
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index);

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo))
    setCompleteTodos(reducedTodo)
  }



  useEffect(() => {
   let savedTodo = JSON.parse(localStorage.getItem('todolist'));
   if(savedTodo){
     setTodos(savedTodo)
   }
   let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
   if(savedCompletedTodo){
     setCompleteTodos(savedCompletedTodo)
   }
  }, []);
  return (
    <>
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's your task title?" />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="What's your task description?" />
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} 
            className="primaryBtn">
              ADD
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={()=> setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={()=> setIsCompleteScreen(true)}>Completed</button>

        </div>
        <div className="todo-list">
          {isCompleteScreen===false && allTodos.map((item,index)=>{
            return <div className="todo-list-item" key={index}>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            </div>
            <div className="icon-cont">
            <AiOutlineDelete className="icon" onClick={()=>handleDeleteTodo(index)} title="delete?" />
            <BsCheckLg className="check-icon" onClick={()=>handleComplete(index)} title="completed?" />
            </div>
          </div>
          })}

          {isCompleteScreen===true && completedTodos.map((item,index)=>{
            return <div className="todo-list-item" key={index}>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><small>Completed on: {item.completedOn}</small></p>
            </div>
            <div className="icon-cont">
            <AiOutlineDelete className="icon" onClick={()=>handleDeleteCompletedTodo(index)} title="delete?" />
            </div>
          </div>
          })}
          
          
        </div>
      </div>
    </>
  );
}

export default App;
