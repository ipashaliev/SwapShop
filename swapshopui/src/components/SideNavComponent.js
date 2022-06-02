import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import style from "./UploadPost.module.css";
import PostService from '../services/PostService';
import PostsListComponent from './PostsListComponent';
import AuthService from '../services/AuthService';

export default class SideNavComponent extends Component {
  constructor(props) {
    super(props);

    this.viewPopularPosts = this.viewPopularPosts.bind(this);
    this.viewAllPosts = this.viewAllPosts.bind(this);
    this.viewFavoritePosts = this.viewFavoritePosts.bind(this);
    this.viewPostsByUser = this.viewPostsByUser.bind(this);
  }
  viewPopularPosts = (e) =>{
    window.PostsListComponent.viewPopularPosts();
  }
  viewAllPosts = (e) =>{
    window.PostsListComponent.viewAllPosts();
  }
  viewFavoritePosts = (e) =>{
    window.PostsListComponent.viewFavoritePosts();
  }
  viewPostsByUser = (e) =>{
    window.PostsListComponent.viewPostsByUser(e, AuthService.getCurrentUser().username)
  }
  
  render() {
    return (
        <div className={style.sidenav}>
            <ul>
                <Link to={"/uploadPost"}><li id="upload" className='list list-group-item-danger mr-3'><svg className={style.icon} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>New Post</li></Link>
                <hr/> 
                <Link to={"/posts"} onClick={this.viewAllPosts}><li id="latest"><svg className={style.icon} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                </svg>Latest posts</li></Link>   
                <hr/>
                <Link to={"/posts"} onClick={this.viewPopularPosts}><li id="popular"><svg className={style.icon} xmlns="http://www.w3.org/2000/svg"fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                </svg>Popular</li></Link> 
                <hr/>
                <Link to={"/posts"} onClick={this.viewFavoritePosts}><li id="favorites"><svg className={style.icon} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>Favorites</li></Link>
                <hr/>
                <Link to={"/posts"} onClick={this.viewPostsByUser}><li id="favorites"><svg className={style.icon} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>My posts</li></Link>
            </ul>                 
        </div>
    )
  }
}
