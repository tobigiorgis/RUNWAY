'use client'
import { useEffect, useState } from "react";

import { useDropzone } from "react-dropzone";

import { publishVideo, uploadVideo } from "@/lib";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";


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
      accept: {'image/*': []} ,
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
        <h4 className="mt-3 text-gray">Drag and drop here</h4>
        <p className="text-gray">or</p>
        <h4 className="mt-3 text-gray">Select a picture</h4>
      </>
    );
  };


  const handleSubmit = async (evt: any) => {
    evt.preventDefault();
    if (!uploaded) return;

    const wait = () => new Promise((resolve) => setTimeout(resolve, 3000));

    let title = evt.target.title.value;
    let description = evt.target.description.value;
    let product = evt.target.product.value;
    let productlink = evt.target.productlink.value;

    const [error, data] = await publishVideo({ postSrc: uploaded, title, description, product, productlink, tags: tags});

    if (error) {
      return toast({
        title: "Post failed",
        description: `There was an error: ${error.message}`,
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
        window.location.reload(); // Moved inside the .then() to ensure it happens after wait
      });
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
      <div className='w-full md:px-24 px-8 py-5 h-full flex flex-col border-gray border-t'>
        <h1 className='font-bold text-xl'>Create runway</h1>

        <form className='w-full flex md:flex-row flex-col mt-5 md:h-full h-fit gap-4' onSubmit={handleSubmit}>
          <div className='md:w-1/2 w-full flex flex-col items-start gap-2' {...getRootProps()}>
            <label className='font-semibold w-full h-auto items-start' htmlFor="image">Photo</label>
            <div className='w-full md:h-full h-[40vh] border-2 border-dashed border-black bg-zinc rounded gap-2 p-5 flex-col flex items-center justify-center'>
              <input type="file" name="image" id="fileInput" {...getInputProps()} />
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
            <label htmlFor="description" className='font-semibold flex items-start w-full mt-4'>
              Description
            </label>
            <textarea id="description" className='mt-2 pl-2 pt-2 bg-zinc w-full focus:outline-gray rounded h-20' name="description" placeholder="describe it" />

            <label className='font-semibold flex items-start w-full mt-4' htmlFor="product">
              Product name
            </label>
            <input required id="product" className='mt-2 pl-2 bg-zinc w-full focus:outline-gray rounded h-10' name="product" placeholder="what you wearing?" />

            <label className='font-semibold flex items-start w-full mt-4' htmlFor="productlink">
              Product link
            </label>
            <input required id="productlink" className='mt-2 pl-2 bg-zinc focus:outline-gray w-full rounded h-10' name="productlink" placeholder="paste that affiliate link to make some $$$" />

            <label className='font-semibold flex items-start w-full mt-4' htmlFor="tags">
              Tags
            </label>
            <input
              id="tags"
              className='mt-2 pl-2 bg-zinc w-full rounded h-10 focus:outline-gray'
              name="tags"
              placeholder="add tags"
              onKeyDown={handleKeyDown}
            />
            <div className="mt-3">
              {tags.map((tag, index) => (
                <span key={index} className='bg-zinc text-gray font-semibold rounded px-2 py-1 mr-2'>
                  {tag}
                  <button
                    type="button"
                    className='ml-2 text-gray text-xs'
                    onClick={() => handleDelete(index)}
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
            <Dialog open={posted}>
                <button type="submit" className='text-sm rounded h-7 w-1/3 mt-5 bg-black text-slate'>Post</button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Runway Posted!</DialogTitle>
                <DialogDescription>
                  Post has been added to your feed. Your friends will love it 🚀
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
