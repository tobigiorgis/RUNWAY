import React, { Suspense } from 'react'
import DiscoverMain from '@/components/DiscoverFeed/DiscoverMain';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function DiscoverPage(props: {
    searchParams: SearchParams
  }) {

    const searchParams = await props.searchParams
    const tab = searchParams.tab

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DiscoverMain tab={tab}/>
        </Suspense>
    )
}
