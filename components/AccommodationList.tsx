// components/AccommodationList.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SectionHeader from '../app/components/SectionHeader';

export interface Accommodation {
    id: number;
    name: string;
    accomodationType: string;
    classType: string;
    zone: string;
    zoneId: number;
    governorate: string;
    governorateId: number;
    rating: number;
    placeType: string;
    averagePricePerAdult: number;
    hasKidsArea: boolean;
    description: string;
    address: string;
    mapLink: string | null;
    contactLink: string;
    imageSource: string | null;
    numOfBeds: number;
    bedStatus: string;
    numOfPersons: number;
    score: number;
}

const defaultImage = '/images/default.png';
const staticData: Accommodation[] = [
    {
        id: 1,
        name: "فندق النيل الفاخر",
        accomodationType: "فندق",
        averagePricePerAdult: 350,
        classType: "A",
        zone: "وسط البلد",
        zoneId: 1,
        governorate: "القاهرة",
        governorateId: 1,
        rating: 4.8,
        placeType: "فندق",
        description: "إقامة فاخرة وإطلالة رائعة على النيل.",
        address: "كورنيش النيل، القاهرة",
        mapLink: null,
        contactLink: '',
        hasKidsArea: true,
        numOfBeds: 2,
        bedStatus: "متاح",
        numOfPersons: 2,
        score: 200,
        imageSource: defaultImage,
    },
    {
        id: 2,
        name: "شاليه البحر الأحمر",
        accomodationType: "شاليه",
        averagePricePerAdult: 250,
        classType: "B",
        zone: "الغردقة",
        zoneId: 2,
        governorate: "البحر الأحمر",
        governorateId: 2,
        rating: 4.5,
        placeType: "شاليه",
        description: "شاليه بإطلالة مباشرة على البحر.",
        address: "الغردقة، البحر الأحمر",
        mapLink: null,
        contactLink: '',
        hasKidsArea: false,
        numOfBeds: 3,
        bedStatus: "متاح",
        numOfPersons: 4,
        score: 120,
        imageSource: defaultImage,
    },
    {
        id: 3,
        name: "فندق النيل الفاخر",
        accomodationType: "فندق",
        averagePricePerAdult: 350,
        classType: "A",
        zone: "القاهرة",
        zoneId: 1,
        governorate: "القاهرة",
        governorateId: 1,
        rating: 4.8,
        placeType: "فندق",
        description: "إقامة فاخرة وإطلالة رائعة على النيل.",

        address: "كورنيش النيل، القاهرة",
        mapLink: null,
        contactLink: '',
        hasKidsArea: true,
        numOfBeds: 2,
        bedStatus: "متاح",
        numOfPersons: 2,
        score: 200,
        imageSource: defaultImage,
    },
    {
        id: 4,
        name: "شاليه البحر الأحمر",
        accomodationType: "شاليه",
        averagePricePerAdult: 250,
        classType: "B",
        zone: "الغردقة",
        zoneId: 2,
        governorate: "البحر الأحمر",
        governorateId: 2,
        rating: 4.5,
        placeType: "شاليه",
        description: "شاليه بإطلالة مباشرة على البحر.",

        address: "الغردقة، البحر الأحمر",
        mapLink: null,
        contactLink: '',
        hasKidsArea: false,
        numOfBeds: 3,
        bedStatus: "متاح",
        numOfPersons: 4,
        score: 120,
        imageSource: defaultImage,
    },
    // ... أضف حتى 5 عناصر افتراضية
];

const AccommodationList: React.FC = () => {
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            try {
                // استبدل هذا باستدعاء API الحقيقي إذا توفر
                // const result = await fetchAccommodations();
                // if (result.data && result.data.length > 0) {
                //     setAccommodations(result.data);
                // } else {
                //     setAccommodations(staticData);
                // }
                setAccommodations(staticData); // بيانات افتراضية دائماً هنا
            } catch (error) {
                setAccommodations(staticData);
            }
        };
        getData();
    }, []);
    const handleCardClick = (id: number) => {
        router.push(`/accommodation/${id}`);
    };

    return (
        <div style={styles.container}>
            <SectionHeader
                title="أماكن الإقامة المميزة"
                onSeeAll={() => router.push('/accommodation')}
            />
            <div style={styles.grid}>
                {accommodations.slice(0, 5).map((accommodation) => (
                    <div key={accommodation.id} style={styles.card} onClick={() => handleCardClick(accommodation.id)}>
                        <img
                            src={accommodation.imageSource || defaultImage}
                            alt={accommodation.name}
                            style={styles.image}
                        />
                        <div style={styles.info}>
                            <h3 style={styles.name}>{accommodation.name}</h3>
                            <p style={styles.description}>{accommodation.description}</p>
                            <p style={styles.price}>من {accommodation.averagePricePerAdult} جنيه</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '40px 20px',
        position: 'relative' as 'relative',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
    },
    card: {
        border: '1px solid #eee',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        background: '#fff',
        transition: 'transform 0.2s',
    },
    image: {
        width: '100%',
        height: '150px',
        objectFit: 'cover' as 'cover',
    },
    info: {
        padding: '10px',
    },
    name: {
        fontSize: '16px',
        fontWeight: 'bold' as 'bold',
        color: '#ff6600',
    },
    description: {
        fontSize: '14px',
        color: '#555',
    },
    price: {
        fontSize: '14px',
        textAlign: 'right' as 'right',
        color: '#ff6600',
        fontWeight: 'bold' as 'bold',
    },
};

export default AccommodationList;