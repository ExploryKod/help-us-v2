"use client"
import Link from "next/link";
import {useSession} from "next-auth/react";


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
                                    href="/form_adhere.pdf"
                                    prefetch={true}
                                    target={"_blank"}
                                    className="z-10 inline-block px-6 py-3 bg-hu-tertiary text-white rounded-lg hover:bg-hu-black transition-colors text-lg font-medium shadow-sm hover:shadow-md"
                                >
                                    Formulaire d&apos;adhesion
                                </Link>
                                <div className="flex flex-col">
                                    <p className="text-base font-medium text-gray-900"></p>
                                    <Link
                                        href="/dashboard"
                                        prefetch={true}
                                        className="z-10 inline-block px-6 py-3 bg-hu-red-300 text-white rounded-lg hover:bg-hu-black transition-colors text-lg font-medium shadow-sm hover:shadow-md"
                                    >
                                        Tableau de bord <LockKeyhole />
                                    </Link>
                                </div>
                                <div className="flex flex-col">
                                    <Link
                                        href="/profile"
                                        prefetch={true}
                                        className="z-10 inline-block px-6 py-3 bg-hu-tertiary text-white rounded-lg hover:bg-hu-black transition-colors text-lg font-medium shadow-sm hover:shadow-md"
                                    >
                                        Mon profile
                                    </Link>
                                </div>
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