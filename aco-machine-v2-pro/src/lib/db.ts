import { Redis } from '@upstash/redis';

// On initialise la connexion à la base de données Upstash
const redisUrl = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '').replace(/"/g, '');
const redisToken = (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '').replace(/"/g, '');
const redis = new Redis({
  url: redisUrl,
  token: redisToken,
});

export const db = {
  getAll: async () => {
    try {
      const leads = await redis.get('leads');
      return (leads as any[]) || [];
    } catch (error) {
      console.error("DB Get Error", error);
      return [];
    }
  },
  getById: async (id: string) => {
    const leads = await db.getAll();
    return leads.find((l: any) => l.id === id);
  },
  save: async (lead: any) => {
    try {
      if (!lead.createdAt) lead.createdAt = new Date().toISOString();
      const leads = await redis.get('leads') as any[] || [];
      const index = leads.findIndex((l: any) => l.id === lead.id);
      if (index >= 0) leads[index] = lead;
      else leads.push(lead);
      await redis.set('leads', leads);
    } catch (error) {
      console.error("DB Save Error", error);
    }
  },
  delete: async (id: string) => {
    try {
      const leads = await redis.get('leads') as any[] || [];
      const newLeads = leads.filter((l: any) => l.id !== id);
      await redis.set('leads', newLeads);
    } catch (error) {
      console.error("DB Delete Error", error);
    }
  },
  getPartners: async () => {
    try {
      const partners = await redis.get('partners');
      return (partners as any[]) || [];
    } catch (error) {
      console.error("DB Get Partners Error", error);
      return [];
    }
  },
  savePartner: async (partner: any) => {
    try {
      const partners = await redis.get('partners') as any[] || [];
      const index = partners.findIndex((p: any) => p.email === partner.email); // Unicité sur l'email
      if (index >= 0) partners[index] = partner;
      else partners.push(partner);
      await redis.set('partners', partners);
    } catch (error) {
      console.error("DB Save Partner Error", error);
    }
  },
  deletePartner: async (email: string) => {
    try {
      const partners = await redis.get('partners') as any[] || [];
      const newPartners = partners.filter((p: any) => p.email !== email);
      await redis.set('partners', newPartners);
    } catch (error) {
      console.error("DB Delete Partner Error", error);
    }
  }
};
