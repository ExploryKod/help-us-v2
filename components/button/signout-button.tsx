"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

const SignOutButton = () => {
  const signout = () => {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/signin`
    })
  }

  return (
    <Button onClick={signout} variant="destructive">
      Se déconnecter
    </Button>
  )
}

export default SignOutButton