import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import {useState, useEffect,useCallback } from 'react'; 
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header';
import { InlineIcon  } from '@iconify/react';
const iconsize='64px'
const Home: NextPage = () => {
 
  return (
    <div className={styles.container}>
      <Head>
        <title>Work Mate</title>
        <meta
          content="Work Mate"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
        <Header />
        <main className="mt-20 grid lg:grid-cols-3  gap-y-12 place-items-center pt-16 pb-16 md:pt-12 md:pb-24" >
        <a href="/memebot"><div className='cursor-pointer flex flex-col items-center justify-center text-black hover:text-gray-500'><InlineIcon  style={{ fontSize: iconsize }} icon="ri:file-search-line" />
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold lg:tracking-tight xl:tracking-tighter" >Search</h1></div></a>
        <a href="/mycoins"><div className='cursor-pointer flex flex-col items-center justify-center text-black hover:text-gray-500'><InlineIcon  style={{ fontSize: iconsize }} icon="eos-icons:project" />
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold lg:tracking-tight xl:tracking-tighter" >My Jobs</h1></div></a>
        <a href="/bridge"><div className='cursor-pointer flex flex-col items-center justify-center text-black hover:text-gray-500'><InlineIcon  style={{ fontSize: iconsize }} icon="ix:support" />
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold lg:tracking-tight xl:tracking-tighter" >Support</h1></div></a>
        <a href="/verify"><div className='cursor-pointer flex flex-col items-center justify-center text-black hover:text-gray-500'><InlineIcon  style={{ fontSize: iconsize }} icon="iconamoon:profile" />
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold lg:tracking-tight xl:tracking-tighter" >Profile</h1></div></a>
        <img src="/images/workmate.png" className='h-[300px] rounded-full border-8 border-gray-400'/>
        <a href="/staking"><div className='cursor-pointer flex flex-col items-center justify-center text-black hover:text-gray-500'><InlineIcon  style={{ fontSize: iconsize }} icon="uil:signout" />
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold lg:tracking-tight xl:tracking-tighter" >Sign Out</h1></div></a>
       </main> 
       <Footer />

</div>
      );
};

export default Home;
