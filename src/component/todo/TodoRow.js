// import React from 'react'
// import { Link } from 'react-router-dom';

// export default function TodoRow(props) {
//     return props.stateTodo.map(d=> (
//         <tr key={d.id}> 
//         <td>
//             <input type="checkbox"/>
//             </td>
//           <th scope="row">{d.id}</th>
//           <td>{d.task}</td>
         
//           <td>
//               <Link to={`edit/${d.id}`}> 
              
//               <button className="btn btn-primary btn-sm">Edit</button>
//                 </Link>
//                 </td>
//      </tr>
//         ));
// }


import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function TodoRow(props) {

  const changeTodoStatus = id => {
    console.log('status changed in database ', id)

    axios.put(`http://localhost:8080/todostatus/${id}`, { id: id })
    .then(result => window.location.reload())
    .catch(error => console.log(error))

  }
 
  return props.stateTodo.map((d,i) => (
    <tr key={d.id}>
      <td>
        <span onClick={() => changeTodoStatus(d.id)}>
        <input
          type="checkbox"
          checked={d.status}
          onChange={e => {
            let value = e.target.checked;
            props.setTodostate(
              props.stateTodo.map(sd => {
                if (sd.id === d.id) {
                  sd.select = value;
                }
                return sd;
              })
            );
          }}
        />
        </span>
      </td>
      <th scope="row">{i+1}</th>
      <td>{d.task}</td>
      <td>{d.date}</td>
      <td>
        <Link to={`edit/${d.id}`}>
          <button className="btn btn-primary btn-sm">Edit</button>
        </Link>
      </td>
    </tr>
  ));
}

export default TodoRow;