/**
 * Cloudflare Worker - Luna Backend
 *
 * Este worker sirve como backend para la aplicación Luna
 * - Sirve archivos estáticos (index.html, CSS, JS)
 * - Maneja rutas API
 * - Se conecta a MongoDB
 */

import { Router } from 'itty-router';

const router = Router();

// ============================================
// RUTAS DE SALUD Y ESTADO
// ============================================

router.get('/api/health', () => {
  return new Response(JSON.stringify({ status: 'ok' }), {
    headers: { 'Content-Type': 'application/json' }
  });
});

// ============================================
// RUTAS API (Ejemplo)
// ============================================

router.get('/api/data', async (request, env) => {
  try {
    // Aquí puedes conectar con MongoDB usando env.MONGO_URI
    return new Response(
      JSON.stringify({
        message: 'Data endpoint',
        environment: env.ENVIRONMENT
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});

router.post('/api/data', async (request, env) => {
  try {
    const data = await request.json();
    // Procesar los datos aquí
    return new Response(
      JSON.stringify({ success: true, data }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 201
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400
      }
    );
  }
});

// ============================================
// MANEJO DE ARCHIVOS ESTÁTICOS
// ============================================

router.get('*', async (request, env) => {
  try {
    // Usar el binding de ASSETS para servir archivos estáticos
    if (env.ASSETS) {
      const response = await env.ASSETS.fetch(request);

      if (response.status === 404) {
        // Si no encuentra el archivo, servir index.html (para SPA)
        return env.ASSETS.fetch(new Request(new URL('/index.html', request.url)));
      }

      return response;
    }
  } catch (error) {
    console.error('Error sirviendo archivos estáticos:', error);
  }

  // Fallback
  return new Response('Not Found', { status: 404 });
});

// ============================================
// HANDLER PRINCIPAL
// ============================================

router.all('*', () => new Response('Not Found', { status: 404 }));

export default {
  fetch: router.handle,

  // Scheduled event (opcional - para tareas programadas)
  scheduled: async (event, env, ctx) => {
    // Aquí puedes agregar tareas programadas
    console.log('Scheduled event triggered');
  }
};
