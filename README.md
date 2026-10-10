# Meu Gabaritou 🎯

Plataforma inteligente de preparação para concursos públicos e exames, com foco em resolução ágil de questões, simulados cronometrados e estatísticas de desempenho em tempo real.

---

## 🚀 Funcionalidades

- **Banco de Questões e Simulados**: Questões de concursos organizadas por matéria, banca e órgão, com gabarito comentado e estatísticas detalhadas.
- **Painel do Estudante**: Acompanhamento de metas diárias, histórico de acertos/erros, sequências de estudo (streaks) e simulados finalizados.
- **Autenticação Segura com Firebase**: Suporte a login rápido com Google e autenticação por e-mail/senha com sincronização instantânea no Cloud Firestore.
- **Assinaturas & Planos**: Integração com checkout seguro para planos Mensal, Anual e Vitalício.
- **Design Moderno e Responsivo**: Totalmente adaptado para desktop, tablets e smartphones (PWA ready).

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) (Ícones)
- **Backend / Persistência**: [Firebase Auth](https://firebase.google.com/docs/auth), [Cloud Firestore](https://firebase.google.com/docs/firestore)
- **Segurança**: Regras granulares de segurança declaradas em `firestore.rules` com zero-trust

---

## 📦 Como Executar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Phelipefoschiani/meugabaritou.git
   cd meugabaritou
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   bun install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   bun dev
   ```

4. **Abra no navegador:**
   Acesse `http://localhost:3000` para visualizar a aplicação.

---

## 🏗️ Build de Produção

```bash
npm run build
```

Os arquivos compilados e otimizados serão gerados na pasta `dist/`.

---

Desenvolvido para o projeto **Meu Gabaritou**.
