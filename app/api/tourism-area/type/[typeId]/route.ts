import { baseUrl } from '@/services/api';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ typeId: string }> }) {
    const { typeId } = await params;
    try {
        const response = await axios.get(baseUrl + `Api/v1/tourismarea/type/${typeId}`);
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Error fetching type tourism areas:', error.message);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
} 