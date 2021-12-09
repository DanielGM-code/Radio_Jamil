-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema radio
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema radio
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `radio` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `radio` ;

-- -----------------------------------------------------
-- Table `radio`.`Artista`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `radio`.`Artista` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  `estado` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4905
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `radio`.`CambiosHorario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `radio`.`CambiosHorario` (
  `idHorario` INT NULL DEFAULT NULL,
  `idUsuario` INT NULL DEFAULT NULL,
  `fechahora` DATETIME NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `radio`.`Cancion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `radio`.`Cancion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  `idArtista` INT NULL DEFAULT NULL,
  `idGenero` INT NULL DEFAULT NULL,
  `idCategoria` INT NULL DEFAULT NULL,
  `referencia` VARCHAR(55) NULL DEFAULT NULL,
  `estado` VARCHAR(20) NULL DEFAULT NULL,
  `esPeticion` TINYINT(1) NULL DEFAULT NULL,
  `diasReproduccion` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 12776
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `radio`.`Categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `radio`.`Categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  `estado` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 70
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `radio`.`Genero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `radio`.`Genero` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  `estado` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 61
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `radio`.`Horario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `radio`.`Horario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idPrograma` INT NULL DEFAULT NULL,
  `idPatron` INT NULL DEFAULT NULL,
  `dia` VARCHAR(15) NULL DEFAULT NULL,
  `hora` TIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `radio`.`HorarioCancion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `radio`.`HorarioCancion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idHorario` INT NULL DEFAULT NULL,
  `idCancion` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 40
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `radio`.`Patron`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `radio`.`Patron` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  `estado` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 25
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `radio`.`PatronCategoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `radio`.`PatronCategoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idPatron` INT NULL DEFAULT NULL,
  `idCategoria` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 42
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `radio`.`Programa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `radio`.`Programa` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  `estado` VARCHAR(10) NULL DEFAULT NULL,
  `descripcion` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `radio`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `radio`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombreUsuario` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `tipoUsuario` VARCHAR(20) NULL DEFAULT NULL,
  `estadoUsuario` VARCHAR(20) NULL DEFAULT NULL,
  `correo` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `radio` ;

-- -----------------------------------------------------
-- procedure SP_Canciones_No_Utilizadas
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Canciones_No_Utilizadas`()
BEGIN
	SELECT cancion.id, cancion.nombre, cancion.idArtista, Genero.Nombre AS Genero, Categoria.Nombre AS Categoria, Artista.nombre as nombreArtista
	FROM (SELECT * FROM Cancion WHERE Cancion.id NOT IN (SELECT Cancion.id FROM HorarioCancion LEFT JOIN Cancion ON HorarioCancion.idCancion = Cancion.id )) as cancion
	INNER JOIN Artista ON cancion.idArtista = Artista.id
	INNER JOIN Genero ON cancion.idGenero = Genero.id
	INNER JOIN Categoria ON cancion.idCategoria = Categoria.id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Canciones_Utilizadas
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Canciones_Utilizadas`()
BEGIN
	SELECT cancion.id, cancion.nombre, cancion.idArtista, Genero.Nombre AS Genero, Categoria.Nombre AS Categoria, Artista.nombre as nombreArtista
	FROM (SELECT Cancion.* FROM HorarioCancion LEFT JOIN Cancion ON HorarioCancion.idCancion = Cancion.id) as cancion
	INNER JOIN Artista ON cancion.idArtista = Artista.id
	INNER JOIN Genero ON cancion.idGenero = Genero.id
	INNER JOIN Categoria ON cancion.idCategoria = Categoria.id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Create_Artista
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Create_Artista`(nombre varchar(255))
BEGIN
    INSERT INTO Artista (nombre, estado) VALUES (nombre, 'activo');
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Create_Cancion
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Create_Cancion`(
	id INT, 
    nombre VARCHAR(255), 
    idArtista INT, 
    idGenero INT, 
    idCategoria INT,
    nombreArtista VARCHAR(255),
    nombreGenero VARCHAR(255),
    nombreCategoria VARCHAR(255)
)
BEGIN
    IF idArtista = 0 THEN 
		INSERT INTO Artista(nombre, estado) VALUES (UPPER(nombreArtista), 'activo');
        SET idArtista = LAST_INSERT_ID();
    END IF;
    
    IF idGenero = 0 THEN
		INSERT INTO Genero(nombre, estado) VALUES (UPPER(nombreGenero), 'activo');
        SET idGenero = LAST_INSERT_ID();
    END IF;
    
    IF idCategoria = 0 THEN
		INSERT INTO Categoria(nombre, estado) VALUES (UPPER(nombreCategoria), 'activo');
        SET idCategoria = LAST_INSERT_ID();
    END IF;
    
    IF id = 0 THEN
		INSERT INTO Cancion(nombre, idArtista, idGenero, idCategoria, estado)  VALUES(UPPER(nombre), idArtista, idGenero, idCategoria, 'activo');
	ELSE
		UPDATE Cancion SET 
			Cancion.nombre = UPPER(nombre),
            Cancion.idArtista = idArtista,
            Cancion.idGenero = idGenero,
            Cancion.idCategoria = idCategoria
		WHERE
			Cancion.id = id;
    END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Create_Categoria
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`seth`@`%` PROCEDURE `SP_Create_Categoria`(
	nombre VARCHAR(255)
)
BEGIN
	INSERT INTO Categoria(nombre, estado) VALUES(nombre, 'activo');
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Create_Genero
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`seth`@`%` PROCEDURE `SP_Create_Genero`(
	nombre VARCHAR(255)
)
BEGIN
	INSERT INTO Genero(nombre, estado) VALUES(nombre, 'activo');
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Create_Horario
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Create_Horario`(
    idProgramacion int,
    idPatron int,
    dia varchar(15),
    hora time,
    OUT estadoConsulta varchar(255),
    OUT mensaje varchar(255)
)
BEGIN
    IF EXISTS (SELECT * FROM Patron WHERE Patron.idPatron = idPatron) THEN
    BEGIN
        IF EXISTS (SELECT * FROM Programacion WHERE Programacion.idProgramacion = idProgramacion) THEN
        BEGIN
            INSERT INTO Horario (idProgramacion, idPatron, dia, hora)
            VALUES (idProgramacion, idPatron, dia, hora);
            SET estadoConsulta = 'OK';
            SET mensaje = 'Registro realizado de manera exitosa';
        END;
        ELSE
        BEGIN
            SET estadoConsulta = 'FAIL';
            SET mensaje = 'No existe la Programacion especificada.';
        END;
        END IF;
    END;
    ELSE
    BEGIN
        SET estadoConsulta = 'FAIL';
        SET mensaje = 'No existe el Patron especificado.';
    END;
    END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Create_Patron
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Create_Patron`(
	id INT,
    nombre varchar(255),
    OUT idRespuesta INT
)
BEGIN
	IF id = 0 THEN
		INSERT INTO Patron (nombre, estado) VALUES (nombre, 'activo');
		SET idRespuesta = last_insert_id();
    ELSE 
		UPDATE Patron SET Patron.nombre = nombre WHERE Patron.id = id;
        SET idRespuesta = id;
	END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Create_Patron_Categoria
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`seth`@`%` PROCEDURE `SP_Create_Patron_Categoria`(
	idPatron INT,
    idCategoria INT
)
BEGIN
	INSERT INTO PatronCategoria(idPatron, idCategoria) VALUES (idPatron, idCategoria);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Create_Programacion
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Create_Programacion`(
    nombre varchar(255)
)
BEGIN
    INSERT INTO Programacion (nombre, estado) VALUES (nombre, 'activo');
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Create_ProgramacionCancion
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Create_ProgramacionCancion`(
    idProgramacion int,
    idCancion int,
    OUT estadoConsulta varchar(255),
    OUT mensaje varchar(255)
)
BEGIN
    IF EXISTS (SELECT * FROM Programacion WHERE Programacion.idProgramacion = idProgramacion) THEN
    BEGIN
        IF EXISTS (SELECT * FROM Cancion WHERE Cancion.idCancion = idCancion) THEN 
        BEGIN
            INSERT INTO ProgramaCancion (idProgramacion, idCancion)
            VALUES (idProgramacion, idCancion);
            SET estadoConsulta = 'OK';
            SET mensaje = 'Registro exitoso.';
        END;
        ELSE
        BEGIN
            SET estadoConsulta = 'FAIL';
            SET mensaje = 'No existe la Cancion especificada.';
        END;
        END IF;
    END;
    ELSE
    BEGIN
        SET estadoConsulta = 'FAIL';
        SET mensaje = 'No existe la Programacion especificada';
    END;
    END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Delete_Artista
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Delete_Artista`(IN id int)
BEGIN
    UPDATE Cancion SET Cancion.estado = 'inactivo' WHERE idArtista = Cancion.id;
    UPDATE Artista SET Artista.estado = 'inactivo' WHERE idArtista = Cancion.id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Delete_Cancion
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Delete_Cancion`(
	id int
)
BEGIN
    UPDATE Cancion SET estado = 'inactivo' WHERE Cancion.id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Delete_Horario
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Delete_Horario`(
    idHorario int
)
BEGIN
    DELETE FROM Horario WHERE id = idHorario;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Delete_Patron
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Delete_Patron`(
    id int
)
BEGIN
    UPDATE Patron SET estado = 'inactivo' WHERE Patron.id = id;
    DELETE FROM PatronCategoria WHERE PatronCategoria.idPatron = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Delete_Patron_Categoria
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`seth`@`%` PROCEDURE `SP_Delete_Patron_Categoria`(
	idPatron INT
)
BEGIN
	DELETE FROM PatronCategoria WHERE PatronCategoria.idPatron = idPatron;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Delete_Programa
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Delete_Programa`(
	idPrograma int
)
BEGIN
	UPDATE Programa SET estado = 'inactivo' WHERE id = idPrograma;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Delete_ProgramaCancion
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Delete_ProgramaCancion`(
    idProgramaCancion int
)
BEGIN
    DELETE FROM ProgramaCancion WHERE id = idProgramaCancion;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Delete_Programacion
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Delete_Programacion`(
    id int
)
BEGIN
    UPDATE Programacion SET estado = 'inactivo' WHERE idProgramacion = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Generate_HorarioCancion
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`seth`@`%` PROCEDURE `SP_Generate_HorarioCancion`()
BEGIN
	DECLARE idPtrn INT DEFAULT 0;
    DECLARE idCate INT DEFAULT 0;
    DECLARE idCanc INT DEFAULT 0;
    DECLARE idHr INT DEFAULT 0;
    DECLARE aleatorio INT DEFAULT 0;
	DECLARE cont1 INT DEFAULT 0;
	DECLARE cont2 INT DEFAULT 0;

	DROP TEMPORARY TABLE IF EXISTS hc;
	CREATE TEMPORARY TABLE hc SELECT * FROM HorarioCancion LIMIT 0;
        
    WHILE EXISTS (SELECT idPatron FROM Horario LIMIT cont1, 1) DO
		SELECT idPatron, id INTO idPtrn, idHr FROM Horario LIMIT cont1, 1;
        
		WHILE EXISTS (SELECT idCategoria FROM PatronCategoria WHERE PatronCategoria.idPatron = idPtrn LIMIT cont2, 1) DO
			SELECT idCategoria INTO idCate FROM PatronCategoria WHERE PatronCategoria.idPatron = idPtrn LIMIT cont2, 1;
            
            SELECT b1.id 
            INTO aleatorio
			FROM Cancion AS b1
			JOIN (SELECT CEIL(RAND() * (SELECT MAX(id) FROM Cancion)) AS id) AS b2
			WHERE b1.id >= b2.id
			ORDER BY b1.id
			LIMIT 1;
            
			INSERT INTO hc(idHorario, idCancion) VALUES(idHr, aleatorio);            
            SET cont2 = cont2 + 1;
        END WHILE;
        
        SET cont2 = 0;
		SET cont1 = cont1 + 1;
    END WHILE;
    
    DELETE FROM HorarioCancion;
    INSERT INTO HorarioCancion 
    SELECT * 
    FROM hc;
    
    SELECT * FROM HorarioCancion;
	DROP TEMPORARY TABLE hc;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_All_Artista
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Read_All_Artista`()
BEGIN
    SELECT * FROM Artista WHERE estado = 'activo';
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_All_Cancion
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Read_All_Cancion`()
BEGIN
    SELECT cancion.id, cancion.nombre, cancion.idArtista, cancion.idGenero, cancion.idCategoria, Artista.nombre as nombreArtista
	FROM (SELECT * FROM Cancion WHERE estado = 'activo') as cancion
	INNER JOIN Artista ON cancion.idArtista = Artista.id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_All_Cancion_Reporte
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`seth`@`%` PROCEDURE `SP_Read_All_Cancion_Reporte`()
BEGIN
    SELECT cancion.id, cancion.nombre, cancion.idArtista, Genero.Nombre AS Genero, Categoria.Nombre AS Categoria, Artista.nombre as nombreArtista
	FROM (SELECT * FROM Cancion WHERE estado = 'activo') as cancion
	INNER JOIN Artista ON cancion.idArtista = Artista.id
	INNER JOIN Genero ON cancion.idGenero = Genero.id
	INNER JOIN Categoria ON cancion.idCategoria = Categoria.id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_All_Categoria
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`seth`@`%` PROCEDURE `SP_Read_All_Categoria`()
BEGIN
	SELECT * FROM Categoria;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_All_Genero
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`seth`@`%` PROCEDURE `SP_Read_All_Genero`()
BEGIN
	SELECT * FROM Genero;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_All_Horario
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Read_All_Horario`()
BEGIN
    SELECT Horario.*, Programa.nombre as nombrePrograma, Patron.nombre as nombrePatron FROM Horario 
    LEFT JOIN Programa ON Horario.idPrograma = Programa.id
    LEFT JOIN Patron ON Horario.idPatron = Patron.id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_All_Horario_By_IdProgramacion
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Read_All_Horario_By_IdProgramacion`(id int)
BEGIN
    SELECT * FROM Horario WHERE idProgramacion = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_All_Patron
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Read_All_Patron`()
BEGIN
    SELECT * FROM Patron WHERE estado = 'activo';
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_All_Programa
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Read_All_Programa`(
)
BEGIN
	SELECT Programa.* FROM Programa 
