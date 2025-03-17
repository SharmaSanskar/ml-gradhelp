import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function University({ uni }) {
  const [chance, setChance] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userProfile } = useSelector((state) => state.profile);

  const predictChance = async (rank) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${SERVER_URL}/api/predict_admission/${rank}`,
        userProfile
      );
      switch (res.data) {
        case 1:
          setChance("Low");
          break;
        case 2:
          setChance("Moderate");
          break;
        case 3:
          setChance("High");
          break;
        default:
          setChance("");
      }
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };
  return (
    <div className="bg-teal-100 mb-4 rounded-lg px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center">
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

        <button
          className="text-sm px-2 py-1 mt-2 sm:mt-0 sm:py-2 sm:px-4 sm:text-base font-bold bg-teal-600 text-teal-50 rounded-md hover:bg-teal-500"
          disabled={loading}
          onClick={() => predictChance(uni.rank)}
        >
          Predict chance
        </button>
      </div>

      <div className="sm:text-lg font-semibold">
        {loading && <p className="mt-2">Predicting admission chance...</p>}
        {error && <p className="mt-2">Unable to retrieve prediction</p>}
        {chance && (
          <p className="mt-2">
            Chance of admission:{" "}
            <span className="text-teal-900 uppercase font-bold">{chance}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default University;
