import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";

function University({ uni }) {
  const [chance, setChance] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userProfile } = useSelector((state) => state.profile);

  const predictChance = async (rank) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:8000/api/predict_admission/${rank}`,
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
    <div>
      <h4>
        {uni.rank} - {uni.name}
      </h4>
      <button disabled={loading} onClick={() => predictChance(uni.rank)}>
        Predict chance
      </button>
      {loading && <p>Predicting chances...</p>}
      {error && <p>Error occured</p>}
      {chance && <p>Chance of admission: {chance}</p>}
    </div>
  );
}

export default University;
