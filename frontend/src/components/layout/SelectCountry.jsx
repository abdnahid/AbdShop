import React from 'react';
import countries from './countries';

const SelectCountry = ({onSelectCountry}) => {
  return (
    <select className="form-select" aria-label="Default select example" onChange={(e)=>onSelectCountry(e.target.value)}>
        <option value={undefined}>Select A country</option>
        {countries.map((x,index)=><option key={index+1} value={x.code3}>{x.name}</option>)}
    </select>
  )
}

export default SelectCountry