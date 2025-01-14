"use client";

import CreateAccountButton from "@/components/Buttons/CreateAccountButton";
import { Footer } from "@/components/ui/Footer";
import WaitlistForm from "@/components/ui/WaitlistForm";
import { FeaturedProduct } from "@/components/ui/product";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  // const { getSession } = useSupabase();

  // useEffect(() => {
  //   getSession()
  // }, []);

  return (
    <>
    <main className={`flex h-screen w-full flex-col items-center bg-gray justify-center pt-20 md:gap-2 gap-10`}>
      <div className='flex flex-col items-center w-full relative top-100 md:w-2/3 gap-4'>
        {/* <h1>
          Runway
        </h1> */}
        {/* <Image className="rounded-lg" width={120} height={50} alt="Discover" src={`https://qqdcidmbajmncgqukjhm.supabase.co/storage/v1/object/public/uploads/landing/Screenshot%202025-01-09%20at%2012.17.55%20PM.png?t=2025-01-09T11%3A18%3A34.582Z`} /> */}
        <h2 className='md:text-6xl text-4xl font-semibold text-black font-nanum flex text-center flex-col'>
          <span>Inspo. Search. Shop. </span>
          <span>These shouldn&apos;t be three apps. </span>
          <span>It&apos;s one.</span>
        </h2>
        <div className="hidden md:flex mt-5">
          <CreateAccountButton/>
        </div>
      </div>
      {/* <Link href='/login'>
        <button className="md:hidden bg-black text-white p-2 rounded">
          Create account
        </button>
      </Link> */}
      <div className="md:hidden">
        {/* <WaitlistForm/> */}
        <CreateAccountButton/>
      </div>
      {/* <div className="hidden md:flex">
        <CreateAccountButton/>
      </div> */}

      <Footer />
      <div className="flex flex-col gap-1">
        <Link
            href='mailto:tobi@userunway.com'  
        >
          <p className="text-dark text-xs pt-20 md:pt-0">Any feedback? Contact us!</p>
        </Link>
      </div>
    </main>
      <section id="what-is" className="flex w-[100vw] h-auto items-center justify-center gap-8 font-medium flex-col  bg-gray">
        <div className="flex items-center justify-center text-center gap-12 flex-col">
          <Image className="md:rounded-lg flex" width={600} height={650} alt="Discover" src={`https://qqdcidmbajmncgqukjhm.supabase.co/storage/v1/object/public/uploads/landing/Group%2048.png?t=2025-01-09T10%3A45%3A46.335Z`} />
          <p className="flex items-center px-4 justify-center text-center md:w-2/3 md:text-4xl text-xl font-semibold text-black font-nanum">
            Create a profile, get inspo, save in lists and shop from creators. Every post comes with a clothes refernces so that everyone can buy them.
          </p>
        </div>
        <p className="flex items-center px-4 justify-center text-center md:w-2/3 md:text-4xl text-xl font-semibold text-black font-nanum">
          These days inlfuencers are struggling to monetize their content. But we are here to help them. Tag your clothes with affiliate links, create lists and start monetizing. This is only the beginning.
        </p>
        <Link href='/sign-up' className="opacity-80 bg-white rounded-3xl bg-white">
          <button className="text-white opacity-20 bg-black px-3 py-2 rounded-3xl text-sm">Create profile</button>
        </Link>
      </section>
      <section className="flex w-[100vw] h-auto pb-20 items-center justify-center gap-8 font-medium flex-col px-4 bg-gray">
        <div className="flex items-center justify-center text-center gap-2 flex-col text-white">
        </div>
      </section>
    </>
    )
}
