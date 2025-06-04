// services/api.ts
import { baseUrl } from '@/services/api';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const response = await axios.get(baseUrl + `Api/v1/restaurant/governorate/${id}`);
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Error proxying Ngrok request:', error.message);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}