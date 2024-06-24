'use client'

import { useState } from "react";
import axios from "axios";
import { cleanInstagramUrl } from '../../utils/cleanInstagramUrl';

interface InstagramPost {
    title?: string;
    author_name: string;
    author_url: string;
    media_id: string;
    thumbnail_url: string;
    type: string;
    provider_name: string;
    provider_url: string;
    version: string;
    width: number;
    height: number;
    html: string;
  }

const Curate = () => {

    const [url, setUrl] = useState<string>('');
    const [postData, setPostData] = useState<InstagramPost | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    const fetchInstagramData = async (instagramUrl: string) => {
      try {
        console.log(instagramUrl);
        const cleanedUrl = cleanInstagramUrl(instagramUrl);
        console.log(cleanedUrl);
        const response = await axios.get<InstagramPost>(`https://graph.instagram.com/oembed?url=${cleanedUrl}`);
        setPostData(response.data);
        setError(null);
      } catch (err) {
        setError('Error fetching Instagram data');
        setPostData(null);
      }
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      fetchInstagramData(url);
    };
    
    return (
        <div className="container mx-auto p-4 pt-40">
            <h1 className="text-3xl font-bold mb-4">Instagram Post Fetcher</h1>
            <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter Instagram post URL"
                className="border p-2 rounded w-full mb-2"
            />
            <button type="submit" className="bg-black text-white rounded px-4 py-2">
                Fetch Post
            </button>
            </form>
  
            {error && <p className="text-red-500">{error}</p>}
            {postData && (
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-2">{postData.title || 'Instagram Post'}</h2>
                <img src={postData.thumbnail_url} alt={postData.title || 'Instagram Post'} className="rounded-lg mb-2" />
                <p>{postData.author_name}</p>
                <a href={postData.author_url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                View on Instagram
                </a>
            </div>
            )}
        </div>
    )
}

export default Curate