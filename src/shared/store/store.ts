import { atom } from "jotai";

const InputValue=atom('')
const FilterValue=atom(0)
const StudentList=atom<any>('')
const StudentRoll=atom('')
export {InputValue,FilterValue,StudentList,StudentRoll}