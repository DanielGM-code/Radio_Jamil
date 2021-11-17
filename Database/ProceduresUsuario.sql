DELIMITER //

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Create_Usuario//
CREATE PROCEDURE SP_Create_Usuario (
    correo varchar(255),
    nombreUsuario varchar(255),
    password varchar(255), 
    tipoUsuario varchar(255))
BEGIN
    INSERT INTO Usuario (username, nombreUsuario, password, tipoUsuario, estadoUsuario) 
    VALUES (username, nombreUsuario, password, tipoUsuario, 'activo');
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Read_Usuario//
CREATE PROCEDURE SP_Read_Usuario(mail varchar(255), pass varchar(255))
BEGIN
    SELECT * FROM Usuario WHERE correo = mail AND password = pass AND estadoUsuario = 'activo';
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Update_Usuario//
CREATE PROCEDURE SP_Update_Usuario(
    id int,
    mail varchar(255) 
    nombre varchar(255),
    pass varchar(255),
    tipo varchar(255),
    estado varchar(255))
BEGIN
    UPDATE Usuario SET
        correo = mail,
        nombreUsuario = nombre,
        password = pass,
        tipoUsuario = tipoUsuario,
        estadoUsuario = estado
    WHERE idUsuario = id;
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Delete_Usuario//
CREATE PROCEDURE SP_Delete_Usuario(id int)
BEGIN
    UPDATE Usuario SET estadoUsuario = 'inactivo' WHERE idUsuario = id;
END//