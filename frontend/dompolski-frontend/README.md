Proyecto Dom Polski - Frontend

Interfaz de usuario (UI) construida con Vue.js 3 (Composition API) y Vite. Esta aplicación consume la API del backend de Dom Polski para mostrar el contenido de forma dinámica.

## 1. Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
* [Node.js](https://nodejs.org/) (se recomienda v18 o superior)
* [npm](https://www.npmjs.com/) (generalmente se instala con Node.js)

## 2. Instalación

1.  Clona el repositorio (o descomprime el ZIP).
2.  Navega a la carpeta del frontend:
    ```bash
    cd dom-polski-frontend
    ```
3.  Instala todas las dependencias del proyecto:
    ```bash
    npm install
    ```

## 3. Configuración (El Paso Más Importante)

Esta aplicación necesita saber dónde encontrar el **backend (la API)** y cómo conectarse a **Supabase (para la autenticación)**.

1.  En la raíz de la carpeta `dom-polski-frontend`, crea un archivo llamado `.env`.
2.  Copia y pega el siguiente contenido en ese archivo:

    ```bash
    # --- Conexión a tu API Backend ---
    # (Apunta al puerto donde corre tu servidor de Node.js)
    VITE_API_URL="http://localhost:3000"

    # --- Claves de Supabase ---
    # Ve a tu Dashboard de Supabase -> Settings (Configuración) -> API
    
    # Pega la URL de tu proyecto (la misma que en el backend)
    VITE_SUPABASE_URL="https"//[tu-proyecto-id].supabase.co"

    # ¡MUY IMPORTANTE! Esta es tu llave PÚBLICA.
    # Es la llave 'public-anon-key' (NO la 'service_role').
    VITE_SUPABASE_ANON_KEY="[tu-public-anon-key-larga]"
    ```

3.  Guarda el archivo `.env`.

## 4. Ejecución

Una vez instaladas las dependencias y configurado el `.env`, inicia el servidor de desarrollo de Vite:

```bash
npm run dev