package com.swapshop.SwapShop.services;

import com.swapshop.SwapShop.entities.Comment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommentService {
    List<Comment> getComments(Long postId);
    public void addComment(Comment comment);
    boolean deleteComment(Long commentId);
}
