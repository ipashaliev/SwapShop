import axios from "axios";
import authHeader from "./AuthHeader";
const USER_API_URL = "http://localhost:8080/api/";

class PostService {
    getPosts(){
        return axios.get(USER_API_URL + "post/all?currentPage=1&perPage=10&sortBy=dateCreated");
    }
    uploadPost(post){
        return axios.post(USER_API_URL + "post/upload", post, {headers: authHeader()});
    }
    
}
export default new PostService()