WHERE estado = 'activo';
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_All_ProgramaCancion
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Read_All_ProgramaCancion`()
BEGIN
    SELECT * FROM ProgramaCancion;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_All_Programacion
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Read_All_Programacion`()
BEGIN
    SELECT * FROM Programacion WHERE estado = 'activo';
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_Artista
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Read_Artista`(id int)
BEGIN
    SELECT * FROM Artista WHERE Artista.id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_Cancion
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Read_Cancion`(id int)
BEGIN
    SELECT cancion.id, cancion.nombre, cancion.idArtista, cancion.idGenero, cancion.idCategoria, Genero.nombre AS nombreGenero, Categoria.nombre AS nombreCategoria
	FROM (SELECT * FROM Cancion WHERE Cancion.id = id) as cancion
	INNER JOIN Genero ON cancion.idGenero = Genero.id
	INNER JOIN Categoria ON cancion.idCategoria = Categoria.id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_Canciones_Horario
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Read_Canciones_Horario`(
	idHorario int
)
BEGIN
	SELECT Cancion.*, Artista.nombre as nombreArtista FROM HorarioCancion
	RIGHT JOIN Cancion ON HorarioCancion.idCancion = Cancion.id
    LEFT JOIN Artista ON Artista.id = Cancion.idArtista
    WHERE HorarioCancion.idHorario = idHorario;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_Categoria
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`seth`@`%` PROCEDURE `SP_Read_Categoria`(
	id INT
)
BEGIN
	SELECT * FROM Categoria WHERE Categoria.id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_Genero
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`seth`@`%` PROCEDURE `SP_Read_Genero`(
	id INT
)
BEGIN
	SELECT * FROM Genero WHERE Genero.id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_Horario
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Read_Horario`(
	idHorario int
)
BEGIN
    SELECT Horario.*, Programa.nombre as nombrePrograma, Patron.nombre as nombrePatron FROM Horario 
    LEFT JOIN Programa ON Horario.idPrograma = Programa.id
    LEFT JOIN Patron ON Horario.idPatron = Patron.id
    WHERE Horario.id = idHorario;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_Patron
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Read_Patron`(
    id int
)
BEGIN
    SELECT * FROM Patron WHERE Patron.id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_Patron_Categoria
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`seth`@`%` PROCEDURE `SP_Read_Patron_Categoria`(
	idPatron INT
)
BEGIN
	SELECT Categoria.id, Categoria.nombre
    FROM (SELECT PatronCategoria.idCategoria FROM PatronCategoria WHERE PatronCategoria.idPatron = idPatron) as pc
    INNER JOIN Categoria ON Categoria.id = pc.idCategoria;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_Patron_Reporte
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`seth`@`%` PROCEDURE `SP_Read_Patron_Reporte`()
BEGIN
	SELECT Patron.Nombre AS col1, Categoria.Nombre AS col2 FROM PatronCategoria
    INNER JOIN Patron ON Patron.id = PatronCategoria.idPatron
    INNER JOIN Categoria ON Categoria.id = PatronCategoria.idCategoria;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_Patron_Reportes
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`seth`@`%` PROCEDURE `SP_Read_Patron_Reportes`()
BEGIN
	SELECT Patron.Nombre AS Patron, Categoria.Nombre AS Categoria FROM PatronCategoria
    INNER JOIN Patron ON Patron.id = PatronCategoria.idPatron
    INNER JOIN Categoria ON Categoria.id = PatronCategoria.idCategoria;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_Programa
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Read_Programa`(
	idPrograma int
)
BEGIN
	SELECT Programa.* FROM Programa 
