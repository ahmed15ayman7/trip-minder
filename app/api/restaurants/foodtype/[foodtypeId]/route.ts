// services/api.ts
import { baseUrl } from '@/services/api';
import axios from 'axios';
import { NextResponse } from 'next/server';



export async function GET(request: Request, { params }: { params: Promise<{ foodtypeId: string }> }) {
    const { foodtypeId } = await params;
    try {
        const response = await axios.get(baseUrl + `Api/v1/restaurant/foodtype/${foodtypeId}`);
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Error proxying Ngrok request:', error.message);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
// FoodCategories

// Id	Type
// 1	Seafood
// 2	Grilled Food & Steaks
// 3	European cuisine
// 4	Asian cuisine
// 5	Japanese cuisine (Sushi)
// 6	Fast Food
// 7	Nubian cuisine
// 8	Snacks
// 9	Levantine cuisine (Lebanese)
// 10	Oriental & Egyptian Cuisine
// 11	Traditional & Home-Style Food