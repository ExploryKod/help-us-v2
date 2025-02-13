'use client'
import { useSession } from "next-auth/react"
import {useRouter} from "next/navigation";
import {AuthorizeButton} from "@/components/button/authorize-button";
import {Button} from "antd";

export default function Page() {
    const { data: session, status, update } = useSession()
    const router = useRouter()

    const roles = {
        'user' : 'un nouvel arrivant',
        'admin' : 'adhérant',
        'donor' : 'donateur',
        'beneficiary' : 'bénéficiaire'
    }

    if (session) {
        return (
            <div className={"mx-auto flex flex-col items-center justify-center min-h-screen bg-hu-primary"}>
                <div className={"p-8 bg-white shadow-md rounded-lg"}>
                <div className="flex flex-col sm:items-center sm:justify-center gap-4">
                    <h1 className={"text-hu-black text-2xl my-2"}>Adherer</h1>
                    <h2 className={"text-hu-tertiary text-lg my-2"}>Votre role actuel: {roles[session.user.role]}</h2>
                    <p className={"text-hu-black text-lg my-3"}>Demander ici à devenir adhérant. Nous recevons le changement
                        et vous devez alors vous connecter à nouveau pour valider votre nouveau statut.</p>
                </div>
                <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4">
                    <AuthorizeButton />
                    <Button
                        type="primary"
                        className="bg-hu-black text-white hover:opacity-75 p-2"
                        onClick={() => router.back()}
                    >
                        Retour
                    </Button>
                </div>
            </div>
            </div>
        )
    }

    return <a href="/api/auth/signin">Sign in</a>
}