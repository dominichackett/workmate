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
import { db } from "../../../lib/firebase";
import { doc, getDoc,setDoc } from "firebase/firestore";
import  {useAccount}  from 'wagmi';
import { useParams  } from 'next/navigation';

const iconsize='64px'
const ViewJob: NextPage = () => {
const {id} = useParams<{id:string}>(); // 
const {address,isConnected,isConnecting} =  useAccount()
const [job,setJob] = useState()
const [isGenerating,setIsGenerating] = useState(false)

console.log(id)
useEffect(()=>{
  async function getJob() {
    
    const jobRef = doc(db, "jobs", id.toString());
    const jobSnap = await getDoc(jobRef);

    if (jobSnap.exists()) {
        console.log( jobSnap.data());  // Return search data
        formik.setValues({
          title:jobSnap.data().title,
          description:jobSnap.data().description,
          proposal:jobSnap.data().proposal,
          bidstatus:0
          
        });
        console.log(jobSnap.data())
        setJob(jobSnap.data())
    } else {
        console.log( null);  // Search data not found
    }

}
if( address && id)
getJob()
 },[address,id])
 


     // NOTIFICATIONS functions
const [notificationTitle, setNotificationTitle] = useState("");

const [notificationDescription, setNotificationDescription] = useState("");

const [dialogType, setDialogType] = useState(1);
const [show, setShow] = useState(false);

const generateProposal = async (description:string)=>{
  setIsGenerating(true)
  const text = "Generate a proposal for the following job description. Show a tentative timeline. ".concat( description)
  const response = await fetch("/api/chat", {
    method: "POST",
    
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text }),
  });
console.log(response)
  if (!response.ok) {
    setDialogType(2) //Error
    setNotificationTitle("Generate Proposal")
    setNotificationDescription("An error occurred. Please try again.")
    setShow(true)
    setIsGenerating(false)
    return
  }

  const responseData = await response.json();
  setDialogType(1) //Success
  setNotificationTitle("Generate Proposal")
  setNotificationDescription(`Successfully Generated proposal`)
  setShow(true) 
  setIsGenerating(false)
  formik.setValues({...formik.values,proposal:responseData.response[0]})
  console.log(responseData)
}

const close = async () => {
setShow(false);
};

    const formik = useFormik({
        initialValues: {
           title: "",
           description:"",
          proposal:"",
          bidstatus:0
        },
        validationSchema: Yup.object({
          title: Yup.string()
            .min(2, "must be at least 2 characters")
            .required("required"),
            description: Yup.string()
            .min(2, "must be at least 2 characters")
            .required("required"),   
            proposal:  Yup.string()
            .min(2, "must be at least 2 characters")
            .required("required"),  
           
            bidstatus: Yup.number()
            .required("required"),
            
         
        }),
        onSubmit: async(values) => {
         
        
          try {
           
            const jobRef = doc(db, "jobs", id.toString()); 
            await setDoc(jobRef, {...job,description:values.description,proposal:values.proposal,bidstatus:values.bidstatus}, { merge: false }); 

            
            setDialogType(1) //Success
            setNotificationTitle("Save Job")
            setNotificationDescription(`Job successfully! updated`)
            setShow(true)
           
          
          } catch (error) {
            console.log("Network error:", error);
            
            setDialogType(2) //Error
            setNotificationTitle("Save Job")
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

         <div className="sm:col-span-6 sm:col-start-1">
             <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
               Title {formik.touched.title && formik.errors.title ? (
          <span className="text-red-500 text-sm">{formik.errors.title}</span>
        ) : null}
             </label>
             <div className="mt-2">
             <input
  type="text"
  name="title"
  id="title"
  onChange={formik.handleChange}
       onBlur={formik.handleBlur}
       value={formik.values.title}
       disabled={true}
  className="p-2 bg-[#2dd9ff] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
/>
             </div>
           </div>

           <div className="sm:col-span-2">
             <label htmlFor="qualified" className="block text-2xl font-bold leading-6 text-red-500">
               Budget 
             </label>
             <div className="mt-2 font-bold">
             {  `$${job?.budget?.minimum?.toLocaleString()} - $${job?.budget?.maximum?.toLocaleString()}`}
             </div>
             </div>


             <div className="sm:col-span-2">
             <label htmlFor="bids" className="block text-2xl font-bold leading-6 text-green-500">
               Bids
             </label>
             <div className="mt-2 font-bold">
             {   `Avg: $${job?.bid_stats?.bid_avg?.toLocaleString()} - Count: ${job?.bid_stats?.bid_count?.toLocaleString()}`}
             </div>
             </div>

           <div className="sm:col-span-2">
             <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
               Status {formik.touched.bidstatus && formik.errors.bidstatus ? (
          <span className="text-red-500 text-sm">{formik.errors.bidstatus}</span>
        ) : null}
             </label>
             <div className="mt-2">
             <select
       id="status"
       
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
       value={formik.values.status}
       className="bg-[#2dd9ff] block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
     >
  <option value={0}>Pending</option>
  <option value={1}>Applied</option>
  <option value={2}>Won</option>
  <option value={3}>Not Won</option>
 
 

    
          
     </select>     
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
           
                 className="p-2 bg-[#2dd9ff] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
           
                 className="p-2 bg-[#2dd9ff] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               ></textarea>
             </div>
             <button
                            type="button"
                            onClick={()=>generateProposal(formik.values.description)}
                            className={`mt-4 flex w-52 justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 ${
                             isGenerating? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={isGenerating}  >
                              <CloudArrowUpIcon className="w-5 h-5 mr-2" /> {/* Adjust icon size if needed */}
                              {isGenerating ? "Generating..." : "Create Proposal"}
                          </button>
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

export default ViewJob;
