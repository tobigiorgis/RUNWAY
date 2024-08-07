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
    <main className={`flex h-screen w-full flex-col items-center bg-white justify-center pt-20 md:gap-2 gap-10 bg-[url('https://qqdcidmbajmncgqukjhm.supabase.co/storage/v1/object/public/uploads/landing/bg.jpg')]`}>
      <div className='flex flex-col items-center justify-between w-full relative top-100'>
        <h1 
          style={{
            backgroundImage: 'conic-gradient(from 180deg at 50% 50%, #B9B9B9 0deg, #B4B4B4 10.58deg, #878787 78.75deg, #B7B7B7 168.75deg, #B1B1B1 270deg, #8D8D8D 343.12deg, #B9B9B9 360deg)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}
          className='md:text-5xl text-2xl font-semibold'>Where fashion lovers hang</h1>
        <p className='text-m mt-1 md:text-lg'>Curate, share and discover outfits.</p>
        <a href="#what-is" className="scroll-smooth">
          <p className="text-xs mt-1 text-gray-300 border-b cursor-crosshair">What is RUNWAY?</p>
        </a>
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

      <div className='flex flex-row justify-between w-3/4 cursor-crosshair'>
        <FeaturedProduct product={{createdBy: 'Dosantimed', image: 'https://qqdcidmbajmncgqukjhm.supabase.co/storage/v1/object/public/uploads/landing/dos.jpeg'}} moveFactor={0.8} className='hidden md:flex relative top-30 left-100'/>
        <FeaturedProduct product={{createdBy: 'HeliotEmil', image: 'https://qqdcidmbajmncgqukjhm.supabase.co/storage/v1/object/public/uploads/landing/he.jpeg'}} moveFactor={0.4} className='relative right- md:bottom-0 md:left-70'/>
        <FeaturedProduct product={{createdBy: 'idazeile', image: 'https://qqdcidmbajmncgqukjhm.supabase.co/storage/v1/object/public/uploads/landing/ida.jpeg'}} moveFactor={0.6} className='relative right-5 md:top-30 md:left-110 top-12'/>
        <FeaturedProduct product={{createdBy: 'TwoJeys', image: 'https://qqdcidmbajmncgqukjhm.supabase.co/storage/v1/object/public/uploads/landing/tj.jpeg'}} moveFactor={0.2} className='hidden md:flex relative bottom-10 left-10'/>
      </div>
      {/* <Link href='/login'>
        <button className="hidden md:flex bg-black text-white p-2 rounded">
          Create account
        </button>
      </Link> */}
      <div className="hidden md:flex">
        {/* <WaitlistForm/> */}
        <CreateAccountButton/>
      </div>

      <Footer />

      <div className="pt-20 flex flex-col gap-1">
        <Link
            href='mailto:userunway@gmail.com'  
        >
          <p className="text-gray text-xs">Any feedback? Contact us!</p>
        </Link>
      </div>
    </main>
      <section id="what-is" className="flex w-[100vw] h-auto p-20 items-center justify-center gap-8 font-medium flex-col px-4 bg-black">
        <div className="flex items-center justify-center text-center gap-2 flex-col">
          <h2 className="text-lg text-white md:text-3xl">A new social app designed for fashion lovers</h2>
          <p className="flex items-center justify-center text-center text-sm text-dark md:w-1/2">
            Create a profile, share outfits, get inspo and buy what you like the most. Every post comes with a link-to-product so that everyone can buy the tagged product.
          </p>
        </div>
        <Image width={500} height={1000} alt="Discover" src={`https://qqdcidmbajmncgqukjhm.supabase.co/storage/v1/object/public/uploads/landing/discover.png`} />
        <Link href='/signup' className="opacity-80 bg-white rounded-3xl bg-white">
          <button className="text-white opacity-70 bg-black px-3 py-2 rounded-3xl">Create profile</button>
        </Link>
      </section>
      <section className="flex w-[100vw] h-auto p-20 items-center justify-center gap-8 font-medium flex-col px-4 bg-black">
      <div className="flex items-center justify-center text-center gap-2 flex-col text-white">
        <h2 className="text-lg md:text-2xl">Influencer? We got you!</h2>
        <p className="flex items-center justify-center text-center text-sm text-dark md:w-1/2">
          These days inlfuencers are struggling to monetize their content. But we are here to help them. Tag your clothes with affiliate links, create lists and create a community. This is only the beginning.
        </p>
      </div>
        <Image width={500} height={1000} alt="Discover" src={`https://qqdcidmbajmncgqukjhm.supabase.co/storage/v1/object/public/uploads/landing/influencer.png`} />
        <Link href='/signup' className="bg-white opacity-60 px-3 py-2 rounded-3xl">
          <button className="text-black">Start monetizing</button>
        </Link>
      </section>
      <section className="flex w-[100vw] h-auto p-20 items-center justify-center gap-8 font-medium flex-col px-4 bg-black">
      <div className="flex items-center justify-center text-center gap-2 flex-col text-white">
        <h2 className="text-lg md:text-2xl">Introducing Runways. Curate your endless fashion wishlist.</h2>
        <p className="flex items-center justify-center text-center text-sm text-dark md:w-1/2">
          Pinterest? Instagram? Create a Runway and save from pins to ig and runway posts. All your favorites in one place to share them with your friends.
        </p>
      </div>
        <Image width={500} height={1000} alt="Discover" src={`https://qqdcidmbajmncgqukjhm.supabase.co/storage/v1/object/public/uploads/landing/lists.png`} />
        <Link href='/signup' className="bg-white opacity-60 px-3 py-2 rounded-3xl">
          <button className="text-black">Start curating</button>
        </Link>
      </section>
      <section className="flex w-[100vw] h-auto p-20 items-center justify-center gap-8 font-medium flex-col px-4 bg-black">
      <div className="flex items-center justify-center text-center gap-2 flex-col text-white">
        <h2 className="text-lg md:text-2xl">You might not be at Paris FW, but here you can showcase your outfits too.</h2>
        <p className="flex items-center justify-center text-center text-sm text-dark md:w-1/2">
          Runway exists to give the fashion community a place to share their outfits, get inspired and shop socially. Join with your friends and meet other fashion lovers.
        </p>
      </div>
        <Image width={500} height={1000} alt="Discover" src={`https://qqdcidmbajmncgqukjhm.supabase.co/storage/v1/object/public/uploads/landing/disc.png`} />
        <Link href='/signup'>
          <button className="text-sky">Join now!</button>
        </Link>
      </section>
    </>
    )
}
