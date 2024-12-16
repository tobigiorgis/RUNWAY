import { Metadata, ResolvingMetadata } from "next"
import MainProductDetail from "@/components/ProductDetails/Main"


const Page = async ({ params,
}: {
  params: Promise<{ id: string }>}) => {
  
  // const postId = searchParams?.id || '';
  const postId = (await params).id;

  return (
    <MainProductDetail postId={postId} />
  )
}

export default Page
