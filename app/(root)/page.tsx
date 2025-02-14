import { Heart, HeartHandshake, Users } from 'lucide-react';
import { getDonations } from "@/lib/actions/donations.actions";
import { getBeneficiaries } from "@/lib/actions/beneficiaries.actions";
import { getDonors } from "@/lib/actions/donors.actions";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { nextauthOptions } from "@/lib/nextauth-options";
import { HomeButtons } from "@/components/button/home-buttons";
import SignOutButton from "@/components/button/signout-button";

export default async function Home() {

  const session = await getServerSession(nextauthOptions);
  const [donations, beneficiaries, donors] = await Promise.all([
    getDonations(),
    getBeneficiaries(),
    getDonors(),
  ]);

  const stats = {
    donors: donors.length || 0,
    beneficiaries: beneficiaries.length || 0,
    donations: donations.length || 0,
  };

  const roles = {
    'user' : 'un nouvel arrivant',
    'admin' : 'adhérant',
    'donor' : 'donateur',
    'beneficiary' : 'bénéficiaire'
  }

  return (
      <>
        <div className="absolute inset-0 -z-10">
          <Image
              src="/hands.jpg"
              alt="Background Hands"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="opacity-10"
              priority
          />
        </div>

        <div className="min-h-screen-1/2 rounded">
          <div className="container mx-auto px-4 py-12">
            {session ? (
                <div className="absolute top-10 right-10 w-full flex items-end justify-end">
                  <SignOutButton />
                </div>
            ) : null}
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-8">
                <HeartHandshake className="w-16 h-16 text-hu-tertiary animate-pulse" />
              </div>


              <h1 className="text-5xl font-bold text-gray-800 mb-4">
                Bienvenue <span className={"text-hu-tertiary font-bold"}>{session ? session.user.name : "" }</span> sur <em className="text-hu-tertiary">Help us</em>
              </h1>
              <p className="text-hu-tertiary mb-2">
                Ensemble, créons un monde plus solidaire
              </p>
              {session ? (
                  <p className={"text-hu-tertiary mb-2"}>
                    Vous êtes {roles[session.user.role]} et nous sommes heureux de vous retrouver.
                   </p>
              ): null}

              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {donors.length > 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-6 transform transition hover:-translate-y-2">
                      <div className="flex justify-center mb-4">
                        <Users className="w-12 h-12 text-hu-tertiary" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-2">
                        {stats.donors}
                      </h3>
                      <p className="text-gray-600">Donateurs actifs</p>
                    </div>
                )}
                {beneficiaries.length > 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-6 transform transition hover:-translate-y-2">
                      <div className="flex justify-center mb-4">
                        <Heart className="w-12 h-12 text-pink-500" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-2">
                        {stats.beneficiaries}
                      </h3>
                      <p className="text-gray-600">Bénéficiaires</p>
                    </div>
                )}
                {donations.length > 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-6 transform transition hover:-translate-y-2">
                      <div className="flex justify-center mb-4">
                        <HeartHandshake className="w-12 h-12 text-purple-500" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-2">
                        {stats.donations}
                      </h3>
                      <p className="text-gray-600">Donations réalisées</p>
                    </div>
                )}
              </div>
              <HomeButtons />
            </div>
              </div>
        </div>
      </>
  );
}
