// app/page.tsx
"use client"
import React from 'react';
import SearchBar from '../components/SearchBar';
import Carousel from '../components/Carousel';
import AccommodationList from '../components/AccommodationList';
import PromoSection from '../components/PromoSection';
import PopularActivities from '../components/PopularActivities';
import AccommodationListCarousel from '../components/AccommodationListCarousel';
import CustomerReviews from '../components/CustomerReviews';
import PromoSection2 from '../components/PromoSection2';
import ArticleSection from '../components/ArticleSection';
import RestaurantList from '@/components/RestaurantList';
import EntertainmentCarousel from '@/app/components/EntertainmentCarousel';
import TourismAreaCarousel from '@/app/components/TourismAreaCarousel';

const HomePage: React.FC = () => {
  return (
    <div>
      <div style={styles.hero}>
        <h1 style={styles.title}>Your world of joy</h1>
        <p style={styles.subtitle}>From local escapes to far-flung adventures, find what makes you happy anytime, anywhere.</p>
        {/* <SearchBar /> */}
      </div>
      <section style={styles.features}>
        <h2>Why choose <em>Trip Minder</em></h2>
        <div style={styles.featureList}>
          <Feature
            icon="🎟️"
            title="Ultimate flexibility"
            description="You're in control, with free cancellation and payment options to satisfy any plan or budget."
          />
          <Feature
            icon="🎈"
            title="Memorable experiences"
            description="Browse and book tours and activities so incredible, you'll want to tell your friends."
          />
          <Feature
            icon="💎"
            title="Quality at our core"
            description="High-quality standards. Millions of reviews. A tourz company."
          />
          <Feature
            icon="🏆"
            title="Award-winning support"
            description="New price? New plan? No problem. We're here to help, 24/7."
          />
        </div>
      </section>
      <Carousel />
      <EntertainmentCarousel />
      <TourismAreaCarousel />
      <AccommodationList />
      <PromoSection />
      <RestaurantList />
      <PopularActivities />
      <AccommodationListCarousel />
      <CustomerReviews />
      <PromoSection2 />
      <ArticleSection />
    </div>
  );
};

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div style={styles.feature}>
    <div style={styles.icon}>{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const styles = {
  hero: {
    backgroundImage: 'url(/images/hero.png)',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
    padding: '0px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    height: '70vh',
  } as React.CSSProperties,
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#000',
  } as React.CSSProperties,
  subtitle: {
    fontSize: '18px',
    marginBottom: '20px',
    color: '#000',
    textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  } as React.CSSProperties,
  features: {
    padding: '50px 20px',
    textAlign: 'center',
  } as React.CSSProperties,
  featureList: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  } as React.CSSProperties,
  feature: {
    maxWidth: '200px',
    margin: '20px',
    textAlign: 'center',
  } as React.CSSProperties,
  icon: {
    fontSize: '40px',
    marginBottom: '10px',
  } as React.CSSProperties,
};

export default HomePage;