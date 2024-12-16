'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { PlusCircle, Sparkles, User } from 'lucide-react'
import { Events, scrollSpy } from 'react-scroll';

export const Footer = () => {

    const [isScrolled, setIsScrolled] = useState(false);

        useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        Events.scrollEvent.register('begin', handleScroll);
        Events.scrollEvent.register('end', handleScroll);
        scrollSpy.update();

        return () => {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        };
        }, []);

  return (
    <div className={`flex md:hidden w-2/5 items-center justify-between bg-dark px-4 py-2 rounded-2xl opacity-40 bottom-10 fixed ${isScrolled ? 'hidden' : ''}`}>
        <div>
            <Link href={`/discover?tab=forYou`}>
                <Sparkles size={30} color='black'/>
            </Link>
        </div>
        <div>
            <Link href={`/create`}>
                <PlusCircle size={30} />
            </Link>
        </div>
        <div>
            <Link href={`/profile`}>
                <User size={30} />
            </Link>
        </div>
    </div>
  )
}
