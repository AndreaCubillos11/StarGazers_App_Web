#StarGazers_App_Web.

##Api-de-BackEnd

###Desarrollada por:

> - Andrea Cubillos
> - Mariana Ospina
> - Natalia Sierra
> - Juan Valero

###Tecnologias Usadas(librerias y frameworks): 

**implementar por terminal cmd si manejara un gitIgnore (o actualizar de ser necesario)**

> - **node.js:**  entorno de ejecución servidor para back-end web descargable en: https://nodejs.org/es/, comando implementador: npm init --yes

> - **nodemon:** actualizador automatico del servidor de node.js, comando implementador: npm i –-D nodemon, Agregar en el package.json un script que active ¨nodemon src/index.js¨

> - **express:**  back-end para node.js, comando implementador: npm i express --save
 
> - **mongoose:** componente cuyos metodos conectan con la base datos MongoDB, comando implementador:  npm i mongoose --save

> - **dotenv:**   componente de variables de entorno personalizables, comando implementador: npm i dotenv --save, en el archivo .env va la conección y una palabra clave oculta para el acceso por sign_in

> - **bcrypt:**   encriptador de Strings por seguridad de contraseña, comando implementador: npm i bcrypt --save

> - **jwt:** JSON Web Tokens, es un generador de tokens para acceso seguro, comando implementador: npm i jsonwebtoken --save

Descripción del funcionamiento:

El index.js usando los archivos en Routes (+mas librerias) reciben peticiones http (Protocolo de Transferencia de HyperTextos), 
esto para servir de CRUDS para las colecciones en la respectiva Base de Datos MongoDB, 
estas peticiones han de cumplir con los esquemas de la respectiva coleccion,
los esquemas estan guardador en archivos modelos bajo un nombre similar.
