import React, { useEffect } from "react";
import styled from "styled-components";
import { Spacing } from "shared/styles/styles";
import { useApi } from "shared/hooks/use-api";
import { CenteredContainer } from "shared/components/centered-container/centered-container.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Activity } from "shared/models/activity";
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component";

export const ActivityPage: React.FC = () => {
  const [getStudents, data, loadState] = useApi<{ activity: Activity[] }>({
    url: "get-activities",
  });
  useEffect(() => {
    void getStudents();
  }, [getStudents]);

  useEffect(() => {
    console.log(data?.activity);
  }, [data]);

  return (
    <S.Container>
      {" "}
      {loadState === "loading" && (
        <CenteredContainer>
          <FontAwesomeIcon icon="spinner" size="2x" spin />
        </CenteredContainer>
      )}
      <CardContainer>
        {loadState === "loaded" &&
          data?.activity&&
          <>
            { data?.activity.length<=0 ? (
              <CenteredContainer>
                No Activities found
              </CenteredContainer>
            ) : (data?.activity.map((el, index) => 
            <Card key={index}>
              <h2>{el.entity.name}</h2>
              <h3>
                Created at:{" "}
                <DateContainer>
                  {new Date(el.date).toLocaleDateString() +
                    " " +
                    new Date(el.date).toLocaleTimeString()}
                </DateContainer>
              </h3>
              <h4>Active Student list</h4>
              <StudentListContainer>
                {el.entity.student_roll_states.map((item: any, index) => (
                  <StudentList key={index}>
                    <h5>{item.name}</h5>
                    <RollStateIcon type={item.roll_state} />
                  </StudentList>
                ))}
              </StudentListContainer>
            </Card>))}</>}
         
      </CardContainer>
      {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 0;
  `,
};

const CardContainer = styled.div`
  margin-top: 5rem;
  display: grid;
  justify-content: center;
  width: 100%;
  grid-template-columns: auto auto auto auto;
  grid-gap: 0.75rem;
`;
const Card = styled.div`
  background: white;
  width: 14rem;
  border-radius: 0.5rem;
  padding: 1.5rem;
  border: 0.1rem solid #3a415d;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    margin-bottom: 0;
  }
  h4{
    margin-top:0;
  }
`;
const StudentList = styled.div`
  display: flex;
  background: #f5f5f5;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem;
  padding: 0 0.75rem;
  border-radius: 0.5rem;
  h5{
    margin:0.75rem 0.5rem;
  }
  border: 0.1rem solid #3a415d;
`;
const StudentListContainer = styled.div`
  width: 100%;
  height: 10rem;
  overflow-y: auto;
`;
const DateContainer = styled.span`
  font-size: 0.75rem;
`;
