# 📚 Projeto School Indicator

![Angular](https://img.shields.io/badge/Angular-20-red?style=flat-square&logo=angular) ![Docker](https://img.shields.io/badge/Docker-20-blue?style=flat-square&logo=docker)

Este é um projeto de um site para a conclusão da pós graduação de desenvolvimento full stack da PUC RIO digital, o site contem todas as operações de um crud para escola e responsáveis, como trabalho futuro entende-se que a adição de filtragens e ordenação ficaria como melhoria.

## 🎯 Funcionalidades

- 🔍 Visualizar lista de escolas
- 🏫 Cadastro, consulta, atualização e remoção de escolas
- 👨‍👩‍👧 Cadastro, consulta, atualização e remoção  de responsáveis 

## Diagrama 

![Diagrama do esquema ](https://github.com/isahsantos/school-indicator-interface/blob/main/src/assets/img/diagrama-aplication.png?raw=true)


## 🚀 Tecnologias

- **Frontend:** [Angular](https://angular.io/)
- **Backend/API:** [Link para o Repositório da API](https://github.com/isahsantos/school-indicator-api)
- **Containerização:** Docker

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [Docker](https://www.docker.com/) e Docker Compose
- A API deve estar a funcionar (ver instruções no [repositório da API](https://github.com/isahsantos/school-indicator-interface))

### Passo a Passo

1. **Clone o repositório**

   ```bash
   git clone 
   cd  school-indicator-interface



2. **Executar o Docker**

   O projeto vem com um arquivo `Dockerfile` e `docker-compose.yml` prontos. Para rodar o projeto no Docker, siga os seguintes passos:

   - Para construir a imagem Docker:

     ```bash
     docker-compose build
     ```

   - Para iniciar o container:

     ```bash
     docker-compose up
     ```

3. **Acessar a aplicação**

   Após o Docker iniciar o projeto, acesse a aplicação no navegador:

   ```
   http://localhost:8080
   ```

---

## 🔧 Comandos Disponíveis

### Rodar o Projeto em Desenvolvimento (sem Docker)

Caso prefira rodar o projeto localmente sem Docker, siga estes passos:

1. Instalar as dependências:

   ```bash
   npm install
   ```

2. Rodar o servidor de desenvolvimento:

   ```bash
   npm start
   ```

3. Acesse o projeto em `http://localhost:4200`.

## 🖥️ Repositório da API

Certifique-se de clonar e configurar o backend/API que está disponível no [repositório da API](https://github.com/isahsantos/school-indicator-api). Siga as instruções no repositório para configurar e rodar a API localmente.

---

## 📝 Estrutura do Projeto

```plaintext
school-indicator-interface/
├── src/
│   ├── app/
│   │   ├── models/        # Modelo (tipagem) dos objetos
│   │   ├── services/      # Serviços (comunicação com API)
│   │   ├── shared/        # componentes compartilhados
│   │   └── pages/         # páginas do site
├── Dockerfile             # Dockerfile para containerização
└── ...
```

---

## 🛡️ Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com ❤️ por [Maria Isabela dos Santos Silva](https://github.com/isahsantos).
