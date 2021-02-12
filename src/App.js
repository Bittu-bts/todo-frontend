import react, { useEffect } from "react";
import React, { createContext, useReducer } from 'react';
import Todo from "./component/todo/Todo";
import Header from "./layout/header/Header";
import { BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import AddTodo from "./component/todo/AddTodo/AddTodo";
import EditTodo from "./component/todo/EditTodo/EditTodo";
import Login from './component/Login'

import { initialState, reducer } from "./store/reducer";

export const AuthContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
    value={{
      state,
      dispatch
    }}
  >

    <div> 
    
      <Router>
        <Header/>
       
        <Switch>
        <Route exact path="/">
          <Todo/>
        </Route>
        <Route exact path="/add">
          <AddTodo/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/edit/:id" render={props=>
        <EditTodo/>}/>
        </Switch>
        
      </Router>
      
    </div>
    </AuthContext.Provider>
  );
}

export default App;
