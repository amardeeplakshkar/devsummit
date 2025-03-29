import {prisma} from  '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(){
    const users = await prisma.user.findMany({
        clerkId : userId
    })
    return NextResponse.json(users)
}