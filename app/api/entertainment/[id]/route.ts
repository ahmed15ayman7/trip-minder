import { baseUrl } from '@/services/api';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const response = await axios.get(baseUrl + `Api/v1/entertainment/${id}`);
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Error fetching entertainment details:', error.message);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
} 