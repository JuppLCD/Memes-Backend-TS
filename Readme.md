## Backend de una APP WEB de Memes

URL_DEPLOY =

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

##### Create Meme

```
POST /api/v1/meme/create
Content-Type: application/json

{
    "name": string,
    "access": 'false' | 'true',
    "file" : file (img)
}
```
