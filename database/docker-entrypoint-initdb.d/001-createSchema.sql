CREATE TABLE produto (
	id BIGSERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	descricao TEXT NOT NULL DEFAULT '',
	valor_venda BIGINT NOT NULL DEFAULT 0
);

CREATE TABLE mesa (
	id BIGSERIAL PRIMARY KEY,
	capacidade_pessoas INT NOT NULL DEFAULT 1
);

CREATE TABLE ingrediente (
	id BIGSERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	qtd_minima_estoque BIGINT NOT NULL DEFAULT 0,
	unidade TEXT NOT NULL
);

CREATE TABLE usuario (
	id BIGSERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	username TEXT UNIQUE NOT NULL,
	senha TEXT NOT NULL,
	tipo INT NOT NULL
);

CREATE TABLE reserva (
	id BIGSERIAL PRIMARY KEY,
	id_mesa BIGINT NOT NULL,
	id_cliente BIGINT NOT NULL,
	inicio_utilizacao TIMESTAMP NOT NULL,
	fim_utilizacao TIMESTAMP NOT NULL,
	FOREIGN KEY (id_mesa) REFERENCES mesa(id),
	FOREIGN KEY (id_cliente) REFERENCES usuario(id)
);

CREATE TABLE pedido (
	id BIGSERIAL PRIMARY KEY,
	id_cliente BIGINT NOT NULL,
	id_vendedor BIGINT NOT NULL,
	id_barista BIGINT NOT NULL,
	avaliacao_nps INT,
	avaliacao_comentario TEXT,
	FOREIGN KEY (id_cliente) REFERENCES usuario(id),
	FOREIGN KEY (id_vendedor) REFERENCES usuario(id),
	FOREIGN KEY (id_barista) REFERENCES usuario(id)
);

CREATE TABLE pedido_produto (
	id_pedido BIGINT,
	id_produto BIGINT,
	quantidade INT NOT NULL DEFAULT 1,
	observacoes TEXT,
	PRIMARY KEY (id_pedido, id_produto),
	FOREIGN KEY (id_pedido) REFERENCES pedido(id),
	FOREIGN KEY (id_produto) REFERENCES produto(id)
);

CREATE TABLE receita (
	id BIGSERIAL PRIMARY KEY,
	id_produto BIGINT NOT NULL,
	modo_preparo TEXT NOT NULL,
	FOREIGN KEY (id_produto) REFERENCES produto(id)
);

CREATE TABLE receita_ingredientes (
	id_receita BIGINT,
	id_ingrediente BIGINT,
	quantidade BIGINT NOT NULL,
	unidade TEXT NOT NULL,
	PRIMARY KEY (id_receita, id_ingrediente),
	FOREIGN KEY (id_receita) REFERENCES receita(id),
	FOREIGN KEY (id_ingrediente) REFERENCES ingrediente(id)
);

CREATE TABLE estoque (
	id_ingrediente BIGINT PRIMARY KEY,
	unidade TEXT NOT NULL,
	quantidade BIGINT NOT NULL DEFAULT 0,
	FOREIGN KEY (id_ingrediente) REFERENCES ingrediente(id)
);

CREATE TABLE turno (
	id BIGSERIAL PRIMARY KEY,
	id_funcionario BIGINT,
	entrada_programada TIMESTAMP NOT NULL,
	saida_programada TIMESTAMP NOT NULL,
	entrada_efetiva TIMESTAMP,
	saida_efetiva TIMESTAMP,
	UNIQUE (id_funcionario, entrada_programada, saida_programada),
	FOREIGN KEY (id_funcionario) REFERENCES usuario(id)
);

