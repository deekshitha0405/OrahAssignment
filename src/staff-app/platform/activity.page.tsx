import React, { useEffect } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { useApi } from "shared/hooks/use-api";
import { CenteredContainer } from "shared/components/centered-container/centered-container.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Activity } from "shared/models/activity";

export const ActivityPage: React.FC = () => {

  const [getStudents, data, loadState] = useApi<{ activity: Activity[] }>({
    url: "get-activities",
  });
  useEffect(() => {
    void getStudents();
  }, [getStudents]);

  useEffect(()=>{
console.log(data?.activity)
  },[data])
  
  return <S.Container> {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}
</S.Container>
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 0;
  `,
}
