import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { project_id, amount, period, milestone_percentage,description } = await request.json();

 
    try {
       
       return NextResponse.json({status:200});

        const response = await fetch(process.env.NEXT_PUBLIC_FREELANCER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "freelancer-oauth-v1": process.env.NEXT_PUBLIC_FREELANCER_TOKEN, // Store token securely in .env

            },
            body: JSON.stringify({data:{
                project_id,
                amount,
                period,
                milestone_percentage,
                description
              }}),
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
