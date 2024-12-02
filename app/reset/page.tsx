'use client';

import { supabase } from "@/utils/supabase/server";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Reset() {
  const [data, setData] = useState<{
    password: string,
    confirmPassword: string
  }>({
    password: '',
    confirmPassword: ''
  })

  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const confirmPasswords = async () => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) return alert(`Your passwords are incorrect`);

    const { data: resetData, error } = await supabase
      .auth
      .updateUser({
        password: data.password
      })

    if (resetData) {
      router.push('/')
    }
    if (error) console.log(error)
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
        <div className="container flex flex-col items-center justify-center md:h-2/3 h-screen md:pt-40 md:mx-auto w-full gap-4">
            <h2 className="font-bold text-xl items-start w-full md:w-1/3">Reset password</h2>
            <div className='flex flex-col w-full md:w-1/3 gap-2'>
                <label>Enter your new password</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={data?.password}
                    onChange={handleChange}
                    className="bg-black text-white px-2 py-1 rounded"
                />
            </div>
            <div className='flex flex-col w-full md:w-1/3 gap-1'>
                <label>Confirm your new password</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    value={data?.confirmPassword}
                    onChange={handleChange}
                    className="bg-black text-white px-2 py-1 rounded"
                />
            </div>
            <div className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {/* <p className="text-sm">Show passwords</p> */}
                {
                    showPassword ? 
                    <EyeOff size={16} /> :
                    <Eye size={16} />
                }
            </div>
            <button className="px-4 py-1 bg-gray-200 rounded cursor-pointer w-full md:w-1/3 mt-5 font-medium" onClick={() => confirmPasswords()}>Confirm</button>
        </div>
  )
}