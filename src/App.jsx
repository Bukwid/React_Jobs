import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import React from 'react'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';


const App = () => {

  // Add New Job
  const addJob = async (newJob) => {
    console.log(newJob);

    const res = await fetch('https://react-jobs-node-api.vercel.app/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    });
    return;
  };

  // Delete Job
  const deleteJob = async (id) => {
    console.log('delete', id);
    const res = await fetch(`https://react-jobs-node-api.vercel.app/api/jobs/${id}`,{
      method: 'DELETE',
    });
    return;
  }

  const updateJob = async (updatedJob) => {
    console.log(updatedJob);

    const res = await fetch(`https://react-jobs-node-api.vercel.app/api/jobs/${updatedJob.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedJob)
    });
    return;
  };
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />}/>
        <Route path='/jobs' element={<JobsPage/>} />
        <Route path='/jobs/:id' element={<JobPage deleteJob={ deleteJob }/>}  loader={ jobLoader }/>
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob}/>}/>
        <Route path='/jobs/edit/:id' element={<EditJobPage updateJobSubmit={updateJob}/>} loader={ jobLoader }/>
  
        <Route path='*' element={<NotFoundPage/>} />
      </Route>
  )
  );

  return (
    <RouterProvider router={router}/>
  )
}

export default App