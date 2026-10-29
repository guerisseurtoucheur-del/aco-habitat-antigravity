import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const leads = await db.getAll();
  const before = leads.length;
  
  // Supprimer tous les "Client Inconnu"
  const clean = leads.filter((l: any) => l.nom !== 'Client Inconnu');
  const after = clean.length;
  
  // Sauvegarder la liste nettoyée
  const { Redis } = await import('@upstash/redis');
  const redisUrl = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '').replace(/"/g, '');
  const redisToken = (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '').replace(/"/g, '');
  const redis = new Redis({ url: redisUrl, token: redisToken });
  await redis.set('leads', clean);
  
  return NextResponse.json({ 
    avant: before, 
    apres: after, 
    supprimes: before - after,
    message: `${before - after} fiches "Client Inconnu" supprimées !`
  });
}
