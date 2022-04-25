package com.swapshop.SwapShop.services;

import com.swapshop.SwapShop.entities.Post;
import com.swapshop.SwapShop.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface PostService {
    Post[] paginatePosts(int currentPage, int perPage, String sortBy);
    void savePost(Post post);
    List<Post> findByUser(User user);
    Post findPost(Long postId);
    List<Post> findByTitle(String title);
    List<Post> findAll();
    boolean deletePost(Long postId);
}
