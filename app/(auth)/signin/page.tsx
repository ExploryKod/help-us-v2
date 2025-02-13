import SignInForm from "@/components/form/signin-form";
import Image from "next/image";
interface SignInPageProps {
  searchParams?: { callbackUrl?: string };
}

const SignInPage = ({ searchParams }: SignInPageProps) => {
  // ✅ Vérification pour éviter les erreurs d'accès
  const callbackUrl = searchParams?.callbackUrl ? decodeURIComponent(searchParams.callbackUrl) : "/";

  return (
    <div className="w-full">
      <div className="fixed inset-0 -z-10">
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
      <SignInForm callbackUrl={callbackUrl} />
    </div>
  );
};

export default SignInPage;
