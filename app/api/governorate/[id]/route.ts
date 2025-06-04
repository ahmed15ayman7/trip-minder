import { baseUrl } from '@/services/api';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const response = await fetch(baseUrl + `Api/v1/governorate/${id}`);
        return NextResponse.json(response.json());
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

