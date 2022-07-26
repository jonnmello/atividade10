package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.dto.MovieGenreDTO;
import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.exceptions.ResourceNotFoundException;
import com.devsuperior.movieflix.repositories.GenreRepository;
import com.devsuperior.movieflix.repositories.MovieRepository;

@Service
public class MovieService  {


	@Autowired
	private MovieRepository repository;

	@Autowired
	private GenreRepository genreRepository;
	
	
	@Transactional(readOnly = true)
	public MovieGenreDTO findById(Long id) {
		Optional<Movie> obj = repository.findById(id);
		Movie entity = obj.orElseThrow(() -> new ResourceNotFoundException("Movie not found"));
		return new MovieGenreDTO(entity);

	}

	@Transactional(readOnly = true)
	public Page<MovieDTO> find(Long genreId, Pageable pageable) {
		Genre genre = (genreId == 0L) ? null : genreRepository.getOne(genreId);
		Page<Movie> page = repository.find(genre,pageable);
		repository.findMoviesWithGenre(page.getContent());
		return page.map(MovieDTO::new);
	}

	@Transactional(readOnly = true)
	public List<ReviewDTO> findReviews(Long id) {
		List<Review> list = repository.findReviews(id);
		return list.stream().map(ReviewDTO::new).collect(Collectors.toList());
	
	}
}
