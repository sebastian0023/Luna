# 📋 Guía de Configuración - Cloudflare Worker

## 🚀 Pasos para desplegar en Cloudflare

### 1. **Instalar dependencias**
```bash
npm install
```

### 2. **Crear cuenta en Cloudflare**
- Ir a [dash.cloudflare.com](https://dash.cloudflare.com)
- Registrarse o iniciar sesión
- Anotar tu **Account ID** (en Workers > Overview)

### 3. **Instalar y configurar Wrangler**
Wrangler ya está incluido en las dependencias. Para usar el CLI:

```bash
# Login en Cloudflare
npm run wrangler login
# O si está instalado globalmente
wrangler login
```

### 4. **Configurar variables de entorno**

#### Opción A: Usando secretos de Wrangler (Recomendado)
```bash
# Agregar MongoDB URI como secreto
npm run secret:set MONGO_URI

# Agregar API keys
npm run secret:set MONGO_DATA_API_KEY
npm run secret:set API_KEY
```

#### Opción B: Modificar wrangler.toml
Actualizar el archivo `wrangler.toml` con tus valores:

```toml
[env.production.vars]
MONGO_URI = "mongodb+srv://user:pass@cluster.mongodb.net/luna"
API_KEY = "your_key_here"
```

### 5. **Opciones de Base de Datos**

#### MongoDB Atlas (Recomendado con Data API)
1. Ir a MongoDB Atlas > App Services
2. Crear una Data API
3. Obtener el API Key
4. Usar el `utils/mongodb.js` para hacer llamadas

#### Cloudflare D1 (SQLite alternativa)
```bash
# Crear base de datos D1
wrangler d1 create luna-db

# Agregar a wrangler.toml
[[d1_databases]]
binding = "DB"
database_name = "luna-db"
database_id = "your_database_id"
```

#### Cloudflare KV (Cache/Storage)
```bash
# Crear KV Namespace
wrangler kv:namespace create "KV_CACHE"

# Ya está configurado en wrangler.toml
```

### 6. **Desarrollo local**
```bash
# Iniciar servidor de desarrollo
npm run dev

# La app estará disponible en http://localhost:8787
```

### 7. **Desplegar**

#### Desplegar a staging
```bash
npm run dev
```

#### Desplegar a producción
```bash
npm run deploy:prod
```

### 8. **Configurar dominio personalizado**

En Cloudflare Dashboard:
1. Go to Workers > Your Worker > Settings
2. Routes
3. Add Route: `example.com/api/*` (apunta a tu worker)
4. Zone: Seleccionar tu dominio

---

## 📦 Estructura del Proyecto

```
luna/
├── public/                  # Archivos estáticos (index.html, CSS, JS)
├── src/
│   ├── index.js            # Worker entry point
│   └── utils/
│       └── mongodb.js      # Helpers para MongoDB
├── wrangler.toml           # Configuración de Cloudflare
├── package.json            # Dependencias
├── .env.example            # Variables de ejemplo
└── CLOUDFLARE_SETUP.md     # Este archivo
```

---

## 🔑 Variables de Entorno

### En desarrollo (`wrangler dev`)
Crea un archivo `.env` en la raíz (no se commitea):
```env
MONGO_URI=tu_uri_aqui
MONGO_DATA_API_KEY=tu_key_aqui
```

### En producción
Usa wrangler secrets:
```bash
wrangler secret put MONGO_URI --env production
wrangler secret put MONGO_DATA_API_KEY --env production
```

---

## 🔍 Debugging

### Ver logs en tiempo real
```bash
wrangler tail
```

### Tail de logs en producción
```bash
wrangler tail --env production
```

### Ver configuración actual
```bash
wrangler info
```

---

## 📊 Monitorear uso

En Cloudflare Dashboard:
- Workers > Analytics
- Ver requests, errors, CPU time
- Monitorear costos

---

## 🛡️ Seguridad

1. **Nunca commitear secretos** - Usar `wrangler secret put`
2. **Validar inputs** - Sanitizar datos en rutas POST
3. **CORS** - Configurar según sea necesario
4. **Rate limiting** - Usar Cloudflare's built-in protection

---

## ❓ Troubleshooting

### Error: "MONGO_URI no está definida"
```bash
# Asegurarse que el secreto está configurado
wrangler secret list
# Si no está, agregarlo
wrangler secret put MONGO_URI
```

### Error: "404 Not Found en archivos estáticos"
- Verificar que `index.html` esté en `public/`
- Verificar que `assets = { directory = "public" }` está en `wrangler.toml`

### Worker lento
- Usar Cloudflare Analytics para identificar cuellos de botella
- Considerar KV caching para datos frecuentes
- Optimizar queries a MongoDB

---

## 📚 Recursos útiles

- [Documentación de Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/cli-wrangler/)
- [Workers Examples](https://github.com/cloudflare/workers-examples)
- [itty-router Docs](https://itty.dev/)

---

¡Tu proyecto está listo para Cloudflare! 🎉
