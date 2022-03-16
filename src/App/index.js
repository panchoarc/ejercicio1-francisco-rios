import React, { useEffect, useState } from "react";
import { getFakeData1, getFakeData2 } from "../fakeRequest";
import Input from "../Input";
import logo from "../resources/logo512.png";
import "../styles.css";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [firstNameData, setFirstNameData] = useState([]);
  const [filteredName, setFilteredName] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const firstNameWithId = await getFakeData1(); //Nombres
      const lastNameWithId = await getFakeData2(); // Apellidos
      console.log({ firstNameWithId, lastNameWithId });

      const firstNameData = firstNameWithId.map((item) => {
        const lastName = lastNameWithId.find(
          (lastNameItem) => lastNameItem.id === item.id
        );
        if (lastName) {
          return {
            id: item.id,
            completeName: `${item.firstName} ${lastName.lastName}`,
          };
        }
      });
      const realData = firstNameData.filter((item) => item);
      const orderedData = realData.sort((a, b) =>
        a.completeName.localeCompare(b.completeName)
      );
      setFirstNameData(orderedData);
    };
    getData();
  }, []);

  const filteringData = (input) => {
    if (input.length > 0) {
      const filteredFirstNameData = firstNameData.filter((item) =>
        item.completeName.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredName([...filteredFirstNameData]);
    } else {
      setFilteredName([]);
    }
  };

  const onChangeInputValue = (value) => {
    setInputValue(value);
    filteringData(value);
  };
  return (
    <>
      <div>
        <Input
          inputValue={inputValue}
          onChangeInputValue={onChangeInputValue}
        />
        <div className="container">
          {filteredName?.map((item) => (
            <div key={item.id}>{item.completeName}</div>
          ))}
        </div>
      </div>
      <img src={logo} alt={"logo"} />
    </>
  );
};

export default App;
