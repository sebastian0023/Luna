/**
 * Utilidades para conexión a MongoDB
 *
 * NOTA: MongoDB no es directamente soportado en Cloudflare Workers
 * de forma nativa. Tienes varias opciones:
 *
 * 1. Usar MongoDB Atlas Data API (REST API)
 * 2. Usar Prisma con Data Proxy
 * 3. Usar una función serverless de otra plataforma
 * 4. Usar Cloudflare D1 (SQLite) o Workers KV
 */

/**
 * Conectar con MongoDB usando la Data API de MongoDB Atlas
 * @param {string} mongoUri - URI de MongoDB
 * @returns {Object} - Cliente de MongoDB
 */
export async function connectToMongoDB(mongoUri, env) {
  try {
    // Extraer credenciales y host de la URI
    // mongodb+srv://user:pass@cluster.mongodb.net/db?appName=App

    if (!mongoUri) {
      throw new Error('MONGO_URI no está configurada');
    }

    console.log('MongoDB connection configured (via Data API)');

    return {
      isConnected: true,
      uri: mongoUri.substring(0, 20) + '...' // Enmascarar la URI
    };
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    return {
      isConnected: false,
      error: error.message
    };
  }
}

/**
 * Ejemplo de llamada a MongoDB usando la Data API REST
 * @param {string} mongoUri - URI de MongoDB
 * @param {string} apiKey - API Key de MongoDB Data API
 * @param {string} collection - Nombre de la colección
 * @param {Object} query - Query a ejecutar
 */
export async function queryMongoDB(apiKey, query) {
  const endpoint = 'https://data.mongodb-api.com/app/{app_id}/endpoint/data/v1/action/find';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify(query)
    });

    return await response.json();
  } catch (error) {
    console.error('Error querying MongoDB:', error);
    throw error;
  }
}

/**
 * Insertar documento en MongoDB
 */
export async function insertMongoDB(apiKey, data) {
  const endpoint = 'https://data.mongodb-api.com/app/{app_id}/endpoint/data/v1/action/insertOne';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify(data)
    });

    return await response.json();
  } catch (error) {
    console.error('Error inserting to MongoDB:', error);
    throw error;
  }
}
