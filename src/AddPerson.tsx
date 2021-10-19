import { City, Country, Language } from "./useApp";

function useAddPerson(props:{updateApp:Function}){
  async function sendData(e:any){
    e.preventDefault()
    //collecting values from addPerson form
    const nameInput = document.getElementById("name") as HTMLInputElement
    const name = nameInput.value
    const cityOption = document.getElementById("addCity") as HTMLOptionElement
    const city = cityOption.value
    const countryOption = document.getElementById("addCountry") as HTMLOptionElement
    const country = countryOption.value
    const languageSelect = document.getElementById("addLanguage") as HTMLSelectElement
    const languages:number[] = []
    for (let index = 0; index < languageSelect.selectedOptions.length; index++) {
       languages.push(Number(languageSelect.selectedOptions[index].value)); 
    }
    const phoneNumberInput = document.getElementById("phone") as HTMLInputElement
    const phoneNumber = phoneNumberInput.value
    
    const body= {name,city,languages,phoneNumber}
    
    await fetch(
      "https://localhost:44366/reactfrontend",
      {
        method:"POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        }
      }
    )
    props.updateApp()
    e.target.reset()
  }
  return {sendData}
} 

export function AddPerson (props:{cities: City [], countries: Country [], languages:Language [], updateApp:Function}){
  const {sendData} = useAddPerson({updateApp: props.updateApp})
  return <div>
    <form id="create-form" className="p-0" onSubmit={sendData}>
        <input id="name" placeholder="Enter name" className="me-3" required pattern="[a-zA-ZåÅÖöÄä]{2,}"/>
        <select className="me-3" id="addCity" required>
            <option value="" selected>Select City</option>
            {
              props.cities.map((city:City) =>
              <option value={city.cityId}>{city.name}</option>
              )
            }
        </select>
        <select className="me-3" id="addCountry" required>
            <option value="" selected>Select Country</option>
            {
              props.countries.map((country:Country) =>
              <option value={country.countryId}>{country.name}</option>
              )
            }
        </select>
        <select className="me-3" id="addLanguage" multiple required>
            <option value="" >Select Languages</option>
            {
              props.languages.map((language:Language) =>
              <option value={language.languageId}>{language.name}</option>
              )
            }
        </select>
        <input id="phone" placeholder="Enter phone number" className="me-3" required pattern="\+\d{11,12}"/>
        <input type="submit" className="btn btn-secondary me-3" value="Add"/>
    </form>
  </div>
}