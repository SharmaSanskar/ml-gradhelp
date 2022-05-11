import University from "./University";
import { useGetUniversitiesQuery } from "../redux/universityApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";

function Universities() {
  const { data: uniList, isLoading, isError } = useGetUniversitiesQuery();
  const [unis, setUnis] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (uniList) {
      // setUnis(uniList);
      const filteredUnis = uniList.filter((uni) =>
        uni.name.toLowerCase().includes(searchTerm)
      );
      setUnis(filteredUnis.sort((a, b) => a.rank - b.rank));
    }
  }, [uniList, searchTerm]);

  if (isLoading)
    return <div className="text-xl font-semibold">Loading universities...</div>;
  if (isError) return <ErrorPage />;

  return (
    <section>
      <Link to="/" className="text-sm text-violet-600 underline">
        &lt; Back to Home
      </Link>

      <h3 className="text-2xl font-bold text-teal-600 uppercase my-3">
        Top Universities
      </h3>
      <div className="my-3">
        <input
          type="text"
          placeholder="Search for a university..."
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          className="w-64 py-2 px-4 text-sm rounded-md font-bold border-2 border-teal-200 focus:outline-none focus:border-teal-600"
        />
      </div>
      {unis?.map((uni) => (
        <University key={uni.rank} uni={uni} />
      ))}
    </section>
  );
}

export default Universities;
