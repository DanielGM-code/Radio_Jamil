DELIMITER //

DROP PROCEDURE IF EXISTS SP_Create_Programacion//
CREATE PROCEDURE SP_Create_Programacion(
    nombre varchar(255)
)
BEGIN
    INSERT INTO Programacion (nombre, estado) VALUES (nombre, 'activo');
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Read_All_Programacion//
CREATE PROCEDURE SP_Read_All_Programacion()
BEGIN
    SELECT * FROM Programacion WHERE estado = 'activo';
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Read_Programacion//
CREATE PROCEDURE SP_Read_Programacion(
    id int
)
BEGIN
    SELECT * FROM Programacion WHERE idProgramacion = id;
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Update_Programacion//
CREATE PROCEDURE SP_Update_Programacion(
    id int, 
    nombreProgramacion varchar(255),
    estadoProgramacion varchar(255)
)
BEGIN
    UPDATE Programacion SET nombre = nombreProgramacion, estado = estadoProgramacion WHERE idProgramacion = id;
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Delete_Programacion//
CREATE PROCEDURE SP_Delete_Programacion(
    id int
)
BEGIN
    UPDATE Programacion SET estado = 'inactivo' WHERE idProgramacion = id;
END//