import University from "./University";
import { useGetUniversitiesQuery } from "../redux/universityApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;
  return (
    <div>
      <Link to="/">Back to Home</Link>

      <h3>Top Universities</h3>
      <div className="my-8">
        <input
          type="text"
          placeholder="Search for a university..."
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          className="w-64 py-2 px-4 bg-indigo-50 text-secondary rounded-md font-sans font-bold"
        />
      </div>
      {unis?.map((uni) => (
        <University key={uni.rank} uni={uni} />
      ))}
    </div>
  );
}

export default Universities;
