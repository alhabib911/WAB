import React from 'react';
import Hero from '../components/Hero';
import DonationTracker from '../components/DonationTracker';
import BloodDonation from '../components/BloodDonation';
import VideoGallery from '../components/VideoGallery';
import PhotoGallery from '../components/PhotoGallery';
import Volunteer from '../components/Volunteer';
import Jobs from '../components/Jobs';

interface HomeProps {
  setRoute: (route: string) => void;
}

const Home: React.FC<HomeProps> = ({ setRoute }) => {
  return (
    <>
      <Hero setRoute={setRoute} />
      
      <DonationTracker setRoute={setRoute} />
      
      <BloodDonation />

      <VideoGallery />
      <PhotoGallery />
      
      {/* Replaced inline section with robust Volunteer component */}
      <Volunteer />

      <Jobs setRoute={setRoute} />
    </>
  );
};

export default Home;
