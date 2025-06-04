import { baseUrl } from '@/services/api';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ typeId: string }> }) {
    const { typeId } = await params;
    try {
        const response = await axios.get(baseUrl + `Api/v1/entertainment/type/${getTypeId(typeId)}`);
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Error fetching type entertainments:', error.message);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
function getTypeId(type: string) {
    switch (type) {
        case 'Cafe':
            return '1';
        case 'Cinema':
            return '2';
        case 'Park':
            return '3';
        case 'Shopping':
            return '4';
        case 'Amusement':
            return '5';
        case 'Club':
            return '6';
        case 'Landmark':
            return '7';
        case 'Cultural':
            return '8';
        case 'Café & Garden':
            return '9';
        default:
            return '0';
    }
}