import { useState } from "react";
import ClockCard from "./components/ClockCard";
import Select from "react-select";
import moment from "moment-timezone";

// Generate all timezone options for select
const timezoneOptions = moment.tz.names().map((tz) => {
  const city = tz.split("/")[1]?.replace(/_/g, " ") || tz;
  return {
    value: tz,
    label: `${city} (${tz})`,
    countryCode: tz.toLowerCase().includes("kolkata") ? "in" : "",
  };
});

// Fixed/pinned Indian timezone
const indiaTimeZone = {
  city: "India",
  timeZone: "Asia/Kolkata",
  countryCode: "in",
};

export default function App() {
  const [zones, setZones] = useState([
    { city: "New York", timeZone: "America/New_York", countryCode: "us" },
    { city: "London", timeZone: "Europe/London", countryCode: "gb" },
    indiaTimeZone,
    { city: "Tokyo", timeZone: "Asia/Tokyo", countryCode: "jp" },
    { city: "Dubai", timeZone: "Asia/Dubai", countryCode: "ae" },
  ]);

  const [search, setSearch] = useState("");

  const addTimezone = (selectedOption) => {
    if (!selectedOption) return;
    const exists = zones.find((z) => z.timeZone === selectedOption.value);
    if (!exists) {
      const city =
        selectedOption.value.split("/")[1]?.replace(/_/g, " ") ||
        selectedOption.value;
      setZones([
        ...zones,
        { city, timeZone: selectedOption.value, countryCode: "" },
      ]);
    }
  };

  const clearTimezones = () => {
    setZones([indiaTimeZone]);
  };

  // Search filter logic
  const filteredZones = zones.filter(
    (z) =>
      z.city.toLowerCase().includes(search.toLowerCase()) ||
      z.timeZone.toLowerCase().includes(search.toLowerCase()) ||
      z.countryCode?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-cyan-200 to-blue-100">
      <h1 className="text-4xl text-center font-bold text-cyan-700 mb-6">
        🌐 World Timezones Clock
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        <Select
          options={timezoneOptions}
          onChange={addTimezone}
          placeholder="Add a timezone..."
          className="w-80 text-sm"
        />
        <input
          type="text"
          placeholder="Search city or country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-full w-64 shadow-sm focus:ring-2 focus:ring-cyan-500"
        />
        <button
          onClick={clearTimezones}
          className="bg-red-500 text-white px-4 py-2 rounded-full shadow hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {filteredZones.length > 0 ? (
          filteredZones.map((zone) => (
            <ClockCard
              key={zone.timeZone}
              city={zone.city}
              timeZone={zone.timeZone}
              countryCode={zone.countryCode}
            />
          ))
        ) : (
          <p className="text-gray-500 mt-8">No match found.</p>
        )}
      </div>
      <footer className="mt-auto text-center text-sm text-gray-600 py-4">
        <hr className="my-4 border-gray-300 w-1/2 mx-auto" />
        <p>
          Designed by{" "}
          <span className="font-semibold text-pink-600">Kajal Kumari</span>
        </p>
        <p className="mt-1">&copy; 2025. All rights reserved.</p>
      </footer>
    </div>
  );
}
