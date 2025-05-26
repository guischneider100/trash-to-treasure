# TrashToTreasure

## File Structure
*Entity* - representation of DB tables.
*Repository* - talks with the DB.
*Service* - rules the workflow of the program.
*Controller* - handles HTTP and delegates to service.
*DTO* - carry data between two parts of a program.
*Secutiry* - authentication & authorization.
*Exception* - define all custom exception logic.

entity → repository → service → controller




## Docker
docker-compose up