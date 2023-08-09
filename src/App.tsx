import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  name: {
    first: string,
    last: string,
  }
  email: string;
  picture: {
    medium: string,
  }
  location: {
    street: {
      number: number,
      name: string,
    },
    city: string,
    state: string,
    country: string,
  }
}

const App = () => {
  const [ userData, setUserData ] = useState<User[]>([]);
  const [ search, setSearch ] = useState("");
  
  const fetchData = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=100');
      setUserData(response.data.results);
    } catch (err) {
      console.log(err);
    }
  }

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.length) {
      setUserData(userData);
      return;
    }
    const filteredUsers = userData.filter(user => user.name.first.toLowerCase().includes(search.toLowerCase()));
    setUserData(filteredUsers);
    console.log("Filtered Users: ", filteredUsers);
    console.log("Search: ", search);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <div className="filter">
        <form onSubmit={handleFilter}>
          <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}></input>
          <button type="submit">Search</button>
        </form>
      </div>
      <div id="user-grid">
        {
          userData.map((e, i) => {
            return (
              <div key={i} className="user-card">
                <p><span>First Name:</span> {e.name?.first}</p>
                <p><span>Last Name:</span> {e.name.last}</p>
                <img src={e.picture.medium} alt="pfp" />
                <p><span>Email:</span> {e.email}</p>
                <p><span>Address:</span> {e.location.street.number} {e.location.street.name}</p>
                <p>{e.location.city}, {e.location.state}</p>
                <p>{e.location.country}</p>
              </div>
            )
          })
        }
      </div>
    </>
  );
}

export default App;
