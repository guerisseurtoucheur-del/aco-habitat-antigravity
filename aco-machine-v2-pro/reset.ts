import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

async function run() {
  await redis.del('leads');
  console.log("Compteur de leads remis à ZÉRO !");
}

run();
