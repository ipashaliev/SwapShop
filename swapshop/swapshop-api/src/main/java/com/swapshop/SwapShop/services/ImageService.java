package com.swapshop.SwapShop.services;

import com.swapshop.SwapShop.entities.Image;
import com.swapshop.SwapShop.entities.Post;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public interface ImageService {
    public void init();
    public void save(MultipartFile file, String id);
    public Resource load(String filename);
    public void deleteAll();
    public Stream<Path> loadAll();
}
