DELIMITER //

DROP PROCEDURE IF EXISTS SP_Create_ProgramacionCancion//
CREATE PROCEDURE SP_Create_ProgramacionCancion(
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
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Read_All_ProgramaCancion//
CREATE PROCEDURE SP_Read_All_ProgramaCancion()
BEGIN
    SELECT * FROM ProgramaCancion;
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Read_ProgramaCancion//
CREATE PROCEDURE SP_Read_ProgramaCancion(
    idProgramaCancion int
)
BEGIN
    SELECT * FROM ProgramaCancion WHERE id = idProgramaCancion;
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Update_ProgramaCancion//
CREATE PROCEDURE SP_Update_ProgramaCancion(
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
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Delete_ProgramaCancion//
CREATE PROCEDURE SP_Delete_ProgramaCancion(
    idProgramaCancion int
)
BEGIN
    DELETE FROM ProgramaCancion WHERE id = idProgramaCancion;
END//