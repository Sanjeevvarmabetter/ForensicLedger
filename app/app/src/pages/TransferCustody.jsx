import React ,{ useState} from "react";
import { toast } from "react-toastify";

function TransferCustody({ contract }) {
    const [evidenceId,setEvidenceId] = useState("");
    const [newCustodian,setNewCustodian] = useState("");

    async function TransferCustody() {
        if(!contract || !evidenceId || !newCustodian) {
            return;
        }

        try {
            const tx = await contract.TransferCustody(evidenceId,newCustodian);
            await tx.wait();
            toast.success("Custody transferred successfully");
            setEvidenceId("");
            setImmediate("");
        } catch(error) {
            console.log("failed to transfer custodian",error);
        }
    }

    return (
        <div className="mb-4">
            <h2 className="text-xl">Transfer Custody</h2>
            <input
            type="number"
            placeholder="Evidence ID"
            className="text-black p2 rounded"
            value={evidenceId}
            onChange={(e) => setEvidenceId(e.target.value)}
            />
            <input
            type="text"
            placeholder="new Custodian address"
            className="text-black p-2 rounded ml-2"
            value={newCustodian}
            onChange={(e) => setNewCustodian(e.target.value)}
            />

            <button onClick={TransferCustody} className="bg-green-500 px-4 py-2 ml-2 rounded">Transfer</button>
        
        </div>
    );
}


export default TransferCustody;



