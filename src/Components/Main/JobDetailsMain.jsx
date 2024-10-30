import React from 'react'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import SingleJobDetails from '../Jobs/SingleJobDetails'

const JobDetailsMain = ({ jobId }) => {
  return (
    <div>
      <SingleJobDetails jobId={jobId} /> {/* Pass `jobId` to SingleJobDetails */}
    </div>
  );
};
export default JobDetailsMain