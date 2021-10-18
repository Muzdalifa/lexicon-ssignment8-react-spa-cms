
import { City, Language, Person } from "./useApp";

function useTable(){
  function showDetails(person:Person){
    console.log("details: ",person);
    (document.getElementById("editName") as HTMLInputElement).value = person.name;
    (document.getElementById("editPhoneNumber") as HTMLInputElement).value = person.phoneNumber;
    (document.getElementById("editID") as HTMLInputElement).value = person.id.toString();
    
    //set city
    // clear city selected
    //@ts-ignore
    for (const option of document.querySelectorAll("option.edit-city[selected]")) {
      option.removeAttribute('selected');
    }
     //change the value of drop down list
     const cityList = document.getElementById("selectCity") as any;
     
     for (var i = 1; i < cityList.options.length; i++) {
      console.log("cityList: ",cityList.options[i].innerHTML)
         if (cityList.options[i].innerHTML === person.city.name) {
             cityList.selectedIndex = i;
             break;
         }
     }

    //set language
    // clear selected languages
    //@ts-ignore
    for (const option of document.querySelectorAll("option.edit-language[selected]")) {
      console.log("check option",option)
      option.removeAttribute('selected');
    }
      // set selected new language
      person.languages.forEach(
        (language:Language) => {
          const options = document.querySelector(`option#${language.name}.edit-language`)
          options?.setAttribute('selected', 'selected');
        }
      )  
     
  }
  return {showDetails}
}
export function Table (props:{people:Person []}){
  const {showDetails} = useTable()
  return <>
  {
    props.people.map(
      (person:Person)=>
        <div className="row border border-2 py-2">
              <div className="col-md-1">{person.id}</div>
              <div className="col-md-1">{person.name}</div>
              <div className="col-md-2">{person.city.name}</div>
              <div className="col-md-2">{person.country.name}</div>
              <div className="col-md-3 display-language">
              {
                person.languages.map((language: Language, index:number)=>{
                  
                  return <span className={language.name}>{ index ? ", " : "" }{language.name}</span>
                  }
                )  
              }    
              </div>
              <div className="col-md-2">{person.phoneNumber}</div>
              <div className="col-md-1"><a href="#edit-div" onClick={()=>showDetails(person)}>Details</a></div>
          </div>
    ) 
  }
  </>
}