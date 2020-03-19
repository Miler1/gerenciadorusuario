DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario (
	id INTEGER AUTO_INCREMENT NOT NULL,
	cargo_id INTEGER NOT NULL,
	perfil_id INTEGER,
	nome VARCHAR(80) NOT NULL,
	cpf VARCHAR(14) NOT NULL UNIQUE,
	data_nascimento DATE,
	sexo CHAR(1),
	data_cadastro DATE,
	FOREIGN KEY (cargo_id) REFERENCES cargo(id),
	FOREIGN KEY (perfil_id) REFERENCES perfil(id),
	
	PRIMARY KEY (id)
);