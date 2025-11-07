# Proyecto Dom Polski - Backend

API RESTful construida con Node.js, Express y Supabase para gestionar el contenido del sitio web de Dom Polski Santa Fe.

## 1. Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
* [Node.js](https://nodejs.org/) (se recomienda v18 o superior)
* [npm](https://www.npmjs.com/) (generalmente se instala con Node.js)
* Una cuenta de [Supabase](https://supabase.com/) con un proyecto creado.

## 2. Instalación

1.  Clona el repositorio (o descomprime el ZIP).
2.  Navega a la carpeta del backend:
    ```bash
    cd dom-polski-backend
    ```
3.  Instala todas las dependencias del proyecto:
    ```bash
    npm install
    ```

## 3. Configuración (El Paso Más Importante)

Este servidor necesita conectarse a la base de datos de Supabase para funcionar.

1.  En la raíz de la carpeta `dom-polski-backend`, crea un archivo llamado `.env`.
2.  Copia y pega el siguiente contenido en ese archivo:

    ```bash
    # Puerto en el que correrá el servidor
    PORT=3000

    # --- Claves de Supabase ---
    # Ve a tu Dashboard de Supabase -> Settings (Configuración) -> API
    
    # Pega la URL de tu proyecto
    SUPABASE_URL="https"//[tu-proyecto-id].supabase.co"

    # ¡MUY IMPORTANTE! Esta es tu llave SECRETA.
    # Es la llave 'service_role' (NO la 'anon key').
    SUPABASE_KEY="[tu-llave-service-role-secreta-larga]"
    ```

3.  Guarda el archivo `.env`.

## 4. Ejecución

Una vez instaladas las dependencias y configurado el `.env`, inicia el servidor:

```bash
npm run dev