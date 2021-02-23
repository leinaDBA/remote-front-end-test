import React, {useEffect, useState} from 'react';
import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';

const PropertyListing = () => {
    const [data,setData] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:3000/api/properties')
        .then(response => response.json())
        .then(setData);
    },[])

    return (
      <div className="PropertyListing">
          {
              data
              .slice(0, 5)
              .map((property, index) => <PropertyCard key={index} {...property}/>)
          }
      </div>
    )
};

export default PropertyListing;
