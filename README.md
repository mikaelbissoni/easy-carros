# A Easy carros app

Clone esse projeto para sua máquina.

## Pré-requisitos

Instale o docker e docker-compose na sua máquina

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)
* [Docker-compose](https://docs.docker.com/compose/)

## Pontapé inicial

```
npm run bootstrap
```

## Configuração

Configure os arquivos abaixo caso precise ajustar algum parâmetro específico:

```
api/.env
api/.env.docker
proxy/.env
proxy/.env.docker
```

`.env.docker` arquivos são usados ​​quando o aplicativo é executado em um ambiente de docker. A principal diferença é que os serviços não podem se conectar usando o host local.

## Início do projeto local

Inicia todos os serviços do docker.

```
npm run start:local
```

Access your app under `http://localhost:8080`

## Desenvolvimento

Enquanto você está desenvolvendo o melhor seria que toda mudança não precisássemos reiniciar o ambiente, né?

Então inicie os serviços localmente em modo de escuta (reload a cada mudança).

```
npm run start:dev
```

Acesse seu app em `http://localhost:8080`

## Deploy

Baixe o projeto para o servidor remoto, preencha apenas os arquivos `.env` raiz e os vários arquivos` .env.docker` e comece com

```
npm run start
```

Alternativamente você pode fazer o deploy para várias instâncias e clouds facilmente usando o [docker-machine](https://docs.docker.com/machine/)