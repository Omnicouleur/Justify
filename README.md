# Justify

Justify is a Json Rest Api that justifies a given text.

## Install

    npm install

## Run the app
To run the application you need to define the Environment variables as showed in the .env.example.
Once the .env is created, you can start the application :

    npm run start_local

## Run the tests and coverage

    npm test

# REST API

The Justify REST API is described below.

## Authentification

### Request

`POST /api/token`
##### Data Params
`{
 "email": "email@example.com"   
}`

### Successful Response

    Status : 200 OK
    Content-Type: application/json
    Content-Length: 195

    {
        "auth": true,
        "token": "eyJhbGciOiJIUeRtGiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZGNiM2MzNWNhZjEyMDAxNzA1N2Q2MCIsImlhdCI6MTYwODQ2MzIyOSwiZXhwIjoxNjA4NTQ5NjI5fQ.OgYlTihCyxWspYjWc6kw8oFagqbiSDtODxHm2vmZnQw"
    }
### Failed Response

    Status : 422 Unprocessable Entity
    Content-Type: text/html
    Content-Length: 33

    Please fill a valid email address
 
## Justify Text

### Request

`POST /api/justify`
##### Headers
    `x-access-token : "eyJhbGciOiJIUeRtGiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZGNiM2MzNWNhZjEyMDAxNzA1N2Q2MCIsImlhdCI6MTYwODQ2MzIyOSwiZXhwIjoxNjA4NTQ5NjI5fQ.OgYlTihCyxWspYjWc6kw8oFagqbiSDtODxHm2vmZnQw"`
##### Data Params
`{
     "textToJustify": " Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait;"
 }`

### Successful Response

    Status : 200 OK
    Content-Type: text/html
    Content-Length: 341

    Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte,
    mes  yeux  se  fermaient  si  vite  que  je n’avais pas le temps de me dire: «Je
    m’endors.»  Et, une demi-heure après, la pensée qu’il était temps de chercher le
    sommeil m’éveillait;     

### Failed Response

    Status : 403 Forbidden
    Content-Type: application/json
    Content-Length: 45    
    
    {
        "auth": false,
        "message": "No token provided."
    } 
### Or

    Status : 500 Internal Server Error
    Content-Type: application/json
    Content-Length: 56    
    
    {
        "auth": false,
        "message": "Failed to authenticate token."
    }

