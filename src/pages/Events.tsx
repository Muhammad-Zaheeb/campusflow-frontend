import { useEffect } from "react";
import api from "../api/axios";

function Events() {
  useEffect(() => {
    api.get("/")
      .then((res) => {
        console.log("Backend response:", res.data);
      })
      .catch((err) => {
        console.log("Error connecting backend:", err);
      });
  }, []);

  return <h1>Events Page (Check console)</h1>;
}

export default Events;