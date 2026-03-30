# ✅ Cloudflare Deploy Checklist

Sigue estos pasos para desplegar tu proyecto Luna en Cloudflare Workers.

## 📋 Pre-Deploy (1 vez)

- [ ] **Instalar dependencias**
  ```bash
  npm install
  ```

- [ ] **Login en Cloudflare**
  ```bash
  npm run wrangler login
  # O: wrangler login
  ```
  - Se abrirá una ventana del navegador
  - Autoriza la conexión

- [ ] **Configurar wrangler.toml**
  - Abre `wrangler.toml`
  - Reemplaza `account_id = "your_account_id_here"` con tu Account ID
    - Encuentra tu Account ID en: [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers → Overview
  - Descomenta y personaliza las rutas si tienes un dominio

- [ ] **Configurar secretos (IMPORTANTE)**
  ```bash
  # MongoDB URI
  wrangler secret put MONGO_URI

  # MongoDB Data API Key
  wrangler secret put MONGO_DATA_API_KEY

  # Otras claves
  wrangler secret put API_KEY
  ```
  - Cada comando abrirá un prompt para ingresar el valor
  - Pega tu valor y presiona Enter, luego Ctrl+D (o Cmd+D en Mac)

- [ ] **Verificar secretos (opcional)**
  ```bash
  wrangler secret list
  ```

## 🧪 Testing Local

- [ ] **Iniciar servidor de desarrollo**
  ```bash
  npm run dev
  ```
  - Abre `http://localhost:8787` en tu navegador
  - Deberías ver la app Luna cargada

- [ ] **Probar endpoints API**
  ```bash
  # En otra terminal
  curl http://localhost:8787/api/health
  # Deberías ver: {"status":"ok"}
  ```

- [ ] **Ver logs en desarrollo**
  ```bash
  # Abre una nueva terminal mientras está corriendo dev
  wrangler tail
  ```

## 🚀 Deploy a Staging

- [ ] **Deploy inicial**
  ```bash
  npm run deploy
  ```
  - Espera a que termine (2-3 minutos)
  - Verás la URL de tu worker

- [ ] **Probar worker en vivo**
  - Abre la URL que te mostró el deploy
  - Verifica que la app cargue
  - Prueba `/api/health`

- [ ] **Ver logs en tiempo real**
  ```bash
  wrangler tail
  ```

## 📦 Deploy a Producción

- [ ] **Configurar variables de producción (si es diferente)**
  ```bash
  wrangler secret put MONGO_URI --env production
  # Repite para otros secretos si necesitas valores diferentes
  ```

- [ ] **Deploy a producción**
  ```bash
  npm run deploy:prod
  ```

- [ ] **Verificar en producción**
  ```bash
  wrangler tail --env production
  ```

## 🌐 Configurar Dominio Personalizado

- [ ] **En Cloudflare Dashboard**
  1. Ir a [dash.cloudflare.com](https://dash.cloudflare.com)
  2. Seleccionar tu dominio
  3. Ir a "Workers Routes"
  4. Agregar Route:
     - Pattern: `example.com/api/*`
     - Worker: `luna` (tu worker)
     - Zone: Tu dominio

- [ ] **Probar con dominio**
  ```bash
  curl https://example.com/api/health
  ```

## 🔍 Monitoreo Post-Deploy

- [ ] **Ver analytics**
  - Dashboard → Workers → Analytics
  - Verifica requests, errores, CPU time

- [ ] **Configurar alertas (opcional)**
  - Dashboard → Workers → Settings
  - Agregar alertas por error rate o CPU time

## 🔐 Mantener Seguridad

- [ ] **Nunca committear secretos**
  - `.env` nunca debe estar en git
  - Los secrets van en Cloudflare, no en código

- [ ] **Revisar logs regularmente**
  ```bash
  wrangler tail --format json | grep error
  ```

- [ ] **Rotar secretos periódicamente**
  ```bash
  # Actualizar un secreto
  wrangler secret put MONGO_URI
  ```

## 🛠️ Troubleshooting

### Error: "Account ID is required"
```bash
# Verifica que configuraste account_id en wrangler.toml
grep account_id wrangler.toml
```

### Error: "Invalid authentication"
```bash
# Re-login
wrangler logout
wrangler login
```

### Error: "MONGO_URI no está configurada"
```bash
# Verifica que agregaste el secret
wrangler secret list
# Si no está, agrégalo
wrangler secret put MONGO_URI
```

### Worker retorna 404 en index.html
```bash
# Verifica que index.html está en public/
ls -la public/index.html

# Verifica que wrangler.toml tiene:
# [assets]
# directory = "public"
```

### Cambios no aparecen después de deploy
```bash
# Limpia el cache
wrangler publish --name luna

# O redeploy completo
npm run deploy --force
```

## 📚 Documentos Útiles

- [CLOUDFLARE_SETUP.md](./CLOUDFLARE_SETUP.md) - Guía completa de setup
- [README.md](./README.md) - Información general del proyecto
- [wrangler.example.toml](./wrangler.example.toml) - Configuración con comentarios

## ✨ Pronto para Producción

Una vez que hayas completado todos los items:

✅ App en vivo y funcionando
✅ Secretos configurados correctamente
✅ Logs monitoreados
✅ Dominio personalizado (opcional)
✅ Analytics activos

**¡Tu Luna app está lista en Cloudflare! 🎉**

---

**Preguntas?**
- Ver [CLOUDFLARE_SETUP.md](./CLOUDFLARE_SETUP.md)
- [Docs de Cloudflare Workers](https://developers.cloudflare.com/workers/)
