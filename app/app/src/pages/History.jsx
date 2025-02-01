import React, { useState } from "react";
import { toast } from "react-toastify";

function FetchHistory({ contract }) {
  const [evidenceId, setEvidenceId] = useState("");
  const [history, setHistory] = useState([]);

  async function fetchCustodyHistory() {
    if (!contract || !evidenceId) return;

    try {
      const historyData = await contract.getEvidenceMetadata(evidenceId);
      setHistory(historyData);
    } catch (error) {
      toast.error("Error fetching history!");
      console.log(error);
    }
  }

  return (
    <div className="mb-4">
      <h2 className="text-xl">Check Custody History</h2>
      <input
        type="number"
        placeholder="Evidence ID"
        className="text-black p-2 rounded"
        value={evidenceId}
        onChange={(e) => setEvidenceId(e.target.value)}
      />
      <button onClick={fetchCustodyHistory} className="bg-yellow-500 px-4 py-2 ml-2 rounded">Fetch</button>
      
      <div className="mt-2">
        {history.length > 0 ? (
          history.map((record, index) => (
            <p key={index}>
              {record.fromCustodian} → {record.toCustodian} at {new Date(Number(record.timestamp) * 1000).toLocaleString()}
            </p>
          ))
        ) : (
          <p>No history found</p>
        )}
      </div>
    </div>
  );
}

export default FetchHistory;
