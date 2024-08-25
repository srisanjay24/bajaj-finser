import { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useEffect } from "react";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);



useEffect(() => {
  document.title = "21BBS0291";
}, []);


  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highest_lowercase_alphabet", label: "Highest Lowercase Alphabet" },
  ];

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const response = await axios.post("https://bajaj-finser.onrender.com/bfhl", parsedInput);
      setResponseData(response.data);
    } catch (error) {
      alert("Invalid JSON format or server error");
    }
  };

  const renderData = () => {
    if (!responseData) return null;

    return selectedOptions.map((option) => (
      <div key={option.value}>
        <h3>{option.label}:</h3>
        <p>{JSON.stringify(responseData[option.value])}</p>
      </div>
    ));
  };

  return (
    <div>
      <h1>21BBS0291</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON'
      />
      <button onClick={handleSubmit}>Submit</button>

      {responseData && (
        <>
          <Select
            options={options}
            isMulti
            onChange={setSelectedOptions}
            placeholder="Select options to display"
          />
          <div>{renderData()}</div>
        </>
      )}
    </div>
  );
}

export default App;
