'use client'
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";

// import { useDropzone } from "react-dropzone";

import { publishVideo, uploadVideo } from "@/lib";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { NonCreatorModal } from "@/components/ui/non-creator-modal";
import { createClient } from "@/utils/supabase/client";


export default function Create() {
  const [description, setDescription] = useState('')
  const [uploaded, setUploaded] = useState<any>(null);
  const [productName, setProductName] = useState('')
  const [productLink, setProductLink] = useState('')
  const [products, setProducts] = useState<{ name: string, link: string }[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>([]);
  const [posted, setPosted] = useState(false);
  const [currentTag, setCurrentTag] = useState('')
  const router = useRouter()

  const supabase = createClient()

  const renderDndContent = () => {
    if (previewUrl) {
      return <h4>Photo selected</h4>;
    }
    return (
      <>
        <h4 className="mt-3 text-gray-500">Drag and drop here</h4>
        <p className="text-gray-500">or</p>
        <h4 className="mt-3 text-gray-500">Select a picture</h4>
      </>
    );
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
      const [error, fileUrl] = await uploadVideo({ postFile: file });
      if (error) return console.log(error);
      setUploaded(fileUrl);
    }
  }

  const handleAddProduct = () => {
    if (productName.trim() && productLink.trim()) {
      setProducts([...products, { name: productName, link: productLink }]);
      setProductName('');
      setProductLink('');
    }
  }

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!uploaded) return;

    const wait = () => new Promise((resolve) => setTimeout(resolve, 3000));

    const [error, data] = await publishVideo({ postSrc: uploaded, description, products, tags});

    if (error) {
      return toast({
        title: "Post failed",
        description: `There was an error: ${Array.isArray(error) ? 'Unknown error' : error.message}`,
    })
    } 
    else {
      setPosted(true);
      wait().then(() => {
        setPosted(false);
        // Clean all input values
        // Note: Cleaning input values here won't have an effect if you're reloading the page immediately after.
        setTags([]);
        setUploaded(null);
        router.push('/discover?tab=forYou')
      });
    }
};
  
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault()
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()])
      }
      setCurrentTag('')
    }
  }
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleRemoveProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  }
  
  
  return (
    <div className="container mx-auto pt-20 px-4 py-8">
      {/* {showModal && <NonCreatorModal />} */}
      <Card className="w-full md:w-1/2 mx-auto">
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className='w-full flex flex-col items-start gap-2'>
              <Label htmlFor="image" className="font-semibold">Photo <span className="text-dark text-xs pl-1 font-normal">Required</span></Label>
              <div className='w-full aspect-video border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg overflow-hidden relative'>
                <input 
                  type="file" 
                  name="image" 
                  id="image" 
                  onChange={handleImageChange} 
                  className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                  accept="image/*"
                />
                {previewUrl ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setPreviewUrl(null)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors z-20"
                      aria-label="Remove image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {renderDndContent()}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="description">Description <span className="text-dark text-xs pl-1 font-normal">Required</span></Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-dark">Provide the links to the products you are featuring below.</p>
              <div className="flex flex-col">
                <label className="text-sm font-medium" htmlFor="productName">Product Name <span className="text-dark text-xs pl-1 font-normal">Required</span></label>
                <Input
                  type="text"
                  name="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="focus:outline-none"
                  placeholder="Product name"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium" htmlFor="productLink">Product Link <span className="text-dark text-xs pl-1 font-normal">Required</span></label>
                <Input
                  type="text"
                  name="productLink"
                  value={productLink}
                  onChange={(e) => setProductLink(e.target.value)}
                  className="focus:outline-none"
                  placeholder="Product link"
                />
              </div>
              <button className="text-dark text-sm font-medium" onClick={handleAddProduct}>
                Add product +
              </button> 
              <div className="flex flex-row flex-wrap gap-4">
                {products.map((product, index) => (
                  <div key={index} className="flex flex-col md:w-1/3 w-1/2 justify-between items-start bg-zinc py-2 px-4 rounded-md mb-2">
                    <div className="flex justify-between w-full">
                      <p className="text-sm text-dark">Product</p>
                      <button
                        type="button"
                        className="ml-2 text-sm font-bold text-dark"
                        onClick={() => handleRemoveProduct(index)}
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-md font-medium">{product.name}</p>
                  </div>
                ))}
              </div>
              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Add tags and press Enter"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="px-2 py-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-xs font-bold"
                        aria-label={`Remove ${tag} tag`}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <CardFooter className="px-0 flex justify-end">
              <Button type="submit">Create Post</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
