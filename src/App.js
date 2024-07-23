import "./App.css";
import { useState, useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoMdDoneAll } from "react-icons/io";
import { MdOutlineSwipeUp } from "react-icons/md";
import { RiAddLargeLine } from "react-icons/ri";

function App() {
  const [input, changeInput] = useState("");
  const [todo, addTodos] = useState([]);
  const [editId, setEditId]=useState(0)

  const setTodo = () => {
    if(input.trim() !==''){
      if(editId){
        const updateTodo= todo.map((tod)=>
          tod.id===editId ?  {id:tod.id,list:input}:tod
      )
      addTodos(updateTodo)
      setEditId(0)
    }else{
      addTodos([...todo, {list:input,id:Date.now(),status:false}]);
    }
    changeInput('')
    }
  };
  
  const defaultSubmit = (e) => {
    e.preventDefault();
  };

  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  });

  const onDelete=(id)=>{
    addTodos(todo.filter((todos)=> todos.id!==id))
  }

  const onComplete=(id)=>{
    let complete=todo.map((list)=>{
    if(list.id===id){
      return({...list , status:!list.status})
    }
    return list
    })
    addTodos(complete)
  }

  const onEdit=(id)=>{
    const changable=todo.find((to)=>to.id===id)
    if(changable.status===false){
      changeInput(changable.list)
      setEditId(changable.id)
    }
  }
  
  const onMoveUp=(id)=>{
    const index = todo.findIndex((x) => x.id === id);
    if(index>0){
      const updateTasks=[...todo];
      [updateTasks[index-1],updateTasks[index]]=[updateTasks[index],updateTasks[index-1]];
      addTodos(updateTasks);
    }
  }

  return (
    <div className="container">
      <div className="outerDiv">
        <div className="head">
          <h1>TODO LIST</h1>
        </div>
        <div>
          <form onSubmit={defaultSubmit}>
            <div className="input-wrapper">
               <input
                 className="input"
                 ref={inputRef}
                 placeholder="Add item . . . "
                value={input}
                onChange={(event) => changeInput(event.target.value)}
                />
                <button className="addBtn" onClick={setTodo}>
                 {editId ? <FiEdit className="add-edit" /> : <RiAddLargeLine className="add-edit" />}
                </button>
            </div>
          </form>
        </div>

        <div>
          <ul className="list">
            {todo.map((todos) => (
              <li className="items">
                <MdOutlineSwipeUp onClick={()=>onMoveUp(todos.id)} className="up"/>
                <div id={todos.status ? 'done':''} className="li-items">{todos.list}</div>
                <span className="li-icons">
                  <IoMdDoneAll
                    id="complete"
                    className="icon"
                    title="Complete"
                    onClick={()=>onComplete(todos.id)} 
                  />
                  <FiEdit id="edit" className="icon" title="Edit" onClick={()=>onEdit(todos.id)}/>
                  <MdDelete id="delete" className="icon" title="Delete" onClick={()=>onDelete(todos.id)}/>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;