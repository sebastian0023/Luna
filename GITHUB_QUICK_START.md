# ⚡ GitHub Actions - Quick Start (5 minutos)

## 🎯 En 5 minutos tendrás CI/CD automático

### Paso 1: Obtener API Token (2 min)

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Click **"Create Token"**
3. Selecciona **"Edit Cloudflare Workers"**
4. Click **"Use template"**
5. **Copy token** (no volverás a verlo)

### Paso 2: Copiar Account ID (1 min)

1. Ve a [Cloudflare Workers](https://dash.cloudflare.com/workers)
2. En la esquina superior derecha verás tu **Account ID**
3. **Copy**

### Paso 3: Agregar a GitHub (2 min)

En tu repositorio de GitHub:

1. **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret**
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: [Pega el token]
   - **Add secret**

3. **New repository secret**
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: [Pega el Account ID]
   - **Add secret**

4. Agrega tus variables de entorno:
   - `MONGO_URI`
   - `MONGO_DATA_API_KEY`
   - Etc...

---

## ✅ ¡Listo! Ahora funciona así:

```
Haces push a main →
GitHub Actions corre →
Deploy automático a Cloudflare →
Tu app se actualiza 🚀
```

---

## 🧪 Probar

```bash
# Haz un cambio pequeño
echo "# Test" >> README.md

# Commit y push
git add README.md
git commit -m "test deploy"
git push origin main

# Ve a GitHub → Actions
# ¡Deberías ver tu workflow corriendo!
```

---

## 📖 Para más detalles

Ver [GITHUB_ACTIONS_SETUP.md](./GITHUB_ACTIONS_SETUP.md) para la guía completa.
