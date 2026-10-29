const { Redis } = require('@upstash/redis');

// Debug: show what env vars we have
console.log('KV_REST_API_URL exists:', !!process.env.KV_REST_API_URL);
console.log('KV_REST_API_URL starts with https:', (process.env.KV_REST_API_URL || '').startsWith('https'));
console.log('REDIS_URL exists:', !!process.env.REDIS_URL);
console.log('REDIS_URL starts with https:', (process.env.REDIS_URL || '').startsWith('https'));

// Try REDIS_URL if KV is broken
const url = process.env.KV_REST_API_URL?.startsWith('https') 
  ? process.env.KV_REST_API_URL 
  : process.env.REDIS_URL;
const token = process.env.KV_REST_API_TOKEN;

console.log('Using URL starts with https:', (url || '').startsWith('https'));

if (!url || !url.startsWith('https')) {
  console.log('No valid URL found. Listing all env vars with KV or REDIS:');
  Object.keys(process.env).filter(k => k.includes('KV') || k.includes('REDIS') || k.includes('UPSTASH')).forEach(k => {
    const v = process.env[k] || '';
    console.log(k, '=', v.substring(0, 30) + '...');
  });
  process.exit(1);
}

const redis = new Redis({ url, token });

async function main() {
  const leads = await redis.get('leads') || [];
  console.log('Total leads avant:', leads.length);
  const clean = leads.filter(l => l.nom !== 'Client Inconnu');
  console.log('Leads propres:', clean.length);
  console.log('Supprimés:', leads.length - clean.length);
  await redis.set('leads', clean);
  console.log('Base nettoyée !');
}
main();
