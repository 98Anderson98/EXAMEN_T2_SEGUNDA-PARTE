# fe-ecommerce-lariosanderson

Frontend Angular para el API REST `be-ecommerce-lariosanderson` (Spring Boot + JWT).

Autor: Larios Tito Anderson — Código: n003849813

## Arquitectura

```
src/app
├── core
│   ├── guards        → authGuard / guestGuard
│   ├── interceptors  → authInterceptor (Bearer JWT, logout en 401)
│   └── services      → AuthService, ProductoService
├── models            → Producto, Auth
└── pages
    ├── login         → inicio de sesión
    ├── layout        → Sidebar (Productos + Cerrar sesión) responsive
    └── productos     → CRUD de productos
```

## Ejecución

1. Levantar el backend (`docker compose up -d` y Spring Boot en `http://localhost:8080`).
2. En este proyecto:

```bash
npm install
npm start      # http://localhost:4200
```

## Usuarios de Prueba

| Usuario  | Contraseña | Rol                   | Permisos                         |
|----------|------------|-----------------------|----------------------------------|
| admin    | admin123   | ROLE_ADMIN, ROLE_USER | CRUD completo (crear, editar, eliminar) |
| anderson | user123    | ROLE_USER             | Solo lectura                     |

## Características Implementadas

- **Autenticación JWT:** Login conectado al backend con almacenamiento de token en LocalStorage y cierre de sesión seguro.
- **Interceptors:** Inyección automática del header `Authorization: Bearer <token>` en todas las peticiones HTTP y redirección automática en errores 401.
- **Guards:** Protección de rutas con `authGuard` (requiere sesión) y `guestGuard` (evita login si ya está autenticado).
- **CRUD de Productos:** Listado con búsqueda reactiva en tiempo real, modales para creación y edición con validación de formularios, y confirmación modal de eliminación.
- **Diseño Responsive:** Sidebar fijo en desktop que colapsa a menú hamburguesa interactivo en pantallas móviles y conversión dinámica de la tabla de productos a tarjetas para celulares.

---
**Estudiante:** Anderson Fabrizzio Larios Tito  
**Código:** n003849813  
**Repositorio GitHub:** [EXAMEN_T2_SEGUNDA-PARTE](https://github.com/98Anderson98/EXAMEN_T2_SEGUNDA-PARTE)

