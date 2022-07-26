package com.devsuperior.movieflix.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.devsuperior.movieflix.entities.Review;

public class ReviewDTO implements Serializable{
		private static final long serialVersionUID = 1L;
		
		private Long id;
		@NotBlank(message = "Não é permitido texto vazio na avaliação!")
		private String text;
		private Long movieId;
		private UserDTO user;
		public ReviewDTO() {
			super();
		}
		public ReviewDTO(Review enity) {
			super();
			this.id = enity.getId();
			this.text = enity.getText();
			this.movieId = enity.getMovie().getId();
			this.user = new UserDTO(enity.getUser());
		}
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getText() {
			return text;
		}
		public void setText(String text) {
			this.text = text;
		}
		public Long getMovieId() {
			return movieId;
		}
		public void setMovieId(Long movieId) {
			this.movieId = movieId;
		}
		public UserDTO getUser() {
			return user;
		}
		public void setUser(UserDTO user) {
			this.user = user;
		}
		
		

	}