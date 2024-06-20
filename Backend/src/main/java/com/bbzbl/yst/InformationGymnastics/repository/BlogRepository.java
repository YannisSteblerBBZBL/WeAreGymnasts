package com.bbzbl.yst.InformationGymnastics.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.bbzbl.yst.InformationGymnastics.model.Blog;

@Repository
public interface BlogRepository extends MongoRepository<Blog, String> {}