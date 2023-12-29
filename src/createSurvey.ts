import { KVNamespace } from '@cloudflare/workers-types';

interface Env {
	userskv: KVNamespace;
}
 

export async function handlePostSurvey(request: Request, env: Env, context: any, data: Record<string, any>): Promise<Response> {
    try {
        const requestBody = await request.json();
        console.log("reqqqq",requestBody);

        const currentSurveysValue = await env.userskv.get('surveys');

        const existingSurveysData = currentSurveysValue ? JSON.parse(currentSurveysValue) : [];

        existingSurveysData.push(requestBody);

        await env.userskv.put('surveys', JSON.stringify(existingSurveysData));

        return new Response(JSON.stringify({ surveys: existingSurveysData }), {
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

export async function handleShowSurvey(request: Request, env: Env, context: any, data: Record<string, any>): Promise<Response> {
    try {
		const value = await env.userskv.get('surveys');

		return new Response(JSON.stringify({ surveys: value }), {
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
