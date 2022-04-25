package com.swapshop.SwapShop.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String body;

    private Date dateCreated;

    private Integer wantItCtr;

    private boolean active;

//    @OneToMany
//    private List<Comment> comments;

    @ManyToOne
    //@JsonIgnore
    @JsonIncludeProperties({"username"})
    private User user;


    @OneToOne
    private Image image;

    public Post(){

    }

    public Post(String title, String body, Date dateCreated, User user, boolean active, Image image) {
        this.title = title;
        this.body = body;
        this.dateCreated = dateCreated;
        this.user = user;
        this.active = active;
        this.image = image;
    }


    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date date) {
        this.dateCreated = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public Integer getWantItCtr() {
        return wantItCtr;
    }

    public void setWantItCtr(Integer wantItCtr) {
        this.wantItCtr = wantItCtr;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
