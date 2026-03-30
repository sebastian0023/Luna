# 🌙 Luna - Cloudflare Worker

Una aplicación moderna de **Luna** construida con **Cloudflare Workers** para deployar sin servidor en la red global de Cloudflare.

## ✨ Características

- ⚡ **Cloudflare Workers** - Deploy sin servidor, ejecución global
- 📦 **Archivos estáticos** - Sirve HTML, CSS, JS desde edge
- 🔌 **API REST** - Router basado en itty-router
- 💾 **MongoDB Atlas** - Integración con base de datos
- 🔐 **Secretos seguros** - Gestión de credenciales con Wrangler
- 🌍 **Global edge** - Latencia baja en todo el mundo

## 🚀 Quick Start

### Requisitos
- Node.js 18+
- Cuenta en [Cloudflare](https://dash.cloudflare.com)
- `npm` o `yarn`

### Instalación

```bash
# 1. Clonar repositorio
git clone <url>
cd luna

# 2. Instalar dependencias
npm install

# 3. Login en Cloudflare
npm run wrangler login

# 4. Configurar variables de entorno
npm run secret:set MONGO_URI
npm run secret:set MONGO_DATA_API_KEY

# 5. Iniciar desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:8787`

## 📁 Estructura del Proyecto

```
luna/
├── public/                    # Archivos estáticos (servidos por workers)
│   └── index.html            # Aplicación principal
├── src/
│   ├── index.js              # Worker entry point
│   ├── routes/
│   │   └── example.js        # Ejemplo de rutas
│   └── utils/
│       └── mongodb.js        # Helpers para MongoDB
├── wrangler.toml             # Configuración de Cloudflare
├── package.json              # Dependencias
├── CLOUDFLARE_SETUP.md       # Guía de setup completa
└── README.md                 # Este archivo
```

## 🛠️ Scripts disponibles

```bash
# Desarrollo
npm run dev              # Iniciar servidor local

# Deploy
npm run deploy          # Deploy a staging
npm run deploy:prod     # Deploy a producción

# Secretos
npm run secret:set      # Agregar/actualizar secreto
npm run secret:list     # Listar secretos configurados
```

## 🌐 Desplegar

### Deploy automático
```bash
npm run deploy:prod
```

### Configurar dominio personalizado
1. En Cloudflare Dashboard → Workers
2. Ir a tu worker → Settings → Domains & Routes
3. Agregar ruta: `ejemplo.com/api/*`

### Monitorear
```bash
# Ver logs en tiempo real
npm run wrangler tail

# Abrir dashboard
wrangler tail --env production
```

## 📚 API Endpoints

### Health Check
```bash
GET /api/health
```

### Datos
```bash
GET /api/data           # Obtener datos
POST /api/data          # Crear datos
```

### Ejemplo: Usuarios
```bash
GET /api/users          # Listar usuarios
GET /api/users/:id      # Obtener usuario
POST /api/users         # Crear usuario
PUT /api/users/:id      # Actualizar usuario
DELETE /api/users/:id   # Eliminar usuario
```

## 🔑 Variables de Entorno

Configuradas como Wrangler Secrets:

- `MONGO_URI` - Conexión a MongoDB Atlas
- `MONGO_DATA_API_KEY` - API Key para Data API
- `API_KEY` - Clave API general
- `SECRET_TOKEN` - Token secreto

Ver [CLOUDFLARE_SETUP.md](./CLOUDFLARE_SETUP.md) para detalles completos.

## 🗄️ Base de Datos

### Opción 1: MongoDB Atlas (Recomendado)
Usa la **Data API REST** para conectar desde Workers:
- No requiere conexión TCP (que Workers no soporta)
- Rápido y seguro
- Ver `src/utils/mongodb.js`

### Opción 2: Cloudflare D1
SQLite nativo en Cloudflare:
```bash
wrangler d1 create luna-db
```

### Opción 3: Cloudflare KV
Key-Value store para cache:
```bash
wrangler kv:namespace create "KV_CACHE"
```

## 🔒 Seguridad

- ✅ Nunca committear `.env` o secretos
- ✅ Usar `wrangler secret put` para credenciales
- ✅ Validar inputs en todas las rutas
- ✅ CORS configurado en `wrangler.toml`
- ✅ Rate limiting con Cloudflare

## 🐛 Debugging

```bash
# Ver logs del worker
wrangler tail

# Logs de una ruta específica
wrangler tail --format pretty

# Ejecutar en modo debug
npm run dev -- --local
```

## 📊 Monitorar Uso

En [Cloudflare Dashboard](https://dash.cloudflare.com):
- Workers → Analytics
- Ver requests, errores, CPU time
- Monitorear costos

## 🤖 CI/CD Automático con GitHub Actions

El proyecto incluye **despliegue automático** desde GitHub:

- **Push a `main`** → Deploy a **producción** 🚀
- **Push a `develop`** → Deploy a **desarrollo** 🧪
- **Pull Request** → Deploy a **staging** ✅

Ver [GITHUB_QUICK_START.md](./GITHUB_QUICK_START.md) o [GITHUB_ACTIONS_SETUP.md](./GITHUB_ACTIONS_SETUP.md)

## 📖 Recursos

- [GITHUB_QUICK_START.md](./GITHUB_QUICK_START.md) - Setup en 5 minutos
- [GITHUB_ACTIONS_SETUP.md](./GITHUB_ACTIONS_SETUP.md) - Guía completa de CI/CD
- [CLOUDFLARE_SETUP.md](./CLOUDFLARE_SETUP.md) - Setup de Cloudflare Workers
- [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md) - Checklist de deployment
- [Documentación Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/cli-wrangler/)
- [itty-router Docs](https://itty.dev/)
- [MongoDB Data API](https://www.mongodb.com/docs/atlas/app-services/data-api/)

## 📝 Licencia

ISC

---

**Creado con ❤️ para Cloudflare Workers**

¿Preguntas? Ver [CLOUDFLARE_SETUP.md](./CLOUDFLARE_SETUP.md) para guía completa de setup.
