import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";

export const SearchScreen = () => {
  const [values, handleInputChange, reset] = useForm({
    searchText: "",
  });

  const { searchText } = values;

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("searchText", searchText);
  };

  return (
    <>
      <h1>Busquedas</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />
          <form action="" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar un heroe"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={handleInputChange}
            />

            <button type="submit" className="btn btn-primary mt-1">
              Buscar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
