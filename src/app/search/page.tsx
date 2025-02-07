'use client'
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import {useState, useEffect,useCallback } from 'react'; 
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header';
import { InlineIcon  } from '@iconify/react';
import { useFormik } from 'formik';
import * as Yup from 'yup' 
import { PencilSquareIcon,CloudArrowUpIcon} from '@heroicons/react/24/solid'; // For outline version
import Notification from '../components/Notification/Notification';
import { db } from "../../lib/firebase";
import { doc, getDoc,setDoc } from "firebase/firestore";
import  {useAccount}  from 'wagmi';

const iconsize='64px'
const Search: NextPage = () => {
  const {address,isConnected,isConnecting} =  useAccount()
  console.log(address)
 
  useEffect(()=>{
   async function getSearchInfo() {
     
     const searchRef = doc(db, "search", address);
     const searchSnap = await getDoc(searchRef);
 
     if (searchSnap.exists()) {
         console.log( searchSnap.data());  // Return search data
         formik.setValues({
           terms:searchSnap.data().terms,
           interval: searchSnap.data().interval,
           
         });
     } else {
         console.log( null);  // Search data not found
     }
 
 }
 if( address)
 getSearchInfo()
  },[address])
  
     // NOTIFICATIONS functions
const [notificationTitle, setNotificationTitle] = useState("");

const [notificationDescription, setNotificationDescription] = useState("");

const [dialogType, setDialogType] = useState(1);
const [show, setShow] = useState(false);
const close = async () => {
setShow(false);
};

    const formik = useFormik({
        initialValues: {
          
          terms:"",
          interval:10
        },
        validationSchema: Yup.object({
         
            terms: Yup.string()
            .min(2, "must be at least 2 characters")
            .required("required"),   
            interval:  Yup.number()
            .required("Interval selection is required")
            .min(10, "Interval must be at least 10"),
            

         
        }),
        onSubmit: async(values) => {
         
          try {
           
            const searchRef = doc(db, "search", address.toString()); // Set doc ID as wallet address

          await setDoc(searchRef, {interval:values.interval,terms:values.terms}, { merge: false }); 
            setDialogType(1) //Success
            setNotificationTitle("Configure Search")
            setNotificationDescription(`Search terms successfully updated`)
            setShow(true)
           
          
          } catch (error) {
            console.log("Network error:", error);
            
            setDialogType(2) //Error
            setNotificationTitle("Configure Search")
            setNotificationDescription("An error occurred. Please try again.")
            setShow(true)
          }
      
        },
      });
          
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
        <main  >

        <div className="bg-white sm:rounded-lg mt-24  m-24">
                  <div className="px-6 py-8 sm:px-10">
                   
                  <form onSubmit={formik.handleSubmit} >
                 
                  <div className="space-y-12">
       
       <div className="border-b border-gray-900/10 pb-12">
       <div className="flex items-center mb-10">

       <PencilSquareIcon className="w-10 h-10 text-gray-900 mr-3" />

       <h1 className="font-bold text-4xl text-gray-900">Search Parameters</h1>
 </div>
         <h2 className="text-base font-semibold leading-7 text-gray-900">Search Configuartion</h2>
         <p className="mt-1 text-sm leading-6 text-gray-600">All information is required.</p>

         <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">

         <div className="sm:col-span-2 sm:col-start-1">
             <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
               Search Interval (Mins) {formik.touched.interval && formik.errors.interval ? (
          <span className="text-red-500 text-sm">{formik.errors.interval}</span>
        ) : null}
             </label>
             <div className="mt-2">
             <input
  type="number"
  name="interval"
  id="interval"
  onChange={formik.handleChange}
       onBlur={formik.handleBlur}
       value={formik.values.interval}
  className="p-2 bg-[#2dd9ff] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
/>
             </div>
           </div>

         
          

           <div className="sm:col-span-6">
             <label htmlFor="terms" className="block text-sm font-medium leading-6 text-gray-900">
               Search  {formik.touched.terms && formik.errors.terms ? (
          <span className="text-red-500 text-sm">{formik.errors.terms}</span>
        ) : null}
             </label>
             <div className="mt-2">
               <textarea
                 rows={10}
                 name="terms"
                 id="terms"
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.terms}
           
                 className="p-2 bg-[#2dd9ff] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               ></textarea>
             </div>
           </div>

          

        
         

          
         </div>
       </div>

       <div className="border-b border-gray-900/10 pb-12">
       <button
                            type="submit"
                            className={`flex w-52 justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                              formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={formik.isSubmitting}  >
                              <CloudArrowUpIcon className="w-5 h-5 mr-2" /> {/* Adjust icon size if needed */}
                              {formik.isSubmitting ? "Saving..." : "Save"}
                          </button>
                          <Notification
        type={dialogType}
        show={show}
        close={close}
        title={notificationTitle}
        description={notificationDescription}
      />

</div>
     </div>
                </form>     
                  </div>
               
                </div>            <Notification
        type={dialogType}
        show={show}
        close={close}
        title={notificationTitle}
        description={notificationDescription}
      />  </main> 
       <Footer />

</div>
      );
};

export default Search;
