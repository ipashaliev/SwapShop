import { hide, popper } from "@popperjs/core";
import { Component } from "react";
import { Navigate } from "react-router";
import logo from "../assets/logo.jpg"
import style from "./UploadPost.module.css";
import AuthService from "../services/AuthService";


class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: "",
            navigate: false
        }
        this.logOutUser = this.logOutUser.bind(this);

    }

    logOutUser = (e) => {
        if(localStorage.getItem("user") != null){
            localStorage.removeItem("user");
            alert("logout successful");
            this.setState({navigate: true});
        }
       
    }
    componentDidMount(){
        if(localStorage.getItem("user") === null){
            this.setState({navigate: true});
        }else{
            this.setState({currentUser: AuthService.getCurrentUser().username})
        }
    }
    
    render() {
        const {navigate} = this.state;
        if (navigate) {
          return <Navigate to="/login" push={true} />;
        }
        return ( 
            <div>
                <header>
                    <nav class=" fixed-top bg-white navbar navbar-light justify-content-between">
                        <a href="http://localhost:3000/posts"><img className="ml-3" src={logo} height={75} width={145}></img></a>
                        <form class="form-inline">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <div>
                            <label className="mr-3">{this.state.currentUser}</label>
                            <button class="btn btn-secondary" onClick={this.logOutUser}>Log out</button>
                        </div>
                    </nav>
                    
                </header>
            </div>
        );
        
    }
}
 
export default HeaderComponent;