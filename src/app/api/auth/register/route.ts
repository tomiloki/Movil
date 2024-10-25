import { NextRequest, NextResponse } from 'next/server';
import db from '@/libs/db'

export async function POST(request: NextRequest) {
    const data = await request.json();
    
    console.log(data);
    const newUser = await db.user.create({data})

    return NextResponse.json(newUser)
}
