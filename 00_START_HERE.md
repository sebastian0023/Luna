# 🚀 COMIENZA AQUÍ - Luna en Cloudflare Workers

Tu proyecto está **100% configurado** para despliegue automático en Cloudflare. Sigue estos pasos:

---

## ⚡ Los 5 Pasos Esenciales

### 1️⃣ **Instalar dependencias** (1 min)
```bash
npm install
```

### 2️⃣ **Configurar Cloudflare** (3 min)
Lee: [CLOUDFLARE_SETUP.md](./CLOUDFLARE_SETUP.md) - Secciones "Paso 1-3"

**Lo importante:**
- Obtener tu **Account ID** de Cloudflare
- Hacer `wrangler login`
- Actualizar `wrangler.toml` con tu Account ID

### 3️⃣ **Configurar secretos** (2 min)
```bash
wrangler secret put MONGO_URI
wrangler secret put MONGO_DATA_API_KEY
```

### 4️⃣ **Probar localmente** (2 min)
```bash
npm run dev
# Abre http://localhost:8787
```

### 5️⃣ **Configurar GitHub Actions** (5 min)
Lee: [GITHUB_QUICK_START.md](./GITHUB_QUICK_START.md)

**Lo importante:**
- Obtener API Token de Cloudflare
- Agregar 2 secrets en GitHub:
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`
- Agregar tus variables de entorno

---

## 🎯 Después de eso...

### ✅ Si todo funciona:

```bash
# Hacer un cambio
git add .
git commit -m "initial setup"
git push origin main

# Ir a GitHub → Actions
# ¡Verás tu workflow deployando! 🚀
```

### 📂 Estructura del proyecto:

```
luna/
├── .github/workflows/
│   └── deploy.yml           ← ⭐ Tu CI/CD automático
├── src/
│   ├── index.js             ← Entry point del Worker
│   ├── routes/example.js    ← Ejemplos de rutas
│   └── utils/mongodb.js     ← Helpers para MongoDB
├── public/
│   └── index.html           ← Tu app (servida desde edge)
├── wrangler.toml            ← Configuración de Cloudflare
├── package.json             ← Dependencias
├── 00_START_HERE.md         ← Este archivo
├── GITHUB_QUICK_START.md    ← Setup CI/CD (5 min)
├── GITHUB_ACTIONS_SETUP.md  ← Setup CI/CD detallado
├── CLOUDFLARE_SETUP.md      ← Setup de Cloudflare
└── DEPLOY_CHECKLIST.md      ← Checklist
```

---

## 🔄 Flujo de trabajo actual:

```
Local (npm run dev)
        ↓
GitHub (git push)
        ↓
GitHub Actions (workflow automático)
        ↓
Cloudflare Workers (deployment automático)
        ↓
✅ Tu app en vivo
```

---

## 📖 Documentos por orden de lectura:

1. **Este archivo** ← Estás aquí 👈
2. [GITHUB_QUICK_START.md](./GITHUB_QUICK_START.md) - Setup CI/CD rápido
3. [CLOUDFLARE_SETUP.md](./CLOUDFLARE_SETUP.md) - Setup detallado
4. [README.md](./README.md) - Documentación general

---

## ✨ Características Incluidas

✅ **Cloudflare Workers** - Serverless global
✅ **GitHub Actions** - CI/CD automático
✅ **MongoDB** - Base de datos
✅ **API Router** - itty-router
✅ **Archivos estáticos** - Servidos desde edge
✅ **Multi-environment** - dev/staging/prod
✅ **Secretos seguros** - Wrangler + GitHub

---

## ❓ Problemas Comunes

### "¿Dónde configuro mi Account ID?"
→ En `wrangler.toml`, reemplaza `account_id = "your_account_id_here"`

### "¿Dónde obtengo el API Token?"
→ [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens) → Create Token

### "¿Cómo configuro el deploy automático?"
→ Lee [GITHUB_QUICK_START.md](./GITHUB_QUICK_START.md) (5 min)

### "¿Cómo pruebo localmente?"
→ `npm run dev` y abre http://localhost:8787

---

## 🚀 El único comando que necesitas:

```bash
# Instalar
npm install

# Configurar (sigue las guías)
# wrangler login, wrangler secret put, etc.

# Probar
npm run dev

# Desplegar
npm run deploy        # Staging
npm run deploy:prod   # Producción

# O simplemente
git push origin main  # ¡GitHub Actions hace el deploy automáticamente!
```

---

## 📝 Próximos pasos recomendados:

1. ✅ **Instala dependencias** → `npm install`
2. ✅ **Lee [GITHUB_QUICK_START.md](./GITHUB_QUICK_START.md)** → 5 minutos
3. ✅ **Configura Cloudflare** → Sigue [CLOUDFLARE_SETUP.md](./CLOUDFLARE_SETUP.md)
4. ✅ **Prueba localmente** → `npm run dev`
5. ✅ **Configura GitHub Actions** → Sigue los pasos de GITHUB_QUICK_START.md
6. ✅ **Haz un push** → `git push origin main`
7. ✅ **Verifica en GitHub Actions** → Ve a Actions en tu repo
8. ✅ **¡Listo!** → Tu app se deploya automáticamente

---

## 💡 Tips

- **Desarrollo local:** `npm run dev`
- **Deploy manual:** `npm run deploy`
- **Ver logs:** `wrangler tail`
- **Agregar secrets:** `wrangler secret put NOMBRE`
- **Listar secrets:** `wrangler secret list`

---

**¡Tu proyecto Luna está listo para escala global! 🌙**

¿Necesitas ayuda? Lee los archivos `.md` incluidos o ve a [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/).
