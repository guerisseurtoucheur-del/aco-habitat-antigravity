import { Redis } from '@upstash/redis';
import { readFileSync } from 'fs';

// Parse .env.local manually
const envContent = readFileSync('.env.local', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)="?([^"]*)"?$/);
  if (match) envVars[match[1]] = match[2];
});

const redis = new Redis({ 
  url: envVars.KV_REST_API_URL, 
  token: envVars.KV_REST_API_TOKEN 
});

const leads = await redis.get('leads') || [];
console.log('Total leads avant:', leads.length);

const clean = leads.filter(l => l.nom !== 'Client Inconnu');
console.log('Leads propres:', clean.length);
console.log('Supprimés:', leads.length - clean.length);

await redis.set('leads', clean);
console.log('✅ Base nettoyée !');
