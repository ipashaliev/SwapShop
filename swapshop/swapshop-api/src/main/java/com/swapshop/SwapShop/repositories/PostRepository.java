package com.swapshop.SwapShop.repositories;

import com.swapshop.SwapShop.entities.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p FROM Post p WHERE p.active=true ")
    Page<Post> findAllActive(Pageable pageable);

    List<Post> findAll();

    List<Post> findByTitleContainingIgnoreCase(String title);

    List<Post> findByUserId(Long userid);


}