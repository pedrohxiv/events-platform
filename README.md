# Projeto Events Platform

## Descrição do Projeto

O Events Platform é uma plataforma de eventos como uma solução completa para gerenciar eventos. Ela serve como um hub central, destacando uma variedade de eventos que acontecem globalmente. Com processamento de pagamentos via Stripe, você pode comprar ingressos para qualquer evento ou até mesmo criar e gerenciar seus próprios eventos.

## Principais Funcionalidades

- **Autenticação (CRUD) com Clerk:** Gestão de usuários através do Clerk, garantindo uma autenticação segura e eficiente.

- **Eventos (CRUD):** Funcionalidade completa para criar, ler, atualizar e deletar eventos, dando aos usuários total controle sobre o gerenciamento de eventos.

- **Criar Eventos:** Os usuários podem criar novos eventos, fornecendo detalhes essenciais como título, data, local e outras informações adicionais.

- **Ler Eventos:** Acesso simples e detalhado a todos os eventos, permitindo que os usuários explorem especificações como descrições, horários e informações relacionadas.

- **Atualizar Eventos:** Permite que os usuários modifiquem os detalhes dos eventos dinamicamente, garantindo que as informações permaneçam precisas e atualizadas.

- **Deletar Eventos:** Processo simples para remover eventos do sistema, permitindo que os administradores gerenciem e organizem a plataforma de maneira eficaz.

- **Eventos Relacionados:** Conecta inteligentemente eventos relacionados, exibindo-os na página de detalhes do evento, tornando a experiência do usuário mais envolvente.

- **Eventos Organizados:** Organização eficiente dos eventos, garantindo uma exibição estruturada e amigável para o público, como mostrar eventos criados pelo usuário no perfil do mesmo.

- **Busca e Filtro:** Sistema robusto de busca e filtro, permitindo que os usuários encontrem eventos que correspondam às suas preferências com facilidade.

- **Nova Categoria:** A categorização dinâmica permite a adição de novas categorias de eventos de forma simples, mantendo a plataforma adaptável.

- **Checkout e Pagamento com Stripe:** Transações de pagamento suaves e seguras usando o Stripe, melhorando a experiência do usuário durante o processo de checkout.

- **Pedidos de Evento:** Sistema de gerenciamento de pedidos, fornecendo uma visão clara de todas as transações relacionadas aos eventos.

- **Busca de Pedidos:** Funcionalidade rápida e eficiente de busca de pedidos, facilitando o rastreamento e gerenciamento.

## Dependências

O projeto utiliza diversas dependências para garantir seu funcionamento suave:

- `@clerk/nextjs`: ^5.2.8,
- `@hookform/resolvers`: ^3.9.0,
- `@prisma/client`: ^5.17.0,
- `@radix-ui/react-checkbox`: ^1.1.1,
- `@radix-ui/react-dialog`: ^1.1.1,
- `@radix-ui/react-label`: ^2.1.0,
- `@radix-ui/react-popover`: ^1.1.1,
- `@radix-ui/react-select`: ^2.1.1,
- `@radix-ui/react-separator`: ^1.1.0,
- `@radix-ui/react-slot`: ^1.1.0,
- `@radix-ui/react-toast`: ^1.2.1,
- `@uploadthing/react`: ^6.7.2,
- `class-variance-authority`: ^0.7.0,
- `clsx`: ^2.1.1,
- `date-fns`: ^3.6.0,
- `lucide-react`: ^0.418.0,
- `next`: 14.2.5,
- `query-string`: ^9.1.0,
- `react`: ^18,
- `react-day-picker`: ^8.10.1,
- `react-dom`: ^18,
- `react-hook-form`: ^7.52.1,
- `stripe`: ^16.6.0,
- `svix`: ^1.27.0,
- `tailwind-merge`: ^2.4.0,
- `tailwindcss-animate`: ^1.0.7,
- `uploadthing`: ^6.13.2,
- `zod`: ^3.23.8,
- `@types/node`: ^20,
- `@types/react`: ^18,
- `@types/react-dom`: ^18,
- `postcss`: ^8,
- `prisma`: ^5.17.0,
- `tailwindcss`: ^3.4.1,
- `typescript`: ^5,

## Como Executar o Projeto

1. Clone este repositório em sua máquina local.
2. Certifique-se de ter o Node.js e o npm (ou yarn) instalados.
3. Instale as dependências do projeto utilizando o seguinte comando:

```bash
npm install
# ou
yarn install
```

4. Crie um arquivo `.env` na raiz do projeto com as seguintes chaves e seus respectivos valores:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=seu_valor_aqui
CLERK_SECRET_KEY=seu_valor_aqui
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
DATABASE_URL=seu_valor_aqui
CLERK_WEBHOOK_SECRET=seu_valor_aqui
UPLOADTHING_SECRET=seu_valor_aqui
UPLOADTHING_APP_ID=seu_valor_aqui
STRIPE_API_KEY=seu_valor_aqui
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
STRIPE_WEBHOOK_SECRET=seu_valor_aqui
```

Certifique-se de substituir `seu_valor_aqui` pelos valores corretos de cada chave.

5. Inicie o servidor de desenvolvimento com o seguinte comando:

```bash
npm run dev
# ou
yarn dev
```

6. Acesse a aplicação em `http://localhost:3000` e explore as funcionalidades completas do Events Platform e adapte-as conforme suas necessidades específicas.
