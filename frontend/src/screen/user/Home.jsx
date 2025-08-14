// src/App.js
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import searchloc from "../../assets/searchloc.png";
import Navbar from '../../components/Navbar';
import Hero from '../../components/UI/Hero';
import PopularSports from '../../components/UI/PopularSports';
import TopVenues from '../../components/UI/TopVenues';
import Footer from '../../components/Layout/Footer';

function Home() {
  return (
    <div className='scroll-container'>

<Navbar/>

<Hero/>

<PopularSports/>

<TopVenues/>

<Footer/>

    
        </div>

  );
}

export default Home;