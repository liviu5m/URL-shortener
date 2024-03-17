import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [url, setUrl] = useState("");

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
    toast("URL copied to clipboard !");
  };

  const generateLink = (e) => {
    e.preventDefault();
    if (e.target.url.value != "") {
      axios
        .post("http://localhost:3000/url", {
          url: e.target.url.value,
        })
        .then((res) => {
          setUrl(res.data);
        })
        .catch((err) => console.log(err));
    } else toast("You must enter a URL");
  };
  return (
    <>
      <div className="container d-flex align-items-center justify-content-center mt-5 flex-column">
        <h1>Create a shorter URL</h1>
        <form
          className="d-flex gap-3 align-items-center justify-content-center mt-5"
          onSubmit={generateLink}
        >
          <div class="mb-3">
            <input
              type="text"
              name="url"
              class="form-control"
              placeholder="URL..."
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Create
          </button>
        </form>
        {url && (
          <p className="text-url">
            Here is your short url:{" "}
            <span id="url" onClick={() => copyUrl(url)}>
              {url}
            </span>
          </p>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
