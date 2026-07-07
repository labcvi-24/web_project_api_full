# Tripleten web_project_around_auth

## Descripción del proyecto

**web_project_around_auth** es una aplicación web desarrollada con React que permite a los usuarios registrarse, iniciar sesión y administrar una galería de fotografías mediante una interfaz moderna, intuitiva y completamente responsiva.

El proyecto incorpora autenticación de usuarios mediante JSON Web Tokens (JWT), validación de formularios y navegación protegida para garantizar que únicamente los usuarios autenticados puedan acceder al contenido principal de la aplicación.

## Funcionalidades

### Registro de usuarios

Los nuevos usuarios pueden crear una cuenta proporcionando un correo electrónico y una contraseña.

Características

- Formulario de registro.
- Validación de campos obligatorios.
- Confirmación visual cuando el registro se realiza correctamente.
- Modal de éxito al completar el proceso.

![Registro exitoso](./src/images/fotoFigma/SUCCESS.png)

---

### Inicio de sesión

Una vez registrado, el usuario puede acceder a su cuenta mediante sus credenciales.

**Características**

- Autenticación mediante correo y contraseña.
- Validación de los datos ingresados.
- Redirección automática al contenido protegido.
- Persistencia de sesión utilizando JWT.

![Inicio de sesión](./src/images/fotoFigma/LOG_IN.jpg)

---

### Manejo de errores

Cuando ocurre un error durante el registro o el inicio de sesión, la aplicación muestra una ventana modal informando el problema.

**Características**

- Mensajes de error claros.
- Retroalimentación inmediata al usuario.
- Interfaz consistente mediante ventanas emergentes.

![Mensaje de error](./src/images/fotoFigma/error.png)

---

### Navegación protegida

La aplicación restringe el acceso a determinadas rutas cuando el usuario no ha iniciado sesión.

**Características**

- Protección de rutas privadas.
- Redirección automática al formulario de inicio de sesión.
- Verificación del token al cargar la aplicación.

---

## Tecnologías utilizadas

### Frontend

- React 19
- React DOM
- React Router DOM
- JavaScript (ES6+)
- HTML5
- CSS3

### Herramientas

- Create React App
- npm
- Git
- GitHub
- GitHub Pages

---

## Técnicas implementadas

Durante el desarrollo del proyecto se aplicaron diversas técnicas fundamentales de React y JavaScript moderno:

- Componentes reutilizables para mejorar la organización del código.
- React Hooks (`useState` y `useEffect`) para gestionar el estado y el ciclo de vida de los componentes.
- React Router para implementar la navegación entre páginas.
- Rutas protegidas para controlar el acceso de usuarios autenticados.
- Formularios controlados mediante estados de React.
- Comunicación con una API REST para realizar operaciones de autenticación.
- Manejo de promesas utilizando `fetch()`.
- Almacenamiento del token JWT en `localStorage` para mantener la sesión del usuario.
- Renderizado condicional según el estado de autenticación.
- Ventanas modales reutilizables para mostrar mensajes de éxito y error.
- Validación de formularios antes de enviar la información.
- Diseño Responsive utilizando CSS.

---

## Enlaces

**GitHub Pages**

https://labcvi-24.github.io/web_project_around_auth/
