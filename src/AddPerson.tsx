import { City, Country, Language } from "./useApp";

function useAddPerson(){
  function sendData(){
    console.log("send data")

  }
  return {sendData}
} 

export function AddPerson (props:{cities: City [], countries: Country [], languages:Language []}){
  const {sendData} = useAddPerson()
  return <div>
    <form id="create-form" className="p-0">
        <span asp-validation-for="Person.Name" className="text-danger"></span>
        <input asp-for="Person.Name" id="name" placeholder="Enter name" className="me-3" />
        <select asp-for="Person.City" className="me-3" id="addCity">
            <option value="" selected>Select City</option>
            {
              props.cities.map((city:City) =>
              <option value={city.cityId}>{city.name}</option>
              )
            }
        </select>
        <select asp-for="" className="me-3" id="addCountry">
            <option value="" selected>Select Country</option>
            {
              props.countries.map((country:Country) =>
              <option value={country.countryId}>{country.name}</option>
              )
            }
        </select>
        <select asp-for="" className="me-3" id="addLanguage">
            <option value="" selected>Select Languages</option>
            {
              props.languages.map((language:Language) =>
              <option value={language.languageId}>{language.name}</option>
              )
            }
        </select>
        <span asp-validation-for="Person.PhoneNumber" className="text-danger"></span>
        <input asp-for="Person.PhoneNumber" id="phone" placeholder="Enter phone number" className="me-3" />
        <input type="button" className="btn btn-secondary me-3" value="Add" onClick={sendData}/>
        <input type="button" className="btn btn-secondary me-3" value="Reset" id="reset" onClick={console.log} />
    </form>
  </div>
}