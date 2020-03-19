package com.algaworks.comercial.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.algaworks.comercial.model.Perfil;

public interface PerfilRepository extends JpaRepository<Perfil, Long>{
	// O método pode ser criado dinamicamente a partir do nome findBy pelo jpa combinando o And ou qualquer outra coisa
	Optional<Perfil> findByNome(String nome);
}
