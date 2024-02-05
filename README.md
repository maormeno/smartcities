## Instrucciones para correr CI

- Acceder a la siguiente URL: https://app.circleci.com/pipelines/github/iic2173/proyecto-base-grupo-15
- En Actions, hacer click en rerun workflow from start

## Instrucciones para correr el proyecto en local
- En la carpeta del proyecto, correr el comando docker-compose up
- En otra terminal, desde la carpeta django/masterapp correr el comando docker-compose up
- En otra terminal, desde la carpeta smartcities-frontend correr el comando yarn install y luego yarn start


## Variables de entorno
SECRET_KEY: Key del proyecto de django 
DB_HOST: Host instancia RDS
DB_PASSWORD: password instancia RDS
DB_USER: User de la DB (rds)
DB_NAME: Nombre de la DB 
BROKER_HOST: host de la conexion mqtt (enunciado)
BROKER_USER: user de la conexion mqtt (enunciado)
BROKER_PASSWORD: password de la conexion mqtt (enunciado)

## Para levantar el backend
- Acceder a la instancia de EC2 mediante el comando ssh -i "emergencies-key.pem" ubuntu@ec2-34-226-111-149.compute-1.amazonaws.com, en el mismo directorio donde se encuentra el archivo "emergencies-key.pem".
- Ejecutar el comando docker-compose -f docker-compose.deploy.yml up  --build --remove-orphans  -d 
- Para comprobar, acceder mediante un browser (de preferencia chrome) al url https://org.emergencies.ml/api/emergencies?page_number=1. Se deberia mostrar las primeras 25 emergencias (sin ningun estilo).
 
## API Gateway
Se encuentran implementados los siguientes endpoints
- https://api.emergencies.ml/emergencies?page_number={number:int} , que retorna las 25 emergencias correspondientes a la pagina number
- https://api.emergencies.ml/emergencies/{id:int}/complexity, que retorna el indice de complejidad de la emergencia de id id junto con el id de la tarea asociada a ese calculo (celery).


## Instrucciones para correr CI

- Acceder a la siguiente URL: https://app.circleci.com/pipelines/github/iic2173/proyecto-base-grupo-15
- En Actions, hacer click en rerun workflow from start

## Instrucciones para correr el proyecto en local
- En la carpeta del proyecto, correr el comando `docker-compose up`
- En otra terminal, desde la carpeta django/masterapp correr el comando `docker-compose up`
- En otra terminal, desde la carpeta smartcities-frontend correr el comando `yarn install` y luego `yarn start`


## Variables de entorno
SECRET_KEY: Key del proyecto de django 
DB_HOST: Host instancia RDS
DB_PASSWORD: password instancia RDS
DB_USER: User de la DB (rds)
DB_NAME: Nombre de la DB 
BROKER_HOST: host de la conexion mqtt (enunciado)
BROKER_USER: user de la conexion mqtt (enunciado)
BROKER_PASSWORD: password de la conexion mqtt (enunciado)

# IIC2173 - E2 - ERT HQV

*aka. Equipos de respuesta temprana, high quality version*

## Objetivo

La entrega está intencionada para que creen un diseño sólido de una aplicación utilizando diversas herramientas clave a la hora de ofrecer una aplicación cualquiera. Además, se introducirá el uso de Serverless como tecnología altamente útil y escalable.

## Enunciado

Felicidades! Al haber logrado el MVP de la primera parte de la solución, el CEEEEO (Chief Executive Expectations Excellence Efficience Officer segun dice) de LegitBusiness, el mas alto cargo de la organización, les ha pedido que continuen con su proyecto para que lo enfoquen a una instancia colaborativa.
Antes de implementar la parte más importante de su sistema (la que vendrá en la siguiente iteración), el CEEEEO les pide que ofrezcan una base técnica potente, la cual será clave para que su solución sea mantenible, escalable y segura. 

Finalmente, les han pedido la capacidad de emitir reportes en PDF para ofrecer capacidades de reportería y archivado, tan comunes en los sistemas interconectados

## Especificaciones

**Si un requisito está marcado como *crit*, el no cumplirlo en un grado mínimo (al menos un punto) reducirá la nota máxima a *4.0*. NO se revisaran entregas que no estén en la nube**

Por otro lado, debido a que esta entrega presenta una buena cantidad de *bonus*, la nota no puede sumar más de 8, para que decidan bien que les gustaría aprovechar.

Para esta entrega, deben completar todos los requisitos de la entrega pasada marcados como **Esencial**, puesto que son necesarios para completar esta entrega. **Cada feature *Esencial* faltante, incurre en un descuento de *0.4 pto***

Al final de la entrega, la idea es que se pongan de acuerdo con su ayudante para agendar una hora y hacer una demo en vivo para su corrección.

### Requisitos funcionales (8 ptos)

