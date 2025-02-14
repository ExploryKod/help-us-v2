"use client"
import Link from "next/link";
import {useSession} from "next-auth/react";
import SignOutButton from "@/components/button/signout-button"

export const SessionButtons = () => {
    const {data: session} = useSession();
    return (
        <div className="mt-12">
            <div className="flex gap-2 justify-center">
                {session ? (
                    <>
                        {session.user.role !== "user" ? (
                            <div className="flex flex-col">
                                <Link
                                    href="/dashboard"
                                    prefetch={true}
                                    className="z-10 inline-block px-6 py-3 bg-hu-tertiary text-white rounded-lg hover:bg-hu-black transition-colors text-lg font-medium shadow-sm hover:shadow-md"
                                >
                                    Accéder au Tableau de Bord
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-row gap-3">
                                <Link
                                    href="/update"
                                    prefetch={true}
                                    className="z-10 inline-block px-6 py-3 bg-hu-tertiary text-white rounded-lg hover:bg-hu-black transition-colors text-lg font-medium shadow-sm hover:shadow-md"
                                >
                                    Adhérer en ligne
                                </Link>
                               <SignOutButton />
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="flex flex-col">
                            <Link
                                className="z-10 inline-block px-6 py-3 bg-hu-secondary text-white rounded-lg hover:bg-hu-black transition-colors text-lg font-medium shadow-sm hover:shadow-md"
                                href="/signin"
                            >
                                Se Connecter
                            </Link>
                        </div>
                        <div className="flex flex-col justify-end">
                            <Link
                                href="/join"
                                className="z-10 inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-lg font-medium shadow-sm hover:shadow-md"
                            >
                                Agir avec nous
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
 }