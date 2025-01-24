import React from 'react'
import { useEffect, useState } from 'react'
import jobs from '../jobs.json'
import JobCard from './JobCard'
import Spinner from './Spinner'
import axios from 'axios';

const JobsListing = ({ isHome = false}) => {


    const [ jobs, setJobs ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
      const fetch3Jobs = async () => {
        
        try {
          const response = await axios.get('https://react-jobs-node-api.vercel.app/api/jobs');
          setJobs(response.data.slice(0,3));
          console.log(response.data.slice(0,3));
        } catch (error) {
          console.error('Error fetching jobs:', error);
        } finally {
          setLoading(false); // Set loading state to false after fetch (success or error)
        }
      }
      const fetchJobs = async () => {
        
        try {
          const response = await axios.get('https://react-jobs-node-api.vercel.app/api/jobs');
          setJobs(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching jobs:', error);
        } finally {
          setLoading(false); // Set loading state to false after fetch (success or error)
        }
      }

      if(!isHome){
        fetchJobs();
      }else{
        fetch3Jobs();
      }
      
    }, [])
    
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          { isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>
          { loading?(<Spinner loading={loading} />) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              { jobs.map((job) =>(
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
      </div>
    </section>
  )
}

export default JobsListing