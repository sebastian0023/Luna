# 🚀 GitHub Actions Setup - Auto Deploy a Cloudflare

Guía para configurar **despliegue automático** desde GitHub a Cloudflare Workers.

## 📋 Requisitos

- ✅ Repositorio en GitHub (público o privado)
- ✅ Cuenta en Cloudflare con Workers
- ✅ API Token de Cloudflare

---

## ⚙️ Configuración

### Paso 1: Obtener API Token de Cloudflare

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com)
2. **Perfil** (esquina superior derecha) → **Tokens de API**
3. Click en **"Crear Token"**
4. Selecciona **"Edit Cloudflare Workers"** (preset)
5. Click en **"Usar plantilla"**
6. Configura:
   - **Nombre del token:** `GitHub Luna Deploy`
   - **Permisos:** Dejarlo como viene (Editor)
   - **Recursos:** All accounts
   - **Validez:** 365 días (o la que prefieras)
7. Click en **"Crear Token"**
8. **COPIA el token** (no volverás a verlo)

### Paso 2: Obtener Account ID

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Ir a **Workers**
3. En la esquina superior derecha, verás tu **Account ID**
4. **COPIA tu Account ID**

### Paso 3: Agregar Secrets a GitHub

1. Ve a tu repositorio en GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Click en **"New repository secret"**
4. Agrega estos secrets uno por uno:

#### Secret 1: API Token
- **Name:** `CLOUDFLARE_API_TOKEN`
- **Value:** [Pega el token de Cloudflare que copiaste]
- Click **Add secret**

#### Secret 2: Account ID
- **Name:** `CLOUDFLARE_ACCOUNT_ID`
- **Value:** [Pega tu Account ID]
- Click **Add secret**

#### Secret 3-6: Variables de Entorno (Desarrollo)
Si tienes variables diferentes para dev y prod, agrega:

```
MONGO_URI (para desarrollo)
MONGO_DATA_API_KEY (para desarrollo)
API_KEY (para desarrollo)
SECRET_TOKEN (para desarrollo)
```

#### Secret 7-10: Variables de Entorno (Producción)
```
MONGO_PROD_URI (para producción)
MONGO_DATA_API_KEY_PROD (para producción)
API_KEY_PROD (para producción)
SECRET_TOKEN_PROD (para producción)
```

---

## 📝 Archivo de Workflow

El archivo `.github/workflows/deploy.yml` ya está configurado. Aquí está lo que hace:

### Triggers (Cuándo corre el workflow)

| Rama | Evento | Acción |
|------|--------|--------|
| `main` | `push` | Deploy a **producción** 🚀 |
| `develop` | `push` | Deploy a **development** 🧪 |
| Cualquiera | `pull_request` a `main` | Deploy a **staging** ✅ |

### Pasos del Workflow

1. ✅ Checkout del código
2. ✅ Setup Node.js 18
3. ✅ Instalar dependencias (`npm ci`)
4. ✅ Validar código
5. 🚀 **Deploy a Cloudflare** (staging/dev/prod según la rama)
6. 📨 Notificar resultado

---

## 🔄 Cómo Funciona

### Cuando haces push a `main`

```
┌─────────────────────────────────────────────────┐
│ 1. Haces 'git push' a main                       │
│ 2. GitHub detecta el push                        │
│ 3. GitHub Actions corre el workflow             │
│ 4. Instala dependencias                          │
│ 5. Deploy a PRODUCCIÓN en Cloudflare            │
│ 6. Tu app actualizada en unos segundos           │
└─────────────────────────────────────────────────┘
```

### Cuando abres un Pull Request

```
┌─────────────────────────────────────────────────┐
│ 1. Abres Pull Request a main                     │
│ 2. GitHub Actions corre el workflow              │
│ 3. Deploy a STAGING (luna-development)          │
│ 4. Puedes previsualizar los cambios             │
│ 5. Si todo está bien, mergea el PR              │
│ 6. Deploy automático a PRODUCCIÓN               │
└─────────────────────────────────────────────────┘
```

---

## 🧪 Testear el Workflow

### Opción 1: Hacer un push de prueba

