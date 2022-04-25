package com.swapshop.SwapShop.services;

import com.swapshop.SwapShop.entities.Comment;
import com.swapshop.SwapShop.entities.Post;
import com.swapshop.SwapShop.repositories.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public List<Comment> getComments(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    @Override
    public void addComment(Comment comment) {
        commentRepository.save(comment);
    }

    @Override
    public boolean deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId).orElse(null);
        if (comment == null){
            return false;
        }
        commentRepository.delete(comment);
        return true;
    }
}
