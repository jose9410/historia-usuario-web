# Koncilia - Generador de Historias de Usuario (Frontend)

Este proyecto es la interfaz web del sistema **Koncilia**, diseñada para facilitar la carga de transcripciones de reuniones (.VTT) y la gestión de historias de usuario generadas por IA.

## 🚀 Características

- **Carga de Archivos**: Interfaz intuitiva para subir archivos `.vtt`.
- **Procesamiento en Tiempo Real**: Visualización del estado del procesamiento mediante Semantic Kernel.
- **Gestión de Salidas**: Listado dinámico de archivos generados (DOCX, SVG, PUML).
- **Descarga Directa**: Capacidad de descargar los artefactos generados directamente al equipo local.
- **Diseño Premium**: Desarrollado con Angular Material, siguiendo una estética moderna y profesional con un fondo azul claro (#e3f2fd).

## 🛠️ Tecnologías

- **Framework**: Angular 19+
- **Estilos**: Angular Material & Vanilla CSS
- **Servidor Web**: Nginx (para el contenedor de producción)
- **Comunicación**: HttpClient con Proxy para el Backend API

## 🔧 Desarrollo Local

Para iniciar el servidor de desarrollo local, ejecute:

```bash
npm install
ng serve
```

Navegue a `http://localhost:4200/`. La aplicación se recargará automáticamente si modifica los archivos fuente.

## 🏗️ Construcción (Build)

Para compilar el proyecto ejecute:

```bash
ng build
```

Los artefactos de compilación se almacenarán en el directorio `dist/`.

## 📦 Despliegue con Docker

El proyecto incluye un `Dockerfile` multietapa para servir la aplicación con Nginx.

```bash
docker build -t madu1206/historia-usuario-web:latest .
docker run -p 80:80 madu1206/historia-usuario-web:latest
```

## ☸️ Infraestructura y GitOps

Este repositorio está integrado en un flujo **GitOps** gestionado por **Argo CD**.

- **CI/CD**: Configurado con GitHub Actions. Se dispara al crear tags que comienzan con `v*` (ej. `v1.2.0`).
- **Kubernetes**: Desplegado mediante Helm Charts (`charts/historia-usuario-web`).
- **Gateway**: Nginx está configurado para actuar como reverse proxy, redirigiendo las peticiones `/api/*` al servicio del backend.

---
© 2026 Koncilia Automation. Todos los derechos reservados.

