import { hide, popper } from "@popperjs/core";
import { Component } from "react";
import { Navigate } from "react-router";
import logo from "../assets/logo.jpg"
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
            <div className="container">
                <header>
                    <nav class="navbar navbar-light justify-content-betweent">
                        <a href="http://localhost:3000/posts"><img src={logo} height={80} width={155}></img></a>
                        <form class="form-inline">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <div>
                            <span className="label label-default  mr-2">{this.state.currentUser}</span>
                            <button class="btn btn-outline-success" onClick={this.logOutUser}>Log out</button>
                        </div>
    
                    </nav>
                </header>
            </div>
            );
        
    }
}
 
export default HeaderComponent;