import { Redis } from '@upstash/redis';

const redisUrl = (process.env.KV_REST_API_URL || '').replace(/"/g, '');
const redisToken = (process.env.KV_REST_API_TOKEN || '').replace(/"/g, '');

console.log('URL:', redisUrl.substring(0, 20) + '...');

const redis = new Redis({ url: redisUrl, token: redisToken });

async function cleanup() {
  const leads = await redis.get('leads') as any[] || [];
  console.log('Total leads avant:', leads.length);
  
  const clean = leads.filter((l: any) => l.nom !== 'Client Inconnu');
  console.log('Leads après nettoyage:', clean.length);
  console.log('Supprimés:', leads.length - clean.length);
  
  await redis.set('leads', clean);
  console.log('Base nettoyée !');
}
cleanup();
