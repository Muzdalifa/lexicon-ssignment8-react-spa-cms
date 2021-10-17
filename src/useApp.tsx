import { useEffect, useState } from "react";

export type City = { cityId: number, name: string, countryId: number}
export type Country = { countryId: number, name: string}
export type Language = { languageId: number, name: string}

export type Person = {
  id: number,
  name : string,
  city: City,
  country: Country,
  languages: Language[],
  phoneNumber: string
}

export function useApp(){

  const [people, setPeople] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(()=>{
    async function getData(){
       const responce = await fetch(
        "https://localhost:44366/reactfrontend",
        { method: "GET"} 
      );
      //console.log(responce)
      const data = await responce.json()
      //get cities
      const cities = data.cities.$values
      setCities(cities)
      //get countries
      const countries = data.countries.$values
      setCountries(countries)
      //get languages
      const languages = data.languages.$values
      setLanguages(languages)
      //get people
      const peoples = data.people.$values
      //replace Ids with actual value before setting people
      const people = peoples.map((d:any)=>{
        const person = {} as Person;
        person.id = d.personId;
        person.name = d.name;
        person.city = cities.find((x:any) => x.cityId ===d.cityId)
        console.log("city to :", cities)
        person.country = countries.find((x:any) => x.countryId === person.city.countryId)
        person.phoneNumber = d.phoneNumber;
        console.log("d: ",d)
        //person.languages  = d.personLanguages.$values.
        person.languages  = d.personLanguages.$values.map(
          (personLanguage:any)=>languages
          .find(
            (language:any) => language.languageId === personLanguage.languageId)
          )
        return person;
      });
      //console.log("people", people)
      setPeople(people);
    }
  getData();
  },[]);

  return {cities,countries, languages, people}
}