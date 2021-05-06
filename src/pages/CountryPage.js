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
      dispatch({type: 'failure', error: err.message});
    });
  }, []);

  if(countryResponse.isLoading) {
    return <LinearProgress />;
  }

  if(countryResponse.error) {
    return <p className="error">{countryResponse.error}</p>
  }

  // return (
  //   <div>
  //     <h1>Region: {countryResponse.countries[0]?.region}</h1>
  //     <h2>Country: {countryResponse.countries[0]?.name}</h2>
  //     <h4>Capital: {countryResponse.countries[0]?.capital}</h4>
  //     <h4>Native Name: {countryResponse.countries[0]?.nativeName}</h4>
  //     <h4>Population: {countryResponse.countries[0]?.population}</h4>
  //     <img width="70" alt={countryResponse.countries[0]?.name} src={countryResponse.countries[0]?.flag} />
  //   </div>
  // )
  // yess works

  const countryInfo = countryResponse?.countries[0] || {};
  console.log(countryInfo, "countryInfo:::");


  return (
    <div>
      <h1>Region: {countryInfo?.region}</h1>
      <h2>Country: {countryInfo?.name}</h2>
      <h3>Capital: {countryInfo?.capital}</h3>
      <h3>Native name: {countryInfo?.nativeName}</h3>
      <h3>Population: {countryInfo?.population}</h3>
      <img src={countryInfo?.flag} alt={countryInfo?.name} width="70" />
    </div>
  )
}