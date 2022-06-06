package com.swapshop.SwapShop.services;

import com.swapshop.SwapShop.entities.Image;
import com.swapshop.SwapShop.entities.Post;
import com.swapshop.SwapShop.repositories.ImageRepository;
import com.swapshop.SwapShop.repositories.PostRepository;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class ImageServiceImpl implements ImageService {
    private final Path root = Paths.get("../swapshopui/public/images");

    @Override
    public void init() {
        try{
            Files.createDirectory(root);
        }catch (IOException e){
            return;
        }
    }

    private String getFileExtension(String filename){
        int idx = filename.lastIndexOf('.');
        return filename.substring(idx + 1);
    }

    @Override
    public void save(MultipartFile file, String id) {
        try {
            Files.copy(file.getInputStream(), this.root.resolve(id + "." + getFileExtension(file.getOriginalFilename())));
        } catch (Exception e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }

    @Override
    public Resource load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(root.toFile());
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.root, 1).filter(path -> !path.equals(this.root)).map(this.root::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }
}
