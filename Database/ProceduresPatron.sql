DELIMITER //

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Create_Patron//
CREATE PROCEDURE SP_Create_Patron (
    nombre varchar(255)
)
BEGIN
    INSERT INTO Patron (nombrePatron, estado) VALUES (nombre, 'activo');
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Read_All_Patron//
CREATE PROCEDURE SP_Read_All_Patron(
    idPatron int
)
BEGIN
    SELECT * FROM Patron WHERE estadoPatron = 'activo';
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Read_Patron//
CREATE PROCEDURE SP_Read_Patron(
    id int
)
BEGIN
    SELECT * FROM Patron WHERE idPatron = id;
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Update_Patron//
CREATE PROCEDURE SP_Update_Patron(
    id int, 
    nombre varchar(255),
    estado varchar(20)
)
BEGIN
    UPDATE Patron SET nombrePatron = nombre, estadoPatron = estado WHERE idPatron = id;
END//

------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SP_Delete_Patron//
CREATE PROCEDURE SP_Delete_Patron(
    id int
)
BEGIN
    UPDATE Patron SET estadoPatron = 'inactivo' WHERE idPatron = id;
END//