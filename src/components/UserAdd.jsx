import React, { useEffect, useState } from "react";
import axios from "axios";
const API = "http://localhost:7000/api";

const UserAdd = () => {
  const [users, setUser] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [selectedUser, setSelectUser] = useState("");

  const getUsers = async () => {
    const res = await axios.get(`${API}/users`);
    setUser(res.data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleAddUser = async () => {
    if (!newUser.trim()) return alert(`write username first`);
    await axios.post(`${API}/users`, { name: newUser });
    setNewUser("");
    getUsers();
  };

  const handleClaim = async () => {
    if (!selectedUser) return alert(`select a user first`);
    const res = await axios.post(`${API}/claim`, { userId: selectedUser });
    alert(`${res.data.user.name} got ${res.data.points} points`);
    getUsers();
  };

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-10 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Enter your name"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          className="border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={handleAddUser}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 shadow transition"
        >
          Add User
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <select
          onChange={(e) => setSelectUser(e.target.value)}
          value={selectedUser}
          className="border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleClaim}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 shadow transition"
        >
          Claim Points
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-extrabold mb-6 text-center text-green-600 tracking-wide">
          Leaderboard
        </h2>
        <div className="overflow-x-auto rounded-lg border border-blue-100 shadow">
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr className="bg-blue-100">
                <th className="py-3 px-5 border-b font-semibold text-blue-800">Rank</th>
                <th className="py-3 px-5 border-b font-semibold text-blue-800">User</th>
                <th className="py-3 px-5 border-b font-semibold text-blue-800">Points</th>
              </tr>
            </thead>
            <tbody>
              {users.map((usr, ind) => (
                <tr
                  key={usr._id}
                  className={ind % 2 === 0 ? "bg-white" : "bg-blue-50"}
                >
                  <td className="py-2 px-5 border-b text-center font-medium">{ind + 1}</td>
                  <td className="py-2 px-0 flex justify-center items-center border-b">{usr.name}</td>
                  <td className="py-2 px-5 border-b text-center text-green-700 font-semibold">
                    {usr.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserAdd;
