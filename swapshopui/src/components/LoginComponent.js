import { Component } from "react";
import AuthService from "../services/AuthService";
import style from "./Register.module.css";
import backgr from "../assets/backgr.jpg";
import { Navigate } from "react-router";

class LoginComponent extends Component {
  constructor(props) {
        super(props);

        this.state={
            username: "",
            password: "",
            navigate: false
        }
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.logInUser = this.logInUser.bind(this);
    }
    

    changeUsernameHandler = (e) => {
        this.setState({username: e.target.value});
    }
    changePasswordHandler = (e) => {
      this.setState({password: e.target.value});
    }

    logInUser = (e) => {
        e.preventDefault();
        let user = {username: this.state.username, password: this.state.password}
        //remove below
        console.log("user => "+ JSON.stringify(user));

        try {
          AuthService.login(user).then(
            (response) => {
              this.setState({navigate: true});
            },
            (error) => {
              document.getElementById("required").innerHTML = "Invalid username or password";
            }
          );
        }catch {
          console.log("Invalid username or password.");
        } 
    }

    render() { 
      const {navigate} = this.state;
      if (navigate) {
        return <Navigate to="/posts" push={true} />;
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
                            <h2 class="text-uppercase text-center mb-5">Log in</h2>
                            <p id="required" className={style.required}>* Required</p>
                            <form>
                              <div class="form-outline mb-5">
                                <label class="form-label">* Username:</label>
                                <input type="text" id="form3Example1cg" class="form-control form-control-lg" onChange={this.changeUsernameHandler} />
                              </div>

                              <div class="form-outline mb-5">
                                <label class="form-label">* Password:</label>
                                <input type="password" id="form3Example4cg" class="form-control form-control-lg" onChange={this.changePasswordHandler} />
                              </div>  

                              <div class="d-flex justify-content-center mt-5">
                                <button type="button" class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={this.logInUser}>Log in</button>
                              </div>
                              <p class="text-center text-muted mt-5 mb-4">Don't have an account? <a href="http://localhost:3000/register" class="fw-bold text-body"><u>Register here</u></a></p>
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
 
export default LoginComponent;