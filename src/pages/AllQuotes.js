import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

// const DUMMY_QUOTES = [
//   {
//     id: "q1",
//     author: "Korbi",
//     text: "To React or not to React",
//   },
//   {
//     id: "q2",
//     author: "Leo",
//     text: "Life is like a React component",
//   },
// ];

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: quotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!quotes || quotes.length === 0)) {
    return <NoQuotesFound />;
  }

  return (
    <>
      <QuoteList quotes={quotes} />
    </>
  );
};

export default AllQuotes;
