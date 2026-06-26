import { useEffect, useState } from 'react'
import './App.css'
import supabase from "./supabase-client"

function App() {
  const [friendList, setFriendList] = useState ([])
  const [newFriend, setNewFriend] = useState ("")
  const [newScore, setNewScore] = useState ("")

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    const {data, error} = await supabase
      .from("friends")
      .select("*")
    if (error) {
      console.log("Error fetching ", error);
    } else {
      setFriendList(data);
    }
  }

  const addFriend = async () => {
    const newFriendData = {
      name: newFriend,
      score: Number(newScore),
    }
    const {data, error} = await supabase
      .from("friends")
      .insert([newFriendData])
      .select()
      .single()

    if (error){
      console.log("Error adding todo: ", error);
    } else {
      setFriendList((prev) => [...prev, data]);
      setNewFriend("")
      setNewScore("")
    }
  }

  return (
    <div>
      {" "}
      <h1>Friends Ranking</h1>
      <div>
        <input 
          type="text" 
          placeholder="Enter friend name"
          value={newFriend}
          onChange={(e) => setNewFriend(e.target.value)}
        />
      </div>
      <div>
        <input 
          type="number" 
          placeholder="Enter score"
          value={newScore}
          onChange={(e) => setNewScore(e.target.value)}
        />
      </div>
      <button onClick={addFriend}>Add to list</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead> 
        <tbody>
          {[...friendList]
            .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
            .map((friend) => (
              <tr key={friend.id}>
                <td>{friend.name}</td>
                <td>{friend.score}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default App
