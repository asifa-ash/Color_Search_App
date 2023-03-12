import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [colors, setColors] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [notFount, setNotFount] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/NishantChandla/color-test-resources/main/xkcd-colors.json"
      )
      .then((response) => {
        console.log(response, "hhhhhh");
        setColors(response.data.colors);
      });
  }, []);
  let str = "";
  let name2 = "";

  useEffect(() => {
    // setNotFount(false);
    const filterColors = colors.filter((color) =>
      color.hex.toLowerCase().includes(search.toLowerCase())
    );
    setNotFount(filterColors)

    console.log(filterColors, "nnnnnnnnn");

    const text = filterColors[0]?.color;
    console.log(text, "mmm");
    const name1 = text?.split(" ");
    if (name1) {
      name2 = name1[1];
    }
    console.log(name2, "ggggggggg");

    const nameFilter = colors.filter((el) =>
      el.color.includes(name2.toLowerCase())
    );

    if (nameFilter && nameFilter.length) {
      setSearchResult(nameFilter);
    } else {
      // setNotFount(true);
    }

    // if (filterColors) {
    //   setSearchResult(filterColors);
    // } else {
    //   setNotFount(false);
    // }
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="home">
      <div className="search">
        <h2> Search Your Colors</h2>
        <div className="inputs">
          <input
            type="text"
            placeholder="Enter color"
            value={search}
            onChange={handleSearch}
          />

          <input
            type="color"
            placeholder="Enter color"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* {notFount && <p style={{ color: "red" }}>invalid color code</p>} */}
      <div className="table">
        <table className="tb" style={{ width: "80%" }}>
          <thead>
            <tr>
              <th>Color</th>
              <th>Name</th>
              <th>Hex</th>
              <th>RGB</th>
            </tr>
          </thead>
          <tbody>
            {notFount.length!= 0
              ? search.length
                ? searchResult.map((color) => (
                    <tr key={color.hex}>
                      <td
                        style={{
                          backgroundColor: color.color,
                          width: "50px",
                          height: "50px",
                        }}
                      ></td>
                      <td>{color.name}</td>
                      <td>{color.hex}</td>
                      <td>{color.color}</td>
                    </tr>
                  ))
                : colors.map((color) => (
                    <tr key={color.hex}>
                      <td
                        style={{
                          backgroundColor: color.color,
                          width: "50px",
                          height: "50px",
                        }}
                      ></td>
                      <td>{color.name}</td>
                      <td>{color.hex}</td>
                      <td>{color.color}</td>
                    </tr>
                  ))
              : <p className="pa">Invalid Color code</p>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
