package com.algaworks.comercial.model;

import java.security.Timestamp;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Entity
public class Usuario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty
	@Size(max = 80)
	@Column(name = "nome")
	private String nome;
	
	@NotEmpty
	@Size(max = 80)
	@Column(name = "cpf")
	private String cpf;
	
	@Column(name = "data_nascimento")
	private Date dataNascimento; 
	
	@Column(name = "sexo")
	private String sexo;
	
//	@OneToOne(optional = false)
//	@JoinColumn(name = "cargo_id", nullable = false)
	@ManyToOne
	@JoinColumn
	private Cargo cargo;
	
//	@OneToOne(optional = false)
//	@JoinColumn(name = "perfil_id", nullable = false)
	@ManyToOne
	@JoinColumn
	private Perfil perfil;
	
	@Column(name = "data_cadastro")
	private Timestamp dataCadastro;
	
//	public Date getDataCadastro() {
//		return dataCadastro;
//	}
//
//	public void setDataCadastro(Date dataCadastro) {
//		this.dataCadastro = dataCadastro;
//	}

	public Usuario() {
		
	}
	
	public Usuario(Long id, String nome, String cpf, Date dataNascimento, String sexo, Cargo cargo, Perfil perfil, Timestamp dataCadastro) {
		this.id = id;
		this.nome = nome;
		this.cpf = cpf;
		this.dataNascimento = dataNascimento;
		this.sexo = sexo;
		this.cargo = cargo;
		this.perfil = perfil;
		this.dataCadastro = dataCadastro;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public Date getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public Cargo getCargo() {
		return cargo;
	}

	public void setCargo(Cargo cargo) {
		this.cargo = cargo;
	}

	public Perfil getPerfil() {
		return perfil;
	}

	public void setPerfil(Perfil perfil) {
		this.perfil = perfil;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Usuario other = (Usuario) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
}
