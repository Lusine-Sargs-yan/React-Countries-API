import { CircularProgress } from "@material-ui/core";
import { useEffect, useReducer, useState } from "react"
import { useHistory } from "react-router";
import List from "../components/List";
import { FetchActionTypes } from "../helper/action.type";
import { getAllCountries } from "../service.js/countries";
import "./Country.css";


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


export default function Contries() {

  const [countriesSate, dispatch] = useReducer(countriesReducer, initialState);
  //initialState is object
  //dispatch=== action is function
  // state is object countriesSate = state

  const history = useHistory();// using for click other page single country history 

  useEffect(() => {
    dispatch({type: 'started'}); // repalce all dispatch() instead of setFunctions 

    getAllCountries().then((data) => {
      dispatch({type: 'success', countries: data}); 
    })
    .catch((err) => {
      dispatch({type: 'failure', error: err});
    });
  }, []);

  console.log(countriesSate, "state:::");
  if(countriesSate.isLoading) {
    return <CircularProgress />//<p>Loading...</p>
  }

  if(countriesSate.error) {
    return <p className="error">{countriesSate.error}</p>
  }

  const handleCountryClick = (countryName) => {// for every country click
    history.push(`/countries/${countryName}`);
  };

  return (
    <div>
      <h1 className="title">All Countries List</h1>
      <List onItemClick={handleCountryClick} items={countriesSate.countries}>
      <h3>If you want to know more about every country, please click on your favorite country.</h3>
      </List>
    </div>
  )
}


