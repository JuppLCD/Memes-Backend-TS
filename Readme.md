## Backend de una APP WEB de Memes

URL_DEPLOY = https://meme-back-end.herokuapp.com/

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

##### Login (no token)

```
POST /api/v1/user/login
Content-Type: application/json

{
    "email": string,
    "password": string,
}
```

##### Login (token)

```
POST /api/v1/user/login
authorization: token
```

### Memes

##### Get All Memes (publics)

```
get /api/v1/meme/public
authorization: token

```

##### Get Memes users

```
get /api/v1/meme/
authorization: token

```

##### Create Meme (if the user sends a meme with a name already used by that user, the new meme replaces the old one)

```
POST /api/v1/meme/create
Content-Type: application/json
authorization: token

{
    "name": string,
    "access": 'false' | 'true',
    "file" : file (img)
}
```

##### Update name Meme

```
PUT /api/v1/meme/update/:id
Content-Type: application/json
authorization: token

{
    "name": string,
}
```

##### Delete Meme

```
DELETE /api/v1/meme/delete/:id
authorization: token

```
