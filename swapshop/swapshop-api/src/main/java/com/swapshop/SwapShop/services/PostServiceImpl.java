package com.swapshop.SwapShop.services;

import com.swapshop.SwapShop.entities.Post;
import com.swapshop.SwapShop.entities.User;
import com.swapshop.SwapShop.repositories.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PostServiceImpl implements PostService{
    private final PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }


    @Override
    public Post[] paginatePosts(int currentPage, int perPage, String sortBy){
        Pageable pageable = PageRequest.of(currentPage - 1, perPage, Sort.by(sortBy).descending());
        Page<Post> posts = postRepository.findAllActive(pageable);

        //Map<String, Object> result = new HashMap<>();
        Post[] result = posts.getContent().toArray(new Post[0]);
        //result.put("totalPosts", posts.getTotalElements());
        //result.put("totalPages", posts.getTotalPages());
        //result.put("", posts.getContent());

        return result;
    }


    @Override
    public void savePost(Post post) {
        postRepository.save(post);
    }

    @Override
    public List<Post> findByUser(User user) {
        return postRepository.findByUserId(user.getId());
    }

    @Override
    public List<Post> findByTitle(String title) {
        return postRepository.findByTitleContainingIgnoreCase(title);
    }

    @Override
    public Post findPost(Long postId) {
        return postRepository.findById(postId).orElse(null);
    }

    @Override
    public List<Post> findAll(){
        return postRepository.findAll();
    }

    @Override
    public boolean deletePost(Long postId) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null){
            return false;
        }
        postRepository.delete(post);
        return true;
    }

}
