import React, { Component } from 'react';
import './App.css';
import PostsListComponent from './components/PostsListComponent';
import HeaderComponent from './components/HeaderComponent';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import UploadPostComponent from './components/UploadPostComponent';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import AuthService from './services/AuthService';

class App extends Component {
  constructor(props) {
    super(props);

    this.state={
        navigate: false
    }
  }

  render() {
    return (
      <div>
        <Router>
                <Routes>
                    <Route path="/posts"  element = {<PostsListComponent/>}></Route>
                    <Route path="/uploadPost"  element = {<UploadPostComponent/>}></Route>
                    <Route path="/register" element = {<RegisterComponent/>}></Route>
                    <Route path="/login" element = {<LoginComponent/>}></Route>
                </Routes>
        </Router>
      </div>
    );
  }
}
export default App;