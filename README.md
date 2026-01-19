

## Fluxo do Backend (Mermaid)

```mermaid
flowchart TD
	A[Requisição /signin] --> B[Valida usuário]
	B -- Usuário válido --> C[Gera JWT]
	B -- Usuário inválido --> D[Retorna erro 401]
	C --> E[Retorna token]

	F[Requisição /me com token] --> G[Valida token]
	G -- Token válido --> H[Retorna dados do usuário]
	G -- Token inválido --> I[Retorna erro 403]

	J[Requisição /dash] --> K[Retorna número de usuários]
```

## Instalação dos pacotes backend

No diretório `backend`, execute:

```bash
npm install cors express dotenv http-status-codes jsonwebtoken
```


## Rodando o backend

No diretório `backend`, execute:

```bash
node src/index.js
```

---

## Fluxo do Frontend (Mermaid)

```mermaid
flowchart TD
	A[Usuário acessa app] --> B[Tela de Login]
	B -- Login bem-sucedido --> C[Salva token]
	C --> D[Exibe tela de perfil]
	D --> G[Exibe quantidade de usuários <Dash>]
	D -- Clica em Sair --> E[Remove token]
	E --> B
	B -- Login inválido --> F[Exibe erro]
	D -- Token inválido/expirado --> E
```

## Instalação dos pacotes frontend (React)

No diretório `frontend`, execute:

```bash
npm install react react-dom vite
```

## Rodando o frontend

No diretório `frontend`, execute:

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173` (padrão Vite).
