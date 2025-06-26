# 🛍️ Promo Products - Frontend

Sistema de gestão de produtos promocionais, com suporte a cupons, descontos percentuais, controle de estoque e ativação/inativação de produtos.

## 📦 Tecnologias Utilizadas

- **React**
- **TypeScript**
- **Tailwind CSS**
- **React Router DOM**
- **Lucide React** (ícones)
- **Axios** (requisições HTTP)
- **ESLint + Prettier** (padrões de código)

## 🛠️ Funcionalidades

- Cadastro, edição, inativação e reativação de produtos
- Aplicação de desconto via código ou percentual direto
- Filtros de listagem:
  - Por preço
  - Por nome
  - cupom aplicado
  - Esgotados
  - Produtos inativos
  - Ordenação por nome, preço ou estoque
- Paginação da listagem de produtos
- Modal com detalhes do produto
- Modal para aplicar e remover cupons
- Modal para inativar ou reativar produtos

## ▶️ Pré-requisitos

Certifique-se de ter os seguintes softwares instalados:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)


## 🚀 Como Rodar o Projeto Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/isi-promo-frontend.git
cd isi-promo-frontend
```

### 2. Instale as dependências

```bash
npm install 
# ou 
yarn install
```

### 3. Configure o ambiente

Crie um arquivo `.env` na raiz do projeto e adicione:

### 4. Inicie o servidor de desenvolvimento

```
npm start
```

- A aplicação estará disponível em: `http://localhost:3000`

## 📂 Estrutura de Pastas

```bash
├── src/
│   ├── components/             # Componentes reutilizáveis (Button, Input, etc)
│   ├── modals/                 # Modais: ApplyDiscountModal,  etc)
│   ├── pages/                  # Páginas principais (ProductList, etc)
│   ├── services/               # Serviço de conexão com a API (ProductService.ts)
│   ├── types/                  # Tipagens globais (IProductItem, ICoupon, etc)
│   ├── App.tsx                 # Componente principal
│   └── index.tsx                # Entrada do app React
```

## 🔍 Principais Endpoints Consumidos


| Método             | Endpoint                           | Body (parcial)                          |  Descrição                                      |
| -------------------| ---------------------------------- | --------------------------------------- | ----------------------------------------------- |
| **Produtos**                                                                                                                                        |
| POST               | /products                          | { name, description, price, stock }     | Cadastra um novo produto                        |
| GET                | /products                          | —                                       | Lista todos os produtos com filtros e paginação |
| GET                | /products/:id                      | —                                       | Busca um produto pelo ID                        |
| PATCH              | /products/:id                      | { name?, description?, price?, stock? } | Atualiza parcialmente os dados de um produto    |
| DELETE             | /products/:id                      | { checkStock }                          | Inativa (soft delete) um produto                |
| POST               | /products/:id/restore              | { checkStock }                                                                            |
| **Cupons**                                                                                                                                          |
| POST               | /coupons                           | { code, percentage, expirationDate }    | Cadastra um novo cupom de desconto              |
| GET                | /coupons                           | —                                       | Lista todos os cupons                           |
| GET                | /coupons/:code                     | —                                       | Busca um cupom                                  |
| PATCH              | /coupons/:code                     | { code?, percentage?, expirationDate? } | Atualiza informações de um cupom                |
| DELETE             | /coupons/:code                     | —                                       | Inativa um cupom                                |
| **Aplicação de Cupons**                                                                                                                             |
| POST               | /products/:productId/discount      | { couponId }                            | Aplica um cupom em um produto                   |
| DELETE             | /products/:productId/undoDiscount  | —                                       | Inativa um cupom em um produto                  |

## 👩‍💻 Contribuindo

- Faça um fork.
- Crie uma branch: `git checkout -b feature/minha-feature`.
- Commit suas alterações: `git commit -m 'feat: minha feature'`.
- Push na sua branch: `git push origin feature/minha-feature`.
- Abra um Pull Request.

## 🤝 Autor

Desenvolvido por **[Beatriz Ribeiro](https://www.linkedin.com/in/beatriz-ribeiro-dev/)**

🔗 [GitHub](https://github.com/Biiars00)

📧 Em breve: integração de autenticação e testes unitários.

## 📝 Licença

Este projeto está sob a licença MIT.