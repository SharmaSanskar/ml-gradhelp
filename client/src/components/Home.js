import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as LearningSVG } from "../assets/learning.svg";

function Home() {
  const { userProfile } = useSelector((state) => state.profile);
  return (
    <section>
      <div className="my-8">
        <h3 className="text-xl font-bold text-teal-600 uppercase">
          Welcome to GradHelp
        </h3>
        {userProfile ? (
          <div>
            <p className="text-lg">
              Hello {userProfile.username}, your profile is ready. Explore the
              various services below to find the perfect university for you.
            </p>
            <Link to="/profile">
              <button className="home-btn">Update Profile</button>
            </Link>
          </div>
        ) : (
          <div>
            <p>
              Create your profile, to unlock our services and find the
              universities best suited for you.
            </p>
            <Link to="/profile">
              <button className="home-btn">Create Profile</button>
            </Link>
          </div>
        )}
      </div>

      <section className="flex flex-col md:flex-row">
        <div className="flex-1">
          <div className="bg-teal-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold uppercase">
              Admission Chance Predicton
            </h3>
            <p>
              Explore the top US universities and find your chance of admit in
              them
            </p>
            {userProfile ? (
              <Link to="/universities">
                <button className="home-btn">Explore Universities</button>
              </Link>
            ) : (
              <button disabled className="home-btn">
                Create your profile to access
              </button>
            )}
          </div>

          <div className="my-6 bg-teal-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold uppercase">
              University Recommendations
            </h3>
            <p>Find the best US universities best suited for your profile</p>
            {userProfile ? (
              <Link to="/recommendations">
                <button className="home-btn">Get Recommendations</button>
              </Link>
            ) : (
              <button disabled className="home-btn">
                Create your profile to access
              </button>
            )}
          </div>
        </div>

        <LearningSVG className="hidden md:block w-60 h-60 flex-1 mx-8 my-12" />
      </section>
    </section>
  );
}

export default Home;
