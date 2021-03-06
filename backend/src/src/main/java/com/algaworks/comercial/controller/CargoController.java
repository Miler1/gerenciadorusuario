package com.algaworks.comercial.controller;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.print.attribute.standard.PageRanges;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

import com.algaworks.comercial.model.Cargo;
import com.algaworks.comercial.model.Perfil;
import com.algaworks.comercial.repository.CargoRepository;
import com.algaworks.comercial.util.ChunkRequest;
import com.algaworks.comercial.util.OffsetBasedPageRequest;

@CrossOrigin
@RestController
@RequestMapping("/cargos")
public class CargoController {
	
	@Autowired
	private CargoRepository cargos;
	
	@GetMapping
	 public List<Cargo> listar() {
		return cargos.findAll(Sort.by(Sort.Direction.ASC, "nome"));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Cargo> buscar(@PathVariable Long id) {
		Optional<Cargo> cargo = cargos.findById(id);
		
		if (!cargo.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(cargo.get());
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Cargo adicionar (@Valid @RequestBody Cargo cargo) { // @valid obriga validar primeiro antes de salvar
		Optional<Cargo> cargoExistente = cargos
				.findByNome(cargo.getNome());
		
		if (cargoExistente.isPresent()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
					"Já existe um cargo com esta mesma descrição");
		}
		
		return cargos.save(cargo);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Long> deletar(@PathVariable("id") Long id) {
		Optional<Cargo> cargo = cargos.findById(id);
		
		if (!cargo.isPresent()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
					"Há um usuário associado a este cargo");
		} 
		
		cargos.deleteById(id);
		return new ResponseEntity<>(id, HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Cargo> updateCargo(@PathVariable("id") Long id, @RequestBody Cargo cargo) {
		Optional<Cargo> cargoData = cargos.findById(id);
		
//		if (cargoData.isPresent()) {
//			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
//					"Já existe um cargo com esta mesma descrição");
//		}
		
		if (cargoData.isPresent()) {
			Cargo _cargo = cargoData.get();
			_cargo.setNome(cargo.getNome());
			return new ResponseEntity<>(cargos.save(_cargo), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
