import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

const Navbar = () =>
{
    return (
        <header className="flex bg-gray-50 justify-between items-center p-4 gap-4 h-16">
            <>
               <h1 className="text-2xl font-bold">MedConnect</h1>
            </>
            <SignedOut>
                <SignInButton />
                <SignUpButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </header>
    )
}

export default Navbar