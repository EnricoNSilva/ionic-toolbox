# 🚀 Ionic Showcase (Utilidades & Entretenimento)

Um aplicativo mobile híbrido desenvolvido como Prova de Conceito (PoC) e portfólio para explorar as capacidades avançadas do Ionic 8, Angular e Capacitor. O app combina ferramentas utilitárias do dia a dia com consumo de APIs de entretenimento, entregando uma interface nativa fluida e UX premium.

## 📱 Funcionalidades (Tabs)

### 1. Calculadora (Clone Windows 11)
* **Descrição:** Reprodução fiel da calculadora padrão do Windows no modo escuro.
* **Destaques Técnicos:** Máquina de estados para gerenciamento de operações matemáticas, tratamento de precisão de ponto flutuante (floating-point error) e lógica de acúmulo de histórico no display.

### 2. Buscador de CEP (Integração ViaCEP)
* **Descrição:** Ferramenta de busca de endereços brasileiros.
* **Destaques Técnicos:** * Integração Assíncrona com a API REST pública do ViaCEP.
  * Formatação de máscara em tempo real nativa (Regex).
  * Gerenciamento de estado de UI (Transição entre Busca e Resultado).
  * Manipulação profunda do Shadow DOM do Ionic para customização avançada de temas e validação de input.

### 3. Rick & Morty Wiki (Explorador de API)
* **Descrição:** Enciclopédia de personagens consumindo a Rick and Morty API.
* **UX/UI Premium:** Design baseado em "Cartas TCG/Status RPG", com uma barra de pesquisa animada inteligente (Scroll-aware header) que desaparece e reaparece baseada na rolagem da tela, com suporte total à *Safe Area* (notch/status bar) dos smartphones modernos.
* **Destaques Técnicos:**
  * Implementação do padrão *Master-Detail* na mesma rota.
  * Paginação de dados via **Infinite Scroll** concatenando arrays em tempo real.
  * Debounce de inputs para otimização de requisições de rede.

## 🛠️ Tecnologias Utilizadas
* **Framework UI:** Ionic 8 (Standalone Components)
* **Core:** Angular 18+ / TypeScript / RxJS
* **Mobile Runtime:** Capacitor (Android / iOS)
* **Estilização:** SCSS Customizado (Flexbox, CSS Transitions, Shadow Parts)

## 📥 Download e Teste

Você pode baixar e testar o aplicativo completo diretamente no seu celular Android:

[![Baixar APK](https://img.shields.io/badge/Download-APK%20v1.0-brightgreen?style=for-the-badge&logo=android)](https://github.com/EnricoNSilva/ionic-showcase/releases/download/v1.0.0/Ionic-Showcase-v1.0.apk)

*(Nota: Como o aplicativo não está publicado na Google Play Store, o seu celular solicitará a permissão padrão para instalar aplicativos de "Fontes Desconhecidas". O app é totalmente seguro e roda localmente).*

## 💻 Como executar o projeto localmente
1. Clone este repositório.
2. Rode `npm install` para baixar as dependências.
3. Rode `ionic serve` para visualizar no navegador (ambiente de dev).
4. Para gerar o app nativo: execute `ionic build`, seguido de `npx cap sync` e abra com `npx cap open android`.
