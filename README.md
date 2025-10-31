# 💻 Desafio: Formulário de Candidatura Multi-Etapas (Angular)

## Sobre o Projeto

Este é o formulário multi-etapas que desenvolvi para o desafio. Fui direto ao ponto usando **Angular** e foquei principalmente nos **Reactive Forms** para garantir que a gestão dos dados ficasse bem robusta.

O projeto foi configurado para demonstrar os pontos chave:

Controle de Estado: Usei o controle de estado para desabilitar cada etapa depois de avançar, o que garante que o dado preenchido não seja alterado e mantém a ordem do fluxo.

Validação: A validação é feita por etapa, usando os `Validators` nativos do Angular.

Resumo Final: A última etapa é a tela de resumo de todos os dados, confirmando a submissão correta.

## Tecnologias

* Angular (versão mais recente)
* Reactive Forms (Toda a gestão de formulário)
* TypeScript
* SCSS

## Como Rodar o Projeto Localmente

Certifique-se de ter o Node.js e o Angular CLI instalados.

```bash
# 1. Clone o repositório
git clone [https://github.com/elweb98/formulario-angular.git](https://github.com/elweb98/formulario-angular.git)

# 2. Navegue para a pasta do projeto
cd formulario-angular

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
ng serve --open