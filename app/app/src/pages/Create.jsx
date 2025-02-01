import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ethers } from "ethers";
import "../App.css";

const PINATA_API_KEY = "20a1ac93e10b67f081c5";
const PINATA_SECRET_API_KEY = "2b3680b650e07a507c4df5a9649b9b6438d7f8e4c3cc0cfab22a73bb968d02d7";

function RegisterEvidence({ contract }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  async function uploadToPinata(file) {
    const formData = new FormData();
    formData.append("file", file);
    const metadata = JSON.stringify({
      name: "Evidence Image",
      keyvalues: { description: description, title: title },
    });
    formData.append("pinataMetadata", metadata);

    try {
      const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      });
      return response.data.IpfsHash;
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      throw new Error("Error uploading file to Pinata");
    }
  }

  async function registerEvidence() {
    if (!contract || !title || !description || !image) return;

    try {
      const imageIpfsHash = await uploadToPinata(image);

      const tx = await contract.registerEvidence(title, description, imageIpfsHash);
      await tx.wait();

      toast.success("Evidence registered successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      toast.error("Error registering evidence!");
      console.log(error);
    }
  }

  return (
    <div className="form-container">
      <h2 className="form-heading">Register Evidence</h2>
      <div className="form-content">
        <div className="form-group">
          <input
            type="text"
            placeholder="Evidence Title"
            className="input-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Evidence Description"
            className="input-field"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            className="file-input"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <button
            onClick={registerEvidence}
            className="submit-button"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterEvidence;
