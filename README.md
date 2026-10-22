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

## Usuarios

| Usuario  | Contraseña | Permisos                         |
|----------|------------|----------------------------------|
| admin    | admin123   | CRUD completo (ROLE_ADMIN)       |
| anderson | user123    | Solo lectura (ROLE_USER)         |

> El CORS del backend permite `http://localhost:4200`.
