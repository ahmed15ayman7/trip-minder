import React, { useEffect, useState } from 'react';
import { fetchAccommodations } from '../services/api';
import { useRouter } from 'next/navigation';
interface Accommodation {
    id: number;
    name: string;
    accomodationType: string;
    averagePricePerAdult: number;
    description: string;
    address: string;
    imageUrl: string | null;
}
const AccommodationList = () => {
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const router = useRouter();
    const dummyData = [
        {
            id: 1,
            name: "Concorde El Salam Cairo 2 & Casino",
            accomodationType: "Hotel",
            description: "This luxurious suite offers a lot of space with separate living room and satellite TV.",
            averagePricePerAdult: 15751,
            imageUrl: '/images/default.png',
            address: "123 Static St.",
        },
        {
            id: 2,
            name: "Grand Nile Tower",
            accomodationType: "Hotel",
            description: "Experience the best view of the Nile with luxurious amenities.",
            averagePricePerAdult: 12000,
            imageUrl: '/images/default.png',
            address: "123 Static St.",
        },
    ];

    useEffect(() => {
        const getData = async () => {
            const result = await fetchAccommodations();
            if (result.succeeded && result.data.length > 0) {
                setAccommodations(result.data);
            } else {
                setAccommodations(dummyData);
            }
        };
        getData();
    }, []);

    return (
        <div style={styles2.container}>
            <h1 style={styles2.title}>Explore all things to do in Alexandria</h1>
            <div style={styles2.filterContainer}>
                <FilterComponent />
                <div style={styles2.listContainer}>
                    <p>{accommodations.length} results</p>
                    {accommodations.slice(0, 12).map((accommodation: Accommodation) => (
                        <div key={accommodation.id} style={styles.card}>
                            <div style={styles.imageContainer}>
                                <img src={accommodation.imageUrl || '/images/default.png'} alt={accommodation.name} style={styles.image} />
                                <div style={styles.discountBadge}>20% OFF</div>
                            </div>
                            <div style={styles.info}>
                                <p style={styles.location}>{accommodation.address}</p>
                                <h3 style={styles.name}>{accommodation.name}</h3>
                                <p style={styles.rating}>4.8 (269)</p>
                                <p style={styles.description}>{accommodation.description}</p>
                                <p style={styles.guarantee}>Best Price Guarantee &nbsp; Free Cancellation</p>
                            </div>
                            <div style={styles.priceContainer}>
                                <p style={styles.duration}>2 Days 1 Nights</p>
                                <p style={styles.oldPrice}>$1200</p>
                                <p style={styles.newPrice}>From ${accommodation.averagePricePerAdult}</p>
                                <button style={styles.detailsButton} onClick={() => router.push(`/accommodation/${accommodation.id}`)}>View Details</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles2 = {
    container: {
        padding: '20px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    filterContainer: {
        display: 'flex',
    },
    filter: {
        width: '250px',
        marginRight: '20px',
    },
    dateButton: {
        backgroundColor: '#FF7F50',
        color: 'white',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '20px',
    },
    listContainer: {
        flex: '1',
    },
    card: {
        display: 'flex',
        marginBottom: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    image: {
        width: '150px',
        height: '150px',
        objectFit: 'cover' as 'cover',
    },
    info: {
        padding: '10px',
    },
    detailsButton: {
        backgroundColor: '#000080',
        color: 'white',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

const FilterComponent = () => {
    return (
        <div style={styles.filter}>
            <div style={styles.header}>
                <h3 style={styles.headerTitle}>When are you traveling?</h3>
                <button style={styles.dateButton}>February 05 ~ March 14</button>
            </div>
            <h3 style={styles.sectionTitle}>Tour Type</h3>
            <ul style={styles.list}>
                <li><input type="checkbox" /> Nature Tours</li>
                <li><input type="checkbox" /> Adventure Tours</li>
                <li><input type="checkbox" /> Cultural Tours</li>
                <li><input type="checkbox" /> Food Tours</li>
                <li><input type="checkbox" /> City Tours</li>
                <li><input type="checkbox" /> Cruises Tours</li>
            </ul>
            <a href="#" style={styles.seeMore}>See More</a>
            <hr style={styles.divider} />
            <h3 style={styles.sectionTitle}>Filter Price</h3>
            <hr style={styles.divider} />
            <h3 style={styles.sectionTitle}>Duration</h3>
            <hr style={styles.divider} />
            <h3 style={styles.sectionTitle}>Language</h3>
            <hr style={styles.divider} />
            <h3 style={styles.sectionTitle}>Rating</h3>
            <hr style={styles.divider} />
            <h3 style={styles.sectionTitle}>Specials</h3>
        </div>
    );
};

const styles = {
    filter: {
        width: '250px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#fff',
        padding: '20px',
    },
    card: {
        display: 'flex',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '20px',
    },
    imageContainer: {
        position: 'relative' as 'relative',
        width: '200px',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover' as 'cover',
    },
    discountBadge: {
        position: 'absolute' as 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: '#FF7F50',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '5px',
        fontSize: '12px',
    },
    info: {
        padding: '20px',
        flex: '1',
    },
    location: {
        fontSize: '14px',
        color: '#555',
    },
    name: {
        fontSize: '18px',
        fontWeight: 'bold' as 'bold',
        color: '#000080',
        margin: '10px 0',
    },
    rating: {
        fontSize: '14px',
        color: '#555',
    },
    description: {
        fontSize: '14px',
        color: '#555',
        margin: '10px 0',
    },
    guarantee: {
        fontSize: '12px',
        color: '#FF7F50',
    },
    priceContainer: {
        padding: '20px',
        textAlign: 'right' as 'right',
    },
    duration: {
        fontSize: '14px',
        color: '#000080',
    },
    oldPrice: {
        fontSize: '14px',
        color: '#aaa',
        textDecoration: 'line-through',
    },
    newPrice: {
        fontSize: '18px',
        fontWeight: 'bold' as 'bold',
        color: '#000080',
    },
    detailsButton: {
        backgroundColor: 'white',
        color: '#FF7F50',
        border: '1px solid #FF7F50',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    header: {
        backgroundColor: '#FF7F50',
        padding: '10px',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    headerTitle: {
        color: 'white',
        margin: '0',
    },
    dateButton: {
        backgroundColor: 'white',
        color: '#FF7F50',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer' as 'pointer',
        width: '100%',
        marginTop: '10px',
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: 'bold' as 'bold',
        color: '#000080',
        marginBottom: '10px',
    },
    list: {
        listStyleType: 'none',
        padding: '0',
        marginBottom: '10px',
    },
    seeMore: {
        color: '#000080',
        textDecoration: 'none',
        display: 'block',
        marginBottom: '20px',
    },
    divider: {
        border: 'none',
        borderTop: '1px solid #ddd',
        margin: '10px 0',
    },
};

export default AccommodationList;