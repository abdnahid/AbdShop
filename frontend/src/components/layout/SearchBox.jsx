import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const SearchBox = () => {
    const [keyword,setKeyword]=useState("");
    const navigate = useNavigate();
    const submitHandler=(e)=>{
        e.preventDefault();
        if (keyword) {
            navigate(`/search/${keyword}`)
        }else{
            navigate("/")
        }
        
    }
  return (
    <form className="d-flex ms-4" onSubmit={submitHandler}>
        <input className="form-control me-2" value={keyword} type="search" placeholder="Search for products" aria-label="Search" onChange={(e)=>setKeyword(e.target.value)} />
        <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  )
}

export default SearchBox