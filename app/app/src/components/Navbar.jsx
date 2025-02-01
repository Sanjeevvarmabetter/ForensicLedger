import { Link } from "react-router-dom";
import "../App.css";


const Navbar = ({ web3Handler, account }) => {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <a href="/">
            <img
              src="l.png"
              className="h-12 object-contain"  // Ensuring proper image scaling
              alt="Flowbite Logo"
            />
          </a>
          <Link to="/" className="text-2xl font-bold text-blue-400">
            Chain of Custody Tool
          </Link>
        </div>

        <div className="flex space-x-6">
          <Link to="/register" className="hover:text-blue-300 transition">
            Register Case
          </Link>
          <Link to="/transfer" className="hover:text-blue-300 transition">
            Transfer Custody
          </Link>
          <Link to="/history" className="hover:text-blue-300 transition">
            Track Case History
          </Link>
        </div>

        <div>
          {account ? (
            <a
              href={`https://etherscan.io/address/${account}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition"
            >
              {account.slice(0, 5) + "..." + account.slice(-4)}
            </a>
          ) : (
            <button
              onClick={web3Handler}
              className="bg-blue-500 px-4 py-2 rounded-lg shadow hover:bg-blue-400 transition"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
