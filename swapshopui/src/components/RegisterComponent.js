import { Component } from "react";
import AuthService from "../services/AuthService";
import style from "./Register.module.css";
import backgr from "../assets/backgr.jpg";
import { Navigate } from "react-router";


class RegisterComponent extends Component {
  constructor(props) {
        super(props);

        this.state={
            username: "",
            email: "",
            password: "",
            navigate: false
        }
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }
    

    changeUsernameHandler = (e) => {
        this.setState({username: e.target.value});
    }
    changeEmailHandler = (e) => {
        this.setState({email: e.target.value});
    }
    changePasswordHandler = (e) => {
      this.setState({password: e.target.value});
    }

    validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    registerUser = (e) => {
        
        e.preventDefault();
        let user = {username: this.state.username, email: this.state.email, password: this.state.password}
        //remove below
        console.log("user => "+ JSON.stringify(user));

        if(!this.validateEmail(this.state.email)) {
          document.getElementById("required").innerHTML = "Please enter a valid email.";
          //alert("Please enter a valid email!");
        }else if(this.state.password.length <= 6) {
          document.getElementById("required").innerHTML = "Password must be at least 6 characters.";
        }else if(this.state.username.length < 1) {
          document.getElementById("required").innerHTML = "Username cannot be empty"
        }else {
          try {
            AuthService.register(user).then(
              (response) => {
                this.setState({navigate: true});
              },
              (error) => {
                document.getElementById("required").innerHTML = "Such user already exists"
              }
            );
          }catch(error){
            console.log("Such user already exists");
          }
         
          
        }   
    }

    render() { 
      const {navigate} = this.state;
      if (navigate) {
        return <Navigate to="/login" push={true} />;
      }
        return (
          <div style={{ backgroundImage: `url(${backgr})`}}>
            <section class="justify-content-center mt-4">
              <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                <div class="container h-100 ">
                  <div class="row d-flex justify-content-center">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                      <div className={style.card}>
                        <div class="card p-3 mb-5" >
                          <div class="card-body p-5">
                            <h2 class="text-uppercase text-center mb-5">Create an account</h2>
                            <p id="required" className={style.required}>* Required</p>
                            <form>
                              <div class="form-outline mb-4">
                                <label class="form-label">* Username:</label>
                                <input type="text" id="form3Example1cg" class="form-control form-control-lg" onChange={this.changeUsernameHandler} />
                              </div>

                              <div class="form-outline mb-4">
                                <label class="form-label">* Email:</label>
                                <input type="email" id="form3Example3cg" class="form-control form-control-lg" onChange={this.changeEmailHandler}/>
                              </div>

                              <div class="form-outline mb-4">
                                <label class="form-label">* Password:</label>
                                <input type="password" id="form3Example4cg" class="form-control form-control-lg" onChange={this.changePasswordHandler} />
                              </div>  

                              <div class="d-flex justify-content-center">
                                <button type="button" class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={this.registerUser}>Register</button>
                              </div>
                              <p class="text-center text-muted mt-3 mb-0">Already have an account? <a href="http://localhost:3000/login" class="fw-bold text-body"><u>Login here</u></a></p>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
    }
}
 
export default RegisterComponent;