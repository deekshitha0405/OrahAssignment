import React from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { InputValue } from "shared/store/store";

export const Input: React.FC = () => {
  const [value, setValue] = useAtom(InputValue);
  return (
    <InputComp
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search by Name "
    ></InputComp>
  );
};

const InputComp = styled.input`
  padding: 0.75rem;
  border-radius: 0.25rem;
  border: none;
  outline: none;
`;
