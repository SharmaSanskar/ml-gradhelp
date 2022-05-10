import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "../redux/profileSlice";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile } = useSelector((state) => state.profile);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    dispatch(updateProfile(formData));

    // Add to localstorage
    localStorage.setItem("localProfile", JSON.stringify(formData));

    navigate("/");
  };
  return (
    <div>
      <Link to="/">Back to Home</Link>

      <h3>Your Profile</h3>
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <label htmlFor="username">Your Name:</label>
        <input
          defaultValue={userProfile?.username}
          type="text"
          name="username"
          id="username"
          required
        />
        <br />
        {/* GRE Q */}
        <label htmlFor="greQ">GRE Quant [130 - 170]:</label>
        <input
          defaultValue={userProfile?.greQ}
          type="number"
          name="greQ"
          id="greQ"
          min="130"
          max="170"
          required
        />
        <br />
        {/* GRE V */}
        <label htmlFor="greV">GRE Verbal [130 - 170]:</label>
        <input
          defaultValue={userProfile?.greV}
          type="number"
          name="greV"
          id="greV"
          min="130"
          max="170"
          required
        />
        <br />
        {/* GRE A */}
        <label htmlFor="greA">GRE A [1.0 - 6.0]:</label>
        <input
          defaultValue={userProfile?.greA}
          type="number"
          name="greA"
          id="greA"
          min="1.0"
          max="6.0"
          step="0.5"
          required
        />
        <br />
        {/* TOEFL */}
        <label htmlFor="toefl">TOEFL Score [1 - 120]:</label>
        <input
          defaultValue={userProfile?.toefl}
          type="number"
          name="toefl"
          id="toefl"
          min="1"
          max="120"
          required
        />
        <br />
        {/* CGPA */}
        <label htmlFor="cgpa">CGPA [1.0 - 10.0]:</label>
        <input
          defaultValue={userProfile?.cgpa}
          type="number"
          name="cgpa"
          id="cgpa"
          min="1.0"
          max="10.0"
          step="0.1"
          required
        />
        <br />
        {/* SOP */}
        <label htmlFor="sop">Rate your SOP:</label>
        <div className="d-flex align-items-center justify-content-between">
          <span>Low</span>
          <input
            defaultValue={userProfile?.sop}
            type="range"
            id="sop"
            name="sop"
            min="1"
            max="5"
            required
          />
          <span>High</span>
        </div>
        <br />
        {/* LOR */}
        <label htmlFor="lor">Rate your LOR:</label>
        <div className="d-flex align-items-center justify-content-between">
          <span>Low</span>
          <input
            defaultValue={userProfile?.lor}
            type="range"
            id="lor"
            name="lor"
            min="1"
            max="5"
            required
          />
          <span>High</span>
        </div>
        {/* Research */}
        <label htmlFor="research">Research Experience [in months]:</label>
        <input
          defaultValue={userProfile?.research}
          type="number"
          name="research"
          id="research"
          min="0"
          required
        />
        <br />
        {/* Industry */}
        <label htmlFor="industry">Industry Experience [in months]:</label>
        <input
          defaultValue={userProfile?.industry}
          type="number"
          name="industry"
          id="industry"
          min="0"
          required
        />
        <br />
        <button>Save</button>
      </form>
    </div>
  );
}

export default Profile;
