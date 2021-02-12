import React from "react";
import axios from "axios";


export default function AddTodo() {
    
    const submit = e =>{
        let task = e.target[0].value;
        let date = e.target[1].value;
        
        let data={
            task,
            date 
        };
        console.log(data);
        postTodo(data);

    };

    const postTodo=(data)=>{
        axios.post("http://localhost:8080/todo",data).then((d)=>{
            console.log(d);
            
        }).catch(err=>alert(err));
        // window.location.href = '/'
    }


    return (
        <div className="container my-3">
            <form onSubmit={(e)=>{
                e.preventDefault();
                submit(e);   
            }}>
  <div className="form-group">
    <label className="form-label">Todo</label>
    <input type="text" className="form-control form-control-sm"/>
  </div>
  <div className="form-group">
    <label className="form-label">date</label>
    <input type="text" className="form-control form-control-sm"/>
  </div>
 
  <button type="submit" className="btn btn-primary btn-sm">Submit</button>
</form>
        </div>
    );
}
