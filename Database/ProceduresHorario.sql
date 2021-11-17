DELIMITER //

DROP PROCEDURE IF EXISTS SP_Create_Horario//
CREATE PROCEDURE SP_Create_Horario(
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
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Read_All_Horario//
CREATE PROCEDURE SP_Read_All_Horario()
BEGIN
    SELECT * FROM Horario;
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Read_All_Horario_By_IdProgramacion
CREATE PROCEDURE SP_Read_All_Horario_By_IdProgramacion(id int)
BEGIN
    SELECT * FROM Horario WHERE idProgramacion = id;
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Update_Horario//
CREATE PROCEDURE SP_Update_Horario(
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
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Delete_Horario//
CREATE PROCEDURE SP_Delete_Horario(
    idHorario int
)
BEGIN
    UPDATE Horario SET estado = 'inactivo' WHERE id = idHorario;
END//