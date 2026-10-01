import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const leads = await db.getAll();
  
  // En-têtes CSV
  const headers = ['Date', 'Heure', 'Nom', 'Téléphone', 'Email', 'Adresse Exacte', 'Ville', 'Problème', 'Statut'];
  
  // Lignes CSV
  const rows = leads.map((lead: any) => {
    const date = lead.date_creation ? new Date(lead.date_creation) : new Date();
    const dateStr = date.toLocaleDateString('fr-FR');
    const heureStr = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    
    // Échapper les guillemets et les retours à la ligne dans les champs
    const clean = (val: string) => `"${(val || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`;
    
    return [
      clean(dateStr),
      clean(heureStr),
      clean(lead.nom),
      clean(lead.telephone),
      clean(lead.email),
      clean(lead.adresse || 'Inconnue'),
      clean(lead.ville),
      clean(lead.probleme),
      clean(lead.statut)
    ].join(';');
  });
  
  const csv = '\uFEFF' + headers.join(';') + '\n' + rows.join('\n');
  
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="leads_aco_${new Date().toISOString().slice(0,10)}.csv"`,
    },
  });
}
