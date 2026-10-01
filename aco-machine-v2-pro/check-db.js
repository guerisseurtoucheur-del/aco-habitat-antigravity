const { Redis } = require('@upstash/redis');
require('dotenv').config({ path: '.env.local' });

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function main() {
  const leads = await redis.get('leads');
  console.log("LEADS DANS LA DB:", JSON.stringify(leads, null, 2));
}

main().catch(console.error);
