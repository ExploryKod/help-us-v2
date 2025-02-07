import { Heart, HeartHandshake, Users } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { nextauthOptions } from "@/lib/nextauth-options"
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(nextauthOptions);

  // In a real app, this would be fetched from your API
  const stats = {
    donors: 150,
    beneficiaries: 75,
    donations: 250
  };

  return (
    <div className="min-h-screen-1/2 rounded bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">

          <div className="flex justify-center mb-8">
            <HeartHandshake className="w-16 h-16 text-pink-500 animate-pulse" />
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Bienvenue sur <em className="text-pink-500">Help us</em>
          </h1>
          
          <p className="text-gray-600 mb-12">
            Ensemble, créons un monde plus solidaire
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 transform transition hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {stats.donors}
              </h3>
              <p className="text-gray-600">Donateurs actifs</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 transform transition hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <Heart className="w-12 h-12 text-pink-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {stats.beneficiaries}
              </h3>
              <p className="text-gray-600">Bénéficiaires</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 transform transition hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <HeartHandshake className="w-12 h-12 text-purple-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {stats.donations}
              </h3>
              <p className="text-gray-600">Donations réalisées</p>
            </div>
          </div>

          <div className="mt-12">
            <div className="flex gap-2 justify-center">
            
              {session ? (
                <>
                  <div className="flex flex-col">
                    <p className="text-gray-400 my-3">Vous êtes admin ?</p>
                    <Link 
                      href="/dashboard"
                      className="inline-block px-6 py-3 bg-pink-500 text-white 
                           rounded-lg hover:bg-pink-600 transition-colors 
                           text-lg font-medium shadow-sm hover:shadow-md"
                    >
                  Accéder au Tableau de Bord
                    </Link>
                  </div>
                </>
              ) : (
                <div>
                  <Link 
                    href="/api/auth/login"
                    className="inline-block px-6 py-3 bg-blue-500 text-white 
                            rounded-lg hover:bg-blue-600 transition-colors 
                            text-lg font-medium shadow-sm hover:shadow-md"
                  >
                  Se Connecter
                  </Link>
                </div>
              )}
              <div className="flex flex-col justify-end">
                <Link 
                  href="/join"
                  className="inline-block px-6 py-3 bg-orange-500 text-white 
                           rounded-lg hover:bg-orange-600 transition-colors 
                           text-lg font-medium shadow-sm hover:shadow-md"
                >
                  Agir avec nous
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}