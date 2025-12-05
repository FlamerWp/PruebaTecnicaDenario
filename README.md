# 📝 To-Do App Full Stack -- Ionic + Angular & Node.js

Este proyecto es una **aplicación Full Stack** desarrollada como parte
de una evaluación técnica.\
Permite que un usuario pueda **registrarse, iniciar sesión y gestionar
sus tareas personales**, con control de acceso mediante **JWT** y un
frontend moderno construido con **Ionic + Angular**.

------------------------------------------------------------------------

## 🚀 Tecnologías Utilizadas

### **Frontend (Ionic + Angular)**

-   **Ionic 7**\
-   **Angular 17 (standalone components)**\
-   **Router de Angular**\
-   **Servicios HTTP**\
-   **Guards (CanActivate)**\
-   **Diseño responsive estilo móvil**

### **Backend (Node.js + MVC)**

-   **Node.js**\
-   **Express**\
-   **MySQL2**\
-   **bcryptjs** para hash de contraseñas\
-   **jsonwebtoken** para autenticación\
-   **dotenv**\
-   **cors**\
-   **nodemon**

### **Base de Datos**

-   **MySQL**
-   Tablas:
    -   `users`
    -   `tasks`

------------------------------------------------------------------------

## 📌 Funcionalidades

### 👤 **Usuarios**

-   Registro con nombre, email y contraseña.
-   Login con email y contraseña.
-   Validación de email único.
-   Validación de contraseña mínima (5 caracteres).
-   Contraseñas siempre hasheadas.

### 🔐 **Autenticación**

-   Login genera un **JWT**.
-   Frontend guarda y envía el token en headers.
-   Middleware protege rutas `/tasks`.
-   Si no tiene token → redirección a login.

### 📝 **Gestión de Tareas**

Cada tarea incluye: - Título (obligatorio) - Descripción (opcional) -
Estado: pendiente / completada - Fecha de creación

El usuario puede: - Crear tareas\
- Listarlas\
- Editarlas\
- Eliminarlas\
- Filtrar por pendientes o completadas\
- Ver **solo sus propias tareas**

------------------------------------------------------------------------

## 📁 Estructura del Proyecto

### **Backend**

    backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── config/
    ├── index.js
    └── .env

### **Frontend (Ionic + Angular)**

    frontend/
    ├── src/
    │   ├── app/
    │   ├── pages/
    │   ├── services/
    │   ├── guards/
    │   └── environments/
    └── ionic.config.json

------------------------------------------------------------------------

## 🗄️ Script SQL (Creación de Tablas)

``` sql
CREATE DATABASE todoapp;

USE todoapp;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  titulo VARCHAR(150) NOT NULL,
  descripcion TEXT NULL,
  estado ENUM('pendiente','completada') DEFAULT 'pendiente',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

------------------------------------------------------------------------

## ⚙️ Configuración del Backend

``` bash
cd backend
npm install
```

Crear archivo `.env`:

    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_clave
    DB_NAME=todoapp
    JWT_SECRET=MiSuperClave

Iniciar:

``` bash
npm run dev
```

------------------------------------------------------------------------

## 📱 Configuración del Frontend

``` bash
cd frontend
npm install
ionic serve
```

Configurar API en:

`src/environments/environment.ts`

``` ts
export const environment = {
  apiUrl: 'http://localhost:3000'
};
```

------------------------------------------------------------------------

## 🔗 Endpoints del Backend

  Método   Endpoint         Descripción
  -------- ---------------- -------------------
  POST     /auth/login      Login usuario
  POST     /auth/register   Registrar usuario
  GET      /tasks           Listar tareas
  POST     /tasks           Crear tarea
  PUT      /tasks/:id       Actualizar tarea
  DELETE   /tasks/:id       Eliminar tarea

------------------------------------------------------------------------

## 💡 Notas Finales

-   Frontend redirige al login si no hay token.
-   Cada usuario solo puede ver sus tareas.
