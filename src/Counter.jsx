import React, { useEffect, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("Mounting...");
    console.log("Unmounting..." + count);
    return () => {
      console.log("CleanUp..." + count);
    };
  }, [count]);
  return (
    <div>
      <h1> im Counter</h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      <h2>{count}</h2>
    </div>
  );
}

export default Counter;