WHERE Programa.id = idPrograma;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_ProgramaCancion
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Read_ProgramaCancion`(
    idProgramaCancion int
)
BEGIN
    SELECT * FROM ProgramaCancion WHERE id = idProgramaCancion;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_Programa_Reporte
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`seth`@`%` PROCEDURE `SP_Read_Programa_Reporte`()
BEGIN
	SELECT Programa.Nombre AS col1, Cancion.nombre AS col2 FROM HorarioCancion
    INNER JOIN Cancion ON Cancion.id = HorarioCancion.idCancion
	INNER JOIN Horario ON Horario.id = HorarioCancion.idHorario
	INNER JOIN Programa ON Programa.id = Horario.idPrograma;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Read_Programacion
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Read_Programacion`(
    id int
)
BEGIN
    SELECT * FROM Programacion WHERE idProgramacion = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Save_Horario
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Save_Horario`(
	idHorario int, 
    dia varchar(20),
    hora time,
    idPrograma int,
    idPatron int
)
BEGIN
	IF idHorario = 0 THEN
		INSERT INTO Horario (dia, hora, idPrograma, idPatron) VALUES (dia, hora, idPrograma, idPatron);
	ELSE
		UPDATE Horario SET dia = dia, hora = hora, idPrograma = idPrograma, idPatron = idPatron WHERE id = idHorario;
	END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Save_Programa
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Save_Programa`(
	idPrograma int, 
    nombre varchar(255),
    descripcion varchar(255)
)
BEGIN
	IF idPrograma = 0 THEN 
		INSERT INTO Programa (nombre, descripcion, estado) VALUES (nombre, descripcion, 'activo');
	ELSE 
		UPDATE Programa SET nombre = nombre, descripcion = descripcion WHERE id = idPrograma;
	END iF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Update_Artista
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Update_Artista`(id int, nombreArtista varchar(255))
BEGIN
    UPDATE Artista SET nombre = nombreArtista;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Update_Cancion
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Update_Cancion`(
    id int,
    nombreCancion varchar(255), 
    idArtista int, 
    idGenero int, 
    idCategoria int, 
    referencia varchar(255), 
    esPeticion boolean,
    diasReproduccion int,
    OUT estadoConsulta varchar(255),
    OUT mensaje varchar(255))
