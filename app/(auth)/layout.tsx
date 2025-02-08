interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({
  children
}: AuthLayoutProps) {
  return (
    <section className="container mx-auto px-4">
      {children}
    </section>
  )
}