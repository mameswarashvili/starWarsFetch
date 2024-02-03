import { useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [shownInfo, setShownInfo] = useState(false);
  const [vigaca, setVigaca] = useState([]);
  const [vigacisPlaneta, setVigacigsPlaneta] = useState([]);
  const [inputText, setInputText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    setInputText(event.target.value);
  };
  // const fetchStarWars = async () => {
  //   setLoading(true);
  //   await fetch(`https://swapi.dev/api/people/?search=${inputText}`)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setVigaca(data.results[0]);
  //       console.log(data);
  //       if (data.count === 0) {
  //         return new Error("Something went wrong");
  //       }
  //       return fetch(data.results[0].homeworld);
  //     })

  //     .then((response) => {
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setVigacigsPlaneta(data);
  //     })
  //     .catch((error) => {
  //       setErrorMessage(error.message);
  //       setVigacigsPlaneta([]);
  //       setVigaca([]);
  //       setShownInfo(false);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //       setInputText("");
  //       setShownInfo(true);
  //     });
  // };
  const fetchStarWars = async () => {
    if (inputText.trim() === "") {
      setErrorMessage("Please enter a character name");
      setVigacigsPlaneta([]);
      setVigaca([]);
      setLoading(false);
      setShownInfo(true);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${inputText}`
      );

      if (!response.ok) {
        throw new Error("Character not found");
      }

      const data = await response.json();

      if (data.count === 0) {
        throw new Error("Character not found");
      }

      const homeworldResponse = await fetch(data.results[0].homeworld);

      if (!homeworldResponse.ok) {
        throw new Error("Error fetching homeworld");
      }

      const homeworldData = await homeworldResponse.json();

      setVigaca(data.results[0]);
      setVigacigsPlaneta(homeworldData);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
      setVigacigsPlaneta([]);
      setVigaca([]);
    } finally {
      setLoading(false);
      setInputText("");
      setShownInfo(true);
    }
  };
  // console.log(vigaca.name);
  return (
    <>
      <div className="mainDiv">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchStarWars();
          }}
        >
          <input type="text" onChange={handleChange} value={inputText} />
        </form>
        <button
          type="submit"
          disabled={inputText < 1}
          onClick={() => fetchStarWars()}
        >
          Search
        </button>
      </div>
      {loading ? <p>loading...</p> : null}
      {/* {shownInfo || !errorMessage(
        <ul>
          <li>
            <strong>Name: </strong>
            {vigaca.name}
          </li>
          <li>
            <strong>Birth year: </strong>
            {vigaca.birth_year}
          </li>
          <li>
            <strong>Home planet </strong>
            <ul>
              <li>
                <strong>Name: </strong>
                {vigacisPlaneta.name}
              </li>
              <li>
                <strong>Population: </strong>
                {vigacisPlaneta.population}
              </li>
              <li>
                <strong>Terrain: </strong>
                {vigacisPlaneta.terrain}
              </li>
            </ul>
          </li>
        </ul>
      ) : (
        <p>{errorMessage.length !== 0 ? errorMessage}</p>
      )} */}
      {shownInfo && !errorMessage && Object.keys(vigaca).length > 0 ? (
        <ul>
          <li>
            <strong>Name: </strong>
            {vigaca.name}
          </li>
          <li>
            <strong>Birth year: </strong>
            {vigaca.birth_year}
          </li>
          <li>
            <strong>Home planet </strong>
            <ul>
              <li>
                <strong>Name: </strong>
                {vigacisPlaneta.name}
              </li>
              <li>
                <strong>Population: </strong>
                {vigacisPlaneta.population}
              </li>
              <li>
                <strong>Terrain: </strong>
                {vigacisPlaneta.terrain}
              </li>
            </ul>
          </li>
        </ul>
      ) : (
        <p>
          {errorMessage.length > 0
            ? errorMessage
            : "Please enter a character name"}
        </p>
      )}
    </>
  );
}

export default App;
