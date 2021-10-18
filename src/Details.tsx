import { City, Country, Language } from "./useApp";

function useDetails(props: {updateApp: Function}){
  async function editPerson(){ 
    //collecting values from details form
    const IDInput = document.getElementById("editID") as HTMLInputElement
    const id = IDInput.value
    
    const nameInput = document.getElementById("editName") as HTMLInputElement
    const name = nameInput.value
    
    const cityOption = document.getElementById("selectCity") as HTMLOptionElement
    const city = cityOption.value
    
    // const countryOption = document.getElementById("addCountry") as HTMLOptionElement
    // const country = countryOption.value
    
    const languageSelect = document.getElementById("selectLanguage") as HTMLSelectElement
    const languages:number[] = []
    for (let index = 0; index < languageSelect.selectedOptions.length; index++) {
       languages.push(Number(languageSelect.selectedOptions[index].value)); 
    }
    
    const phoneNumberInput = document.getElementById("editPhoneNumber") as HTMLInputElement
    const phoneNumber = phoneNumberInput.value

    const body= { name,city,languages,phoneNumber}

    //send data to edit
    await fetch(
      `https://localhost:44366/reactfrontend/${id}`,
      {
        method:"PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        }
      }
    )
    props.updateApp();
  }
  
  async function deletePerson(){
    const IDInput = document.getElementById("editID") as HTMLInputElement
    const id = IDInput.value
    await fetch(
      `https://localhost:44366/reactfrontend/${id}`,
      {
        method:"DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      }
    )
    props.updateApp();
  }

  return {editPerson, deletePerson}

}

export function Details(props:{cities: City [], countries: Country [], languages:Language [], updateApp: Function}){
  const {editPerson, deletePerson} = useDetails({updateApp: props.updateApp})
  return <div className="row p-3" id="edit-div">
  <form id="edit-form" className="p-0">
      <label className="me-3">Person details : </label>
      <input id="editID" name="id" type="hidden" />
      <span asp-validation-for="EditPerson.Name" className="text-danger"></span>
      <input asp-for="EditPerson.Name" id="editName" name="name" className="me-3" placeholder="Enter name" />
      <select asp-for="EditPerson.City" id="selectCity" name="city" className="me-3" placeholder="SElect">
        <option value="" selected>Select City</option>
        {
          props.cities.map((city:City) =>
          <option value={city.cityId} className="edit-city">{city.name}</option>
          )
        }
      </select>
      <select asp-for="EditPerson.Languages" className="multiple-select me-3" data-style="btn-default" id="selectLanguage" name="languages" multiple>
        <option value="">Select Languages</option>
        {
          props.languages.map((language:Language) =>
          <option value={language.languageId} className="edit-language" id={language.name}>{language.name}</option>
          )
        }
      </select>
      <span asp-validation-for="EditPerson.PhoneNumber"></span>
      <input asp-for="EditPerson.PhoneNumber" id="editPhoneNumber" name="phoneNumber" className="me-3" placeholder="Enter phonenumber" />
      <input type="button" className="btn btn-secondary me-3" id="edit-btn" value="Save" onClick={editPerson}/>
      <input type="button" className="btn btn-secondary" id="delete-btn" value="Delete" onClick={deletePerson}/>
  </form>
</div>
}

function useApp(): { people: any; cities: any; countries: any; languages: any; updateApp: any; } {
  throw new Error("Function not implemented.");
}
