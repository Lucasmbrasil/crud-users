# UsersAPI

API criada para controle de usuários. Onde o mesmo envia seus dados (nome, telefone, CPF, CEP) e suas informações ficam salvas no banco de dados.

## Instalação/Utilização

Para rodar a api basta utilizar o comando `docker-compose up`

## Métodos

<h3 align='center'> Cadastro de usuário</h3>

`POST /register - FORMATO DA REQUISIÇÃO `

```json
{
  "nome": "Lucas",
  "telefone": "21997666666",
  "cpf": "15024225555",
  "cep": "24444940"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /register - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "nome": "Lucas",
  "telefone": "21999995454",
  "cpf": "15024225550",
  "cep": "24120095",
  "logradouro": "Rua Lopes da Cunha",
  "cidade": "Niterói",
  "estado": "RJ",
  "id": "b366ef37-8013-42ee-9c90-e21ebbe3a5a3"
}
```

<h3 align='center'> Login de usuário</h3>

`POST /login - FORMATO DA REQUISIÇÃO `

```json
{
  "cpf": "15024225550"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /login_users - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIzNjZlZjM3LTgwMTMtNDJlZS05YzkwLWUyMWViYmUzYTVhMyIsImlhdCI6MTY0NDk3NjM4NywiZXhwIjoxNjQ1MDYyNzg3fQ.lUcQId71HFmY_WTfsD5hfc8Z-Z61aO2xKrge6Kj9TvA"
}
```

<h3 align='center'> Buscar usuários</h3>

`GET /users - FORMATO DA REQUISIÇÃO `

Caso dê tudo certo, a resposta será assim:

`GET /users - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "id": "164180c5-fe26-4b27-a875-d89e7e24ae9d",
    "nome": "lucas",
    "telefone": "23456789011",
    "cpf": "12345678911",
    "cep": "24120095",
    "logradouro": "Rua Lopes da Cunha",
    "cidade": "Niterói",
    "estado": "RJ"
  }
]
```

<h3 align='center'> Editar usuário</h3>

`PATCH /users (Authorization: token) - FORMATO DA REQUISIÇÃO`

```json
{
  "nome": "Lucas Brasil"
}
```

Caso dê tudo certo a resposta será assim:

`PATCH /users - FORMATO DA RESPOSTA - 200`

```json
{
  "id": "b366ef37-8013-42ee-9c90-e21ebbe3a5a3",
  "nome": "Lucas Brasil",
  "telefone": "21999995454",
  "cpf": "15024225550",
  "cep": "24120095",
  "logradouro": "Rua Lopes da Cunha",
  "cidade": "Niterói",
  "estado": "RJ"
}
```

<h3 align='center'> Deletar usuário</h3>

`DELETE /users (Authorization: token) - FORMATO DA REQUISIÇÃO`

Caso dê tudo certo a resposta será assim:

`DELETE /users - FORMATO DA RESPOSTA - 204`

```json
No body returned for response
```
