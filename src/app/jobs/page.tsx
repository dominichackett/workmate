'use client'
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import {useState, useEffect,useCallback } from 'react'; 
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header';
import { useRouter } from 'next/navigation'

import { InlineIcon  } from '@iconify/react';
import { BuildingOfficeIcon, PencilIcon, TrashIcon,WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import Pagination from '../components/Pagination/Pagination';
const iconsize='64px'
const Home: NextPage = () => {
  const [jobs,setJobs] = useState([{id:1,name:"Bongo",qualified:1,date:new Date().toLocaleString()}])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(0);
  const [recordsPerPage,setRecordsPerPage] = useState(10)
  const router  = useRouter()

  const handlePageChange = (page:number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);

    }
  };


  const handleRecordsPerPageChanged = (records:number) => {
    
    setRecordsPerPage(records);

  
};


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
        <main className="mt-20  place-items-center pt-16 pb-16 md:pt-12 md:pb-24" >
        <div className="px-4 sm:px-6 lg:px-8 w-full">
        <div className="border-b border-gray-900/10 pb-12">
       <div className="flex items-center mb-10">
      <WrenchScrewdriverIcon className="w-10 h-10 text-gray-900 mr-3" />
      <h1 className="font-bold text-4xl text-gray-900">Job Search Results</h1>
    </div> 
         <h2 className="text-base font-semibold leading-7 text-gray-900">Job Search Information</h2>

      
       </div>
       
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Date Retrieved
                    </th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">
                      Qualified
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {job.name}
                      </td>

                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {job.date}
                      </td>

                      <td className="whitespace-nowrap text-center py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {job.qualified == 1 ? "Yes":"No"}
                      </td>
                     
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button className="flex items-center text-blue-600 hover:text-blue-700"
                                            onClick={()=>router.push(`/viewjob/${job.id}`)}>

      <PencilIcon className="w-6 h-6" /> {/* Icon size can be adjusted */}
      <span className="ml-2">Edit</span>
    </button>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button className="flex items-center text-red-600 hover:text-red-700"
                                            onClick={()=>deleteDepartment(department.id)}>

      <TrashIcon className="w-6 h-6" /> {/* Adjust size as needed */}
      <span className="ml-2">Delete</span>
    </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </div>

      </div>

    </div></main> 
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} recordsPerPage={recordsPerPage} onRecordsPerPageChange={handleRecordsPerPageChanged}  />

       <Footer />

</div>
      );
};

export default Home;
