package com.swapshop.SwapShop.entities;

import javax.persistence.*;


@Entity
public class Comment {

    @Id
    @GeneratedValue
    private Long Id;

    private String text;

    @ManyToOne
    private Post post;

    @ManyToOne
    private User user;

    public Comment() {
    }

    public Comment(String text, Post post, User user) {
        this.text = text;
        this.post = post;
        this.user = user;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
