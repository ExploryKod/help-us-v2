import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <main className="flex flex-col align-center justify-center mx-auto min-h-screen bg-hu-primary p-6">

      <div className="absolute inset-0 z-0">
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
      <div className="mx-auto max-w-4xl bg-hu-tertiary shadow-sm rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-4">Rejoindre l&apos;association:</h1>
        <p className="text-white mb-6">
            Pour rejoindre notre association, il suffit de se connecter ici puis d&apos;attendre que l&pos;on vous contact
            ou vous pouvez aussi procéder plus directement :
        </p>
          <p className="text-white mb-6">
              Si vous désirez bénéficier d&apos;une aide de la part de notre réseau d&apos;association, vous pouvez alors demander à devenir
              bénéficiaire lorsque nous vous contacterons. Chaque prise de contact est l&apos;occasion en toute confidentialité de nous confier votre situation afin de trouver l&apos;association la plus à même vous aider.
              Vous serez alors mis en lien avec un donateur si il est également engagé dans un accompagnement, il aura été formé par nos équipes et vous échangez ici sur un chat.
          </p>
          <p className="text-white mb-6">
              Le réseau d&apos;association propose deux types d&apos;engagement : un engagement trés actif aux bureaux
              des associations (administrateur) ou un engagement financier et matériel.
          </p>
          <p className="text-white mb-6">
             Que vous soyez administrateur ou donateur, vous pourrez aussi participer à un programme d&apos;échange pouvant se faire à distance dans un chat dédié sur cet app.
          </p>
        <ol className="list-decimal text-white list-inside space-y-2">
          <li>Rendez-vous dans une antenne locale pour échanger avec nos adherents</li>
          <li>Nous vous recevons chaleureusement et donnons tous les documents.</li>
          <li>Il y aura une cotisation annuelle si vous choisissez de devenir administrateur.</li>
          <li>Attendez la confirmation d&apos;adhésion par email une fois les documents retournés.</li>
          <li>Vous avez alors accès à des espaces dédiés ici pour accompagner le suivi de vos actions</li>
        </ol>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row items-center justify-center">
              <Link
                  href="/"
                  className="z-10 mt-2 inline-block px-6 py-3 bg-hu-tertiary text-white
                           rounded-lg hover:bg-hu-black transition-colors
                           text-lg font-medium shadow-sm hover:shadow-md"
              >
                 Retour à l&apos;accueil
              </Link>
              <Link className={`z-10 mt-2 inline-block px-6 py-3 bg-orange-500 text-white 
                            rounded-lg hover:bg-hu-black transition-colors 
                            text-lg font-medium shadow-sm hover:shadow-md`} href="/signin">
                  Demander une adhésion
              </Link>
          </div>
          <p className="text-hu-primary mt-4">
              Pour toute question, n&apos;hésitez pas à nous contacter directement: <span className={"font-bold"}>helpus@gmail.com</span>
          </p>
      </div>
    </main>
  )
}

export default page