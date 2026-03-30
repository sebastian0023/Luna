/**
 * Ejemplo de rutas para Luna API
 * Este archivo muestra cómo estructurar rutas en el worker
 */

import { Router } from 'itty-router';

const router = Router();

// ============================================
// RUTAS DE USUARIOS (Ejemplo)
// ============================================

/**
 * GET /api/users
 * Obtener lista de usuarios
 */
router.get('/api/users', async (request, env) => {
  try {
    // Aquí irían queries a MongoDB
    // const users = await queryMongoDB(env.MONGO_DATA_API_KEY, { ... });

    return new Response(
      JSON.stringify({
        success: true,
        data: [
          { id: 1, name: 'Usuario 1' },
          { id: 2, name: 'Usuario 2' }
        ]
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

/**
 * GET /api/users/:id
 * Obtener un usuario por ID
 */
router.get('/api/users/:id', async (request, env) => {
  const { id } = request.params;

  return new Response(
    JSON.stringify({
      success: true,
      data: { id, name: `Usuario ${id}` }
    }),
    {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    }
  );
});

/**
 * POST /api/users
 * Crear un nuevo usuario
 */
router.post('/api/users', async (request, env) => {
  try {
    const body = await request.json();

    // Validar datos
    if (!body.name || !body.email) {
      return new Response(
        JSON.stringify({ error: 'Name and email are required' }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    // Crear usuario en MongoDB
    // await insertMongoDB(env.MONGO_DATA_API_KEY, { ... });

    return new Response(
      JSON.stringify({
        success: true,
        data: { id: 3, ...body }
      }),
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
        status: 500
      }
    );
  }
});

/**
 * PUT /api/users/:id
 * Actualizar un usuario
 */
router.put('/api/users/:id', async (request, env) => {
  try {
    const { id } = request.params;
    const body = await request.json();

    // Actualizar en MongoDB
    // await updateMongoDB(env.MONGO_DATA_API_KEY, { ... });

    return new Response(
      JSON.stringify({
        success: true,
        data: { id, ...body }
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

/**
 * DELETE /api/users/:id
 * Eliminar un usuario
 */
router.delete('/api/users/:id', async (request, env) => {
  const { id } = request.params;

  // Eliminar de MongoDB
  // await deleteMongoDB(env.MONGO_DATA_API_KEY, { ... });

  return new Response(
    JSON.stringify({
      success: true,
      message: `Usuario ${id} eliminado`
    }),
    {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    }
  );
});

export default router;
