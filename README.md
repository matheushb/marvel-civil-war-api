# API Documentation

## Auth

### Signin

- **URL:** `/signin`
- **Method:** `POST`
- **Description:** Faz login de um usuário
- **Request Body:**
  - Content-Type: application/json
  - Schema: [Login](#components-schemas-login)
- **Responses:**
  - 200:
    - Description: Login realizado com sucesso
    - Content:
      - application/json:
        - Schema: [ReturnLogin](#components-schemas-returnlogin)

### Signup

- **URL:** `/signup`
- **Method:** `POST`
- **Description:** Registra um usuário
- **Request Body:**
  - Content-Type: application/json
  - Schema: [User](#components-schemas-user)
- **Responses:**
  - 201:
    - Description: Usuário criado com sucesso
    - Content:
      - application/json:
        - Schema: [ReturnUserWithToken](#components-schemas-returnuserwithtoken)

## Character

### Create Character

- **URL:** `/characters`
- **Method:** `POST`
- **Security:** Bearer Token
- **Description:** Cria um novo personagem
- **Request Body:**
  - Content-Type: application/json
  - Schema: [Character](#components-schemas-character)
- **Responses:**
  - 201:
    - Description: Personagem criado com sucesso
    - Content:
      - application/json:
        - Schema: [ReturnCharacter](#components-schemas-returncharacter)

### Get All Characters

- **URL:** `/characters`
- **Method:** `GET`
- **Security:** Bearer Token
- **Description:** Retorna todos os personagens
- **Responses:**
  - 200:
    - Description: Lista de personagens retornada com sucesso
    - Content:
      - application/json:
        - Schema: array of [ReturnCharacter](#components-schemas-returncharacter)

### Get Character by ID

- **URL:** `/characters/id/{id}`
- **Method:** `GET`
- **Security:** Bearer Token
- **Description:** Retorna um personagem pelo ID
- **Parameters:**
  - id (path): ID do personagem a ser retornado
- **Responses:**
  - 200:
    - Description: Personagem retornado com sucesso
    - Content:
      - application/json:
        - Schema: [ReturnCharacter](#components-schemas-returncharacter)

### Update Character

- **URL:** `/characters/id/{id}`
- **Method:** `PATCH`
- **Security:** Bearer Token
- **Description:** Atualiza um personagem existente pelo ID
- **Parameters:**
  - id (path): ID do personagem a ser atualizado
- **Request Body:**
  - Content-Type: application/json
  - Schema: [Character](#components-schemas-character)
- **Responses:**
  - 200:
    - Description: Personagem atualizado com sucesso
    - Content:
      - application/json:
        - Schema: [ReturnCharacter](#components-schemas-returncharacter)

### Delete Character

- **URL:** `/characters/id/{id}`
- **Method:** `DELETE`
- **Security:** Bearer Token
- **Description:** Exclui um personagem existente pelo ID
- **Parameters:**
  - id (path): ID do personagem a ser excluído
- **Responses:**
  - 204:
    - Description: Personagem excluído com sucesso

## Character Comics

### Create Character Comic

- **URL:** `/character-comic`
- **Method:** `POST`
- **Security:** Bearer Token
- **Description:** Cria um novo character comic
- **Request Body:**
  - Content-Type: application/json
  - Schema: [CharacterComic](#components-schemas-charactercomic)
- **Responses:**
  - 201:
    - Description: Character comic criado com sucesso
    - Content:
      - application/json:
        - Schema: [ReturnCharacterComic](#components-schemas-returncharactercomic)

### Get All Character Comics

- **URL:** `/character-comic`
- **Method:** `GET`
- **Security:** Bearer Token
- **Description:** Retorna todos os character comic
- **Responses:**
  - 200:
    - Description: Lista de character comic retornada com sucesso
    - Content:
      - application/json:
        - Schema: array of [ReturnCharacterComic](#components-schemas-returncharactercomic)

### Get Character Comic by ID

- **URL:** `/character-comic/id/{id}`
- **Method:** `GET`
- **Security:** Bearer Token
- **Description:** Retorna um character comic pelo ID
- **Parameters:**
  - id (path): ID do character comic a ser retornado
- **Responses:**
  - 200:
    - Description: Character comic retornado com sucesso
    - Content:
      - application/json:
        - Schema: [ReturnCharacterComic](#components-schemas-returncharactercomic)

### Update Character Comic

- **URL:** `/character-comic/id/{id}`
- **Method:** `PATCH`
- **Security:** Bearer Token
- **Description:** Atualiza um character comic existente pelo ID
- **Parameters:**
  - id (path): ID do character comic a ser atualizado
- **Request Body:**
  - Content-Type: application/json
  - Schema: [CharacterComic](#components-schemas-charactercomic)
- **Responses:**
  - 200:
    - Description: Character comic atualizado com sucesso
    - Content:
      - application/json:
        - Schema: [ReturnCharacterComic](#components-schemas-returncharactercomic)

### Delete Character Comic

- **URL:** `/character-comic/id/{id}`
- **Method:** `DELETE`
- **Security:** Bearer Token
- **Description:** Exclui um character comic existente pelo ID
- **Parameters:**
  - id (path): ID do character comic a ser excluído
- **Responses:**
  - 204:
    - Description: Character comic excluído com sucesso

## User Operations

### GET /users

- **Description:** Retorna todos os usuários.
- **Security:** Requer autenticação via Bearer Token.
- **Response (200):** Retorna um array de objetos do tipo ReturnUser.

### GET /users/id/{id}

- **Description:** Retorna um usuário pelo ID.
- **Security:** Requer autenticação via Bearer Token.
- **Path Parameters:** `id` (ID do usuário a ser retornado).
- **Response (200):** Retorna um objeto do tipo ReturnUser.

### PATCH /users/id/{id}

- **Description:** Atualiza um usuário existente pelo ID.
- **Security:** Requer autenticação via Bearer Token.
- **Path Parameters:** `id` (ID do usuário a ser atualizado).
- **Request Body:** Deve conter os dados do usuário a serem atualizados, seguindo o esquema definido na referência User.
- **Response (200):** Retorna um objeto do tipo ReturnUser com os dados atualizados.

### DELETE /users/id/{id}

- **Description:** Exclui um usuário existente pelo ID.
- **Security:** Requer autenticação via Bearer Token.
- **Path Parameters:** `id` (ID do usuário a ser excluído).
- **Response (204):** Indica que o usuário foi excluído com sucesso e não há conteúdo retornado.
