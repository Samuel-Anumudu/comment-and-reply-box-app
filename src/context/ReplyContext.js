import { createContext, useState, useEffect } from "react";

const ReplyContext = createContext();

export const ReplyContextProvider = ({ children }) => {
  const [replies, setReplies] = useState([]);

  const fetchReplies = async () => {
    const res = await fetch(`/comments`);
    const data = await res.json();
    const replies = data.map((el) => el.replies);
    setReplies(replies);
  };

  useEffect(() => {
    fetchReplies();
  }, []);
  return (
    <ReplyContext.Provider value={{ replies }}>
      {children}
    </ReplyContext.Provider>
  );
};

export default ReplyContext;
