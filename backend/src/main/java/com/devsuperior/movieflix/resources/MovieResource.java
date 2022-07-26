package com.devsuperior.movieflix.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.dto.MovieGenreDTO;
import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.services.MovieService;

@RestController 
@RequestMapping(value = "/movies") 
public class MovieResource {
	
	
	@Autowired
	private MovieService service;

	@GetMapping
	public ResponseEntity<Page<MovieDTO>> profile(
			@RequestParam(name = "genreId" ,defaultValue = "0") Long genreId,
			Pageable pageable) {
		
		PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("title").ascending());
		Page<MovieDTO> list = service.find(genreId,pageRequest);
		return ResponseEntity.ok().body(list);

	}
	
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<MovieGenreDTO> findById(@PathVariable Long id) {
		MovieGenreDTO dto = service.findById(id);
		return ResponseEntity.ok().body(dto);
	}


	@GetMapping(value = "/{id}/reviews")
	public ResponseEntity<List<ReviewDTO>> findReviews(@PathVariable Long id) {
		List<ReviewDTO> dto = service.findReviews(id);
		return ResponseEntity.ok().body(dto);
	}
}

