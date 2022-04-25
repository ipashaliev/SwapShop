import axios from "axios";
import authHeader from "./AuthHeader";
const API_URL = "http://localhost:8080/api";

class UserService{
    getPublicContent(){
        return axios.get(API_URL + "/post/all?currentPage=1&perPage=4&sortBy=dateCreated");
    }
}