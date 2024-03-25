'use client';

import { FeaturedProduct } from "@/components/ui/product";
import { supabase } from "@/lib/supabase";
import { NextRequest } from "next/server";
import { useState } from "react";

export default function Login() {
  const [data, setData] = useState<{
    email: string,
    password: string
  }>({
    email: '',
    password: ''
  });

  const [success, setSuccess] = useState<boolean>(false);

  const login = async () => {
    try {
      let { data: dataUser, error } = await supabase
        .auth
        .signInWithOtp({
          email: data.email,
          options: {
            shouldCreateUser: true,
            // emailRedirectTo: `${url.origin}`
          }
        })

      if (dataUser) {
        setSuccess(true);
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
  <div className="container flex flex-col items-center justify-center md:h-1/2 h-screen md:pt-40 md:mx-auto w-full gap-4">
    <div className='w-full md:w-1/2 flex flex-col items-start'>
      <h2 className="font-semibold text-2xl">Login</h2>
      <p className="text-sm mt-1 w-full">Type your email either to Login or Signup. You will get a link that will log/sign you when clicked.</p>
      <label className="mt-4">Email</label>
      <input
        className="w-full bg-slate-100 rounded px-2 py-1 mt-2"
        type='text'
        name='email'
        value={data?.email}
        onChange={handleChange}
      />
    </div>
    {/* <div className='grid'>
      <label>Password</label>
      <input
      type='password'
      name='password'
      value={data?.password}
      onChange={handleChange}
      />
    </div> */}
    {success && <div className="my-4 bg-green-100 px-2 text-green-600">An email has been sent to {data.email} to login.</div>}
    <div>
      <button className="px-4 py-2 bg-slate-200 rounded cursor-pointer" onClick={login}>Send</button>
    </div>
    <div className="flex flex-row md:gap-20 w-full md:w-3/4">
      <FeaturedProduct product={{createdBy: 'Corteiz', image: '/images/dos.jpeg'}} moveFactor={0.8} className='relative md:bottom-10 md:left-70 top-10 left-10'/>
      <FeaturedProduct product={{createdBy: 'IdaZeile', image: '/images/ida.jpeg'}} moveFactor={0.4} className='hidden md:flex relative bottom-10 left-70'/>
      <FeaturedProduct product={{createdBy: 'HeliotEmil', image: '/images/he.jpeg'}} moveFactor={0.6} className='hidden md:flex relative top-30 left-120'/>
      <FeaturedProduct product={{createdBy: 'TwoJeys', image: '/images/tj.jpeg'}} moveFactor={0.2} className='relative md:top-30 md:left-120 bottom-0 right-30'/>
    </div>
  </div>
  )
}