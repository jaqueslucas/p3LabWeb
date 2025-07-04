

# Prova 3 – React Context

## Laboratório de Desenvolvimento Web

**Aluno:** Lucas Jaques de Souza  
**Projeto:** Gerenciador de Tarefas por Categoria

---

## Descrição

O **Gerenciador de Tarefas por Categoria** é uma aplicação web desenvolvida em React, utilizando Context API para gerenciamento global de estado. O objetivo é permitir ao usuário organizar suas atividades de forma estruturada, agrupando tarefas por categorias personalizadas (ex: Trabalho, Estudos, Casa, etc).

O visual do app remete a um caderninho antigo de anotações, proporcionando conforto e identificação ao usuário.

---

## Funcionalidades

- **Criar novas categorias** (ex: Trabalho, Estudos, Casa)
- **Adicionar tarefas** dentro de cada categoria
- **Editar e excluir** categorias e tarefas (com confirmação)
- **Marcar tarefas como concluídas** (checkbox)
- **Visualização agrupada**: tarefas separadas por categoria
- **Indicação visual** de tarefas concluídas (texto riscado)
- **Persistência automática**: tudo salvo no navegador (localStorage)
- **Feedback visual**: Snackbar para todas as ações importantes
- **Tema personalizado**: aparência de caderno antigo, com textura de papel, fontes manuscritas e animações suaves

---

## Componentes

- **AddCategory**: formulário para criar uma nova categoria
- **AddTask**: formulário para adicionar tarefa em uma categoria
- **CategoryList**: exibe todas as categorias
- **TaskList**: lista as tarefas de cada categoria
- **TaskContext**: contexto global com dados e funções

---

## Como rodar o projeto

1. **Clone o repositório**

   ```bash
   git clone https://github.com/jaqueslucas/p3LabWeb.git
   cd p3LabWeb
   ```

2. **Instale as dependências**  
   (É necessário ter o Node.js instalado)

   ```bash
   npm install
   ```

3. **Rode o projeto em modo desenvolvimento**

   ```bash
   npm run dev
   ```

   O Vite irá mostrar no terminal o endereço local (geralmente http://localhost:5173) para acessar o app no navegador.

4. **Build para produção (opcional)**
   ```bash
   npm run build
   ```

---

## Observações

- O projeto utiliza apenas React Context para gerenciamento global, conforme solicitado.
- Todo o estado (categorias e tarefas) é salvo automaticamente no navegador, não sendo perdido ao atualizar ou fechar a página.
- O visual foi cuidadosamente personalizado para remeter a um caderno de anotações, com textura de papel, cores suaves e fontes manuscritas.
- Todas as ações importantes possuem confirmação e feedback visual.

---

**Lucas Jaques de Souza**  
Prova 3 – React Context  
Laboratório de Desenvolvimento Web
