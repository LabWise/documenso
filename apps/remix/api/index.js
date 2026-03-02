import { handle } from 'hono/vercel';
import handleAdapter from 'hono-react-router-adapter/node';
import server from '../build/server/hono/server/router.js';
import * as build from '../build/server/index.js';

const app = handleAdapter(build, server);

export const config = {
  runtime: 'nodejs'
};

export default handle(app);
