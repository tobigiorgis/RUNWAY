
import React from 'react'

const About = () => {
  return (
    <div className='w-full md:w-3/4 h-[100vh] pt-20 flex flex-col items-start  justify-center md:px-24 px-12'>
      <h1 className='font-semibold'>What is RUNWAY</h1>
      <p className='text-sm mt-1'>
        RUNWAY aims to be “Pinterest but only for fashion”. By <span className='font-medium'>curating</span> outfits and products while <span className='font-medium'>monetizing</span>.
      </p>
      <h2 className='font-semibold mt-4'>Origin of the idea</h2>
      <p className='text-sm mt-1'>
        There are plenty of fashion products I like from either Pinterest or Instagram but I really <span className='font-medium'>struggle to find them</span> on internet and handle to buy them. Additionally, I believe influencers and inspo accounts can monetize what they post, making a win-win for influencer and follower. Also, we are working hard so that in the near future everyone can monetize their posts too.
      </p>
      <h3 className='font-semibold mt-4'>How RUNWAY solves this</h3>
      <p className='text-sm mt-1'>
        In RUNWAY you are able to post your outfits or products you like from your profile. A post consists of Photo, Title, Description, Product name, Product Link and tags, if desired. By sharing the link to the product, users would be able to get that product on the internet easily and influencers would be able to monetize their posts with their affiliate links.
      </p>
      <h4 className='font-semibold mt-4'>Main Features</h4>
      <p className='text-sm mt-1'>
      <span className='font-medium'>Posts.</span> Share your outfits with fashion lovers.
      </p>
      <p className='text-sm mt-1'>
      <span className='font-medium'> Affiliate links.</span> Monetize your posts and get everyone to buy what you are wearing.
      </p>
      <p className='text-sm mt-1'>
      <span className='font-medium'>Discover outfits/products.</span> I could be scrolling here all day.
      </p>
      <p className='text-xs mt-1'>
      <span className='font-medium text-sm'>Make lists with those you love (ex. cool pants).</span> DISCOVER → SAVE → BUY.
      </p>
    </div>
  )
}

export default About
