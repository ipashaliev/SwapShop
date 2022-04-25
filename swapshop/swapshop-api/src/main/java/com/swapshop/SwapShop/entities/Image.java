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

    private String contentType;

    private Long size;

    @OneToOne
    private Post post;

    @Lob
    private byte[] data;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }
    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }
}