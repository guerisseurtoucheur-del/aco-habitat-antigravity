import { notFound } from 'next/navigation';
import { seoCities } from '@/data/seo-content';
import { ContactForm } from '@/components/ContactForm';
import { DiagnosticUpload } from '@/components/DiagnosticUpload';
import Link from 'next/link';
import { Metadata } from 'next';

interface LocalPageProps {
  params: Promise<{ ville: string }>;
}

export async function generateStaticParams() {
  return seoCities.map((city) => ({
    ville: city.slug,
  }));
}

export async function generateMetadata({ params }: LocalPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const city = seoCities.find((c) => c.slug === resolvedParams.ville);
  
  if (!city) {
    return {};
  }

  return {
    title: `Diagnostic Bois à ${city.name} - Expert Mérule & Capricorne`,
    description: `Besoin d'un diagnostic bois à ${city.name} (${city.zipPattern}) ? ACO-HABITAT utilise l'IA pour détecter mérule, capricorne et autres parasites. Devis et intervention rapide en ${city.region}.`,
  };
}

export default async function LocalSeoPage({ params }: LocalPageProps) {
  const resolvedParams = await params;
  const city = seoCities.find((c) => c.slug === resolvedParams.ville);

  if (!city) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header simplifié */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="ACO-HABITAT Logo" className="h-10 w-10 object-contain" />
            <span className="font-bold text-xl text-slate-800">ACO-HABITAT</span>
          </Link>
          <div className="text-sm font-medium text-slate-500 hidden md:block">
            Intervention à {city.name} et alentours
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-sm font-semibold mb-6">
              Expertise Locale • {city.region}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Diagnostic Bois & Humidité à <span className="text-teal-400">{city.name}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8">
              Vous suspectez la présence de mérule, de capricornes ou de termites dans votre charpente à {city.name} ({city.zipPattern}) ? N'attendez pas que les dégâts soient irréversibles.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Forms */}
      <section className="py-12 md:py-20 -mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Colonne de gauche : IA & Explications */}
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Deux façons d'avancer sur votre problème</h2>
              
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-10"></div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="bg-teal-100 text-teal-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                  L'analyse IA instantanée (Gratuit)
                </h3>
                <p className="text-slate-600 mb-6">
                  Vous avez pris une photo du bois abîmé ? Notre intelligence artificielle l'analyse immédiatement pour vous dire s'il s'agit d'un insecte xylophage ou d'un champignon lignivore.
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <DiagnosticUpload />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10"></div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="bg-slate-200 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                  L'intervention d'un expert à {city.name}
                </h3>
                <p className="text-slate-600 mb-4">
                  Dans le cas où une menace sérieuse (comme la mérule) est confirmée, un diagnostic réglementaire ou une intervention rapide est nécessaire. Remplissez le formulaire ci-contre pour qu'un expert local vous recontacte.
                </p>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-500 mt-1">✓</span> Déplacement rapide en région {city.region}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-500 mt-1">✓</span> Rapport certifié pour les assurances
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-500 mt-1">✓</span> Préconisations de traitement curatif
                  </li>
                </ul>
              </div>
            </div>

            {/* Colonne de droite : Formulaire */}
            <div className="lg:mt-16">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
