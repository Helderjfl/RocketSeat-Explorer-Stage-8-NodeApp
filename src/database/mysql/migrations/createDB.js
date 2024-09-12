const createDB = `CREATE DATABASE IF NOT EXISTS movies;`

const useDB = ` USE movies;`

const createUsers = `
CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
`

const insertInitialUsers = `
INSERT INTO users
(name, email, password)
VALUES
('Pedro', 'pedro@gmail.com', '123'),
('João', 'joao@gmail.com', '234'),
('Maria', 'maria@gmail.com', '356');
`

export { createUsers, createDB, useDB, insertInitialUsers }