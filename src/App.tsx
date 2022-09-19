import { useState, useEffect, HtmlHTMLAttributes } from "react";
import PulseLoader from "react-spinners/PulseLoader";

function App() {
  type CarDataObject = {
    Make: string;
    Model: string;
    ModelCode: string;
    PlateNumber: string;
    Submodel: string;
    VIN: string;
    Year: string;
  };
  const [carData, setCarData] = useState<CarDataObject>();
  const [reg, setReg] = useState("");
  const [loading, setLoading] = useState(false);

  const options = {
    method: "GET",
    headers: {
      rego: reg,
      "X-RapidAPI-Key": "32613499femshbddf38317ee233fp16d242jsn729d5532842d",
      "X-RapidAPI-Host": "car-info.p.rapidapi.com",
    },
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://car-info.p.rapidapi.com/rego?rego=${reg}`, options)
      .then((response) => response.json())
      .then((response) => {
        setCarData(response);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [reg]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submittedRego = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    setReg(submittedRego);
  }

  const isTaken = carData?.Make && carData?.Model && carData?.Year;

  // console.log(carData && carData.Make);

  return (
    <>
      <div className="all">
        <div className="header">
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25" cy="25" r="25" fill="#FCAEBE" />
          </svg>
          <div className="top-bar">
            <svg
              width="345"
              height="45"
              viewBox="0 0 345 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="120"
                y="28"
                width="225"
                height="17"
                rx="8.5"
                fill="#95AE3D"
              />
              <rect width="345" height="20" rx="10" fill="#95AE3D" />
            </svg>
            <p className="title">PLATE CHECK</p>
            <svg
              width="345"
              height="45"
              viewBox="0 0 345 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="28" width="225" height="17" rx="8.5" fill="#95AE3D" />
              <rect width="345" height="20" rx="10" fill="#95AE3D" />
            </svg>
          </div>
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25" cy="25" r="25" fill="#FCAEBE" />
          </svg>
        </div>
        <form onSubmit={handleSubmit}>
          <input className="input" placeholder="abc123"></input>
          <button className="hidden-btn"></button>
        </form>
        <div className="bottom-dots">
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25" cy="25" r="25" fill="#FCAEBE" />
          </svg>
          <p>
            {reg &&
              (loading ? (
                <PulseLoader color="#154b6f" />
              ) : isTaken ? (
                `Taken - ${carData.Year} ${carData.Make} ${carData.Model}`
              ) : (
                "Available"
              ))}
          </p>
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25" cy="25" r="25" fill="#FCAEBE" />
          </svg>
        </div>
      </div>
    </>
  );
}

export default App;
