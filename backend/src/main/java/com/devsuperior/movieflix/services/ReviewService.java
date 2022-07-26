package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.ReviewRepository;

@Service
public class ReviewService {

	@Autowired
	private ReviewRepository repository;
	@Autowired
	private AuthService authService;

	@Transactional(readOnly = true)
	public List<ReviewDTO> findAll() {
		List<Review> list = repository.findAll();
		return list.stream().map(ReviewDTO::new).collect(Collectors.toList());

	}

	public ReviewDTO save(ReviewDTO dto) {
		User user = authService.authenticated();		
		Review enity = new Review();
		enity.setMovie(new Movie(dto.getMovieId(), null, null, 0, null, null, null));
		enity.setText(dto.getText());
		enity.setUser(user);
		enity = repository.save(enity);
		return new ReviewDTO(enity);
	}

}