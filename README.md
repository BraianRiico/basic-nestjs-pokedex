<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
npm install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
docker-compose up -d
```

5. Clonar el archivo __.env.template.__ y renombrar la copia a ```.env```

6. Llenar las variables de entorno definidas en el ```.env```

7. Ejecutar la aplicación en desarrollo en dev:
```
npm run start:dev
```

8. Reconstruir la base de datos con el seed // ojo este tiene comando destructivo al inicio, entocnes borra todo lo que este en mongoDB
```
http://localhost:3001/api/v2/seed
```

#Stack usado
* MongoDB
* Nest
