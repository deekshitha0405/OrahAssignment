import { atom } from "jotai";

const InputValue=atom('')
const FilterValue=atom(0)
const StudentList=atom<any>('')
export {InputValue,FilterValue,StudentList}