import React, { useState } from "react";
import { toast } from "react-toastify";

function RetrieveMetadata({ contract }) {
  const [evidenceId, setEvidenceId] = useState("");
  const [evidenceMetadata, setEvidenceMetadata] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchMetadata() {
    if (!contract || !evidenceId) {
      toast.error("Please provide a valid evidence ID");
      return;
    }

    setLoading(true);
    try {
      // Call the smart contract to get the metadata
      const [title, description, imageURI] = await contract.getEvidenceMetadata(evidenceId);

      // Set the metadata
      setEvidenceMetadata({
        title,
        description,
        imageURI: `https://ipfs.io/ipfs/${imageURI}`, // Ensure the URL is prefixed with the IPFS gateway
      });
    } catch (error) {
      toast.error("Error fetching evidence metadata");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="retrieve-container">
      <h2 className="heading">Retrieve Evidence Metadata</h2>
      <div className="form-container">
        <input
          type="number"
          placeholder="Enter Evidence ID"
          className="input-field"
          value={evidenceId}
          onChange={(e) => setEvidenceId(e.target.value)}
        />
        <button
          onClick={fetchMetadata}
          className="submit-button"
          disabled={loading}
        >
          {loading ? "Fetching..." : "Fetch Metadata"}
        </button>
      </div>

      {loading && <p className="loading-text">Loading...</p>}

      {evidenceMetadata && (
        <div className="metadata-container">
          <h3 className="metadata-heading">Evidence Metadata</h3>
          <p><strong>Title:</strong> {evidenceMetadata.title}</p>
          <p><strong>Description:</strong> {evidenceMetadata.description}</p>
          {evidenceMetadata.imageURI && (
            <div className="image-container">
              <strong>Image:</strong>
              <img
                src={evidenceMetadata.imageURI}
                alt="Evidence"
                className="metadata-image"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RetrieveMetadata;