BEGIN
    IF EXISTS (SELECT * FROM Cancion WHERE Cancion.id = id) THEN
    BEGIN
        IF EXISTS (SELECT * FROM Artista WHERE Artista.id = idArtista) THEN
        BEGIN
            IF EXISTS (SELECT * FROM Genero WHERE Genero.id = idGenero) THEN
            BEGIN
                IF EXISTS (SELECT * FROM Categoria WHERE Categoria.id = idCategoria) THEN
                BEGIN
                    UPDATE Cancion SET 
                        Cancion.nombre = nombreCancion,
                        Cancion.idArtista = idArtista,
                        Cancion.idGenero = idGenero,
                        Cancion.idCategoria = idCategoria,
                        Cancion.referencia = referencia,
                        Cancion.esPeticion = esPeticion,
                        Cancion.diasReproduccion = diasReproduccion
                    WHERE Cancion.id = id;
                    SET estadoConsulta = 'OK';
                    SET mensaje = 'Actualización Correcta';
                END;
                ELSE
                BEGIN
                    SET estadoConsulta = 'FAIL';
                    SET mensaje = 'No existe la Categoría especificada.';
                END;
                END IF;
            END;
            ELSE
            BEGIN
                SET estadoConsulta = 'FAIL';
                SET mensaje = 'No existe el Genero especificado.';
            END;
            END IF;
        END;
        ELSE
        BEGIN
            SET estadoConsulta = 'FAIL';
            SET mensaje = 'No existe el Artista especificado.';
        END;
        END IF;
    END;
    ELSE
    BEGIN
        SET estadoConsulta = 'FAIL';
        SET mensaje = 'No existe la Cancion especificada.';
    END;
    END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Update_Horario
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Update_Horario`(
    idHorario int, 
    idProgra int,
    idPatr int, 
    diaHorario varchar(255),
    horaHorario time
)
BEGIN
    UPDATE Horario SET
        idPatron = idPatr,
        dia = diaHorario,
        hora = horaHorario
    WHERE id = idHorario;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Update_Horario_Cancion
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Update_Horario_Cancion`(
	idHorario int, 
    idCancionActual int,
    idCancionReemplazo int
)
BEGIN
	UPDATE HorarioCancion SET idCancion = idCancionReemplazo WHERE HorarioCancion.idHorario = idHorario AND idCancion = idCancionActual;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Update_Patron
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Update_Patron`(
    id int, 
    nombre varchar(255),
    estado varchar(20)
)
BEGIN
    UPDATE Patron SET nombrePatron = nombre, estadoPatron = estado WHERE idPatron = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Update_ProgramaCancion
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Update_ProgramaCancion`(
    idProgramaCancion int,
    programacion int,
    cancion int,
    OUT estadoConsulta varchar(255),
    OUT mensaje varchar(255)
)
BEGIN 
IF EXISTS (SELECT * FROM Programacion WHERE Programacion.idProgramacion = idProgramacion) THEN
    BEGIN
        IF EXISTS (SELECT * FROM Cancion WHERE Cancion.idCancion = idCancion) THEN 
        BEGIN
            UPDATE ProgramaCancion SET
                idProgramacion = programacion,
                idCancion = cancion
            WHERE id = idProgramaCancion;
            SET estadoConsulta = 'OK';
            SET mensaje = 'Actualizacion exitosa.';
        END;
        ELSE
        BEGIN
            SET estadoConsulta = 'FAIL';
            SET mensaje = 'No existe la Cancion especificada.';
        END;
        END IF;
    END;
    ELSE
    BEGIN
        SET estadoConsulta = 'FAIL';
        SET mensaje = 'No existe la Programacion especificada';
    END;
    END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_Update_Programacion
-- -----------------------------------------------------

DELIMITER $$
USE `radio`$$
CREATE DEFINER=`angel`@`%` PROCEDURE `SP_Update_Programacion`(
    id int, 
    nombreProgramacion varchar(255),
    estadoProgramacion varchar(255)
)
BEGIN
    UPDATE Programacion SET nombre = nombreProgramacion, estado = estadoProgramacion WHERE idProgramacion = id;
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
