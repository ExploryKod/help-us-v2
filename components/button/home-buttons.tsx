"use client"
import {Suspense} from "react";
import {SessionButtons} from "@/components/button/SessionButtons";

export const HomeButtons = () => {
    return (<>
        <Suspense fallback={<p> 🌀 chargement...</p>}>
            <SessionButtons />
        </Suspense>
    </>)
}

