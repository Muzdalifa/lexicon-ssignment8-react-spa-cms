import { useEffect, useState } from "react";

export type Person = {
  id: number,
  name : string,
  city:string,
  country:string,
  languages:string[],
  phoneNumber:string
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
      //get languages
      const languages = data.languages.$values
      setLanguages(languages)
      //get people
      const peoples = data.people.$values      
      //replace Ids with actual value
      const people = peoples.map((d:any)=>{
        const person = {} as Person;
        person.id = d.personId;
        person.name = d.name;
        person.city = cities.find((x:any) => x.cityId ===d.cityId)?.name
        person.phoneNumber = d.phoneNumber;
        console.log("d: ",d)
        //person.languages  = d.personLanguages.$values.
        person.languages  = d.personLanguages.$values.map(
          (personLanguage:any)=>languages
          .find(
            (language:any) => language.languageId === personLanguage.languageId).name
          )
        return person;
      });
      console.log("people", people)
      setPeople(people);
    }
  getData();
  },[]);

  return {cities,countries, languages, people}
}