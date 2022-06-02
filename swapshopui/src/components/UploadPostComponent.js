import { Component } from "react";
import style from "./UploadPost.module.css";
import { Link, withRouter } from "react-router-dom";
import PostService from "../services/PostService";
import HeaderComponent from "./HeaderComponent";
import { Navigate } from "react-router";
import SideNavComponent from "./SideNavComponent";


class UploadPostComponent extends Component {
    constructor(props) {
        super(props);

        this.state={
            title: "",
            body: "",
            username: "",
            navigate: false
            //dateCreated: null,
            //active: false
        }
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeBodyHandler = this.changeBodyHandler.bind(this);
        this.uploadPost = this.uploadPost.bind(this);
    }
    

    changeTitleHandler = (e) => {
        this.setState({title: e.target.value});
    }
    changeBodyHandler = (e) => {
        this.setState({body: e.target.value});
    }
    uploadPost = (e) => {
        e.preventDefault();
        let post = {title: this.state.title, body: this.state.body}
        console.log("post => "+ JSON.stringify(post));

        if(localStorage.getItem("user") !== null){
            if (this.state.title === "") {
                document.getElementById("required").innerHTML = "You must add a title";
            }else{
                PostService.uploadPost(post);
                this.setState({navigate: true});
            }
            
        }else{
            alert("Unauthorized");
        }
        
    }

    render() { 
        const {navigate} = this.state;
        if (navigate) {
          return <Navigate to="/posts" push={true} />;
        }
        return ( 
            <div>
                <HeaderComponent/>
                <div className={style.board}>
                    <div>
                        <SideNavComponent/>
                    </div>
                    <div>
                        <h1 class="text-center pt-3">Upload post</h1>
                    </div>
                    <div class="container d-flex justify-content-center">
                            <div class="card mt-4">
                                <div class="card-body">
                                    <Link to={"/posts"}>
                                        <button type="button" title="cancel" className={style.close}>
                                            <span>&#10006;</span>
                                        </button>
                                    </Link>
                                    <h6 class="card-title mb-3">What item do you want to swap? </h6>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="name">Post title</label>
                                                <p id="required" className="text-danger">* Required</p>
                                                <input class="form-control" type="text" placeholder="Item name" onChange={this.changeTitleHandler}/> 
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <div class="input-group"> 
                                                    <textarea class="form-control" type="text" placeholder="Description" rows={6} onChange={this.changeBodyHandler}/> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="name">Add an image</label>
                                                <br/>
                                                <input type="file" id="img" name="img" accept="image/*"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=" d-flex flex-column text-center px-5 mt-2 mb-2">
                                            <small class="agree-text">Your post will be visible by everyone on the main page</small>
                                            <br/>
                                            <button class="btn btn-primary btn-block confirm-button" onClick={this.uploadPost}>Share post</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}
 
export default UploadPostComponent;