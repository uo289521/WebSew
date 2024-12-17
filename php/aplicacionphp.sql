
CREATE DATABASE IF NOT EXISTS aplicacionPhp;

USE aplicacionPhp;

CREATE TABLE IF NOT EXISTS Circuito (
    nombre VARCHAR(255) PRIMARY KEY,
    n_vueltas INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Empresa_Venta_Gasolina (
    nombre VARCHAR(255) PRIMARY KEY,
    precio_por_litro DECIMAL(5, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS Escuderia (
    nombre VARCHAR(255) PRIMARY KEY,
    empresa_nombre VARCHAR(255) NOT NULL,
    FOREIGN KEY (empresa_nombre) REFERENCES Empresa_Venta_Gasolina(nombre)
);


CREATE TABLE IF NOT EXISTS Patrocinador (
    nombre VARCHAR(255) PRIMARY KEY,
    monto_aportado DECIMAL(10, 2) NOT NULL,
    escuderia_nombre VARCHAR(255) NOT NULL,
    FOREIGN KEY (escuderia_nombre) REFERENCES Escuderia(nombre)
);


CREATE TABLE IF NOT EXISTS F1 (
    modelo VARCHAR(255) PRIMARY KEY,
    consumo_vuelta DECIMAL(5, 2) NOT NULL,
    escuderia_nombre VARCHAR(255) NOT NULL,
    FOREIGN KEY (escuderia_nombre) REFERENCES Escuderia(nombre)
);
