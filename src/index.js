import { Router } from 'itty-router';

const router = Router();

// Health Check
router.get('/api/health', () => {
  return new Response(JSON.stringify({ status: 'ok' }), {
    headers: { 'Content-Type': 'application/json' }
  });
});

// GET /api/confessions
router.get('/api/confessions', async (request, env) => {
  try {
    if (env.DB) {
      const { results } = await env.DB.prepare(
        'SELECT id, author, message, createdAt FROM confessions ORDER BY id DESC'
      ).all();

      const data = (results || []).map(r => ({
        _id: String(r.id),
        author: r.author || 'Anónimo',
        message: r.message,
        createdAt: r.createdAt
      }));

      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (e) {
    console.error('DB Error:', e);
  }

  // Fallback
  return new Response(JSON.stringify([]), {
    headers: { 'Content-Type': 'application/json' }
  });
});

// POST /api/confessions
router.post('/api/confessions', async (request, env) => {
  try {
    const body = await request.json();
    const author = body.author || 'Anónimo';
    const message = body.message || '';

    if (env.DB) {
      const result = await env.DB.prepare(
        'INSERT INTO confessions (author, message) VALUES (?, ?) RETURNING id, author, message, createdAt'
      ).bind(author, message).first();

      return new Response(
        JSON.stringify({
          _id: String(result.id),
          author: result.author,
          message: result.message,
          createdAt: result.createdAt
        }),
        { headers: { 'Content-Type': 'application/json' }, status: 201 }
      );
    }

    // Fallback
    const newId = Date.now().toString();
    return new Response(
      JSON.stringify({
        _id: newId,
        author: author,
        message: message,
        createdAt: new Date().toISOString()
      }),
      { headers: { 'Content-Type': 'application/json' }, status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});

// DELETE /api/confessions/:id
router.delete('/api/confessions/:id', async (request, env) => {
  try {
    const { id } = request.params;

    if (env.DB && id) {
      await env.DB.prepare('DELETE FROM confessions WHERE id = ?').bind(id).run();
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});

// Servir archivos estáticos
router.all('*', async (request, env) => {
  if (env.ASSETS) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;
    return await env.ASSETS.fetch(new Request('http://assets/index.html'));
  }
  return new Response('Not Found', { status: 404 });
});

export default {
  fetch: (request, env, ctx) => router.handle(request, env, ctx)
};
