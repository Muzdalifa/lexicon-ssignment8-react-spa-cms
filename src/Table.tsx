import { useEffect, useState } from "react";


type Person = {
  id: number,
  name : string,
  city:string,
  country:string,
  languages:string[],
  phoneNumber:string
}

function useTable(){

  const [people, setPeople] = useState([]);

  useEffect(()=>{
    fetch(
      "https://localhost:44366/reactfrontend",
      { 
        method: "GET"
      } 
    ).then(
      (res:any)=> res.json()
    ).then(setPeople)
    .catch(err => {
      console.log(err.message)
    });
  },[]);

  // const people:Person[] = [
  //   { ID: 1, Name:"Muzda", City:"Zanzibar",Country:"Tanzania",Languages:["Kiswahili,","English"],PhoneNumber:"2,3,4,5,6,7,8,9,10"},
  //   { ID: 2, Name:"Muzda", City:"Zanzibar",Country:"Tanzania",Languages:["Kiswahili,","English"],PhoneNumber:"2,3,4,5,6,7,8,9,10"},
  //   { ID: 3, Name:"Selma", City:"Hjo",Country:"Sweden",Languages:["Kiswahili,","Swedish"],PhoneNumber:"2,3,4,5,6,7,8,9,10"}
  // ]

function send(){
}

  return {people}
}

export function Table (){
  const {people} = useTable();
  return <>
  {
    people.map(
      (person:Person)=>
        <div className="row border border-2 py-2">
              <div className="col-md-1">{person.id}</div>
              <div className="col-md-1">{person.name}</div>
              <div className="col-md-2">{person.city}</div>
              {/* <div className="col-md-4 display-language">
                  {
                    person.Languages.map((language)=>{
                      return <span className="person-id-@Model.ID language">{language}</span>
                      }
                    )  
                  }    
              </div> */}
              <div className="col-md-2">{person.phoneNumber}</div>
          </div>
    ) 
  }
  </>
}