import { baseUrl } from '@/services/api';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const zoneId = searchParams.get('zoneId');
    const governorateId = searchParams.get('governorateId');
    const classId = searchParams.get('classId');
    const typeId = searchParams.get('typeId');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    try {
        let url = baseUrl + 'Api/v1/tourism-area/list';

        // إضافة الفلاتر إلى URL
        if (zoneId) url += `?zoneId=${zoneId}`;
        if (governorateId) url += `${url.includes('?') ? '&' : '?'}governorateId=${governorateId}`;
        if (classId) url += `${url.includes('?') ? '&' : '?'}classId=${classId}`;
        if (typeId) url += `${url.includes('?') ? '&' : '?'}typeId=${typeId}`;
        if (minPrice) url += `${url.includes('?') ? '&' : '?'}minPrice=${minPrice}`;
        if (maxPrice) url += `${url.includes('?') ? '&' : '?'}maxPrice=${maxPrice}`;

        const response = await axios.get(url);
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Error fetching tourism area list:', error.message);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
} 