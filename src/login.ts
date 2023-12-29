interface RequestBody {
  email: string;
  password: string;
}

interface Env {
  userskv: KVNamespace;
}

export const login = async (
  request: Request,
  env: Env,
  context: any,
  data: Record<string, any>
) => {
  try {
    const headers = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    const requestBody = await request.json() as RequestBody;
    const { email, password } = requestBody;

    const adminCredentials = await env.userskv.get('admin');

    if (!adminCredentials) {
      return new Response('Admin not found', { status: 401, headers });
    }

    const { email: storedEmail, password: storedPassword } = JSON.parse(adminCredentials);

    if (email === storedEmail && password === storedPassword) {
      return new Response('Success', {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...headers },
      });
    } else {
      return new Response('Invalid credentials', {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...headers },
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
