package com.algaworks.comercial.repository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.algaworks.comercial.model.Cargo;

public interface CargoRepository extends JpaRepository<Cargo, Long> {
	// O método pode ser criado dinamicamente a partir do nome findBy pelo jpa combinando o And ou qualquer outra coisa
		Optional<Cargo> findByNome(String nome);
		
		@Query(value = "Select c.* from cargo c order by c.nome asc limit ?1,  ?2 ", nativeQuery = true)         
	    List<Cargo> findCargos(int offset, int limit); 
}
