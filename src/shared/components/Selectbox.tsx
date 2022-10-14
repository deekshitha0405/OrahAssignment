import React from "react";
import styled from "styled-components";
import {  useSetAtom } from "jotai";
import { FilterValue } from "shared/store/store";

export const Selectbox: React.FC = () => {
  const setFilterValue = useSetAtom(FilterValue);
  const sortBy = [
    { id: 1, value: "Ascending Order" },
    { id: 2, value: "Descending Order" },
    { id: 3, value: "First Name" },
    { id: 4, value: "Last Name" },
  ];
  return (
    <Select
      defaultValue=""
      className="select"
      onChange={(e) => setFilterValue(Number(e.target.value))}
    >
      <option value="" disabled>
        Sort By
      </option>
      {sortBy.map((el) => (
        <option value={el.id} key={el.id}>
          {el.value}
        </option>
      ))}
    </Select>
  );
};

const Select = styled.select`
  padding: 0.75rem;
  border-radius: 0.25rem;
  border: none;
  outline: none;
`;
