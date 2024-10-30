import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountdownTimer  from "./CountDownTimer"


const query = `
  query {
    activeCastings {
      id
      title
      description
      imageUrl
      deadline
      location
    }
  }
`;

const Category = () => {
  const [castings, setCastings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCastings = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("https://localhost:7111/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query }),
        });

        const result = await response.json();

        if (response.ok) {
          setCastings(result.data.activeCastings);
          setLoading(false);
        } else {
          throw new Error("Failed to fetch data.");
        }
      } catch (error) {
        setError("Network error: " + error.message);
        setLoading(false);
      }
    };

    fetchCastings();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="jm-category-area light-bg pt-85 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="jm-section-title mb-40 text-center">
              <h2 className="title mb-10">Castings</h2>
              <p className="text">
                Mauris ut cursus nunc. Morbi eleifend, ligula at consectetur vehicula
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          {castings.map((casting) => (
            <div key={casting.id} className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6">
              <div className="jm-category-item-new mb-30">
                <div className="jm-category-item-img-new w_img">
                  <Link to={`/castingDetails/${casting.id}`}>
                    <img src={casting.imageUrl} alt={casting.title} />
                  </Link>
                </div>
                <div className="jm-category-item-content-new">
                  <div className="jm-category-item-content-inner-new">
                    <span className="jm-category-item-icon-new">
                      <img src="data:image/png;base64,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"></img>
                    </span>
                    <h4 className="jm-cat-title-new">
                      <Link to={`/castingDetails/${casting.id}`}>{casting.title}</Link>
                    </h4>
                    
                    {/* <p className="jm-job-posted-new">Location: {casting.location}</p> */}
                    <p className="jm-job-posted-new">Deadline: <CountdownTimer deadline={casting.deadline} /></p>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
