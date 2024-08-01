import { Sidebar } from "@/components/Lists/Sidebar"


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <main className='w-full pt-20 flex flex-row md:px-24 px-10 h-[80vh] gap-10'>
        {children}
      </main>
    )
  }