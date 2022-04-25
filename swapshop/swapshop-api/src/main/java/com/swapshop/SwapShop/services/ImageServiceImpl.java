package com.swapshop.SwapShop.services;

import com.swapshop.SwapShop.entities.Image;
import com.swapshop.SwapShop.entities.Post;
import com.swapshop.SwapShop.repositories.ImageRepository;
import com.swapshop.SwapShop.repositories.PostRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService{
    private final ImageRepository imageRepository;

    public ImageServiceImpl(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    public void save(MultipartFile file, Post post) throws IOException {
        Image image = new Image();
        image.setName(StringUtils.cleanPath(file.getOriginalFilename()));
        image.setContentType(file.getContentType());
        image.setData(file.getBytes());
        image.setSize(file.getSize());
        image.setPost(post);
        imageRepository.save(image);
    }


    @Override
    public Optional<Image> getImage(Long id){
        return imageRepository.findById(id);
    }

    @Override
    public List<Image> getAllImages(){
        return imageRepository.findAll();
    }
}
