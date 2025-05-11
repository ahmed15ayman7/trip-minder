import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const reviews = [
    {
        id: 1,
        name: 'John Smith',
        role: 'Traveler',
        review: 'I had an amazing experience with this company. The service was top-notch, and the staff was incredibly friendly. I highly recommend them!',
        title: 'Excellent Service!',
        image: '/images/user1.jpg',
    },
    {
        id: 2,
        name: 'Jane Doe',
        role: 'Explorer',
        review: 'The tours were fantastic and the guides were very knowledgeable. A must-try experience!',
        title: 'Fantastic Tours!',
        image: '/images/user1.jpg',
    },
    // يمكنك إضافة المزيد من المراجعات هنا
];

const ReviewSlider: React.FC = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2, // عرض شريحتين في كل مرة
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1, // عرض شريحة واحدة على الشاشات الصغيرة
                },
            },
        ],
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Customer Reviews</h2>
            <Slider {...settings}>
                {reviews.map((review) => (
                    <div key={review.id} style={styles.slide}>
                        <div style={styles.imageContainer}>
                            <img src={review.image} alt={review.name} style={styles.image} />
                            <div style={styles.quoteIcon}>“</div>
                        </div>
                        <h3 style={styles.reviewTitle}>{review.title}</h3>
                        <p style={styles.reviewText}>{review.review}</p>
                        <p style={styles.reviewerName}>{review.name}</p>
                        <p style={styles.reviewerRole}>{review.role}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center' as 'center',
        padding: '40px 20px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold' as 'bold',
        color: '#000080',
        marginBottom: '20px',
    },
    slide: {
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        backgroundColor: '#fff',
        margin: '10px',
    },
    imageContainer: {
        position: 'relative' as 'relative',
        display: 'inline-block',
        marginBottom: '20px',
    },
    image: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover' as 'cover',
    },
    quoteIcon: {
        position: 'absolute' as 'absolute',
        top: '0',
        left: '0',
        backgroundColor: '#FF7F50',
        color: 'white',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
    },
    reviewTitle: {
        color: '#FF7F50',
        fontSize: '18px',
        fontWeight: 'bold' as 'bold',
        marginBottom: '10px',
    },
    reviewText: {
        fontSize: '16px',
        color: '#000080',
        marginBottom: '10px',
    },
    reviewerName: {
        fontSize: '14px',
        fontWeight: 'bold' as 'bold',
        color: '#000080',
    },
    reviewerRole: {
        fontSize: '14px',
        color: '#555',
    },
};

export default ReviewSlider;