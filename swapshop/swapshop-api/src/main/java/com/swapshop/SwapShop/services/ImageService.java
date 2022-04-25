package com.swapshop.SwapShop.services;

import com.swapshop.SwapShop.entities.Image;
import com.swapshop.SwapShop.entities.Post;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public interface ImageService {
    void save(MultipartFile file, Post post) throws IOException;
    Optional<Image> getImage(Long id);
    List<Image> getAllImages();
}
