import { CircularProgress } from "@material-ui/core";
import { useEffect, useReducer } from "react"
import List from "../components/List";
import { ResponseActionTypes } from "../helper/action.type";
import { useNavigate } from "react-router-dom";
import { getAllCountries } from "../service.js/countries";
import {countriesReducer, initialState} from "../helper/reducer";
import "./Country.css";


export default function Countries() {

  const [state, dispatch] = useReducer(countriesReducer, initialState);
  //initialState is a object
  //dispatch === action is a function
  // state is an object

  const navigate = useNavigate();

  useEffect(() => {
    dispatch({type: ResponseActionTypes.started}); // replace all dispatch() instead of setFunctions

    getAllCountries().then((data) => {
      dispatch({type: ResponseActionTypes.success, payload: data});
    })
    .catch((err) => {
      dispatch({type: ResponseActionTypes.failure, payload: err});
    });
  }, []);

  if(state.isLoading) {
    return <CircularProgress />//<p>Loading...</p>
  }

  if(state.error) {
    return <p className="error">{state.error}</p>
  }

  const handleCountryClick = (countryName) => {// for every country click
    navigate(`/countries/${countryName}`);
  };

  return (
    <div>
      <h1 className="title">All Countries List</h1>
      <List onItemClick={handleCountryClick} items={state.countries}>
      <h3>If you want to know more about every country, please click on your favorite country.</h3>
      </List>
    </div>
  )
}


