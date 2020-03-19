package com.algaworks.comercial.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.algaworks.comercial.model.Perfil;
import com.algaworks.comercial.model.Usuario;
import com.algaworks.comercial.repository.PerfilRepository;

@CrossOrigin
@RestController
@RequestMapping("/perfis")
public class PerfilController {
	
	@Autowired
	private PerfilRepository perfis;
	
	@GetMapping
	public List<Perfil> listar() {
		return perfis.findAll(Sort.by(Sort.Direction.ASC, "nome"));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Perfil> buscar(@PathVariable Long id) {
		Optional<Perfil> perfil = perfis.findById(id);
		
		if (!perfil.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(perfil.get());
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Perfil adicionar (@Valid @RequestBody Perfil perfil) { // @valid obriga validar primeiro antes de salvar
		Optional<Perfil> perfilExistente = perfis
				.findByNome(perfil.getNome());
		
		if (perfilExistente.isPresent()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
					"Já existe um perfil com a mesma descrição");
		}
		
		return perfis.save(perfil);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Long> deletar(@PathVariable("id") Long id) {
		Optional<Perfil> perfil = perfis.findById(id);
		
		if (!perfil.isPresent()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
					"Este usuário não está cadastrado");
		} 
		
		perfis.deleteById(id);
		return new ResponseEntity<>(id, HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Perfil> updatePerfil(@PathVariable("id") Long id, @RequestBody Perfil perfil) {
		Optional<Perfil> perfilData = perfis.findById(id);
		
		if (perfilData.isPresent()) {
			Perfil _perfil = perfilData.get();
			_perfil.setNome(perfil.getNome());
			return new ResponseEntity<>(perfis.save(_perfil), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
}
