import { LinearProgress } from "@material-ui/core";
import { useEffect, useReducer } from "react";
import { useParams } from "react-router";
import { searchByCountryName } from "../service.js/countries";
import {countriesReducer, initialState} from "../helper/reducer";
import {ResponseActionTypes} from "../helper/action.type";


export default function CountryPage() {
  const { countryId } = useParams();
  const [ state, dispatch ] = useReducer(countriesReducer, initialState);
    console.log(countryId, 'countryId')

  useEffect(() => {
    dispatch({type: ResponseActionTypes.started}); // replace all dispatch() instead of setFunctions

    searchByCountryName(countryId).then((data) => {
      dispatch({type: ResponseActionTypes.success, payload: data});
    })
    .catch((err) => {
      dispatch({type: ResponseActionTypes.failure, payload: err.message});
    });
  }, [countryId]);

  if(state.isLoading) {
    return <LinearProgress />;
  }

  if(state.error) {
    return <p className="error">{state.error}</p>
  }

  const countryInfo = state?.countries[0] || {};

  return (
    <div>
      <h1>Region: {countryInfo?.region}</h1>
      <h2>Country: {countryInfo?.name?.common}</h2>
      <h3>Capital: {countryInfo?.capital}</h3>
      <h3>Official name: {countryInfo?.name?.official}</h3>
      <h3>Population: {countryInfo?.population}</h3>
      <img src={countryInfo?.flags?.png} alt={countryInfo?.flags?.alt} width="70" />
    </div>
  )
}