package com.klef.cicd.bookapi;
import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.cicd.bookapi.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
}