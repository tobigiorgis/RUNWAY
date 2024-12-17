'use client'
import React from 'react'
import { Button } from '../ui/button';
import { signInWithGoogle } from '@/app/actions';

export const GoogleSignInButton = () => {
  return (
    <Button
        type="button"
        variant="outline"
        className="md:w-1/4 bg-light border-light mt-2"
        onClick={() => {
        signInWithGoogle();
        }}
    >
        Continue with Google
    </Button>
  )
}