```bash
# Edita un archivo
echo "# Luna" > TEMP.md

# Commit y push
git add TEMP.md
git commit -m "Test workflow"
git push origin main
```

### Opción 2: Ver el estado en GitHub

1. Ve a tu repositorio en GitHub
2. **Actions** tab
3. Deberías ver tu workflow corriendo
4. Click para ver los detalles

### Opción 3: Ver logs del workflow

En GitHub Actions, haz click en el workflow para ver:
- ✅ Pasos completados
- ⏱️ Tiempo de ejecución
- 💻 Logs detallados
- ❌ Errores (si los hay)

---

## 🐛 Troubleshooting

### ❌ Error: "Invalid API Token"

**Solución:**
1. Ve a Cloudflare Dashboard → API Tokens
2. Verifica que el token es válido
3. Copia nuevamente el token (sin espacios)
4. Actualiza el secret en GitHub:
   - Settings → Secrets → Edit `CLOUDFLARE_API_TOKEN`
   - Pega el nuevo token

### ❌ Error: "Account ID is invalid"

**Solución:**
1. Verifica tu Account ID en [Cloudflare Dashboard](https://dash.cloudflare.com/workers)
2. Copia exactamente (sin espacios)
3. Actualiza el secret `CLOUDFLARE_ACCOUNT_ID` en GitHub

### ❌ Error: "Deployment failed - secret not found"

**Solución:**
1. Verifica que agregaste todos los secrets en GitHub
2. Comprueba que los nombres coinciden exactamente:
   - `MONGO_URI` (no `MONGO_URL`)
   - `MONGO_DATA_API_KEY` (exactamente así)
   - etc.

### ❌ El workflow no se ejecuta

**Solución:**
1. Verifica que empujaste a `main` o abriste un PR
2. Ve a GitHub → Actions y recarga la página
3. Si sigue sin aparecer, verifica el archivo `.github/workflows/deploy.yml`

### ❌ Deploy exitoso pero cambios no aparecen

**Solución:**
1. Espera 10-20 segundos para propagación global
2. Limpia el cache del navegador (Ctrl+Shift+Del)
3. Verifica en incógnito/privado
4. Ve a Cloudflare Dashboard → Workers → Logs

---

## 📊 Monitorear Deployments

### En GitHub
1. Ve a **Actions** en tu repositorio
2. Haz click en el workflow más reciente
3. Ver status, logs, y tiempo de ejecución

### En Cloudflare
1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Workers → Tu worker
3. **Analytics** - ver requests reales
4. **Logs** - ver errores

---

## 🔐 Seguridad

✅ **Buenas prácticas:**
- Nunca poner secrets en el código
- Usar GitHub Secrets para credenciales
- Rotar API tokens regularmente
- Auditar logs de deployment

❌ **Evitar:**
- Commitear `.env`
- Poner secretos en `.github/workflows/deploy.yml`
- Usar el mismo token en múltiples servicios

---

## 🚀 Flujo de Trabajo Recomendado

### Desarrollo

```bash
# Crear rama para feature
git checkout -b feature/nueva-funcionalidad

# Hacer cambios locales
npm run dev

# Commit
git add .
git commit -m "Add nueva funcionalidad"

# Push a GitHub
git push origin feature/nueva-funcionalidad
```

### Pull Request

```bash
# En GitHub, abre un PR hacia main
# GitHub Actions hará deploy a staging automáticamente
# Previsualiza los cambios
# Si todo está bien, mergea el PR
```

### Producción

```bash
# Una vez mergeado a main, GitHub Actions
# hará deploy automático a PRODUCCIÓN
# Tu app se actualiza sin intervención manual
```

---

## 📚 Referencias

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Cloudflare Wrangler Action](https://github.com/cloudflare/wrangler-action)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [API Tokens de Cloudflare](https://dash.cloudflare.com/profile/api-tokens)

---

## ✨ ¡Listo!

Una vez configurado todo:
- ✅ Push a `main` = Deploy automático a producción
- ✅ PR a `main` = Deploy automático a staging
- ✅ Push a `develop` = Deploy automático a desarrollo
- ✅ Sin intervención manual necesaria

**¡Tus cambios se despliegan solos! 🚀**

---

¿Preguntas? Revisa los logs en GitHub Actions.
