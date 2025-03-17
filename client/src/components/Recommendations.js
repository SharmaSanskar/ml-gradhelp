import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetUniversitiesQuery } from "../redux/universityApi";
import { ReactComponent as GraduationSVG } from "../assets/graduation.svg";
import ErrorPage from "./ErrorPage";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

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
        `${SERVER_URL}/api/recommend_universities`,
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
      setUnis(filteredUnis.sort((a, b) => a.rank - b.rank));
    }
  }, [uniList, recommendations]);

  if (isLoading)
    return <div className="text-xl font-semibold">Loading universities...</div>;
  if (isError) return <ErrorPage />;

  return (
    <div>
      <Link to="/" className="text-sm text-violet-600 underline">
        &lt; Back to Home
      </Link>

      <h3 className="text-2xl font-bold text-teal-600 uppercase my-4">
        Recommended Universities
      </h3>
      {loading && <p className="font-semibold">Getting recommendations...</p>}
      {error && (
        <p className="font-semibold">Unable to retrieve recommendations</p>
      )}

      <div className="flex flex-col lg:flex-row">
        <div className="flex-1">
          {unis?.map((uni) => (
            <div
              key={uni.rank}
              className="bg-teal-100 mb-4 rounded-lg px-6 py-4"
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <h4 className="text-lg font-bold">
                    #{uni.rank} -{" "}
                    <a href={uni.website} target="_blank" rel="noreferrer">
                      {uni.name}
                    </a>
                  </h4>
                  <div className="flex flex-wrap text-sm ">
                    <p className="mr-4">Location: {uni.location}</p>
                    <p className="mr-4">Tuition: {uni.tuition}</p>
                    <p className="mr-4">Acceptance rate: {uni.acceptance}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <GraduationSVG className="w-80 mx-auto my-2 h-80 lg:w-40 lg:h-40 flex-1 lg:mx-8 lg:my-12" />
      </div>
    </div>
  );
}

export default Recommendations;
