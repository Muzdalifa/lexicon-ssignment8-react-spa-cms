
import { Language, Person } from "./useApp";

export function Table (props:{people:Person []}){
  
  return <>
  {
    props.people.map(
      (person:Person)=>
        <div className="row border border-2 py-2">
              <div className="col-md-1">{person.id}</div>
              <div className="col-md-1">{person.name}</div>
              <div className="col-md-2">{person.city.name}</div>
              <div className="col-md-2">{person.country.name}</div>
              <div className="col-md-4 display-language">
              {
                person.languages.map((language: Language, index:number)=>{
                  
                  return <span className={language.name}>{ index ? ", " : "" }{language.name}</span>
                  }
                )  
              }    
              </div>
              <div className="col-md-2">{person.phoneNumber}</div>
          </div>
    ) 
  }
  </>
}