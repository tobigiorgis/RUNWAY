'use client'

import React, { FC, useEffect, useRef } from 'react'
import cn from 'classnames';
import { IFeatured } from '@/interfaces';


interface Props {
    product: IFeatured
    moveFactor: number
    className?: string
}

export const FeaturedProduct: FC<Props> = ({product, moveFactor, className}) => {

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (event: { clientX: any; clientY: any; }) => {
          const { clientX, clientY } = event;
          const moveX = (clientX / window.innerWidth) * 100 * moveFactor;
          const moveY = (clientY / window.innerHeight) * 100 * moveFactor;
          if (divRef.current) {
            divRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
          }
        };
      
        window.addEventListener('mousemove', handleMouseMove);
      
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
        };
      }, [moveFactor]);

  return (
    <div 
        ref={divRef}
        style={{ backgroundImage: `url(${product.image})`, backgroundSize: 'cover'}}
        className={cn('w-40 h-64 mt-4', className)}   
    >
        <p className='text-white pl-2 pt-2 text-xs'>@{product.createdBy}</p>
    </div>
  )
}
