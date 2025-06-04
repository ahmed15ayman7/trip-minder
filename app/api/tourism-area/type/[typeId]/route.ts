import { baseUrl } from '@/services/api';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ typeId: string }> }) {
    const { typeId } = await params;
    try {
        const response = await axios.get(baseUrl + `Api/v1/tourismarea/type/${getTypeId(typeId)}`);
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Error fetching type tourism areas:', error.message);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
function getTypeId(type: string) {
    switch (type) {
        case 'Archaeological landmark / area':
            return '1';
        case 'Museum':
            return '2';
        case 'Historic Palace / Castle':
            return '3';
        case 'Cultural venue':
            return '4';
        case 'Historic Street / Area':
            return '5';
        case 'Ancient / Historic Mosque & Church':
            return '6';
        case 'Theater and Arts':
            return '7';
        case 'Shopping Center / Mall / Historical Market':
            return '8';
        case 'Garden / Park':
            return '9';
        case 'Zoo':
            return '10';
        case 'Entertainment City / Tourist Attraction':
            return '11';
    }
}
