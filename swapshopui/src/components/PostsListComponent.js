import React, { Component } from 'react'
import PostService from '../services/PostService'
import { Link, withRouter } from "react-router-dom";
import AuthService from '../services/AuthService';
import style from "./UploadPost.module.css";
import HeaderComponent from './HeaderComponent';
import SideNavComponent from './SideNavComponent';
import TimeAgo from 'javascript-time-ago';
import ReactTimeAgo from 'react-time-ago';
import en from 'javascript-time-ago/locale/en.json'

class PostsListComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts: [],
            comments:[],
            likes: [],
            text:""
        };
        window.PostsListComponent = this;
        this.addPost = this.addPost.bind(this);
        this.upvotePost = this.upvotePost.bind(this);
        this.viewAllPosts = this.viewAllPosts.bind(this);
        this.viewFavoritePosts = this.viewFavoritePosts.bind(this);
        this.viewPopularPosts = this.viewPopularPosts.bind(this);
        this.viewPostsByUser = this.viewPostsByUser.bind(this);
        this.loadCommentSection = this.loadCommentSection.bind(this);
        this.getPostComments = this.getPostComments.bind(this);
        this.inputCommentHandler = this.inputCommentHandler.bind(this);
    }

    addPost() {
        //move from one page to another
        //this.props.history.push("/uploadPost");
    }
    addComment(e, post){
        e.preventDefault();
        let comment = {text: this.state.text}
        if(localStorage.getItem("user") !== null){
            PostService.commentPost(post.id, comment);
            console.log("comment => "+ JSON.stringify(comment));
            alert("Comment successful")
        }else{
            alert("Unauthorized");
        }
    }
    inputCommentHandler = (e) => {
        this.setState({text: e.target.value});
    }

    loadCommentSection = (e, post) => {
        e.preventDefault();
        //this.setState({comments: []});
        this.getPostComments(post);
        
        let commentSection = document.getElementById(post.id+"comment");
        if(commentSection.className === 'd-none'){
            commentSection.className = 'd-block';
        }else{
            commentSection.className = 'd-none';
        }
        
    }
    componentDidMount(){
        this.viewAllPosts();
    }

    upvotePost(e, post){
        let btnLike = document.getElementById('like'+post.id);
        if(btnLike.className === 'btn btn-outline-danger rounded-circle mr-4'){
            btnLike.className = 'btn btn-danger rounded-circle mr-4';
        }else{
            btnLike.className = 'btn btn-outline-danger rounded-circle mr-4';
        }
        e.preventDefault();
        if(localStorage.getItem("user") !== null){
            PostService.upvotePost(post.id);
            this.setState({likes: post.wantItCtr + 1 });
            alert("Post upvoted!")
        }else{
            alert("Unauthorized");
        }
    }

    viewPopularPosts = (e) =>{
        PostService.getPopularPosts().then((res) => {
            this.setState({posts: res.data});
        });
    }

    viewAllPosts = (e) =>{
        PostService.getAllPosts().then((res) => {
            this.setState({posts: res.data});
        });
    }
    viewFavoritePosts = (e) =>{
        PostService.getFavoritePosts().then((res) => {
            this.setState({posts: res.data});
        });
    }
    viewPostsByUser = (e, username) => {
        PostService.getPostsByUser(username).then((res) => {
            this.setState({posts: res.data});
        });
    }
    getPostComments(post){
        PostService.getPostComments(post.id).then((res) => {
            this.setState({comments: res.data}, () => console.log());
        });
    }

  render() {
    TimeAgo.addLocale(en);
    let comments;

    if (this.state.comments.length !== 0) {
        comments = this.state.comments.map(
            comment =>
                <div class="d-flex flex-row comment-row mt-2">
                    <div class="p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="gray" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                    </div>
                    <div class="comment-text active w-100">
                        <h6 class="font-medium">{comment.user.username}</h6><span class="m-b-15 d-block">{comment.text}</span>
                    </div>
                </div>
        )
    }else{
        comments = <h5 className='ml-3'>No comments yet</h5>
    }
    return (
      <div>
          <HeaderComponent/>
          <div className={style.board}>
                <div>
                    <SideNavComponent/>
                </div>
                <div className={style.content}>
                    {
                        this.state.posts.map(
                            post =>
                            <div className={style.postCard}>
                                <div>
                                    <div class="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
                                        <div class="d-flex flex-row align-items-center feed-text px-2">
                                            <div class="d-flex flex-column flex-wrap ml-2"><span>Posted by: <span class="font-weight-bold">{post.user.username}</span></span><span class="text-black-50 time"><ReactTimeAgo date={post.dateCreated} locale="en-US"/></span></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="p-2 px-3">
                                    <h2>{post.title}</h2>
                                    <div class="feed-image p-2">
                                        <img class="img-fluid img-responsive" src="https://cdn.mos.cms.futurecdn.net/Ks6KtG9fx9soz6ddidT9iY-1024-80.jpg.webp"/>
                                    </div>
                                    <span>{post.body}</span>
                                    
                                </div>
                                <hr/>
                                
                                <div id={post.id + "comment"} className='d-none'>
                                    <h5 className='ml-3' id='comments'>Comments:</h5>
                                    <div class={style.comments}>
                                        {comments}
                                    </div>

                                    <input class="form-control mt-2" type="text" placeholder="Enter a comment" onChange={this.inputCommentHandler}/>
                                    <button class="btn btn-success mt-1 d-flex ml-auto p-2" onClick={(e)=>{this.addComment(e, post)}}>Add comment</button>
                                </div>
                                <hr/>
                                <div class="d-flex justify-content-center pb-2">
                                   <button className='btn btn-outline-danger rounded-circle mr-4' id={'like'+post.id} title='Want it' onClick={(e)=>{this.upvotePost(e, post)}}>
                                        <svg className={style.btn} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 17 14">
                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                        </svg>
                                    </button>
                                    <label>{post.wantItCtr} want this</label>
                                    <button className='btn btn-outline-info rounded-circle ml-4' title='Add comment' onClick={(e)=>{this.loadCommentSection(e, post)}}>
                                        <svg className={style.btn} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>
                                        </svg>
                                    </button>

                                </div>
                            </div>
                            
                            /*{
                            <div className={style.postCard}>
                                <div className={style.imageContainer}>
                                    <img className={style.photo} src="https://cdn.mos.cms.futurecdn.net/Ks6KtG9fx9soz6ddidT9iY-1024-80.jpg.webp" alt="photo"/>
                                </div>
                                <div className={style.contentContainer}>
                                    <div className={style.titleContainer}>
                                        <h2>{post.title}</h2>
                                        <label><i>Uploaded by {post.user.username} {post.dateCreated}</i></label>
                                        <div className={style.description}>
                                            <p>{post.body}</p>
                                        </div>
                                        <hr/> 
                                        <div>
                                            Comments:
                                        </div>
                                        <div>
                                            <button className='btn btn-outline-danger'>
                                                <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                                </svg>
                                                Like
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            }*/
                        )
                        
                    }
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Post title</th>
                                <th>Date uploaded</th>
                                <th>Uploaded by</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.posts.map(
                                    post => 
                                    <tr key={post.id}>
                                        <td>{post.title}</td>
                                        <td>{post.dateCreated}</td>
                                        <td>{post.user.username}</td>
                                        <td>{post.body}</td>
                                        <td>{post.image}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
      </div>
    )
  }
}

export default PostsListComponent;
