<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

# Execute in development
1. Clone repository
2. Execute
```
npm install
```
3. Have Nest Cli installed
```
npm i -g @nestjs/cli
```
4. Load database
```
docker compose up -d
```
5. Clone file __.env.template__ and rename copy to __.env__
6. Fill env variables on __.env__
7. Run project
```
npm run start:dev
```
8. Execute seed to bring data to db
```
http://localhost:3000/api/v2/seed
```

## Stack usado
* MongoDB
* Nest
