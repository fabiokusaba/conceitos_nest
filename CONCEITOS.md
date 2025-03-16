# Conceitos NestJS

## Module
* Organização de código.
* Encapsulamento de coisas que estão dentro desse módulo.
* Injeção de dependência em providers.
* Importação de outros módulos e exportação de coisas que quero que seja exportadas quando importar esse módulo
dentro de outro módulo.
* `nest generate module <nome_module>`
* `nest g mo <nome_module>` -> forma abreviada.

## Controllers
* Basicamente vão controlar a request e response das nossas rotas.
* `nest generate controller <nome_controller> --no-spec` -> não cria o arquivo de testes.
* `nest g co <nome_controller>` -> forma abreviada.

## Services
* Utilizados para a gente colocar a lógica de negócio da aplicação.
* Informado nos providers do nosso módulo.
* `nest generate service <nome_service> --no-spec` -> não cria o arquivo de testes.
* `nest g s <nome_service>` -> forma abreviada.

## Providers
* Colocamos coisas que basicamente usamos para injetar dependências.

## Decorator
* Basicamente está acima de classes, métodos de classe, função ou parâmetros de função e como o próprio nome fala
o decorator decora algo mudando o seu comportamento fazendo ser algo a mais.

## Class
* `nest generate class <caminho/nome_class> --no-spec --flat` -> não cria o arquivo de testes e pasta.
* `nest g cl <caminho/nome_class>` -> forma abreviada.

## CRUD -> resource
* `nest g res <nome_resource>`