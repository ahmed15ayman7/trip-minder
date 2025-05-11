
import axios from 'axios';
import { NextResponse } from 'next/server';
import { baseUrl } from '@/services/api';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const response = await axios.get(`${baseUrl}Api/v1/restaurant/${id}`);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
