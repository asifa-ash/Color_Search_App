import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [colors, setColors] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [notFount, setNotFount] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/NishantChandla/color-test-resources/main/xkcd-colors.json"
      )
      .then((response) => {
        setColors(response.data.colors);
      });
  }, []);

  useEffect(() => {
    setNotFount(false);
    if (search.length) {
      const filterColors = colors.filter((color) =>
        color.hex.toLowerCase().includes(search.toLowerCase())
      );

      if (filterColors.length) {
        const text = filterColors[0]?.color;
        const colorName = text?.split(" ");
        if (colorName && colorName[colorName.length-1]) {
          const nameFilter = colors.filter((el) =>
            el.color.includes(colorName[colorName.length-1].toLowerCase())
          );
          if (nameFilter && nameFilter.length) {
            setSearchResult(nameFilter);
          }
        }
      } else {
        setNotFount(true);
      }
    }
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

      {notFount ? (
        <p style={{ color: "red" }}>Invalid color code</p>
      ) : (
        <>
          <div className="table">
            <table className="tb" style={{width:"70%"}}>
              <thead>
                <tr>
                  <th>Color</th>
                  <th>Name</th>
                  <th>Hex</th>
                  <th>RGB</th>
                </tr>
              </thead>
              <tbody>
                {search.length
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
                    ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
