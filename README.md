# 🪐 Ionic Showcase (Utilidades & Entretenimento)

Um aplicativo de demonstração desenvolvido com **Ionic** e **Angular**, focado na construção de interfaces modernas, boas práticas de programação e excelente experiência do usuário (UX).

## 📱 Funcionalidades (Tabs)

### 1. Calculadora (Clone Windows 11)

- **Descrição:** Reprodução fiel da calculadora padrão do Windows no modo escuro.
- **Destaques Técnicos:** Máquina de estados para gerenciamento de operações matemáticas, tratamento de precisão de ponto flutuante (floating-point error) e lógica de acúmulo de histórico no display.

### 2. Buscador de CEP (Integração ViaCEP)

- **Descrição:** Ferramenta de busca de endereços brasileiros.
- **Destaques Técnicos:** \* Integração Assíncrona com a API REST pública do ViaCEP.
  - Formatação de máscara em tempo real nativa (Regex).
  - Gerenciamento de estado de UI (Transição entre Busca e Resultado).
  - Manipulação profunda do Shadow DOM do Ionic para customização avançada de temas e validação de input.

### 3. Rick & Morty Wiki (Explorador de API)

- **Descrição:** Enciclopédia de personagens consumindo a Rick and Morty API.
- **UX/UI Premium:** Design baseado em "Cartas TCG/Status RPG", com uma barra de pesquisa animada inteligente (Scroll-aware header) que desaparece e reaparece baseada na rolagem da tela, com suporte total à _Safe Area_ (notch/status bar) dos smartphones modernos.
- **Destaques Técnicos:**
  - Implementação do padrão _Master-Detail_ na mesma rota.
  - Paginação de dados via **Infinite Scroll** concatenando arrays em tempo real.
  - Debounce de inputs para otimização de requisições de rede.

## 🚀 Funcionalidades Atuais (Versão 1.1)

- **Sistema de Autenticação Completo:** Integração estruturada com o Firebase Authentication.
- **Login e Cadastro Seguro:** Com tratamentos de erro e validações de dados (como confirmação de senha) aplicados diretamente no frontend, evitando chamadas desnecessárias ao banco de dados.
- **Recuperação de Senha:** Fluxo prototipado utilizando feedbacks visuais nativos do Ionic (`Toast`).
- **Perfil do Usuário Dinâmico:** Utilização de um card flutuante (`<ion-popover>`) no cabeçalho das páginas, que extrai e exibe automaticamente o nome a partir do e-mail do usuário logado.
- **Navegação Inteligente:** Gerenciamento seguro de rotas utilizando o `NavController`, impedindo o acesso não autorizado a áreas logadas através do botão de voltar do celular.

## 🛠️ Tecnologias Utilizadas

- **[Ionic Framework](https://ionicframework.com/)** - Interface fluida e responsiva (Tema Escuro).
- **[Angular](https://angular.io/)** - Utilizando a arquitetura moderna de _Standalone Components_.
- **[Firebase](https://firebase.google.com/)** - Backend as a Service para Autenticação.
- **SCSS / Flexbox** - Estilização e estruturação visual do layout.
- **Capacitor** - Configuração e geração da build nativa (APK) para o ambiente Android.

## 📥 Download (Android)

Você pode baixar e testar o aplicativo completo diretamente no seu celular Android:

[![Baixar APK](https://img.shields.io/badge/Download-APK%20v1.1-brightgreen?style=for-the-badge&logo=android)](https://github.com/EnricoNSilva/ionic-showcase/releases/download/v1.1/Ionic-Showcase-v1.1.apk)

_(Nota: Como o aplicativo não está publicado na Google Play Store, o seu celular solicitará a permissão padrão para instalar aplicativos de "Fontes Desconhecidas". O app é totalmente seguro e roda localmente)._

## 💻 Como executar o projeto localmente

Para inspecionar o código e rodar o projeto na sua máquina de desenvolvimento, siga os passos abaixo:

1. Clone o repositório:

   ```bash
   git clone [https://github.com/enriconsilva/ionic-showcase.git](https://github.com/enriconsilva/ionic-showcase.git)

   ```

2. Entre na pasta do projeto:

   ```bash
   cd ionic-showcase

   ```

3. Instale as dependências:

   ```bash
   npm install

   ```

4. Inicie o servidor:
   ```bash
   ionic serve
   ```
