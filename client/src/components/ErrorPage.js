import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <section className="text-center flex flex-col justify-center h-[80vh]">
      <h3 className="text-2xl font-bold mb-4">
        OOPS!! Something went wrong. Return back to Homepage
      </h3>
      <Link to="/">
        <button className="text-base font-bold bg-teal-600 text-teal-50 w-1/4 px-4 py-2 rounded-md mt-3 hover:bg-teal-500">
          Back to Homepage
        </button>
      </Link>
    </section>
  );
}

export default ErrorPage;
