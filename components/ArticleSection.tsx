import React from 'react';
import SectionHeader from '@/app/components/SectionHeader';
import { useRouter } from 'next/navigation';
const articles = [
    {
        id: 1,
        date: 'April 06 2023',
        author: 'Ali Tufan',
        title: 'Kenya vs Tanzania Safari: The Better African Safari Experience',
        image: '/images/article1.png',
    },
    {
        id: 2,
        date: 'April 07 2023',
        author: 'Emily Johnson',
        title: 'Exploring the Serengeti: A Wildlife Adventure',
        image: '/images/article2.png',
    },
    {
        id: 3,
        date: 'April 08 2023',
        author: 'Maxwell Rhodes',
        title: 'Into the Wild: An Unforgettable Safari Journey',
        image: '/images/article3.png',
    },
];

const ArticleSection = () => {
    const router = useRouter();
    return (
        <div style={styles.container}>
            <SectionHeader
                title="مقالات سياحية"
                onSeeAll={() => router.push('/tourism-area')}
            />
            <div style={styles.articlesContainer}>
                {articles.map((article) => (
                    <div key={article.id} style={styles.card}>
                        <div style={styles.imageContainer}>
                            <img src={article.image} alt={article.title} style={styles.image} />
                            <div style={styles.tag}>Trips</div>
                        </div>
                        <div style={styles.info}>
                            <p style={styles.date}>{article.date} &nbsp; By {article.author}</p>
                            <h3 style={styles.articleTitle}>{article.title}</h3>
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
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center' as 'center',
        marginBottom: '20px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#000080',
    },
    seeAll: {
        color: '#000080',
        textDecoration: 'none',
    },
    articlesContainer: {
        display: 'flex',
        gap: '20px',
    },
    card: {
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        flex: '1',
    },
    imageContainer: {
        position: 'relative' as 'relative',
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px 8px 0 0',
    },
    tag: {
        position: 'absolute' as 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: 'white',
        color: '#000080',
        padding: '5px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
    },
    info: {
        padding: '10px',
    },
    date: {
        fontSize: '12px',
        color: '#555',
        marginBottom: '5px',
    },
    articleTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#000080',
    },
};

export default ArticleSection;