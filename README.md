# Transforstone APP

###### Esta guía es para ejecutar el proyecto en modo local y desarrollo, aunque esta aplicación está desplegada en:
[app.sueloparaexterior.com](https://app.sueloparaexterior.com)

## Intalación de la Base de datos
1. Importar archivo .sql del directorio "db" en MySQL
2. Configuracion de la base de datos
    - Configuracion del archivo .env en la ruta principal (si no existe crear)
        ```php
        DB_HOST=localhost
        DB_PORT=3306
        DB_USER=user
        DB_PASSWORD=password
        DB_DATABASE=transforstone_app
        JWT_SECRET=ClaveSecretaParaProyectoTransform12!
        ```

## Guía de instalación

### Servidor

1. Instalación de dependencias (Estando en la ruta principal del proyecto)
    ```sh
        npm install
    ```
2. Ejecución
    ```sh
        npm start
    ``` 

### Cliente

1. Acceso al directorio e instalación de dependencias (en una nueva terminal)
    ```sh
        cd vue-proyecto-tfg && npm install
    ```
2. Ejecución
    ```sh
        npm run dev
    ``` 
3. Acceso a la ruta que propone Vite
    - http://localhost:5173/

4. Utilizar las siguientes credenciales para el acceso completo a la aplicación
    - Email: admin@admin.es
    - Contraseña: admin

