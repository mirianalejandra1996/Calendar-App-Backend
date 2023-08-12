# Mi Increíble API de Calendario :calendar:

¡Hola! Te doy la bienvenida a la documentación de la API de Mi Increíble Calendario. Esta API está diseñada para ayudarte a administrar eventos en tu calendario. Estoy aprendiendo Node.js mientras construyo esto, ¡Agradecería mucho el feedback que me puedas proporcionar para mejorar! 

Estoy utilizando tecnologías como Node.js, Express.js y MongoDB para desarrollar esta API. Espero que encuentres útil esta documentación y te animes a explorar y probar la API.

## Características

- **Autenticación de Usuarios:** Registra, inicia sesión y administra cuentas de usuario de manera segura utilizando JWT (Tokens JSON Web).
- **Gestión de Eventos:** Crea, consulta, actualiza y elimina eventos en el calendario de un usuario.
- **Documentación Swagger:** Documentación completa de la API generada con Swagger, lo que facilita a los desarrolladores entender e integrarse con la API.

## Empezando

### Requisitos

- Node.js y npm instalados en tu sistema.
- MongoDB instalado y en funcionamiento.

### Instalación

1. Clona este repositorio: `git clone https://github.com/mirianalejandra1996/Calendar-backend.git`
2. Instala las dependencias: `npm install`
3. Renombra `.env.template` a `.env` y configura tus variables de entorno.

### Uso

1. Inicia el servidor: `npm start`
2. Accede a la documentación de la API: Abre tu navegador y visita [https://mern-calendar-backend-k4kt.onrender.com/api-doc/](https://mern-calendar-backend-k4kt.onrender.com/api-doc/)

## Endpoints de la API

### Usuarios

- `POST /auth/new`: Crea un nuevo usuario.
- `POST /auth`: Inicia sesión de un usuario.
- `GET /auth/renew`: Renovación del token de un usuario.

### Eventos

- `POST /events`: Crea un nuevo evento.
- `GET /events`: Obtiene una lista de eventos para el usuario autenticado.
- `PUT /events/:id`: Actualiza un evento existente.
- `DELETE /events/:id`: Elimina un evento.

## Documentación

La documentación de la API es generada utilizando Swagger. Visita [https://mern-calendar-backend-k4kt.onrender.com/api-doc/](https://mern-calendar-backend-k4kt.onrender.com/api-doc/) para explorar los endpoints de la API, ejemplos de solicitudes y respuestas, y esquemas.

## Realizando Peticiones

La base URL del API para hacer las peticiones es `https://mern-calendar-backend-k4kt.onrender.com/api`.


## Ejemplo de Uso

### Inicio de Sesión de Usuario

Puedes iniciar sesión de usuario enviando una solicitud POST al endpoint `/auth`. A continuación se muestra un ejemplo de cómo puedes hacerlo utilizando JavaScript y la función `fetch`:

```javascript
// Iniciar sesión de usuario
fetch('/auth', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'johndoe@example.com',
    password: 'password123',
  }),
})
  .then(response => response.json())
  .then(data => {
    if (data.ok) {
      console.log('Inicio de sesión exitoso');
      console.log('Token:', data.token);
      console.log('ID de Usuario:', data.uid);
      console.log('Nombre:', data.name);
    } else {
      console.error('Error:', data.msg);
    }
  })
  .catch(error => console.error('Error:', error));
```

## Contribuciones

Si te gustaría contribuir a este proyecto y mejorar aún más la aplicación de calendario, ¡te doy la bienvenida! Siéntete libre de hacer un fork del repositorio, realizar tus cambios y enviar una solicitud de pull.

## Contacto

Para cualquier pregunta o consulta, por favor contáctame en [mirianalejandra1996@gmail.com](mailto:mirianalejandra1996@gmail.com).

## Autor

- Nombre: [Mirian Alejandra Arévalo 🙋](https://github.com/mirianalejandra1996).
- Correo Electrónico: [mirianalejandra1996@gmail.com](mailto:mirianalejandra1996@gmail.com).
- GitHub: [https://github.com/mirianalejandra1996](https://github.com/mirianalejandra1996).
- Linkedin: [https://www.linkedin.com/in/mirian-arevalo/](https://www.linkedin.com/in/mirian-arevalo/).