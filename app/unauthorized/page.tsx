"use client"

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { AuthorizeButton } from '@/components/button/authorize-button'

const Unauthorized = () => {
  const router = useRouter()
   
  return (
    <section className="flex flex-col gap-3">
      <h1 className="text-red-500 font-semibold">You Are Not Authorized!</h1>
      <Button
        onClick={() => router.push("/")}
        className="w-full mt-2"
      >
        Go Home
      </Button>
      <AuthorizeButton />
    </section>
  )
}

export default Unauthorized