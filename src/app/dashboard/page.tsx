'use client'
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import {useState, useEffect,useCallback } from 'react'; 
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header';
import { InlineIcon  } from '@iconify/react';
import { Checkout, CheckoutButton, CheckoutStatus,LifecycleStatus } from '@coinbase/onchainkit/checkout';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import  {useAccount}  from 'wagmi';
import { db } from '../../lib/firebase';
import { subscribe } from 'diagnostics_channel';

const iconsize='64px'
const Home: NextPage = () => {

  const {address,isConnected,isConnecting} =  useAccount()
  const [gotProfile,setGotProfile]  = useState(false)
  const [subscribed,setSubscribed]  = useState(false)
  
 useEffect(()=>{
  async function getProfile() {
    
    const profileRef = doc(db, "profile", address);
    const profileSnap = await getDoc(profileRef);
   
    if (profileSnap.exists()) {
        console.log( profileSnap.data());  // Return profile data
        setSubscribed(profileSnap.data().subscribed)
        setGotProfile(true)
    
    } else {
        console.log( null);  // Profile not found
        setSubscribed(false)
        setGotProfile(true)
    }

}
if( address)
getProfile()
 },[address])

 const saveProfile = async()=>{
  const profileRef = doc(db, "profile", address.toString()); // Set doc ID as wallet address

  await setDoc(profileRef, {subscribed:true}, { merge: true }); 

 }
  const statusHandler = (status: LifecycleStatus) => { 
    const { statusName, statusData } = status; 
    switch (statusName) { 
      case 'success': 
        // handle success 
        saveProfile()
      case 'pending': 
        // handle payment pending
      case 'error': 
        // handle error
      default: 
        // handle 'init' state
    } 
  } 

  // Handle loading state
if (gotProfile === false) {
  return <div className="flex items-center justify-center h-screen">
  <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl md:text-6xl">
    Loading....
  </h1>
</div>
}

if(gotProfile === true && subscribed === false)
  {
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
      <main className="" >
  
     <div className="flex flex-col items-center justify-center h-screen">
              <img src="/images/workmate.png" className='h-[300px] rounded-full border-8 border-gray-400'/>

    <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl md:text-4xl">
    <Checkout productId='60c12543-cf4b-4b88-91be-a203468dfd2f' onStatus={statusHandler}  > 
  <CheckoutButton  text='Subscribe to WorkMate .5 USDC' className='bg-blue-500'/> 
  <CheckoutStatus />
</Checkout>
      
    </h1>
  </div>
  <Footer />

  </main>
  </div>)
  }  

  if(gotProfile === true && subscribed === true)
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
           
        <a href="/search"><div className='cursor-pointer flex flex-col items-center justify-center text-black hover:text-gray-500'><InlineIcon  style={{ fontSize: iconsize }} icon="ri:file-search-line" />
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold lg:tracking-tight xl:tracking-tighter" >Search</h1></div></a>
        <a href="/jobs"><div className='cursor-pointer flex flex-col items-center justify-center text-black hover:text-gray-500'><InlineIcon  style={{ fontSize: iconsize }} icon="eos-icons:project" />
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold lg:tracking-tight xl:tracking-tighter" >My Jobs</h1></div></a>
        <a href="/jobs"><div className='cursor-pointer flex flex-col items-center justify-center text-black hover:text-gray-500'><InlineIcon  style={{ fontSize: iconsize }} icon="ix:support" />
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold lg:tracking-tight xl:tracking-tighter" >Support</h1></div></a>
        <a href="/profile"><div className='cursor-pointer flex flex-col items-center justify-center text-black hover:text-gray-500'><InlineIcon  style={{ fontSize: iconsize }} icon="iconamoon:profile" />
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
