import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "../redux/profileSlice";
import { ReactComponent as InspectionSVG } from "../assets/inspection.svg";

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
    <section>
      <Link to="/" className="text-sm text-violet-600 underline">
        &lt; Back to Home
      </Link>

      <h3 className="text-2xl font-bold text-teal-600 uppercase my-3">
        Your Profile
      </h3>
      <form className="text-base flex" onSubmit={handleSubmit}>
        {/* LEFT SIDE */}
        <div className="flex-1">
          {/* Username */}
          <label className="label-primary" htmlFor="username">
            Name:
          </label>
          <input
            className="input-primary"
            defaultValue={userProfile?.username}
            type="text"
            name="username"
            id="username"
            required
          />
          <br />
          {/* GRE Q */}
          <label className="label-primary" htmlFor="greQ">
            GRE Quant [130 - 170]:
          </label>
          <input
            className="input-primary"
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
          <label className="label-primary" htmlFor="greV">
            GRE Verbal [130 - 170]:
          </label>
          <input
            className="input-primary"
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
          <label className="label-primary" htmlFor="greA">
            GRE A [1.0 - 6.0]:
          </label>
          <input
            className="input-primary"
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
          <label className="label-primary" htmlFor="toefl">
            TOEFL Score [1 - 120]:
          </label>
          <input
            className="input-primary"
            defaultValue={userProfile?.toefl}
            type="number"
            name="toefl"
            id="toefl"
            min="1"
            max="120"
            required
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1">
          {/* CGPA */}
          <label className="label-primary" htmlFor="cgpa">
            CGPA [1.0 - 10.0]:
          </label>
          <input
            className="input-primary"
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
          <label className="label-primary" htmlFor="sop">
            Rate your SOP:
          </label>
          <div className="flex items-center">
            <span className="text-sm">Low</span>
            <input
              className="mx-2"
              defaultValue={userProfile?.sop}
              type="range"
              id="sop"
              name="sop"
              min="1"
              max="5"
              required
            />
            <span className="text-sm">High</span>
          </div>
          <br />
          {/* LOR */}
          <label className="label-primary" htmlFor="lor">
            Rate your LOR:
          </label>
          <div className="flex items-center">
            <span className="text-sm">Low</span>
            <input
              className="mx-2"
              defaultValue={userProfile?.lor}
              type="range"
              id="lor"
              name="lor"
              min="1"
              max="5"
              required
            />
            <span className="text-sm">High</span>
          </div>
          <br />
          {/* Research */}
          <label className="label-primary " htmlFor="research">
            Research Experience [in months]:
          </label>
          <input
            className="input-primary"
            defaultValue={userProfile?.research}
            type="number"
            name="research"
            id="research"
            min="0"
            required
          />
          <br />
          {/* Industry */}
          <label className="label-primary" htmlFor="industry">
            Industry Experience [in months]:
          </label>
          <input
            className="input-primary"
            defaultValue={userProfile?.industry}
            type="number"
            name="industry"
            id="industry"
            min="0"
            required
          />
          <button className="block font-bold bg-teal-600 text-teal-50 w-1/3 px-4 py-1 rounded-md mt-3 hover:bg-teal-500">
            Save
          </button>
        </div>
        <InspectionSVG className="w-72 h-72 flex-1 mx-8 my-12" />
      </form>
    </section>
  );
}

export default Profile;
