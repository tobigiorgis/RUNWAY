import React, { FC } from 'react'

type ProductProps = {
    image: string;
    name: string;
    description: string;
    link: string;
  };

export const Product: FC<ProductProps> = ({ image, name, description, link }) => {
  return (
    <div>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">
            Take a look
        </a>
  </div>
  )
}
