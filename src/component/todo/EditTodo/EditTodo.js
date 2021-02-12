import React,{useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";

function EditTodo(props) {
  const [stateTo, setstateTo] = useState({})

  useEffect(() => {
    let id=props.match.params.id;
    getTodoById(id);
    
  }, []);
  const getTodoById= id =>{
   axios
   .get(`http://localhost:8080/todos/${id}`)
   .then(d=>{
     let todo=d.data;
     console.log('get todo by id = ', todo)
     setstateTo(
       {
         id:todo.id,
       task:todo.task,
       date: new Date(todo.date).toISOString().split("T")[0]
      
      }

    );
   })
   .catch(err=>alert(err))
  };
  const putTodo = e => {
    console.log('stateTo = ', stateTo);
    axios
    .put(`http://localhost:8080/todo/${stateTo.id}`, stateTo)
    .then(d=>{
     props.history.push("/"); 
    })
    .catch(err=>alert(err))
   };
    return (
        <div className="container my-3"> 
        
            <form onSubmit={(e)=>{
                e.preventDefault();
                putTodo(e);  
                  
            }}>
        <div className="form-group">
             <label className="form-label">Task</label>
             <input type="text" 
             value={stateTo.task}
             onChange={(e)=>{
                let value=e.target.value;
                setstateTo({
                  task:value,
                  id:stateTo.id,
                  date:stateTo.date
                });
             }} 
             className="form-control form-control-sm"/>
          </div>
          <div className="form-group">
          <label>date</label>
          <input
            value={stateTo.date}
            onChange={e => {
              let value = e.target.value;
              setstateTo({
                date: value,
                task: stateTo.task,
                id: stateTo.id
               
              });
            }}
            type="text"
            className="form-control form-control-sm"
          />
        </div>
  
          <button type="submit" className="btn btn-primary btn-sm" style={{ marginTop: '20px' }}>
            Submit
            </button>
        </form>
        </div>
    )
}

export default withRouter(EditTodo);
