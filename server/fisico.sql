CREATE TABLE "public"."ong" (
	cnpj CHAR(18) NOT NULL PRIMARY KEY,
	active BOOLEAN NOT NULL DEFAULT false,
	foto VARCHAR(255) NOT NULL,
	hashDelete VARCHAR(255) NOT NULL,
	logradouro VARCHAR(50) NOT NULL,
	razao_social VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	senha VARCHAR(255) NOT NULL,
	numero VARCHAR(10) NOT NULL,
	complemento VARCHAR(30) NOT NULL,
	bairro VARCHAR(15) NOT NULL,
	cidade VARCHAR(15) NOT NULL,
	estado VARCHAR(50) NOT NULL,
	cep CHAR(9) NOT NULL,
	telefone VARCHAR(20) NOT NULL
)

CREATE TABLE "public"."doador" (
	id VARCHAR(255) NOT NULL PRIMARY KEY,
	active BOOLEAN NOT NULL DEFAULT false,
	foto VARCHAR(255) NOT NULL,
	hashDelete VARCHAR(255) NOT NULL,
	cidade VARCHAR(15) NOT NULL,
	estado VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	senha VARCHAR(255) NOT NULL,
	telefone VARCHAR(20) NOT NULL
)

CREATE TABLE "public"."pessoa_fisica" (
	cpf CHAR(14) NOT NULL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	sobrenome VARCHAR(50) NOT NULL,
	genero VARCHAR(10) NOT NULL,
	nascimento CHAR(10) NOT NULL,
	id_doador VARCHAR(255) REFERENCES "public"."doador" (id)
)

CREATE TABLE "public"."pessoa_juridica" (
	cnpj CHAR(18) NOT NULL PRIMARY KEY,
	razao_social VARCHAR(50) NOT NULL,
	id_doador VARCHAR(255) REFERENCES "public"."doador" (id)
)

CREATE TABLE "public"."doacao" (
	approved BOOLEAN NOT NULL DEFAULT false,
	numero VARCHAR(255) NOT NULL PRIMARY KEY,
	titulo VARCHAR(255) NOT NULL,
	descricao VARCHAR(355) NOT NULL,
	quantidade INTEGER NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT now(),
	id_doador VARCHAR(255) REFERENCES "public"."doador" (id),
	cnpj_ong CHAR(18) REFERENCES "public"."ong" (cnpj)
)

CREATE TABLE "public"."produto" (
	id VARCHAR(255) NOT NULL PRIMARY KEY,
	descricao VARCHAR(15) NOT NULL,
	quantidade INTEGER NOT NULL,
	numero_doacao VARCHAR(255) REFERENCES "public"."doacao" (numero)
)
