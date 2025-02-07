import Link from "next/link"

import MainNav from "@/components/shared/main-nav"
import UserNav from "@/components/shared/user-nav"
import ModeToggle from "@/components/shared/mode-toggle"
import { Code, Home, Info, Contact } from "lucide-react"

const Navbar = () => {
  return (
    <header className="w-full fixed z-10 top-0 bg-gray-100 dark:bg-gray-900 border-b border-gray-200">
      <nav className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            HelpUs
          </Link>
          <Link href="/" className="text-lg font-semibold">
            <Home className="inline-block w-5 h-5 mr-1" /> Home
          </Link>
          <Link href="/about" className="text-lg font-semibold">
            <Info className="inline-block w-5 h-5 mr-1" /> About
          </Link>
          <Link href="/contact" className="text-lg font-semibold">
            <Contact className="inline-block w-5 h-5 mr-1" /> Contact
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <UserNav />
        </div>
      </nav>
    </header>
  )
}

export default Navbar