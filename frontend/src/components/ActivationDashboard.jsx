import React, { useEffect, useState } from "react";

export default function ActivationDashboard() {
  const [subCategory, setSubCategory] = useState("Pinnacle Sales");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const subCategories = ["Pinnacle Sales", "Florida Activation", "Horizon Sales"];

  useEffect(() => {
    fetchData(subCategory);
  }, [subCategory]);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch(`https://backoffice-x5j3.onrender.com/data`);
      console.log(res);
      const json = await res.json();
      setTableData(json.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      <div className="flex space-x-4 mb-6">
        {subCategories.map((name) => (
          <button
            key={name}
            onClick={() => setSubCategory(name)}
            className={`px-4 py-2 rounded-lg ${subCategory === name ? "bg-blue-600 text-white" : "bg-white text-gray-700 border"}`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg p-4">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : tableData.length === 0 ? (
          <p className="text-red-500">No data found for {subCategory}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  {Object.keys(tableData[0] || {}).map((col) => (
                    <th key={col} className="border border-gray-300 px-4 py-2 text-left">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    {Object.keys(row).map((col) => (
                      <td key={col} className="border border-gray-300 px-4 py-2">
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
