import spinner from "../../assets/Spinner-1s-200px 09.32.21.gif";

function Spinner() {
  return (
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: "100px", margin: "auto", display: "block" }}
    />
  );
}

export default Spinner;