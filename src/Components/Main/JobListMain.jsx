import Breadcrumb from '../Breadcrumb/Breadcrumb';
import BrowseJobsList from '../Browse Jobs/BrowseJobsList';

const JobListMain = () => {
     

  return (
    <main>
      <Breadcrumb topic={"Applications"} topicSpan={"My Applications"} />

      {error ? (
        <div className="error-message">
          <p>{error}</p>
        </div>
      ) : (
        <BrowseJobsList castings={castings} /> // Pass applications data as props to BrowseJobsList
      )}
    </main>
  );
};

export default JobListMain;
