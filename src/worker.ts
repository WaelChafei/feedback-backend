import { OpenAPIRouter } from '@cloudflare/itty-router-openapi';
import { handleGetUsers, handlePostUsers } from './users';
import { handlePostSurvey, handleShowSurvey } from './createSurvey';
import { sendMailFun } from './sendMail';
import { login } from './login';
import { RequestLike } from 'itty-router';

const router = OpenAPIRouter();

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'https://feedbackapp.pages.dev',   
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
  'Access-Control-Allow-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

export interface Env {
  userskv: KVNamespace;
}


const withCors = (handler: any) => async (request: Request, env: Env, context: any, data: Record<string, any>) => {
  try {
    const response = await handler(request, env, context, data);

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204, 
        headers: new Headers({
          ...corsHeaders,
        }),
      });
    }

    return new Response(response.body, {
      ...response,
      headers: new Headers({
        ...response.headers,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': corsHeaders['Access-Control-Allow-Origin'],
        'Access-Control-Allow-Headers': corsHeaders['Access-Control-Allow-Headers'],
        'Access-Control-Allow-Credentials': corsHeaders['Access-Control-Allow-Credentials'],
      }),
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { ...corsHeaders },
    });
  }
};



router.get('/getUsers', withCors(handleGetUsers));
router.post('/postUsers', withCors(handlePostUsers));
router.post('/createSurvey', withCors(handlePostSurvey));
router.get('/showSurvey', withCors(handleShowSurvey));
router.post('/sendMail', withCors(sendMailFun));
router.post('/login', withCors(login));

export default {
  async fetch(request: RequestLike , env: Env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    return router.handle(request,env);
  },
};
