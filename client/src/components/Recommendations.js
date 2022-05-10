import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetUniversitiesQuery } from "../redux/universityApi";

function Recommendations() {
  const { data: uniList, isLoading, isError } = useGetUniversitiesQuery();

  const [recommendations, setRecommendations] = useState([]);
  const [unis, setUnis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userProfile } = useSelector((state) => state.profile);

  const getRecommendations = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:8000/api/recommend_universities`,
        userProfile
      );

      setRecommendations(res.data.map((uni) => uni.toLowerCase()));
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  }, [userProfile]);

  useEffect(() => {
    getRecommendations();
  }, [getRecommendations]);

  useEffect(() => {
    if (uniList && recommendations.length !== 0) {
      const filteredUnis = uniList.filter((uni) =>
        recommendations.includes(uni.name.replace(/--/g, " ").toLowerCase())
      );
      setUnis(filteredUnis);
    }
  }, [uniList, recommendations]);

  if (isLoading) return <div>Loading universities...</div>;
  if (isError) return <div>Can't load universities</div>;
  return (
    <div>
      <Link to="/">Back to Home</Link>

      <h3>Recommended Universities</h3>
      {loading && <p>Getting recommendations...</p>}
      {error && <p>Error occured</p>}
      {unis?.map((uni) => (
        <div key={uni.rank}>
          <p>
            {uni.rank} - {uni.name}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Recommendations;
