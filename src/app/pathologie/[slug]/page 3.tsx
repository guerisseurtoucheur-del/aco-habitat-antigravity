import { notFound } from 'next/navigation';
import { seoPathologies } from '@/data/seo-content';
import { DiagnosticUpload } from '@/components/DiagnosticUpload';
import Link from 'next/link';
import { Metadata } from 'next';

interface PathologyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return seoPathologies.map((patho) => ({
    slug: patho.slug,
  }));
}

export async function generateMetadata({ params }: PathologyPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const patho = seoPathologies.find((p) => p.slug === resolvedParams.slug);
  
  if (!patho) {
    return {};
  }

  return {
    title: `${patho.name} : Traitement et Diagnostic - ACO-HABITAT`,
    description: `Découvrez comment identifier ${patho.name.toLowerCase()} (${patho.scientificName}). Quels sont les symptômes, les dangers et comment s'en débarrasser. Diagnostic IA gratuit.`,
  };
}

export default async function PathologySeoPage({ params }: PathologyPageProps) {
  const resolvedParams = await params;
  const patho = seoPathologies.find((p) => p.slug === resolvedParams.slug);

  if (!patho) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="ACO-HABITAT Logo" className="h-10 w-10 object-contain" />
            <span className="font-bold text-xl text-slate-800">ACO-HABITAT</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                patho.family.includes('Champignon') 
                  ? 'bg-red-100 text-red-800 border border-red-200' 
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                {patho.family}
              </span>
              <span className="text-slate-500 text-sm font-mono italic">{patho.scientificName}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              Tout savoir sur {patho.name.toLowerCase().startsWith('l') || patho.name.toLowerCase().startsWith('a') || patho.name.toLowerCase().startsWith('e') || patho.name.toLowerCase().startsWith('i') || patho.name.toLowerCase().startsWith('o') || patho.name.toLowerCase().startsWith('u') ? "l'" : patho.name.toLowerCase().includes('termites') ? 'les ' : 'la '}{patho.name}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              {patho.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Left Column (Content) */}
            <div className="md:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="text-teal-500">🔍</span> Comment la reconnaître ? (Symptômes)
                </h2>
                <ul className="space-y-4">
                  {patho.symptoms.map((symptom, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <span className="text-teal-500 font-bold shrink-0">→</span>
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="text-red-500">⚠️</span> Quels sont les dangers ?
                </h2>
                <p className="text-slate-700 leading-relaxed p-6 bg-red-50 text-red-900 border border-red-100 rounded-xl">
                  {patho.dangers}
                </p>
              </div>
            </div>

            {/* Right Column (CTA) */}
            <div>
              <div className="sticky top-8 bg-slate-800 text-white p-6 rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold mb-4">Un doute sur une poutre ou un mur ?</h3>
                <p className="text-slate-300 text-sm mb-6">
                  N'attendez pas de savoir si c'est bien {patho.name.toLowerCase().includes('termites') ? 'des termites' : 'de la ' + patho.name.toLowerCase()}. Utilisez notre Intelligence Artificielle pour analyser vos photos instantanément.
                </p>
                <div className="bg-slate-700/50 p-4 rounded-xl">
                  <DiagnosticUpload />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
