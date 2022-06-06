package com.swapshop.SwapShop.controllers;

import com.swapshop.SwapShop.entities.Image;
import com.swapshop.SwapShop.services.ImageService;
import org.apache.tomcat.jni.FileInfo;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/file")
public class FileController {
    private final ImageService imageService;

    public FileController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/upload/{id}")
    public ResponseEntity<?> uploadImage(@RequestParam("file")MultipartFile file, @PathVariable String id){
        String message = "";
        try{
            imageService.save(file, id);
            message = "File uploaded successfully";
            return ResponseEntity.ok(message);
        }catch (Exception e){
            message = "Could not upload file.";
            return ResponseEntity.badRequest().body(message);
        }
    }


    @GetMapping("/files")
    public ResponseEntity<?> getFilesList(){
        List<Image> images = imageService.loadAll().map(path -> {
            String filename = path.getFileName().toString();
            String url = MvcUriComponentsBuilder
                    .fromMethodName(FileController.class, "getFile", path.getFileName().toString()).build().toString();

            return new Image(filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.ok(images);
    }

    @GetMapping("/files/{filename}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename){
        Resource file = imageService.load(filename);
        return ResponseEntity.ok(file);
    }


}
