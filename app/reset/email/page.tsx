'use client'

import { supabase } from "@/utils/supabase/server"
import { useState } from "react"

export default function Reset() {

    const [data, setData] = useState<{
        email: string,
      }>({
        email: '',
      })


    const resetPassword = async () => {
        const {email} = data;
        let { data: resetData, error } = await supabase.auth.resetPasswordForEmail(email)

        if (resetData) {
            console.log(resetData);
            
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
        <div className="container flex flex-col items-center justify-center md:h-2/3 h-screen md:pt-40 md:mx-auto w-full gap-3">
            <h2 className="font-bold text-xl items-start w-full md:w-1/3">Reset password</h2>
            <div className='flex flex-col w-full md:w-1/3 gap-2'>
                <label>Enter your email</label>
                <input
                    type='email'
                    name='email'
                    required
                    value={data?.email}
                    onChange={handleChange}
                    className="bg-black text-white px-2 py-1 rounded"
                />
            </div>
            <p>Yow will a recieve an email to reset your password.</p>
            <button className="px-4 py-1 bg-gray-200 rounded cursor-pointer w-full md:w-1/3 mt-1 font-medium" onClick={() => resetPassword()}>Confirm</button>
        </div>
    )
}