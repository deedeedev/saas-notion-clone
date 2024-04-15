import Header from "@/components/Header"

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <Header />
      {children}
    </main>
  )
}
