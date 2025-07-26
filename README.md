# Equipe:
1. Audemário Alves Monteiro Filho
(e só)
# Projeto de Voluntariado - Aplicação Completa

## 1. Finalidade do Aplicativo

Este projeto é uma plataforma móvel para ser a ponte entre pessoas procurando oportunidades de trabalho voluntário e organizações (empresas e ONGs sem fins lucrativos) procurando potenciais voluntários. A sua principal finalidade é conectar dois grupos, pessoas que desejam doar seu tempo e habilidades para causas em que acreditam.

Através de um sistema de busca com raio geoespacial o aplicativo permite que organizações encontrem voluntários próximos com as qualificações necessárias, e que voluntários descubam oportunidades de voluntariado em sua área de interesse e localização.

## 2. Arquitetura Geral

A aplicação é construída sobre uma arquitetura cliente-servidor, separando front-end e back-end.


## 3. Backend (API)

O backend é o cérebro da aplicação, responsável por toda a lógica de negócio, segurança e comunicação com o banco de dados.
O backend foi construído com um conjunto das seguintes tecnologias

- **Python 3**:
- **FastAPI**: Framework web da APIs. foi utilizado para definir todas as rotas (endpoints), gerenciar as requisições e respostas, e validar os dados de entrada e saída usando modelos Pydantic.
- **PostgreSQL**: Um sistema de gerenciamento de banco de dados relacional.
- **PostGIS**: Uma extensão para o PostgreSQL que adiciona suporte para objetos geográficos, permitindo a execução de consultas espaciais. É a tecnologia central que possibilita a busca por voluntários e organizações em um determinado raio geográfico no APP, como alternativa a usar a API do Google MAPS.
- **SQLAlchemy**: ORM para integrar o código da API FAST com o Banco de Dados PostGreSQL
- **Alembic**: Ferramenta de migração de banco de dados, serve para comparar os modelos com o estado atual do banco de dados e verificar mudanças e atualizações, gera scripts de migração de forma automática.
- **Uvicorn**: Servidor ASGI do FastAPI.

## 4. Frontend (Aplicativo Móvel)

Interface interativa ao cliente

### Tecnologias do Frontend

-   **React Native**: Framework que permite o desenvolvimento de aplicativos móveis nativos usando JavaScript e React.
-   **Expo**: Plataforma e conjunto de ferramentas construído sobre o React Native que simplifica o desenvolvimento, o build e o teste do aplicativo. Utilizado como alternativa ao desenvolvimento pelo Android Studio, que não roda bem no meu computador. Com o expo foi possível desenvolver via VSCODE integralmente e testar com built em um dispositivo android físico ao invés de emulador.
-   **React Navigation**: Biblioteca para gerenciar a navegação e o fluxo entre as diferentes telas do aplicativo.
-   **Axios**: Cliente HTTP para realizar as chamadas à nossa API backend de forma segura e estruturada.
-   **React Native Paper**: Biblioteca de componentes de UI que implementa o Material Design do Google, fornecendo um conjunto rico de elementos visuais prontos (botões, cards, inputs, etc.).
-   **Expo Location**: Módulo do Expo para acessar a geolocalização do dispositivo de forma simples e segura, essencial para as funcionalidades de busca.

### Estilização

Detalhes sobre a estilização da aplicação: 
1.  **React Native Paper:** Fornece a base visual com componentes pré-estilizados que seguem as diretrizes do Material Design. Isso garante consistência, acessibilidade e uma aparência moderna.
2.  **StyleSheet do React Native:** Para layouts personalizados, espaçamentos, cores específicas e ajustes finos, utilizamos a API `StyleSheet`. Cada componente de tela possui seu próprio objeto de estilos, mantendo o código organizado e performático.

### Estrutura de Pastas do Frontend

O código-fonte do frontend está organizado dentro da pasta `src/` para manter uma estrutura clara e escalável.

```
/frontend
|-- /src
|   |-- /api            # Configuração do cliente Axios
|   |-- /components     # Componentes reutilizáveis (ex: Cards)
|   |-- /contexts       # Contextos globais (ex: AuthContext para login)
|   |-- /navigation     # Configuração das rotas e navegadores
|   |-- /screens        # As telas do aplicativo
|       |-- /auth       # Telas de autenticação (Welcome, Login, Register)
|       |-- /main       # Telas principais após o login (Search, Profile)
|-- App.js              # Ponto de entrada principal do aplicativo
```

### Estrutura e Funções das Páginas

-   **Telas de Autenticação (`/auth`):**
    -   `WelcomeScreen`: A primeira tela do app, oferecendo as opções de Login ou Cadastro (Voluntário/Organização).
    -   `LoginScreen`: Formulário para que usuários existentes entrem na plataforma.
    -   `RegisterVolunteerScreen`: Formulário de cadastro para novos voluntários, capturando nome, email, senha, escolaridade e localização.
    -   `RegisterOrgScreen`: Formulário de cadastro para novas organizações, capturando nome, email, senha, área de atuação e localização.

-   **Telas Principais (`/main`):**
    -   `OrganizationSearchScreen`: (Visível para voluntários) Exibe uma lista de organizações próximas, obtidas através de uma chamada à API que usa a localização atual do voluntário.
    -   `VolunteerSearchScreen`: (Visível para organizações) Exibe uma lista de voluntários próximos.
    -   `ProfileDetailScreen`: Mostra as informações detalhadas de um perfil selecionado na tela de busca, incluindo descrição e botões de contato (WhatsApp/Email).
    -   `ProfileScreen`: Exibe o perfil do próprio usuário logado, com um resumo de suas informações.
    -   `EditProfileScreen`: Um formulário que permite ao usuário logado atualizar suas próprias informações de perfil.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
