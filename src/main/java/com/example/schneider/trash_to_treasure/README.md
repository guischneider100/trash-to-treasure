# TrashToTreasure

## File Structure
*Entity* - holds Java classes that map to database tables.
*Repository* - contains interfaces that handle database CRUD and queries.
*Service* - contains business logic, acts as a bridge between controllers and repositories.
*Controller* - handles HTTP and delegates to service.
*Mapper* - convert objects from one type to another. (faster than manual mapping)
*DTO* - holds objects specifically designed for data transfer, between client and server.
*Secutiry* - contains classes and configurations related to application security.
*Exception* - define all custom exception logic.

Front-end <-> Controller (DTO) <-> Service (DTO) <-> Repository (Entity) <-> DB


## Docker
docker-compose up

## Git
1. Click branch name (bottom-left) → Create new branch → Enter branch name
2. Make changes to files
3. Open Source Control (Ctrl+Shift+G)
4. Stage changes (+ next to files or Stage All)
5. Write commit message → Click Commit (✔️)
6. Click More Actions (…) → Push (set upstream if first time)
7. Repeat steps 2–6 as needed
8. Create Pull Request (using GitHub PR extension or on GitHub website)
9. After merge, switch to main branch (click branch name)
10. Click More Actions (…) → Pull to update main
11. Switch branch name → Hover feature branch → Click trash icon to delete local branch
12. Delete remote branch via PR page or run:  
    git push origin --delete your-branch-name