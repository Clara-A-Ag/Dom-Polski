# Proyecto "Dom Polski" - Sitio Web y CMS

¡Bienvenido al repositorio principal del proyecto Dom Polski Santa Fe!

Este es un sistema web completo desarrollado como proyecto final de [Nombre de tu Materia/Carrera]. El objetivo es modernizar la presencia digital de la Asociación Unión Polaca, proveyendo un sitio público dinámico y un panel de administración de contenidos (CMS) privado y seguro.

---

## 🚀 Stack Tecnológico

Está construido con un stack MERN/MEVN moderno (JavaScript de punta a punta), aprovechando un servicio de BaaS (Backend as a Service) para máxima eficiencia y seguridad.

* 🎨 **Frontend:** **Vue.js 3** (con Composition API y Vite)
    * *Manejo de Rutas:* Vue Router
    * *Cliente HTTP:* Axios (instancia centralizada)
* ⚙️ **Backend:** **Node.js** (con Express.js)
    * *API:* Diseño RESTful puro.
    * *Manejo de Archivos:* Multer (para la subida de fotos).
    * *Seguridad:* Middlewares de autenticación personalizados.
* 💾 **BaaS (Backend as a Service):** **Supabase**
    * *Base de Datos:* PostgreSQL
    * *Autenticación:* Supabase Auth (manejo de usuarios y tokens JWT).
    * *Almacenamiento:* Supabase Storage (para buckets privados de fotos).

---

## 📂 Estructura del Repositorio

Este repositorio es un "monorepo" que contiene los dos servicios principales del sistema en carpetas separadas.

* `./dom-polski-frontend/`
    Contiene la aplicación Vue.js. Esta es la "fachada" que ven los usuarios públicos y también el Panel de Administración (CMS) privado.

* `./dom-polski-backend/`
    Contiene la API RESTful de Node.js. Este es el "taller" que se conecta de forma segura a Supabase para leer, escribir y proteger todos los datos.

---

## 🛠️ Instalación y Puesta en Marcha

Para ejecutar el proyecto completo, necesitas tener **dos terminales** abiertas: una para el backend y otra para el frontend.

Las instrucciones detalladas de instalación (`npm install`) y la configuración crucial de las variables de entorno (`.env`) se encuentran en los manuales específicos dentro de cada carpeta.

### 1. Iniciar el Backend (El Taller)

**[Haz clic aquí para ver el README del Backend](./dom-polski-backend/README.md)**

### 2. Iniciar el Frontend (El Escaparate)

**[Haz clic aquí para ver el README del Frontend](./frontend/dompolski-frontend/README.md)**

---

## ✨ Estado Actual y Features Implementadas

* ✅ **Sitio Público:** Vistas de Inicio, Novedades (con detalle), Contacto (funcional), Historia y Miembros (consumiendo la API).
* ✅ **Panel de Admin (CMS):**
    * Sistema de Login 100% funcional y seguro (`/login`).
    * Layout protegido con Guardia de Ruta (Bouncer) y cierre de sesión.
* ✅ **CRUD de Novedades:** Gestión completa (Crear, Leer, Actualizar y Borrar) desde el panel de admin.
* ✅ **CRUD de Miembros:** Gestión completa, incluyendo subida de fotos a un bucket privado de Supabase Storage.
* 🟡 **CRUD de Actividades:**
    * Base de datos y API refactorizadas (¡Triage v6.0!).
    * Vista pública (escaparate) funcional y conectada a la nueva API.
    * Gestión en el panel de admin (taller) **pendiente**.
