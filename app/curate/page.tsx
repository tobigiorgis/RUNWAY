'use client'

import React, { useState } from 'react'
import { InstagramEmbed, PinterestEmbed } from 'react-social-media-embed';


const Curate = () => {

  const [link, setLink] = useState('')
  const [plink, setPlink] = useState('')
  const [embedLink, setEmbedLink] = useState<string | null>(null)
  const [pembedLink, setPembedLink] = useState<string | null>(null)

  const postEmbed = () => {
    setEmbedLink(link)
  }
  const postPinterestEmbed = () => {
    setPembedLink(plink)
  }
    return (
        <div className='pt-20 flex justify-evenly flex-row'>
          <div className='flex flex-col gap-3'>
          <h2>IG post</h2>
            <div className='flex flex-row justify-between gap-2'>
              <input
                type="text"
                placeholder="Search"
                className="h-10 pl-2 border-2 border-gray rounded-md"     
                value={link}
                onChange={e => setLink(e.target.value)} // Update link when the input changes
                />
              <button className='bg-black text-zinc p-2 rounded' onClick={postEmbed}>
                Display post
              </button>
            </div>
            {embedLink && <InstagramEmbed url={embedLink} width={328} />}
          </div>
          <div className='flex flex-col gap-3'>
            <h2>Pinterest post</h2>
            <div className='flex flex-row justify-between gap-2'>
              <input
                type="text"
                placeholder="Search"
                className="h-10 pl-2 border-2 border-gray rounded-md"     
                value={plink}
                onChange={e => setPlink(e.target.value)} // Update link when the input changes
                />
              <button className='bg-black text-zinc p-2 rounded max-h-10' onClick={postPinterestEmbed}>
                Display post
              </button>
            </div>
            {pembedLink && <PinterestEmbed url={pembedLink} width={328} height={467}/>}
          </div>
        </div>
    )
}

export default Curate