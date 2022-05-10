import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const { userProfile } = useSelector((state) => state.profile);
  return (
    <div>
      <div>
        <h3>Welcome to GradHelp</h3>
        {userProfile ? (
          <div>
            <p>Hello {userProfile.username}, your profile is ready</p>
            <Link to="/profile">
              <button>Update Profile</button>
            </Link>
          </div>
        ) : (
          <div>
            <p>Create your profile, to find the best US university for you.</p>
            <Link to="/profile">
              <button>Create Profile</button>
            </Link>
          </div>
        )}
      </div>
      <div>
        <h3>University Recommendations</h3>
        <p>Find the best US universities best suited for your profile</p>
        {userProfile ? (
          <Link to="/recommendations">
            <button>Get Recommendations</button>
          </Link>
        ) : (
          <button disabled>Create your profile to access</button>
        )}
      </div>
      <div>
        <h3>Admission Chance</h3>
        <p>
          Explore the top Us universities and find out your cance of admit base
          on your profile
        </p>
        {userProfile ? (
          <Link to="/universities">
            <button>Explore Universities</button>
          </Link>
        ) : (
          <button disabled>Create your profile to access</button>
        )}
      </div>
    </div>
  );
}

export default Home;
