'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FeaturedProduct } from "@/components/ui/product";
import { supabase } from "@/lib/supabase";
import { ConfirmEmail } from "@/components/ui/ConfirmEmail";

export default function SignUp() {

  const [data, setData] = useState<{
    email: string,
    password: string
  }>({
    email: '',
    password: ''
  });

  const isButtonDisabled = !data.email || data.password.length < 6;

  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  // const login = async () => {
  //   try {
  //     let { data: dataUser, error } = await supabase
  //       .auth
  //       .signInWithOtp({
  //         email: data.email,
  //         options: {
  //           shouldCreateUser: true,
  //           // emailRedirectTo: `${url.origin}`
  //         }
  //       })

  //     if (dataUser) {
  //       setSuccess(true);
  //     }

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const signUp = async () => {
    try {
        let { data: dataUser, error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password
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
    {/* <div className='w-full md:w-1/2 flex flex-col items-start'>
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
    </div> */}
    {
        success ? 
            <ConfirmEmail email={data?.email}/> 
        :
            <div className="w-full md:w-1/3 flex flex-col gap-3">
                <div  className="flex flex-col gap-1">
                    <h2  className="font-bold text-xl">Create a Runway account</h2>
                    <p className="text-base">Already have an account? <Link className="text-sky-700" href={'/login'}>Log in</Link></p>
                </div>
                <div className='flex justify-between flex-col'>
                <label>Email</label>
                <input
                    type='text'
                    name='email'
                    value={data?.email}
                    onChange={handleChange}
                    className="bg-black text-white rounded px-2 py-1 mt-2 w-full focus:outline-none "
                    />
                </div>
                <div className='flex justify-between flex-col'>
                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    value={data?.password}
                    onChange={handleChange}
                    className="bg-black text-white rounded px-2 py-1 mt-2 w-full focus:outline-none"
                    />
                </div>
                {/* {success && <div className="my-4 bg-green-100 px-2 text-green-600">An email has been sent to {data.email} to login.</div>} */}
                <div>
                <button disabled={isButtonDisabled} className={`px-4 py-1 bg-gray-200 rounded cursor-pointer w-full mt-5 font-medium`} onClick={signUp}>Create account</button>
                </div>
            </div>
    }
  </div>
  )
}