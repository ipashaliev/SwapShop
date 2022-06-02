import axios from "axios";
import authHeader from "./AuthHeader";
const USER_API_URL = "http://localhost:8080/api/";

class PostService {
    getAllPosts(){
        return axios.get(USER_API_URL + "post/all?currentPage=1&perPage=30&sortBy=dateCreated", {headers: authHeader()});
    }
    getFavoritePosts(){
        return axios.get(USER_API_URL + "post/favorites", {headers: authHeader()});
    }
    getPopularPosts(){
        return axios.get(USER_API_URL + "post/all?currentPage=1&perPage=30&sortBy=wantItCtr", {headers: authHeader()});
    }
    getPostsByUser(username){
        return axios.get(USER_API_URL + "post/postsby/"+ username, username, {headers: authHeader()});
    }
    uploadPost(post){
        return axios.post(USER_API_URL + "post/upload", post, {headers: authHeader()});
    }
    upvotePost(id){
        return axios.post(USER_API_URL + "post/vote/"+id, id, {headers: authHeader()});
    }
    getPostComments(id){
        return axios.get(USER_API_URL + "post/comments/"+id, id, {headers: authHeader()});
    }
    commentPost(id, comment){
        return axios.post(USER_API_URL + "post/comment?id="+id, comment, {headers:authHeader()}, id);
    }
}
export default new PostService()