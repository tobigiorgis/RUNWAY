"use client";

import { Footer } from "@/components/ui/Footer";
import { FeaturedProduct } from "@/components/ui/product";
// import { useSupabase } from "@/hooks/useSupabase";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {

  // const { getSession } = useSupabase();

  // useEffect(() => {
  //   getSession()
  // }, []);

  return (
    <main className={`flex h-screen w-full flex-col items-center bg-white justify-center pt-20 gap-10`}>
      <div className='flex flex-col items-center justify-between w-full relative top-100'>
        <h1 className='md:text-5xl text-2xl'>WHERE FASHION LOVERS MEET</h1>
        <h4 className='text-m mt-2 md:text-lg'>Curate and discover outfits.</h4>
        <Link href='/about'>
          <p className="text-xs mt-1 text-gray-300 hover:border-b cursor-crosshair">What is RUNWAY?</p>
        </Link>
      </div>

      <div className='flex flex-row justify-between w-3/4 cursor-crosshair'>
        <FeaturedProduct product={{createdBy: 'Dosantimed', image: '/images/dos.jpeg'}} moveFactor={0.8} className='hidden md:flex relative top-30 left-100'/>
        <FeaturedProduct product={{createdBy: 'IdaZeile', image: '/images/ida.jpeg'}} moveFactor={0.4} className='relative md:bottom-10 md:left-70 left-10'/>
        <FeaturedProduct product={{createdBy: 'HeliotEmil', image: '/images/he.jpeg'}} moveFactor={0.6} className='relative md:top-30 md:left-120 top-12'/>
        <FeaturedProduct product={{createdBy: 'TwoJeys', image: '/images/tj.jpeg'}} moveFactor={0.2} className='hidden md:flex relative bottom-10 left-10'/>
      </div>
      <Link href='/login'>
        <button className="bg-black text-white p-2 rounded">
          Create account
        </button>
      </Link>
      <Footer />
    </main>
    )
}
