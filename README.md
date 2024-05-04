# API Documentation

## Auth

### Signin

- **URL:** `/signin`
- **Method:** `POST`
- **Description:** Faz login de um usuário
- **Security:** Bearer Token
- **Responses:**
  - 200: Login realizado com sucesso

### Signup

- **URL:** `/signup`
- **Method:** `POST`
- **Description:** Registra um usuário
- **Responses:**
  - 201: Usuário criado com sucesso

## Character

### Create Character

- **URL:** `/characters`
- **Method:** `POST`
- **Security:** Bearer Token
- **Description:** Cria um novo personagem
- **Responses:**
  - 201: Personagem criado com sucesso

### Get All Characters

- **URL:** `/characters`
- **Method:** `GET`
- **Security:** Bearer Token
- **Description:** Retorna todos os personagens
- **Responses:**
  - 200: Lista de personagens retornada com sucesso

### Get Character by ID

- **URL:** `/characters/id/{id}`
- **Method:** `GET`
- **Security:** Bearer Token
- **Description:** Retorna um personagem pelo ID
- **Responses:**
  - 200: Personagem retornado com sucesso

### Update Character

- **URL:** `/characters/id/{id}`
- **Method:** `PATCH`
- **Security:** Bearer Token
- **Description:** Atualiza um personagem existente pelo ID
- **Responses:**
  - 200: Personagem atualizado com sucesso

### Delete Character

- **URL:** `/characters/id/{id}`
- **Method:** `DELETE`
- **Security:** Bearer Token
- **Description:** Exclui um personagem existente pelo ID
- **Responses:**
  - 204: Personagem excluído com sucesso

## Character Comics

### Create Character Comic

- **URL:** `/character-comic`
- **Method:** `POST`
- **Security:** Bearer Token
- **Description:** Cria um novo character comic
- **Responses:**
  - 201: Character comic criado com sucesso

### Get All Character Comics

- **URL:** `/character-comic`
- **Method:** `GET`
- **Security:** Bearer Token
- **Description:** Retorna todos os character comic
- **Responses:**
  - 200: Lista de character comic retornada com sucesso

### Get Character Comic by ID

- **URL:** `/character-comic/id/{id}`
- **Method:** `GET`
- **Security:** Bearer Token
- **Description:** Retorna um character comic pelo ID
- **Responses:**
  - 200: Character comic retornado com sucesso

### Update Character Comic

- **URL:** `/character-comic/id/{id}`
- **Method:** `PATCH`
- **Security:** Bearer Token
- **Description:** Atualiza um character comic existente pelo ID
- **Responses:**
  - 200: Character comic atualizado com sucesso

### Delete Character Comic

- **URL:** `/character-comic/id/{id}`
- **Method:** `DELETE`
- **Security:** Bearer Token
- **Description:** Exclui um character comic existente pelo ID
- **Responses:**
  - 204: Character comic excluído com sucesso

## User Operations

### GET /users

- **Description:** Retorna todos os usuários.
- **Security:** Requer autenticação via Bearer Token.
- **Response:**
  - 200: Retorna um array de objetos do tipo ReturnUser.

### GET /users/id/{id}

- **Description:** Retorna um usuário pelo ID.
- **Security:** Requer autenticação via Bearer Token.
- **Response:**
  - 200: Retorna um objeto do tipo ReturnUser.

### PATCH /users/id/{id}

- **Description:** Atualiza um usuário existente pelo ID.
- **Security:** Requer autenticação via Bearer Token.
- **Response:**
  - 200: Retorna um objeto do tipo ReturnUser com os dados atualizados.

### DELETE /users/id/{id}

- **Description:** Exclui um usuário existente pelo ID.
- **Security:** Requer autenticação via Bearer Token.
- **Response:**
  - 204: Indica que o usuário foi excluído com sucesso e não há conteúdo retornado.
