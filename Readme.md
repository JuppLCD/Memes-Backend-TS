## Backend de una APP WEB de Memes

URL_DEPLOY = https://memes-backend-ts-production.up.railway.app

### Users

##### Create User

```
POST /api/v1/user/register
Content-Type: application/json

{
    "name": string,
    "email": string,
    "password": string,
    "passwordConfirm": string
}
```

RES => JSON{userInfo: { name: string, id: uuid }, accessToken: string}

##### Login (no token)

```
POST /api/v1/user/login
Content-Type: application/json

{
    "email": string,
    "password": string,
}
```

RES => JSON{userInfo: { name: string, id: uuid }, accessToken: string}

##### Login (token)

```
POST /api/v1/user/login
authorization: token
```

RES => JSON{userInfo: { name: string, id: uuid }}

### Memes

##### Get All Memes (publics)

```
GET /api/v1/meme/public
authorization: token

```

##### Get Memes users

```
GET /api/v1/meme/
authorization: token

```

##### Get one Meme

```
GET /api/v1/meme/:id
authorization: token

```

##### Create Meme (if the user sends a meme with a name already used by that user, the new meme replaces the old one)

```
POST /api/v1/meme/create
authorization: token
(form-data)

{
    "name": string,
    "access": 'false' | 'true',
    "file" : file (img),
    "template" (optional) : {
        url string,
        texts: [
            {
                text:string,
                fs:number
                x:number
                y:number
                color:string
            }
        ]
    }
}
```

##### Rename Meme

```
PATCH /api/v1/meme/rename/:id
Content-Type: application/json
authorization: token

{
    "name": string,
}
```

##### Update Meme

```
PUT /api/v1/meme/update/:id
authorization: token
(form-data)

{
    "name": string,
    "access": 'false' | 'true',
    "file" : file (img),
    "template" (optional) : {
        url string,
        texts: [
            {
                text:string,
                fs:number
                x:number
                y:number
                color:string
            }
        ]
    }
}
```

##### Delete Meme

```
DELETE /api/v1/meme/delete/:id
authorization: token

```