* **RF01** (**8 ptos**) ***crit***: Cada punto debe tener la opción de generar un PDF como reporte de situación del punto. Este reporte trae una foto del mapa, los datos en un formato accesible y un timestamp.


### Requisitos no funcionales (47 ptos)

* **RNF01** (***8 ptos***) ***crit*** : Su app debe estar detrás de una AWS API gateway tipo REST, con los endpoints declarados en esta. Debe asociarse un subdominio a esta (e.g. api.miapp.com) y debe tener CORS correctamente configurado.

* **RNF02** (***9 ptos***) ***crit***: Deben implementar un servicio de autenticacion/autorización (auth). Este servicio puede ser en base a un servicio de tercros como Auth0, cognito o pueden hacerlo ustedes. Si hacen un servicio ustedes desde 0, tienen un bonus de **5 ptos**. Este RNF requiere que ustedes extraigan toda la lógica de los usuarios de la app principal y la trasladen a el servicio hecho por ustedes o el externo. Recomendamos fuertemente usar el modelo Oauth o como mínimo intercambiar tokens JWT con la audiencia e issuer correctos.

* **RNF03** (***3 ptos***): Su frontend debe estar desplegado en S3 con una distribución Cloudfront. Todos los assets de su aplicación Web, tales como imágenes, iconos, videos y archivos dinámicos (incluyendo los del RF4) deben estar en un bucket en AWS S3 standard.

* **RNF04** (***3 ptos***): Su API Gateway debe poder usar al servicio del RNF02 para autenticar a los usuarios directamente.

* **RNF05** (***9 ptos***): La aplicación tiene que ofrecer un servicio de generacion de reportes PDF desde AWS Lambda, según lo explicado en las secciones anteriores. Este reporte debe almacenarse en S3 y se le debe entregar al usuario un enlace público para descargarlo desde S3. Deben utilizar Serverless.js o AWS SAM para manejar y desplegar esta función. Crear un pipe CI/CD para  tiene un bonus de **4 ptos**

* **RNF06** (***3 ptos***) ***crit*** : Su app debe ofrecer su backend y frontend utilizando HTTPS

* **RNF07** (***5 ptos***): Deben implementar CD en su pipeline CI/CD para **backend**. Como proveedores aceptados de CI están Github Actions, Codebuild y CircleCI. Para deployment deben usar AWS codedeploy.

* **RNF08** (***5 ptos***): Deben implementar CD en su pipeline CI/CD para **frontend**. Como proveedores aceptados de CI están Github Actions, Codebuild y CircleCI. Para deployment deben subir su frontend a AWS S3 e invalidar la caché de Cloudfront que sirve su frontend

### Documentación (5 ptos)

* **RDOC1 *(5 ptos)* crit:** Deben actualizar los documentos en `/docs` para reflejar
    * Como subir su aplicación en Serverless/SAM, paso a paso
    * Documentaci''on de su API Gateway
* 
## Recomendaciones

* Comiencen la entrega lo antes posible, puesto que es mas sencillo ir trabajando de a partes y seguro tendrán dudas. Se les dio plazo extra para que se adecuen a sus equipos de trabajo.
* Planifiquen con antelación: pregunten dudas o ambigüedades a sus ayudantes.
* Ojo con los deploys a última hora, la maldición de la demo es muy real.
* Ocupen el Free Tier de AWS, que tiene capacidad para todos estos requerimientos. Deberían usar los siguientes servicios:
	* **EC2**: AWS les proporciona una instancia t2.micro gratuita al mes.
	* **S3**: Tienen 5 GB de almacenamiento y 20000 solicitudes GET.
	* **RDS** (Opcional, Recomendado): Tienen 20GB y una instancia básica al mes.
	* **API Gateway**: 1 MM de llamadas al mes
	* **Lambda (Opcional)**: Tienen 400K GB/s y 1 MM de solicitudes.
	* **EBS**: 30 GB al mes para almacenamiento de discos de sistema.
	* **Cloudfront**: 50 GB al mes de transferencia.
	* **Amazon SES**: 62000 mensajes salientes / mes.
* **NO** está planificado hacer devolución por uso de dolares en AWS. Para la entrega el free tier de AWS es suficiente para conseguir todos los puntos. En caso de utilizar dólares en su solución, el curso no puede hacerles devolución de estos bajo ninguna causa.

### Consideraciones

No se considerarán entregas:
* Con componentes que corran en sus computadores o servidores que no sean los básicos de Azure/AWS/GCP/Cloudfront. Algunos ejemplos, los servicios de AWS serían:
    * EC2
    * VPC
    * IAM
    * S3
    * Lambda
* Montadas en Heroku/Firebase/Elastic beanstalk/Lightsail/Netlify o similares.
* Que no estén documentadas.
