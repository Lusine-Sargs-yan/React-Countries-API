import { LinearProgress } from "@material-ui/core";
import { useEffect, useReducer } from "react";
import { useParams } from "react-router";
import { FetchActionTypes } from "../helper/action.type";
import { searchByCountryName } from "../service.js/countries";

const initialState = {
  countries: [],
  isLoading: false,
  error: ''
}; 

const countriesReducer = (state, action) => {
  console.log(state, action);

  switch (action.type) {
    case FetchActionTypes.started: 
      return {...state, isLoading: true};
    case FetchActionTypes.success:
      return {...state, countries: action.countries, isLoading: false};
    case FetchActionTypes.failure:
      return {...state, error: action.error, isLoading: false};
    default:
      return initialState;
  }
  //return initialState;
};

export default function CountryPage() {
  const {countryId} = useParams();
  const [countryResponse, dispatch] = useReducer(countriesReducer, initialState);


  useEffect(() => {
    dispatch({type: 'started'}); // repalce all dispatch() instead of setFunctions 

    searchByCountryName(countryId).then((data) => {
      dispatch({type: 'success', countries: data}); 
    })
    .catch((err) => {
      dispatch({type: 'failure', error: err});
    });
  }, []);

  if(countryResponse.isLoading) {
    return <LinearProgress />;
  }

  // return (
  //   <div>
  //     <h1>Region: {countryInfo.countries[0]?.region}</h1>
  //     <h2>Country: {countryInfo.countries[0]?.name}</h2>
  //     <h4>Capital: {countryInfo.countries[0]?.capital}</h4>
  //     <h4>Native Name: {countryInfo.countries[0]?.nativeName}</h4>
  //     <h4>Population: {countryInfo.countries[0]?.population}</h4>
  //     <img width="70" alt={countryInfo.countries[0]?.name} src={countryInfo.countries[0]?.flag} />
  //   </div>
  // )

  // yess works
  return (
    <div>
      {countryResponse.countries.map(({name, capital, nativeName, population, flag, region }) => {

        return (
          <div>
            <h1>Region: {region}</h1>
            <h2>Country: {name}</h2>
            <h3>Capital: {capital}</h3>
            <h3>Native name: {nativeName}</h3>
            <h3>Population: {population}</h3>
            <img src={flag} alt={name} width="70" />
          </div>
        )
      })}
      
    </div>
  )
}