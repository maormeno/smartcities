## Instrucciones para correr CI

- Acceder a la siguiente URL: https://app.circleci.com/pipelines/github/iic2173/proyecto-base-grupo-15
- En Actions, hacer click en rerun workflow from start

## Instrucciones para correr el proyecto en local

- En la carpeta del proyecto, correr el comando docker-compose up
- En otra terminal, desde la carpeta django/masterapp correr el comando docker-compose up
- En otra terminal, desde la carpeta smartcities-frontend correr el comando yarn install y luego yarn start

## Variables de entorno

- SECRET_KEY: Key del proyecto de django
- DB_HOST: Host instancia RDS
- DB_PASSWORD: password instancia RDS
- DB_USER: User de la DB (rds)
- DB_NAME: Nombre de la DB
- BROKER_HOST: host de la conexion mqtt (enunciado)
- BROKER_USER: user de la conexion mqtt (enunciado)
- BROKER_PASSWORD: password de la conexion mqtt (enunciado)
- REACT_APP_USER_POOL_ID: User Pool ID de AWS Cognito
- REACT_APP_CLIENT_ID: Client ID de AWS Cognito

## Para levantar el backend

- Acceder a la instancia de EC2 mediante el comando ssh -i "emergencies-key.pem" ubuntu@ec2-34-226-111-149.compute-1.amazonaws.com, en el mismo directorio donde se encuentra el archivo "emergencies-key.pem".
- Ejecutar el comando `cd e2/proyecto-base-grupo-15`
- Ejecutar el comando docker-compose -f docker-compose.deploy.yml up --build --remove-orphans -d
- Para comprobar, acceder mediante un browser (de preferencia chrome) al url https://org.emergencies.ml/api/emergencies?page_number=1. Se deberia mostrar las primeras 25 emergencias (sin ningun estilo).

## Para levantar el frontend

- Entrar a la carpeta smartcities-frontend
- Asegurarse de tener las variables de entorno
- Instalar las dependencias con el comando `yarn`
- Correr el frontend con `yarn start`

## API Gateway

Se encuentran implementados los siguientes endpoints

- https://api.emergencies.ml/emergencies?page_number={number:int} , que retorna las 25 emergencias correspondientes a la pagina number
- https://api.emergencies.ml/emergencies/{id:int}/complexity, que retorna el indice de complejidad de la emergencia de id id junto con el id de la tarea asociada a ese calculo (celery).


## Cómo subir aplicación SAM

- Correr el comando `sam deploy --guided` y poner `y` a todo.