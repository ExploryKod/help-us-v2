import { signUpWithCredentials } from "@/lib/actions/auth.actions"
import SignUpForm from "@/components/form/signup-form"
import Image from "next/image"
interface SignUpPageProps {
  searchParams: {
    callbackUrl: string
  }
}

const SignUpPage = ({
  searchParams: { callbackUrl }
}: SignUpPageProps) => {
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
      <SignUpForm
        callbackUrl={callbackUrl || "/"}
        signUpWithCredentials={signUpWithCredentials}
      />
    </div>
  )
}

export default SignUpPage