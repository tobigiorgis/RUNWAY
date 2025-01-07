
import React from 'react'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { cookies } from 'next/headers'

import { Search, Sparkle, X } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../shadcn/dropdown-menu';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { createClient } from '@/utils/supabase/server';
import { signOutAction } from '@/app/actions';



export const NavbarTest = async () => {
  
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();  
  

  const { data: profile, error } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', user?.id)



  // const pathname = usePathname();
  // const [sessionActive, setSessionActive] = useState(false)
  // const [searchInput, setSearchInput] = useState('');
  // const [username, setUsername] = useState<string | null>('');
  // const [userId, setUserId] = useState<string | null>('');
  // const [searchResults, setSearchResults] = useState<any[]>([]);



    // const getUsername = async () => {
    //   const { data: { user } } = await supabase.auth.getUser()
    //   if (user) {
    //     const { data, error } = await supabase
    //     .from('profiles')
    //     .select('username')
    //     .eq('id', user?.id)

    //     if (error) {
    //       console.log(error);
    //     } 

    //     if (data) {
    //       const userIs = data[0].username
    //       setUsername(userIs)
    //       console.log(username); 
    //       setUserId(user?.id || null);
    //     }
    //   }
    // }


    // const handleSearch = async () => {
    //   // Search the profiles table
    //   const { data: profileData, error: profileError } = await supabase
    //     .from('profiles')
    //     .select('*')
    //     .ilike('username', `%${searchInput}%`);
    
    //   if (profileError) {
    //     console.log(profileError);
    //   } else {
    //     console.log(profileData); // Replace this with your own logic to display the search results
    //     setSearchResults(profileData);
    //   }
    
    // }

    // // Search posts on enter key press
    // const postsSearch = (e: any) => {

    //   e.preventDefault();

    //   if (e.key === 'Enter') {

    //     setSearchInput('')

    //     const q = e.currentTarget.value


    //     // Navigate to the search page with the search query as a search param
    //     router.replace(`/search/posts?query=${q}`);
    //   }

    // }
    
  
  return (
    <div className='flex flex-row justify-between items-center w-full md:top-0 fixed md:py-3 py-5 px-4 md:px-6 bg-transparency-20 bg-gray z-50 border-b border-light'>
      <div className='flex flex-row items-center md:gap-4'>
        <Link href={'/'}>
          <h1 className='md:text-sm text-m'>Runway</h1>
          {/* <Image alt='logo' src='/images/runway.jpg' width={100} height={30} /> */}
        </Link>
        <button className={`hidden md:flex md:text-sm md:rounded md:p-1 hover:font-medium`}>
          <Link href={'/discover?tab=forYou'}>
            Discover
          </Link>
        </button>
        {
          profile?.[0]?.role != 'user' ? (
          <button className={`hidden md:flex md:text-sm md:rounded md:p-1 hover:font-medium`}>
            <Link href={'/create'}>
              Create
            </Link>
          </button>
          ) :
          <> 
          </>
        }
      </div>

          {
            user ? (
              <div className='flex justify-end items-center gap-3'>
                <button className='hidden md:flex  md:text-sm'>
                  <Link href={`/profile`}>
                    Profile
                  </Link>
                </button>
                {/* <Dialog>
                  <DialogTrigger>
                    <Search size={20} />
                  </DialogTrigger>
                  <DialogContent className='border-none opacity-80 w-[90vw]'>
                    <DialogHeader>
                      <div className='flex w-full flex-row justify-between pb-2'>
                        <input
                          placeholder='Search profiles'
                          className='bg-white outline-none active:outline-none text-md'
                          value={searchInput}
                          onChange={async (e) => {
                            setSearchInput(e.target.value);
                            await handleSearch();
                          }}
                          onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                              postsSearch(e);
                            }
                          }}
                        >
                        </input>
                        <DialogClose>
                          <X size={16} color='gray'/>
                        </DialogClose>
                      </div>
                      <div className='w-full flex flex-col flex-start justify-start'>
                        <h4 className='text-sm font-medium flex'>Profiles</h4>
                        <div className='flex'>
                          <h5 className='text-md'>@tobi</h5>
                        </div>
                      </div>
                      {
                        searchInput === '' ? (
                          <div hidden ></div>
                        ) : (
                          <div className='bg-opacity-60 rounded bg-slate md:relative md:w-full'>
                            <p className='md:text-sm text-gray py-1 w-full text-center'> Enter to search posts related to &ldquo;{searchInput}&rdquo;</p>
                            <h3 className='md:text-sm pl-2 text-gray py-1'>Profiles</h3>
                          {searchResults.map((result: any, key: number) => {
                              return (
                              <div key={key} className='flex flex-row items-center py-1 pl-2 hover:bg-zinc'>
                                <Link className='w-full' href={`/profile/${result.id}`} onClick={() => setSearchInput('')}>
                                  <div className='flex flex-row items-center gap-4 w-full'>
                                    <h4>@{result.username}</h4>
                                  </div>
                                </Link>
                              </div>
                            )
                          })}
                          </div>
                        )
                      }
                    </DialogHeader>
                  </DialogContent>
                </Dialog> */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="focus:outline-none  md:text-sm">
                      More
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Hey <Link href={'/profile'}>@{user.id}</Link></DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='md:hidden'> 
                      <Link href={'/discover?tab=forYou'}>
                        <button className="button block cursor-pointer" type="button">
                          Discover
                        </button>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='md:hidden cursor-pointer'> 
                      <Link href={'/create'}>
                        <button className="button block" type="button">
                          Create
                        </button>
                      </Link>
                    </DropdownMenuItem>
                    <Link href={`/lists/${user.id}`} className='pointer'>
                      <DropdownMenuItem className='pointer'> 
                          Runways
                      </DropdownMenuItem>
                    </Link>
                    <Link href={`/profile?q=liked`}>
                      <DropdownMenuItem>
                        Liked
                      </DropdownMenuItem>
                    </Link>
                    <Link href={`https://wa.me/543415863732`} target="_blank" rel="noopener noreferrer">
                      <DropdownMenuItem>
                        Contact
                      </DropdownMenuItem>
                    </Link>
                    <form action={signOutAction}>
                    <DropdownMenuItem> 
                      <button className="button block flex justify-start w-full">
                        Sign out
                      </button>
                    </DropdownMenuItem>
                    </form>
                      {/* <button className="button block" type="submit" onClick={logout}>
                        Log out
                      </button> */}
                  </DropdownMenuContent>
                </DropdownMenu>

              </div>
            )
            : (
              <div className='flex justify-evenly items-center'>
                <button>
                    <Link href={'/sign-in'}>Login</Link>
                    {/* <Link href={'/waitlist'}>Join Waitlist</Link> */}
                </button>
              </div>
            )
          }
    </div>
  )
}