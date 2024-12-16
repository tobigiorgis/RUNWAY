import { Metadata, ResolvingMetadata } from "next"
import MainProductDetail from "@/components/ProductDetails/Main"

type Props = {
  params: { id: string }
}

const Page = ({params} : Props) => {
  
  // const postId = searchParams?.id || '';
  const postId = params.id;

  return (
    <MainProductDetail postId={postId} />
  )
}

export default Page
