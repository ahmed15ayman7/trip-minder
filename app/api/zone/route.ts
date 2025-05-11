import { baseUrl } from '@/services/api';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
    try {
        const response = await fetch(baseUrl + 'Api/v1/zone/list');
        return NextResponse.json(response.json());
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

