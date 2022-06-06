package com.swapshop.SwapShop.entities;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.mapping.ToOne;

import javax.persistence.*;

@Entity
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String url;

    @OneToOne
    private Post post;

    public Image(){

    }

    public Image(String name, String url, Post post) {
        this.name = name;
        this.url = url;
        this.post = post;
    }

    public Image(String filename, String url) {
        this.name = filename;
        this.url = url;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}