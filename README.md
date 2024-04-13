
# ScoreWarrior




## Tech Stack

**Client:** React, MobX

**Server:** NestJS, Custom Interceptor, PostgreSQL, TypeORM

**AUX** Docker




## Environment Variables

This project is running on next ports

`POSTGRES_PORT` - 5432 

`BACKEND_PORT` - 3300

`FRONTEND_PORT` - 3000



## Deployment

To run this project run

-> 1
```bash
  docker compose build
```
-> 2
```bash
  docker compose up
```




## Open API

#### Swagger

```http
  GET /api/docs
```


## Features

- SignUp/LogIn
- JWT Authorization / Access Check by Roles
- Audit Logs / Audits Table
- Actions Requests / Pending and History Actions Table
- Approve / Decline Actions
- Admin can: 
    - Create Users
    - Edit Users
    - See All Users
    - Create Items
    - Give Items Unlimitedly
    - See Audit Logs
    - See all Actions Pendign and History
    - Approve / Decline Actions
- User can: 
    - Send items they have to another user (Action type_1)
    - Request Actions type_2 and type_3
    - See their pending Actions
    - See their Approved / Declined Actions
    - See All Users

