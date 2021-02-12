import React,{useState,useEffect} from 'react';
import axios from "axios";
import TodoRow from './TodoRow';
import { Link } from 'react-router-dom';

export default function Todo() {
   const [stateTodo, setTodostate] = useState([])

   

   useEffect(() => {
   getTodo(); 
   }, [])

    const getTodo=()=> {
        axios.get("http://localhost:8080/todos").
        then(data=>{
            let todo = data.data;
            setTodostate(
                todo.map(d=>{
                return {
                    select:false,
                    id: d.id,
                    task: d.task,
                    date: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
                    status: d.status
                };
                })
            );
        })
        .catch(err=>alert(err));
    };
    
    const deleteTodoByIds=()=>{
        let arrayids=[];
        stateTodo.forEach(d=>{
            if(d.select){
                arrayids.push(d.id); 
            }
           
        });

        console.log('arrayids = ', arrayids)
        arrayids.map(ad => {
        
        axios
        .delete(`http://localhost:8080/todo/${ad}`)
        .then(data=>{
            console.log(data);
            getTodo();  
        })
        .catch(err=>alert(err));
        })
    };

    return (
        <div>

         <Link to="/add">
         <button className="btn btn-primary btn-sm m-2">Add Todo</button>  
         </Link>
         <button className="btn btn-danger btn-sm m-2"
         onClick={()=>{
            deleteTodoByIds()
         }}
         
         >Delete Todo</button>
         <table className="table">
            <thead>
            <tr>
              <th>Select</th>
              <th scope="col">#</th>
              <th scope="col">task</th>
              <th scope="col">date</th>  
              <th scope="col">Edit</th>
     
              </tr>
  </thead>
  <tbody>
      <TodoRow 
      stateTodo={stateTodo} 
      setTodostate={setTodostate}/>
  </tbody>
</table>
        </div>
    );
}
