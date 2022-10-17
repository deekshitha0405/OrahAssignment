import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { BorderRadius, Spacing } from "shared/styles/styles";
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component";
import { useAtomValue, useSetAtom } from "jotai";
import { StudentList,StudentRoll } from "shared/store/store";
import { Person } from "shared/models/person";

export type ActiveRollAction = "exit"|"complete";
interface Props {
  isActive: boolean;
  onItemClick: (action: ActiveRollAction, value?: string) => void;
}

export const ActiveRollOverlay: React.FC<Props> = (props) => {
  const { isActive, onItemClick } = props;
  const studentList = useAtomValue(StudentList);
  const [rollTypeCount, setRollTypeCount] = useState({
    present: 0,
    absent: 0,
    late: 0,
  });
  const setStudentRoll=useSetAtom(StudentRoll)
  useEffect(() => {
    if (studentList) {
      let presentCount = 0;
      let lateCount = 0;
      let absentCount = 0;
      studentList.forEach((el: Person) => {
        if (el?.rollType == "present") presentCount += 1;
        else if (el?.rollType == "late") lateCount += 1;
        else if (el?.rollType == "absent") absentCount += 1;
      });
      setRollTypeCount({
        present: presentCount,
        absent: absentCount,
        late: lateCount,
      });
    }
  }, [studentList]);
  return (
    <S.Overlay isActive={isActive}>
      <S.Content>
        <div>Class Attendance</div>
        <div>
          <RollStateList
            stateList={[
              { type: "all", count: studentList?.length },
              { type: "present", count: rollTypeCount.present },
              { type: "late", count: rollTypeCount.late },
              { type: "absent", count: rollTypeCount.absent },
            ]}
            onItemClick={setStudentRoll}
          />
          <div style={{ marginTop: Spacing.u6 }}>
            <Button color="inherit" onClick={() => onItemClick("exit")}>
              Exit
            </Button>
            <Button
              color="inherit"
              style={{ marginLeft: Spacing.u2 }}
              onClick={() => onItemClick("complete")}
            >
              Complete
            </Button>
          </div>
        </div>
      </S.Content>
    </S.Overlay>
  );
};

const S = {
  Overlay: styled.div<{ isActive: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    height: ${({ isActive }) => (isActive ? "120px" : 0)};
    width: 100%;
    background-color: rgba(34, 43, 74, 0.92);
    backdrop-filter: blur(2px);
    color: #fff;
  `,
  Content: styled.div`
    display: flex;
    justify-content: space-between;
    width: 52%;
    height: 100px;
    margin: ${Spacing.u3} auto 0;
    border: 1px solid #f5f5f536;
    border-radius: ${BorderRadius.default};
    padding: ${Spacing.u4};
  `,
};
