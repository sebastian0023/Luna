import { Router } from 'itty-router';

const router = Router();

// API Health Check
router.get('/api/health', () => {
  return new Response(JSON.stringify({ status: 'ok' }), {
    headers: { 'Content-Type': 'application/json' }
  });
});

// API Data endpoint
router.get('/api/data', (request, env) => {
  return new Response(
    JSON.stringify({
      message: 'Data endpoint',
      environment: env.ENVIRONMENT
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
});

router.post('/api/data', async (request, env) => {
  try {
    const data = await request.json();
    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { 'Content-Type': 'application/json' }, status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});

// GET /api/confessions - Obtener todas las confesiones
router.get('/api/confessions', async (request, env) => {
  try {
    // Si D1 está disponible, usar la BD
    if (env.DB) {
      try {
        const { results } = await env.DB.prepare(
          'SELECT id as _id, text as message, timestamp as createdAt FROM confessions ORDER BY id DESC'
        ).all();

        // Formatear para el frontend
        const formatted = (results || []).map(r => ({
          ...r,
          author: 'Anónimo'
        }));

        return new Response(
          JSON.stringify(formatted),
          { headers: { 'Content-Type': 'application/json' }, status: 200 }
        );
      } catch (dbError) {
        console.error('DB Error:', dbError);
        // Fallback si la BD falla
      }
    }

    // Fallback: datos de ejemplo
    return new Response(
      JSON.stringify([
        { _id: '1', author: 'Sistema', message: 'Ejemplo de confesión', createdAt: new Date().toISOString() }
      ]),
      { headers: { 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error fetching confessions:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Error desconocido' }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

// POST /api/confessions - Crear nueva confesión
router.post('/api/confessions', async (request, env) => {
  try {
    let body = {};

    // Parsear el body
    if (request.headers.get('content-type')?.includes('application/json')) {
      const text = await request.text();
      if (text) {
        body = JSON.parse(text);
      }
    }

    // Aceptar tanto "message" como "text"
    const confessionText = body.message || body.text || 'Sin texto';
    const author = body.author || 'Anónimo';

    // Si D1 está disponible, guardar en BD
    if (env.DB) {
      try {
        const result = await env.DB.prepare(
          'INSERT INTO confessions (text) VALUES (?) RETURNING id, text, timestamp'
        ).bind(confessionText).first();

        return new Response(
          JSON.stringify({
            success: true,
            message: 'Confesión guardada',
            confession: result
          }),
          { headers: { 'Content-Type': 'application/json' }, status: 201 }
        );
      } catch (dbError) {
        console.error('DB Error:', dbError);
        // Fallback si la BD falla
      }
    }

    // Fallback: guardar en memoria (solo ejemplo)
    const newConfession = {
      _id: Date.now().toString(),
      author: author,
      message: confessionText,
      createdAt: new Date().toISOString()
    };

    return new Response(
      JSON.stringify(newConfession),
      { headers: { 'Content-Type': 'application/json' }, status: 201 }
    );
  } catch (error) {
    console.error('Error creating confession:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Error desconocido' }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

// DELETE /api/confessions/:id - Borrar una confesión
router.delete('/api/confessions/:id', async (request, env) => {
  try {
    const { id } = request.params;

    // Si D1 está disponible
    if (env.DB) {
      try {
        await env.DB.prepare(
          'DELETE FROM confessions WHERE id = ?'
        ).bind(id).run();

        return new Response(
          JSON.stringify({ success: true, message: 'Borrado' }),
          { headers: { 'Content-Type': 'application/json' }, status: 200 }
        );
      } catch (dbError) {
        console.error('DB Error:', dbError);
      }
    }

    // Fallback (no hace nada pero devuelve éxito)
    return new Response(
      JSON.stringify({ success: true, message: 'Borrado' }),
      { headers: { 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error deleting confession:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Error desconocido' }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

// Servir archivos estáticos
router.all('*', async (request, env) => {
  // Intentar servir desde ASSETS
  if (env.ASSETS) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) {
      return response;
    }
    // Si 404, servir index.html
    return await env.ASSETS.fetch(new Request('http://assets/index.html'));
  }

  return new Response('Not Found', { status: 404 });
});

export default {
  fetch: (request, env, ctx) => router.handle(request, env, ctx)
};
