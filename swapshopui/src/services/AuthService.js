import axios from "axios";
const USER_API_URL = "http://localhost:8080/api/user";

class AuthService {
    login(user) {
        return axios.post(USER_API_URL + "/login", user).then(response => {
              if(response.data.accessToken){
                localStorage.setItem("user", JSON.stringify(response.data));
              }
              return response.data;
          });
    }

    logout(){
        localStorage.removeItem("user");
    }

    register(user){
        return axios.post(USER_API_URL + "/signup", user).then(response => {
            if(response.data.accessToken){
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }
    /*
    register(username, email, password) {
        return axios.post(API_URL + "/signup", {
          username,
          email,
          password  
        }).then(response => {
            if(response.data.accessToken){
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }
    */

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}
export default new AuthService();