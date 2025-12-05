#CREATE DATABASE pruebatecnica;

#USE pruebatecnica;

CREATE TABLE USERS (
	IdUser INT AUTO_INCREMENT PRIMARY KEY ,
	Nombre VARCHAR (20),
	Correo VARCHAR (50) UNIQUE,
	Contraseña VARCHAR (255)
);

CREATE TABLE TASKS(
	IdTask INT AUTO_INCREMENT PRIMARY KEY,
    IdUser INT,
	Descripcion VARCHAR (100),
	Estado ENUM ("Pendiente", "Completa") DEFAULT "Pendiente",
	FechaCreacion DATETIME DEFAULT NOW() ,
    FechaModificacion DATETIME,
    FOREIGN KEY (IdUser) REFERENCES USERS(IdUser)
);



