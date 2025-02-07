import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const {text } = await request.json();

 
    try {
        const username = process.env.NEXT_PUBLIC_USERNAME;
        const password = process.env.NEXT_PUBLIC_PASSWORD;
        const credentials = btoa(`${username}:${password}`); // Base64 encode
    
        const response = await fetch(process.env.NEXT_PUBLIC_AGENT_URL+"/chat", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}` // Add Basic Auth header
            },
            body: JSON.stringify({ message:text }),
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(errorData, { status: response.status });
        }
    
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
    
}
