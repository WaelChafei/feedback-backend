import { KVNamespace } from '@cloudflare/workers-types';

 
export async function handleGetUsers(request: Request, env: any, context: any, data: Record<string, any>): Promise<Response> {

    try {
        console.log("envvv",env);
        
		const value = await env.userskv.get('users');
        console.log("valueeeeeeee",value);
        
		return new Response(JSON.stringify({ users: value }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Error:', error);
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
 interface UserRequestBody {
    name: string;
    role: string;
    email: string;
}


 
export async function handlePostUsers(request: Request, env: any, context: any, data: Record<string, any>): Promise<Response> {
    const corsHeaders = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://feedbackapp.pages.dev',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
        'Access-Control-Allow-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Credentials': 'true',
    };

    if (request.method === 'OPTIONS') {
        return new Response(null, {
            headers: corsHeaders,
        });
    }

    try {
        const currentValue = await env.userskv.get('users');
        const requestBody = await request.json() as UserRequestBody;

        const existingData = currentValue ? JSON.parse(currentValue).users : [];

        const newUser = {
            "name": requestBody.name,
            "role": requestBody.role,
            "email": requestBody.email
        };

        existingData.push(newUser);

        await env.userskv.put('users', JSON.stringify({ users: existingData }));

        return new Response(JSON.stringify({ users: existingData }), {
            status: 200,
            headers: corsHeaders,
        });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: corsHeaders,
        });
    }
}





