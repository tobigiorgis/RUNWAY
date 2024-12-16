import { Metadata, ResolvingMetadata } from "next"
import MainProductDetail from "@/components/ProductDetails/Main"

const Page = ({
  params,
  // searchParams,
}: {
  params: { id: string };
  // searchParams?: { [key: string]: string | undefined };
}) => {
  
  // const postId = searchParams?.id || '';
  const postId = params.id;

  return (
    <MainProductDetail postId={postId} />
  )
}

export default Page
