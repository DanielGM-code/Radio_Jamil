DELIMITER //

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Create_Cancion//
CREATE PROCEDURE SP_Create_Cancion(
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
    IF EXISTS (SELECT * FROM Artista WHERE Artista.idArtista = idArtista) THEN
    BEGIN
        IF EXISTS (SELECT * FROM Genero WHERE Genero.idGenero = idGenero) THEN
        BEGIN
            IF EXISTS (SELECT * FROM Categoria WHERE Categoria.idCategoria = idCategoria) THEN
            BEGIN
                INSERT INTO Cancion (nombreCancion, idArtista, idGenero, idCategoria, referencia, esPeticion, diasReproduccion, estadoCancion)
                VALUES (nombreCancion, idArtista, idGenero, idCategoria, referencia, esPeticion, diasReproduccion, 'activo');
                SET estadoConsulta = 'OK';
                SET mensaje = 'Registro Correcto';
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
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Read_All_Cancion//
CREATE PROCEDURE SP_Read_All_Cancion()
BEGIN
    SELECT * FROM Cancion WHERE estadoCancion = 'activo';
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Read_Cancion//
CREATE PROCEDURE SP_Read_Cancion(id int)
BEGIN
    SELECT * FROM Cancion WHERE idCancion = id;
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Update_Cancion//
CREATE PROCEDURE SP_Update_Cancion(
    id int,
    nombreCancion varchar(255), 
    idArtista int, 
    idGenero int, 
    idCategoria int, 
    referencia varchar(255), 
    esPeticion boolean,
    diasReproduccion int,
    OUT estadoConsulta varchar(255),
    OUT mensaje varchar(255)
)
BEGIN
    IF EXISTS (SELECT * FROM Cancion WHERE idCancion = id) THEN
    BEGIN
        IF EXISTS (SELECT * FROM Artista WHERE Artista.idArtista = idArtista) THEN
        BEGIN
            IF EXISTS (SELECT * FROM Genero WHERE Genero.idGenero = idGenero) THEN
            BEGIN
                IF EXISTS (SELECT * FROM Categoria WHERE Categoria.idCategoria = idCategoria) THEN
                BEGIN
                    UPDATE Cancion SET 
                        Cancion.nombreCancion = nombreCancion,
                        Cancion.idArtista = idArtista,
                        Cancion.idGenero = idGenero,
                        Cancion.idCategoria = idCategoria,
                        Cancion.referencia = referencia,
                        Cancion.esPeticion = esPeticion,
                        Cancion.diasReproduccion = diasReproduccion
                    WHERE idCancion = id;
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
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Delete_Cancion//
CREATE PROCEDURE SP_Delete_Cancion(id int)
BEGIN
    UPDATE Cancion SET estado = 'inactivo' WHERE idCancion = id;
END//

DELIMITER ;
