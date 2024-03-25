'use client'
import { useEffect, useState } from "react";

import { Progress } from "@/components/ui/progress"
import { useDropzone } from "react-dropzone";

import { publishVideo, uploadVideo } from "@/lib";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";


export default function Upload() {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<any>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [posted, setPosted] = useState(false);

  // const [progress, setProgress] = useState(0)

  const onDrop = async (files: any) => {
    // const prefix = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL
    const [file] = files;
    setUploading(true);
    const [error, fileUrl] = await uploadVideo({ postFile: file });
    if (error) return console.log(error);
    setUploaded(fileUrl);
  };

  

  const { isDragAccept, isDragReject, getRootProps, getInputProps } =
    useDropzone({
      disabled: uploading || uploaded !== null,
      maxFiles: 1,
      accept: {'image/bmp,image/jpeg,image/png,image/tiff,image/webp': []} ,
      onDrop,
    });


  useEffect(() => {
    if (isDragReject) navigator.vibrate(100);
  }, [isDragReject]);

//   const dndClassNames = clsx(styles.dnd, {
//     [styles.uploaded]: uploaded,
//     [styles.uploading && !styles.uploaded]: uploading,
//     [styles.dndReject]: isDragReject,
//     [styles.dndAccept]: isDragAccept,
//   });

  const renderDndContent = () => {
    if (uploaded) {
      // setProgress(20)
      return <h4>Photo uploaded!</h4>;
    }
    if (uploading) {
      return <h4>Uploading photo...</h4>;
    }
    if (isDragReject) return <h4>Archivo no soportado</h4>;
    if (isDragAccept) return <h4>¡Suelta el archivo para subirlo!</h4>;

    return (
      <>
        <h4 className="mt-3 text-gray-400">Drag and drop here</h4>
        <p className="text-gray-400">or</p>
        <h4 className="mt-3 text-gray-400">Select a picture</h4>
      </>
    );
  };

  const handleSubmit = async (evt: any) => {
    evt.preventDefault();
    if (!uploaded) return;

    const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));

    const title = evt.target.title.value;
    const description = evt.target.description.value;
    const product = evt.target.product.value;
    const productlink = evt.target.productlink.value;

    const [error] = await publishVideo({ postSrc: uploaded, title, description, product, productlink, tags: tags});

    if (error) return console.log(error);
    else {
      console.log("post published!!!");
      setPosted(true);
      wait().then(() => setPosted(false));
      
    }
};
  
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = event.target.value.trim();
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
        event.target.value = '';
      }
    }
  };

  const handleDelete = (index: any) => {
    setTags(tags.filter((tag, idx) => idx !== index));
  };
  
  
  return (
    <main className={`flex h-full py-20 flex-col bg-white items-center`}>
      <div className='w-full md:px-24 px-8 py-5 h-full flex flex-col border-gray-200 border-t'>
        <h1 className='font-bold text-xl'>Create runway</h1>

        <form className='w-full flex md:flex-row flex-col mt-5 md:h-full h-fit gap-4' onSubmit={handleSubmit}>
          <div className='md:w-1/2 w-full flex flex-col items-start gap-2' {...getRootProps()}>
            <label className='font-semibold w-full h-auto items-start' htmlFor="image">Photo</label>
            <div className='w-full md:h-full h-[40vh] border-2 border-dashed border-black bg-slate-100 rounded gap-2 p-5 flex-col flex items-center justify-center'>
              <input type="file" required id="fileInput" {...getInputProps()} />
              <img
                src="https://sf16-scmcdn-va.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/cloud_icon-6e07be44878e69ee3f7bff3b78405b76.svg"
                width="49"
                id="image"
                alt="upload icon"
              />
              {renderDndContent()}
              {/* <button type="button" className='w-auto bg-black text-white rounded py-1 px-2' onClick={() => document.getElementById('fileInput')?.click()}>
                {
                  uploaded ? "Change picture" : "Select a picture"
                }
              </button> */}
            </div>
          </div>

          <div className='md:w-1/2 w-full flex flex-col items-center'>
            <label className='font-semibold flex items-start w-full' htmlFor="title">
              Title
            </label>
            <input required id="title" className='mt-2 pl-2 bg-slate-100 w-full rounded h-10' name="title" placeholder="add a cool title" />

            <label htmlFor="description" className='font-semibold flex items-start w-full mt-4'>
              Description
            </label>
            <textarea id="description" className='mt-2 pl-2 pt-2 bg-slate-100 w-full rounded h-20' name="description" placeholder="describe it" />

            <label className='font-semibold flex items-start w-full mt-4' htmlFor="product">
              Product name
            </label>
            <input required id="product" className='mt-2 pl-2 bg-slate-100 w-full rounded h-10' name="product" placeholder="what you wearing?" />

            <label className='font-semibold flex items-start w-full mt-4' htmlFor="productlink">
              Product link
            </label>
            <input required id="productlink" className='mt-2 pl-2 bg-slate-100 w-full rounded h-10' name="productlink" placeholder="paste that affiliate link to make some $$$" />

            <label className='font-semibold flex items-start w-full mt-4' htmlFor="tags">
              Tags
            </label>
            <input
              id="tags"
              className='mt-2 pl-2 bg-slate-100 w-full rounded h-10'
              name="tags"
              placeholder="add tags"
              onKeyDown={handleKeyDown}
            />
            <div className="mt-3">
              {tags.map((tag, index) => (
                <span key={index} className='bg-gray-200 text-gray-700 font-semibold rounded px-2 py-1 mr-2'>
                  {tag}
                  <button
                    type="button"
                    className='ml-2 text-gray-400 text-xs'
                    onClick={() => handleDelete(index)}
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
            <Dialog open={posted}>
                <button className='text-sm rounded h-7 w-1/3 mt-5 bg-black text-slate-100'>Post</button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Runway Posted!</DialogTitle>
                <DialogDescription>
                  Post has been added to your account. Your friends will love it 🚀
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          </div>
        </form>
      </div>
    </main>
  );
}
