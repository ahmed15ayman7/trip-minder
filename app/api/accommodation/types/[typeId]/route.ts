// services/api.ts
import { baseUrl } from '@/services/api';
import axios from 'axios';
import { NextResponse } from 'next/server';



export async function GET(request: Request, { params }: { params: Promise<{ typeId: string }> }) {
    const { typeId } = await params;
    try {
        const response = await axios.get(baseUrl + `Api/v1/accommodation/type/${typeId}`);
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Error proxying Ngrok request:', error.message);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
// Types
// AccomodationTypes

// Id	Type
// 1	Villa
// 2	Hotel
// 3	Chalet
// 4	Apartment
// 5	Hostel
