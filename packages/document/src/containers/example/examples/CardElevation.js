import { useState } from "react";
import { Card } from "@htmlplus/react";

const CardElevation = () => {
  const [elevation, setElevation] = useState("12");

  const onChange = event => {
    setElevation(event.target.value);
  };

  return <div className="ex-card-elevation">    
    <Card elevation={elevation}></Card>    
    <br />    
    <input type="range" value={elevation} min="1" max="24" onChange={event => onChange(event)} />    
    <style>{".ex-card-elevation plus-card {  height: 12rem;  width: 12rem;  margin: auto;}.ex-card-elevation input[type=\"range\"] {  display: block;  width: 12rem;  margin: auto;}"}</style></div>;
};

export default CardElevation;