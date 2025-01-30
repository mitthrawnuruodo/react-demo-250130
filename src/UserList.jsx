import { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        //setUsers(data);
        // Simulate a delay of 1.5 seconds before setting the data
        setTimeout(() => {
          setUsers(data);
          setLoading(false);
        }, 1500);
      } catch (err) {
        setError(err.message);
      } finally {
        //setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
