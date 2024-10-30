import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "./CountDownTimer";

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
                  <Link to={`/jobDetailsPage/${casting.id}`}>
                    <img src={casting.imageUrl} alt={casting.title} />
                  </Link>
                </div>
                <div className="jm-category-item-content-new">
                  <div className="jm-category-item-content-inner-new">
                    <span className="jm-category-item-icon-new">
                      <img src="https://static.vecteezy.com/system/resources/previews/007/688/855/non_2x/tv-logo-free-vector.jpg" alt="Icon" />
                    </span>
                    <h4 className="jm-cat-title-new">
                      <Link to={`/jobDetailsPage/${casting.id}`}>{casting.title}</Link>
                    </h4>
                    <p className="jm-job-posted-new">
                      Deadline: <CountdownTimer deadline={casting.deadline} />
                    </p>
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
