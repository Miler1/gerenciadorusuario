[![taylor swift](https://img.shields.io/badge/secured%20by-taylor%20swift-brightgreen.svg)](https://twitter.com/SwiftOnSecurity)
[![volkswagen status](https://auchenberg.github.io/volkswagen/volkswargen_ci.svg?v=1)](https://github.com/auchenberg/volkswagen)
[![Build Status](https://travis-ci.org/AngularClass/angular2-webpack-starter.svg?branch=master)](https://travis-ci.org/AngularClass/angular2-webpack-starter)
[![GitHub version](https://badge.fury.io/gh/angularclass%2Fangular2-webpack-starter.svg)](https://badge.fury.io/gh/angularclass%2Fangular2-webpack-starter)
[![Dependency Status](https://david-dm.org/angularclass/angular2-webpack-starter.svg)](https://david-dm.org/angularclass/angular2-webpack-starter)
[![Stack Share](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/angularclass/angular-2-webpack-starter)

<p align="center">
  <a href="https://angularclass.com" target="_blank">
    <img src="https://cloud.githubusercontent.com/assets/1016365/9863762/a84fed4a-5af7-11e5-9dde-d5da01e797e7.png" alt="Webpack and Angular 2" width="500" height="320"/>
  </a>
</p>

# Angular2 Webpack Starter [![Join Slack](https://img.shields.io/badge/slack-join-brightgreen.svg)](https://angularclass.com/slack-join) [![Join the chat at https://gitter.im/angularclass/angular2-webpack-starter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/angularclass/angular2-webpack-starter?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


> An Angular starter kit featuring [Angular 4](https://angular.io), [Ahead of Time Compile](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html), [Router](https://angular.io/docs/ts/latest/guide/router.html), [Forms](https://angular.io/docs/ts/latest/guide/forms.html),
[Http](https://angular.io/docs/ts/latest/guide/server-communication.html),
[Services](https://gist.github.com/gdi2290/634101fec1671ee12b3e#_follow_@AngularClass_on_twitter),
[Tests](https://angular.io/docs/ts/latest/guide/testing.html), [E2E](https://angular.github.io/protractor/#/faq#what-s-the-difference-between-karma-and-protractor-when-do-i-use-which-)), [Karma](https://karma-runner.github.io/), [Protractor](https://angular.github.io/protractor/), [Jasmine](https://github.com/jasmine/jasmine), [Istanbul](https://github.com/gotwarlost/istanbul), [TypeScript](http://www.typescriptlang.org/), [@types](https://www.npmjs.com/~types), [TsLint](http://palantir.github.io/tslint/), [Codelyzer](https://github.com/mgechev/codelyzer), [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html), and [Webpack 2](http://webpack.github.io/) by [AngularClass](https://angularclass.com).
Este repositório de sementes serve como um iniciador Angular para quem quer começar a operar com Angular e TypeScript rapidamente. Usando um [Webpack 2] (http://webpack.github.io/) para criar nossos arquivos e ajudar com o clichê. Também estamos usando o Transferidor para nossa história de ponta a ponta e o Karma para nossos testes de unidade.
* Melhores práticas na organização de arquivos e aplicativos para o Angular.
* Pronto para construir o sistema usando o Webpack para trabalhar com o TypeScript.
* Exemplos angulares prontos para serem usados ao experimentar o Angular.
* Um excelente repositório de sementes Angular para quem deseja iniciar seu projeto.
* Ahead of Time (AoT) compila para carregamentos rápidos de páginas de sua produção.
* Tremido de árvore para remover automaticamente o código não utilizado do seu pacote de produção.
* [DLLs do Webpack] (https://robertknight.github.io/posts/webpack-dll-plugins/) aceleram drasticamente o desenvolvimento de suas compilações.
* Teste de código angular com Jasmine e Karma.
* Cobertura com Istambul e Karma
* Código angular de ponta a ponta usando Transferidor.
* Gerenciador de tipos com @types
* Substituição de módulo quente com Webpack e [@ angularclass / hmr] (https://github.com/angularclass/angular2-hmr) e [@ angularclass / hmr-loader] (https://github.com/angularclass/angular2- hmr-loader)
* Design de material com [angular / material2] (https://github.com/angular/material2)
* Suporte ao Angular 4 através da alteração do package.json e de futuras versões do Angular

### Quick start
Verifique se você possui a versão do nó> = 6.0 e NPM> = 3 **
> Clone / Faça o download do repositório e edite `app.component.ts` dentro de [` /src/app/app.component.ts`Body(/src/app/app.component.ts)

```bash
# clone nosso repo
# --depth 1 remove todos, exceto um histórico de confirmação .git
git clone --depth 1 https://github.com/angularclass/angular2-webpack.git

# mudar o diretorio do nosso repo
cd angular2-webpack

# instalar o repo com npm install
npm install

# iniciar o servidor
npm start

# usar substituição de Hot Module
npm run server:dev:hmr
```
vai para [http://0.0.0.0:3000](http://0.0.0.0:3000) ou [http://localhost:3000](http://localhost:3000) no seu navegador

# Table of Contents
* [File Structure](#file-structure)
* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the app](#running-the-app)
* [Backend](#backend)


## File Structure
Usamos a abordagem de componentes em nosso motor de partida. Esse é o novo padrão para o desenvolvimento de aplicativos Angular e uma ótima maneira de garantir código sustentável, encapsulando nossa lógica de comportamento. Um componente é basicamente um aplicativo independente, geralmente em um único arquivo ou pasta com cada preocupação como um arquivo: estilo, modelo, especificações, e2e e classe de componente. Veja como fica:

```
angular2-webpack/
 ├──config/                        * our configuration
 |   ├──helpers.js                 * helper functions for our configuration files
 |   ├──spec-bundle.js             * ignore this magic that sets up our Angular testing environment
 |   ├──karma.conf.js              * karma config for our unit tests
 |   ├──protractor.conf.js         * protractor config for our end-to-end tests
 │   ├──webpack.dev.js             * our development webpack config
 │   ├──webpack.prod.js            * our production webpack config
 │   └──webpack.test.js            * our testing webpack config
 │
 ├──src/                           * our source files that will be compiled to javascript
 |   ├──main.browser.ts            * our entry file for our browser environment
 │   │
 |   ├──index.html                 * Index.html: where we generate our index page
 │   │
 |   ├──polyfills.ts               * our polyfills file
 │   │
 │   ├──app/                       * WebApp: folder
 │   │   ├──app.component.spec.ts  * a simple test of components in app.component.ts
 │   │   ├──app.e2e.ts             * a simple end-to-end test for /
 │   │   └──app.component.ts       * a simple version of our App component components
 │   │
 │   └──assets/                    * static assets are served here
 │       ├──icon/                  * our list of icons from www.favicon-generator.org
 │       ├──service-worker.js      * ignore this. Web App service worker that's not complete yet
 │       ├──robots.txt             * for search engines to crawl your website
 │       └──humans.txt             * for humans to know who the developers are
 │
 │
 ├──tslint.json                    * typescript lint config
 ├──typedoc.json                   * typescript documentation generator
 ├──tsconfig.json                  * typescript config used outside webpack
 ├──tsconfig.webpack.json          * config that webpack uses for typescript
 ├──package.json                   * what npm uses to manage it's dependencies
 └──webpack.config.js              * webpack main configuration file

```

# Getting Started
## Dependencies
O que você precisa para executar este aplicativo:
* `node` e` npm` (`brew install node`)
* Verifique se você está executando as últimas versões: Node `v6.x.x` + (ou` v7.x.x`) e NPM `3.x.x` +

> Se você tem o `nvm` instalado, o que é altamente recomendado (` brew install nvm`), você pode fazer um `nvm install --lts && nvm use` em` $ `para rodar com o Node LTS mais recente. Você também pode fazer esse `zsh` para você [automaticamente] (https://github.com/creationix/nvm#calling-nvm-use-automatically-in-a-directory-with-a-nvmrc-file)

Depois de ter esses, você deve instalar esses globais com `npm install --global`:
* `webpack` (`npm install --global webpack`)
* `webpack-dev-server` (`npm install --global webpack-dev-server`)
* `karma` (`npm install --global karma-cli`)
* `protractor` (`npm install --global protractor`)
* `typescript` (`npm install --global typescript`)

## Installing
* `fork 'este repositório
* clone o 'fork'
* `npm install webpack-dev-server rimraf webpack -g` para instalar as dependências globais necessárias
* `npm install` para instalar todas as dependências ou` yarn`
* `npm run server` para iniciar o servidor de desenvolvimento em outra aba

## Running the app
Depois de instalar todas as dependências, você poderá executar o aplicativo. Execute o `npm run server` para iniciar um servidor local usando o` webpack-dev-server` que assistirá, criará (na memória) e recarregará para você. A porta será exibida para você como
 `http://0.0.0.0:3000` (ou se você preferir IPv6, se estiver usando o servidor `express`, é
 `http://[::1]:3000/`).

### server
```bash
# desenvolvimento
npm run server
# produção
npm run build:prod
npm run server:prod
```

## Other commands

### build files
```bash
# desenvolvimento
npm run build:dev
# produção (jit)
npm run build:prod
# AoT
npm run build:aot
```

### hot module replacement
```bash
npm run server:dev:hmr
```

### watch and build files
```bash
npm run watch
```

### run unit tests
```bash
npm run test
```

### watch and run our tests
```bash
npm run watch:test
```

### run end-to-end tests
```bash
# update Webdriver (opcional, feito automaticamente pelo script de pós-instalação)
npm run webdriver: atualização
# isto iniciará um servidor de teste e iniciará o transferidor
npm run e2e
```

### continuous integration (run unit tests and e2e tests together)
```bash
# isso testará suas compilações JIT e AoT
npm run ci
```

### run Protractor's elementExplorer (for end-to-end)
```bash
npm run e2e:live
```

### build Docker
```bash
npm run build:docker
```

# Backend

## Location
```
 angular2-webpack/
 ├──backend/                           * pasta raiz
 |   ├──src                            * pasta do servidor
 ```

O servidor foi implementado na linguagem java com Spring Boot que é baseada no Spring e para o armazenamento de dados foi utilizado o servidor MySQL.

Para executar o servidor spring boot deverão ser executadas as seguintes etapas:

dentro da pasta executar o comando:
"mvn spring-boot:run" ou poderá ser aberto dentro de qualquer IDE de desenvolvimento de sua preferência.
O comando acima instala as dependencias do maven quando é executado pela primeira vez e depois executa o servidor.

Como pré-requisito deve ser instalado o maven no seu computador o mesmo poderá ser baixado nesse link: https://maven.apache.org/download.cgi. No sistema operacional Windows o comando deve ser setado na variável de ambiente.

caso o comando exibir a seguinte mensagem: 
"The JAVA_HOME environment variable is not defined correctly This environment variable is needed to run this program NB: JAVA_HOME should point to a JDK not a JRE" 

basta executar o comando:
"export PATH=$JAVA_HOME/jre/bin:$PATH" na qual permitirá a execução do comando do maven normalmente.
