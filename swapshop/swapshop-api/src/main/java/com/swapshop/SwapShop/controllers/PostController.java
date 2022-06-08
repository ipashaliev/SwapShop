package com.swapshop.SwapShop.controllers;

import com.swapshop.SwapShop.entities.Comment;
import com.swapshop.SwapShop.entities.Image;
import com.swapshop.SwapShop.entities.Post;
import com.swapshop.SwapShop.entities.User;
import com.swapshop.SwapShop.repositories.ImageRepository;
import com.swapshop.SwapShop.repositories.PostRepository;
import com.swapshop.SwapShop.services.CommentService;
import com.swapshop.SwapShop.services.ImageService;
import com.swapshop.SwapShop.services.PostService;
import com.swapshop.SwapShop.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/post")
public class PostController {

    private final PostService postService;
    private final UserService userService;
    private final CommentService commentService;
    private final ImageService imageService;

    public PostController(PostService postService, UserService userService, CommentService commentService, ImageService imageService) {
        this.postService = postService;
        this.userService = userService;
        this.commentService = commentService;
        this.imageService = imageService;
    }


    @GetMapping("/all")
    public ResponseEntity<?> allActivePosts(int currentPage, int perPage, String sortBy){
        Post[] result = postService.paginatePosts(currentPage, perPage, sortBy);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/favorites")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getAllFavorites(){
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userService.getUser(currentUsername);
        Post[] posts =  currentUser.getFavorites().toArray(new Post[0]);
        return ResponseEntity.ok(posts);
    }

    @PostMapping("/upload")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> uploadPost(@RequestBody Post post) {
        if(post != null){
            String creator = SecurityContextHolder.getContext().getAuthentication().getName();
            post.setDateCreated(new Date());
            post.setUser(userService.getUser(creator));
            post.setActive(true);
            post.setWantItCtr(0);
            postService.savePost(post);
            return ResponseEntity.ok("Post published successfully!");
        }
        return ResponseEntity.badRequest().body("Post cannot be blank.");
    }


    @GetMapping("/postsby/{username}")
    public ResponseEntity<?> postsByUser(@PathVariable String username){
        User user = userService.getUser(username);
        if (user != null){
            List<Post> result =  postService.findByUser(user);
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.ok("No such user found");
    }

    @GetMapping("/posts/{title}")
    public ResponseEntity<?> postsByTitle(@PathVariable String title){
        List<Post> result =  postService.findByTitle(title);
        if (result.isEmpty()){
            return ResponseEntity.ok("");
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/vote/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> upvotePost(@PathVariable Long id){
        Post currentPost = postService.findPost(id);
        if (currentPost != null){
            String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
            User currentUser = userService.getUser(currentUsername);
            List<Post> favoritePosts = currentUser.getFavorites();

            if (favoritePosts.contains(currentPost)){
                favoritePosts.remove(currentPost);
                currentPost.setWantItCtr(currentPost.getWantItCtr() - 1);
                postService.savePost(currentPost);
                userService.updateUserFavorites(currentUser);

                return ResponseEntity.ok("Post removed from favorites.");
            }
            currentPost.setWantItCtr(currentPost.getWantItCtr() + 1);
            favoritePosts.add(currentPost);
            postService.savePost(currentPost);
            userService.updateUserFavorites(currentUser);

            return ResponseEntity.ok("Post added to favorites!");
        }
        return ResponseEntity.ok("No posts found");
    }

    //deactivate post
    @PostMapping("/deactivate/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> deactivatePost(@PathVariable Long id){
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userService.getUser(currentUsername);
        Post currentPost = postService.findPost(id);
        User postCreator = currentPost.getUser();

        if(currentUser == postCreator){
            currentPost.setActive(false);
            postService.savePost(currentPost);
            return ResponseEntity.ok("Post deactivated");
        }
        return ResponseEntity.badRequest().body("Cannot deactivate other user's posts.");
    }

    @DeleteMapping("/deletePost/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deletePost(@PathVariable Long id){
        if(postService.deletePost(id)){
            return ResponseEntity.ok("Post deleted successfully");
        }
        return ResponseEntity.ok("Delete unsuccessful");
    }

    @PostMapping(value = "/comment")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> postComment(@RequestBody Comment comment, Long id) {
        Post post = postService.findPost(id);
        String creator = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userService.getUser(creator);

        if (post == null)
            return ResponseEntity.badRequest().body("Commenting unsuccessful");

        commentService.addComment(new Comment(comment.getText(), post, user));
        return ResponseEntity.ok("Comment added successfully");
    }

    @DeleteMapping("/deleteComment/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteComment(@PathVariable Long id){
         if(commentService.deleteComment(id))
            return ResponseEntity.ok("Comment removed.");
         else
             return ResponseEntity.ok("Cannot remove comment.");
    }



    @GetMapping("/comments/{postId}")
    public ResponseEntity<?> getComments(@PathVariable Long postId){
        List<Comment> result =  commentService.getComments(postId);
        if(result.isEmpty()){
            return ResponseEntity.ok("");
        }
        return ResponseEntity.ok(result);
    }


    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> allPosts(){
        List<Post> result = postService.findAll();
        return ResponseEntity.ok(result);
    }
}

