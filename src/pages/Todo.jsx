import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../firebase/FirebaseConfig";
import "./Home.css";

function Todo() {
  const [input, setInput] = useState("");
  const [lists, setLists] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "todolists"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLists(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setInput("");
    });

    return () => unsubscribe();
  }, []);

  // handleClick Add To DataBase
  const handleClick = (e) => {
    e.preventDefault();
    if (input) {
      addDoc(collection(db, "todolists"), {
        name: input,
        timestamp: new Date(),
      }).catch((err) => console.error(err));
    }
  };

  //Handle Delete a doc
  const handleDelete = async (id) => {
    let request = await deleteDoc(doc(db, "todolists", id));
    console.log(request);
  };

  //Handle Updating
  const handleUpdate = async (id) => {
    const itemRef = doc(db, "todolists", id);
    let name = prompt("What would you like to update it to?");
    setDoc(itemRef, {
      name: name,
      timestamp: new Date(),
    });
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="🖊️ Add item..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <i className="fas fa-plus" onClick={handleClick}></i>
      </div>
      <div className="todos">
        {lists.map((list, index) => (
          <div className="todo" key={index}>
            <div className="left">
              <input type="checkbox" name="" id="" />
              <p>{list.name}</p>
            </div>
            <div className="right">
              <i
                class="fa-solid fa-pen-to-square"
                onClick={() => handleUpdate(list.id)}
              ></i>  
              <i
                className="fas fa-times"
                onClick={() => handleDelete(list.id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
