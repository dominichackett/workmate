'use client'
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../../../styles/Home.module.css';
import {useState, useEffect,useCallback } from 'react'; 
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header';
import { InlineIcon  } from '@iconify/react';
import { useFormik } from 'formik';
import * as Yup from 'yup' 
import { PencilSquareIcon,CloudArrowUpIcon} from '@heroicons/react/24/solid'; // For outline version
import Notification from '../../components/Notification/Notification';

const iconsize='64px'
const ViewJob: NextPage = () => {

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
           name: "",
           description:"",
          proposal:""
        },
        validationSchema: Yup.object({
          name: Yup.string()
            .min(2, "must be at least 2 characters")
            .required("required"),
            description: Yup.string()
            .min(2, "must be at least 2 characters")
            .required("required"),   
            proposal:  Yup.number()
            .required("Interval selection is required")
            .min(10, "Interval must be at least 10"),
            

         
        }),
        onSubmit: async(values) => {
          const causeData = {
            url:values.url,
           };
        
          try {
            const response = await fetch('/api/createdepartment', { // Replace with your actual endpoint
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(causeData),
            });
        
            if (!response.ok) {
              // Handle errors
              const errorData = await response.json();
              setDialogType(2) //Error
              setNotificationTitle("Add Department")
              setNotificationDescription(errorData.error)
              setShow(true)
              return;
            }
        
            const data = await response.json();
            setDialogType(1) //Success
            setNotificationTitle("Add Department")
            setNotificationDescription(`Department created successfully! Department ID: ${data.departmentId}`)
            setShow(true)
            await new Promise(resolve => setTimeout(resolve, 1000));
            router.push("/departments")
          
          } catch (error) {
            console.log("Network error:", error);
            
            setDialogType(2) //Error
            setNotificationTitle("Add Department")
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

       <h1 className="font-bold text-4xl text-gray-900">View Job</h1>
 </div>
         <h2 className="text-base font-semibold leading-7 text-gray-900">Job Imformation</h2>
         <p className="mt-1 text-sm leading-6 text-gray-600">All information is required.</p>

         <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">

         <div className="sm:col-span-2 sm:col-start-1">
             <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
               Name {formik.touched.name && formik.errors.name ? (
          <span className="text-red-500 text-sm">{formik.errors.name}</span>
        ) : null}
             </label>
             <div className="mt-2">
             <input
  type="text"
  name="name"
  id="name"
  onChange={formik.handleChange}
       onBlur={formik.handleBlur}
       value={formik.values.name}
       disabled={true}
  className="bg-[#2dd9ff] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
/>
             </div>
           </div>

         
           <div className="sm:col-span-6">
             <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
               Job description {formik.touched.description && formik.errors.description ? (
          <span className="text-red-500 text-sm">{formik.errors.description}</span>
        ) : null}
             </label>
             <div className="mt-2">
               <textarea
                 rows={10}
                 name="description"
                 id="description"
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.description}
           
                 className="bg-[#2dd9ff] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               ></textarea>
             </div>
           </div>


           <div className="sm:col-span-6">
             <label htmlFor="proposal" className="block text-sm font-medium leading-6 text-gray-900">
               Job Proposal  {formik.touched.proposal && formik.errors.proposal ? (
          <span className="text-red-500 text-sm">{formik.errors.proposal}</span>
        ) : null}
             </label>
             <div className="mt-2">
               <textarea
                 rows={10}
                 name="proposal"
                 id="proposal"
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.proposal}
           
                 className="bg-[#2dd9ff] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                              <CloudArrowUpIcon className="w-5 h-5" /> {/* Adjust icon size if needed */}
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

export default ViewJob;
