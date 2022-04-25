import React, { Component } from 'react'
import PostService from '../services/PostService'
import { Link, withRouter } from "react-router-dom";
import AuthService from '../services/AuthService';
import HeaderComponent from './HeaderComponent';

class PostsListComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            posts: []
        };
        this.addPost = this.addPost.bind(this);
    }

    addPost() {
        //move from one page to another
        //this.props.history.push("/uploadPost");
    }


    componentDidMount(){
        PostService.getPosts().then((res) => {
            this.setState({posts: res.data});
        });
        
    }
    

  render() {
    return (
      <div className='container'>
          <HeaderComponent/>
          <h2 className='text-center'>Posts list</h2>
            <div className='row'>
                <div className='col-sm-2'>
                    Menu controllers
                    <div className="d-grid gap-3">
                        <Link to={"/uploadPost"}><button className='btn btn-primary mt-3'>New Post</button></Link>      
                        <Link to={"/uploadPost"}><button className='btn btn-primary mt-4'>Popular</button></Link> 
                        <Link to={"/uploadPost"}><button className='btn btn-primary mt-4'>New Post</button></Link>   
                        <Link to={"/uploadPost"}><button className='btn btn-primary mt-4'>Favorites</button></Link>                  
                    </div>
                </div>
                <div className='col-sm-10'>
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
