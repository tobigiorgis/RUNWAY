"use client"

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { ListOwnerView } from '@/components/Lists/ListOwnerView'
import { ListVisitorView } from '@/components/Lists/ListVisitorView'
import { createClient } from '@/utils/supabase/client'

const ListDetail = () => {
  const pathname = usePathname()
  const listId = pathname.split('/')[3]
  const userId = pathname.split('/')[2]

  const [list, setList] = useState<any[]>([])
  const [isOwner, setIsOwner] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      // Fetch the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()

      // Fetch the list data
      const { data: list, error: listError } = await supabase
        // .from('users_lists')
        // .select('*')
        // .eq('id', listId)
        // .single()
        .from('posts_in_lists')
        .select('*, posts(*, profiles(username))')
        .eq('list_id', listId);


      if (list) {
        setList(list)
      }
      setIsOwner(user?.id === userId)
    }

    fetchData()
  }, [listId, userId])


  return (
    <>
      {isOwner ? <ListOwnerView list={list} /> : <ListVisitorView list={list} />}
    </>
  )
}

export default ListDetail