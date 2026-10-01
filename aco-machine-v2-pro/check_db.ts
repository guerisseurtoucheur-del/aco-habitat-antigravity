import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

async function run() {
  const leads = await redis.get('leads') as any[];
  console.log("Leads in DB:", leads?.length || 0);
  if (leads && leads.length > 0) {
      console.log("Dernier lead:", leads[leads.length - 1]);
  }
}

run();
