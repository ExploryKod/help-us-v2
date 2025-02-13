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
        <h1 className="text-3xl font-bold text-white mb-4">Rejoignez l&apos;association !</h1>
        <p className="text-white mb-6">
            Pour rejoindre notre association, il suffit de se connecter sur cette app puis d&apos;attendre que l&apos;on vous contact
            ou vous pouvez aussi procéder plus directement en vous rendant directement dans une de nos antennes prés de chez vous.
        </p>
          <div className="flex flex-col align-center gap-3 justify-center">
          <div className="bg-hu-primary shadow-sm p-5 rounded z-10">
              <h2 className={"text-hu-tertiary font-bold text-xl my-2 rounded z-10"}>Je recherche une aide</h2>
              <p className="text-hu-black">
                  Si vous désirez bénéficier d&apos;une aide de la part de notre réseau d&apos;association, vous pouvez alors demander à devenir
                  bénéficiaire lorsque nous vous contacterons.
              </p>
              <p className="text-hu-black">
                  Chaque prise de contact est l&apos;occasion en toute confidentialité de
                  nous confier votre situation afin de trouver l&apos;association la plus à même vous aider.
              </p>
              <p className="text-hu-black"> Vous serez alors mis en lien avec un donateur si il est également engagé dans un accompagnement,
                  il aura été formé par nos équipes et vous échangez ici sur un chat.</p>
          </div>
            <div className="bg-hu-primary shadow-sm p-5 rounded z-10">
                <h2 className={"text-hu-tertiary font-bold text-xl my-2"}>Je m&apos;engage</h2>
                <p className="text-hu-black">
                    Le réseau d&apos;association propose deux types d&apos;engagement : un engagement trés actif aux bureaux
                    des associations (administrateur) ou un engagement financier et matériel.
                </p>
                <p className="text-hu-black">
                    Que vous soyez administrateur ou donateur,
                    vous pourrez aussi participer à un programme d&apos;échange pouvant se faire à distance dans un chat dédié sur cet app.
                </p>
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row items-center justify-center">
              <Link
                  href="/"
                  className="z-10 mt-2 inline-block px-6 py-3 bg-hu-black text-white
                           rounded-lg hover:bg-gray-700 transition-colors
                           text-lg font-medium shadow-sm hover:shadow-md"
              >
                 Retour à l&apos;accueil
              </Link>
              <Link className={`z-10 mt-2 inline-block px-6 py-3 bg-orange-500 text-white
                            rounded-lg hover:bg-orange-700 transition-colors 
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