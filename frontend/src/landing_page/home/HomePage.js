import React from 'react';
import Hero from './Hero';
import Status from './Status';
import Pricing from './Pricing';
import Awards from './Awards';

function HomePage() {
    return ( 
       <>
         <Hero />
         <Awards />
         <Status />
         <Pricing />  
       </>
     );
}

export default HomePage;
