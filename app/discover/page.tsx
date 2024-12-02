
import React, { Suspense } from 'react'
import DiscoverMain from '@/components/DiscoverFeed/DiscoverMain';



export default function DiscoverPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DiscoverMain />
        </Suspense>
    )
}
