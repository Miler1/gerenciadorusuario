DROP TABLE IF EXISTS cargo;

CREATE TABLE cargo (
	id INTEGER AUTO_INCREMENT NOT NULL,
	nome VARCHAR(80) NOT NULL UNIQUE,
	
	PRIMARY KEY (id)
);