package com.devsuperior.movieflix.dto;

import java.io.Serializable;

import com.devsuperior.movieflix.entities.Genre;

public class GenreDTO implements Serializable{
		private static final long serialVersionUID = 1L;
		
	private long id;
	private String name;
	
	
	public GenreDTO() {
		
	}

	public GenreDTO(long id, String name) {
		
		this.id = id;
		this.name = name;
	}
	
	public GenreDTO(Genre entity) {
		super();
		this.id = entity.getId();
		this.name = entity.getName();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	
	
}
