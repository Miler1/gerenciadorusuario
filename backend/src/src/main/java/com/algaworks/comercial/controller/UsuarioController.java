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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.algaworks.comercial.model.Perfil;
import com.algaworks.comercial.model.Usuario;
import com.algaworks.comercial.repository.UsuarioRepository;

@CrossOrigin
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
	
	@Autowired
	private UsuarioRepository usuarios;
	
	@GetMapping
	public List<Usuario> listar() {
		return usuarios.findAll(Sort.by(Sort.Direction.ASC, "nome"));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Usuario> buscar(@PathVariable Long id) {
		Optional<Usuario> usuario = usuarios.findById(id);
		
		if (!usuario.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(usuario.get());
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Long> deletar(@PathVariable("id") Long id) {
		Optional<Usuario> usuario = usuarios.findById(id);
		
		if (!usuario.isPresent()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
					"Este usuário não está cadastrado");
		} 
		
		usuarios.deleteById(id);
		return new ResponseEntity<>(id, HttpStatus.OK);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Usuario adicionar (@Valid @RequestBody Usuario usuario) { // @valid obriga validar primeiro antes de salvar
		Optional<Usuario> usuarioExistente = usuarios
				.findByCpf(usuario.getCpf());
		
		if (usuarioExistente.isPresent()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
					"Já existe um usuário com este cpf cadastrado");
		}
		
		return usuarios.save(usuario);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Usuario> updateUsuario(@PathVariable("id") Long id, @RequestBody Usuario usuario) {
		Optional<Usuario> usuarioData = usuarios.findById(id);
		
//		List<Usuario>it = usuarios.findAll();
//		it.forEach(e -> {
//			if (e.getCpf().contains(usuario.getCpf())) {
//				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
//						"Já existe um usuário com este cpf cadastrado");
//			}
//		});
		
		if (usuarioData.isPresent()) {
			Usuario _usuario = usuarioData.get();
			_usuario.setNome(usuario.getNome());
			_usuario.setCpf(usuario.getCpf());
			_usuario.setDataNascimento(usuario.getDataNascimento());
			_usuario.setSexo(usuario.getSexo());
			_usuario.setCargo(usuario.getCargo());
			_usuario.setPerfil(usuario.getPerfil());
			return new ResponseEntity<>(usuarios.save(_usuario), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
}
