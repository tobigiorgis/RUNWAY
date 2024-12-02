'use client';

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {

  // const signIn = async () => {
  //   'use server';

  //   // 1. Create a Supabase client
  //   const supabase = createClient();
  //   const origin = headers().get('origin');
  //   // 2. Sign in with GitHub
  //   const { error, data } = await supabase.auth.signInWithOAuth({
  //     provider: 'github',
  //     options: {
  //       redirectTo: `${origin}/auth/callback`,
  //     },
  //   });

  //   if (error) {
  //     console.log(error);
  //   } else {
  //     return redirect(data.url);
  //   }
  //   // 3. Redirect to landing page
  // };

  const [data, setData] = useState<{
    email: string,
    password: string
  }>({
    email: '',
    password: ''
  });

  const router = useRouter();

  // const loginWithPassword = async () => {
  //   try {
  //     let { data: dataUser, error } = await supabase
  //       .auth
  //       .signInWithPassword({
  //         email: data.email,
  //         password: data.password
  //       })

  //     if (dataUser) {
  //       router.push('/profile');
  //       router.refresh()
  //     }

  //   } catch (error) {
  //     console.log(error)
      
  //   }
  // }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
  <div className="container flex flex-col items-center justify-center md:h-2/3 h-screen md:pt-40 md:mx-auto w-full gap-4">
    <div className="w-full md:w-1/3 flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-xl">Yooo, welcome back!</h2>
        <p className="">First time here? <Link className="text-gray hover:underline-offset-auto" href={'/signup'}>Sign up for free</Link></p>
      </div>
      <div className='flex justify-between flex-col'>
        {/* <label>Email</label> */}
        <input
          type='text'
          name='email'
          placeholder="Your email"
          value={data?.email}
          onChange={handleChange}
          className="bg-black text-white rounded px-2 py-1 mt-2 w-full focus:outline-none "
          />
      </div>
      <div className='flex justify-between flex-col'>
        {/* <label>Password</label> */}
        <input
          type='password'
          name='password'
          placeholder="Your password"
          value={data?.password}
          onChange={handleChange}
          className="bg-black text-white justify-center rounded px-2 py-1 mt-2 w-full focus:outline-none"
          />
      </div>
      <Link href="/reset" className="text-sm hover:underline-offset-4">
        Forgot your password?
      </Link>
      {/* {success && <div className="my-4 bg-green-100 px-2 text-green-600">An email has been sent to {data.email} to login.</div>} */}
      <div>
        {/* <button className="px-4 py-1 bg-gray rounded cursor-pointer w-full mt-5 font-medium" onClick={loginWithPassword}>Continue</button> */}
      </div>
    </div>
  </div>
  )
}