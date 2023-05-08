import { useState } from "react";
import { data } from "./data.js";
import { v4 as uuidv4 } from 'uuid';

const Students = () => {
  let [students, setStudents] = useState(data);
  let [newStudent, setNewStudent] = useState({name:'',price:0});
  function handleSearch(e) {
    if (e.target.value.trim()=="") {
        setStudents(data);
    }
    else{
        let searchedStudents = students.filter((student) =>
        student.name.trim().toLowerCase().includes(e.target.value.trim().toLowerCase())
        );
        setStudents(searchedStudents);
    }
  }
  function handleSort(e){
    e.preventDefault()
    let sortedStudents = [...students.sort((a,b)=>a.price-b.price)];
    setStudents(sortedStudents);
  }
  function handleDelete(id){
    let deletedStudent =  students.find((student,idx)=>{
        return {
            student: student.id==id,
            index:idx
        }
    });
    students.splice(deletedStudent.index,1);
    let newArray = [...students];
    setStudents(newArray);
      
  
  }
  function handleSubmit(e){
    e.preventDefault();
    newStudent.id = uuidv4();
    console.log('new student: ',newStudent);
    setStudents([...students,newStudent]);
    setNewStudent({name:'',price:0});
  }
  function handleAdd(e){
    setNewStudent({...newStudent,[e.target.name]:e.target.value});
  }
  function newdelete(id){
        let deletedStudent =  students.find((student,idx)=>{
        return {
            student: student.id==id,
            index:idx
        }
    });
    students.splice(deletedStudent.index,students.length);
    let newArray = [...students];
    setStudents(newArray);
  }
  return (
    <>
    <form className="form">
      <input onChange={(e) => handleSearch(e)} placeholder="searched" />
      <button className="sort" onClick={handleSort}>Sort by Price</button>
     
    </form>
      
      <ul>
        {students &&
          students.map((student) => {
            return (
              <ul  className="list">
                <div className="li">
                  <li key={student.id}>
                 {student.name} | {student.price}, id: {student.id}
                 
                 </li>
                 <button className="delete" onClick={()=>handleDelete(student.id)}>delete</button>
                </div>
               
              </ul>
              
            );
          })}
      </ul>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <input name="name" onChange={(e)=>handleAdd(e)} value={newStudent.name} placeholder="enter name" type="text" />
        <input name="price" onChange={(e)=>handleAdd(e)} value={newStudent.price} placeholder="enter price" type="number" min="0" max="100" />
        <button className="add" type="submit">Add New Student</button>
      
      </form>
      <div className="clear" >
        <button className="clears" onClick={(e)=>newdelete(e)}>Clear</button>
      </div>
      
    </>
  );
};

export default Students;