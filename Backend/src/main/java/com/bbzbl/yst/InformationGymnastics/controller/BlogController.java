package com.bbzbl.yst.InformationGymnastics.controller;

import com.bbzbl.yst.InformationGymnastics.model.Blog;
import com.bbzbl.yst.InformationGymnastics.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BlogController {
    @Autowired
    private BlogRepository blogRepository;

    @GetMapping("/blogs")
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    @PostMapping("/blogs")
    public ResponseEntity<String> createBlog(@RequestBody Blog blog, Authentication auth) {
        if (auth != null) {
            blog.setAuthor(auth.getName());
            blogRepository.save(blog);
            return ResponseEntity.ok("Blog created successfully");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You need to be logged in to post a blog");
        }
    }
}