export interface Post {
    id: string;
    imageUrl: string | undefined;
    title: string;
    description: string;
    productName: string;
    productLink: string;
    likes: number;
    username?: string;
    authorId?: string;
  }
  
export interface User {
    username: string;
    profilePicture?: string;
    bio?: string;
    posts?: Post[];
    followers?: User[];
    following?: User[];
  }