import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/ButtonBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles";
import { Colors } from "shared/styles/colors";
import { CenteredContainer } from "shared/components/centered-container/centered-container.component";
import { Person } from "shared/models/person";
import { useApi } from "shared/hooks/use-api";
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component";
import {
  ActiveRollOverlay,
  ActiveRollAction,
} from "staff-app/components/active-roll-overlay/active-roll-overlay.component";
import { Selectbox } from "shared/components/Selectbox";
import { Input } from "shared/components/Input";
import { useAtom, useAtomValue } from "jotai";
import { FilterValue, InputValue, StudentList } from "shared/store/store";
import { RolllStateType } from "shared/models/roll";

export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false);
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({
    url: "get-homeboard-students",
  });
  const searchText = useAtomValue(InputValue);
  const [studentList, setStudentList] = useAtom(StudentList);
  const filterValue = useAtomValue(FilterValue);

  useEffect(() => {
    void getStudents();
  }, [getStudents]);

  useEffect(() => {
    setStudentList(data?.students);
  }, [data]);

  const onToolbarAction = (action: ToolbarAction) => {
    if (action === "roll") {
      setIsRollMode(true);
    }
  };

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      setIsRollMode(false);
    }
  };
  const getFilteredData = () => {
    if (searchText)
      return studentList.filter((el: Person) => {
        return (
          el.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
          el.last_name.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    else {
      return studentList;
    }
  };
  const sortProducts = (array: Array<any>) => {
    switch (String(filterValue)) {
      case '1':
        return array.sort((a, b) =>
          `${a.first_name } ${a.last_name}` < `${a.first_name} ${b.last_name}` ? -1 : 1
        );
      case "2":
        return array.sort((a, b) =>
         `${ b.first_name} ${b.last_name }`< `${a.first_name} ${a.last_name}` ? -1 : 1
        );
      case "3":
        return array.sort((a, b) => (a.first_name < b.first_name ? -1 : 1));
      case "4":
        return array.sort((a, b) => (a.last_name < b.last_name ? -1 : 1));
      default:
        return array;
    }
  };
  const updateRoll=(next:RolllStateType,id:number)=>{
    setStudentList(studentList.map((el:Person)=>el.id==id?{...el,rollType:next}:{...el}))
  }

  return (
    <>
      <S.PageContainer>
        <Toolbar onItemClick={onToolbarAction} />

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && data?.students && (
          <>
            {getFilteredData()?.length <= 0 ? (
              <CenteredContainer>
                No students found with entered name
              </CenteredContainer>
            ) : (
              sortProducts(getFilteredData())?.map((s: Person) => (
                <StudentListTile
                  key={s.id}
                  isRollMode={isRollMode}
                  student={s}
                  updateRoll={updateRoll}
                />
              ))
            )}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay
        isActive={isRollMode}
        onItemClick={onActiveRollAction}
      />
    </>
  );
};

type ToolbarAction = "roll" | "sort";
interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void;
}
const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick } = props;
  return (
    <S.ToolbarContainer>
      <div onClick={() => onItemClick("sort")}>
        <Selectbox />
      </div>
      <div>
        <Input />
      </div>
      <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
    </S.ToolbarContainer>
  );
};

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
};
