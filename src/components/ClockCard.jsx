import { useEffect, useState } from "react";

const ClockCard = ({ city, timeZone, countryCode }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString("en-US", { timeZone }));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { timeZone }));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  const flagURL = countryCode
    ? `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`
    : "";

  return (
    <div
      className="card w-64 p-6 rounded-2xl text-center transition transform hover:scale-105 duration-300 ease-in-out shadow-lg relative"
    >
      {flagURL && (
        <img
          src={flagURL}
          alt={`${city} flag`}
          className="absolute top-2 right-2 w-6 h-4 rounded shadow"
        />
      )}
      <h2 className="text-xl font-semibold text-gray-800">{city}</h2>
      <p className="mt-2 text-3xl font-mono text-gray-900">{time}</p>
      <p className="text-xs mt-1 text-gray-500">{timeZone}</p>
    </div>
  );
};

export default ClockCard;
