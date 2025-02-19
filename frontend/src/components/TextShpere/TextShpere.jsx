import React, { useEffect } from "react";

import "./TextShpere.css"; 

// Importing TagCloud package 
import TagCloud from "TagCloud"; 


const TextShpere = () => { 
   // Animation settings for Text Cloud 
   useEffect(() => { 
       const container = ".tagcloud"; 
       const texts = [ 
           "HTML", 
           "CSS", 
           "SASS", 
           "JavaScript", 
           "React", 
           "Vue", 
           "Nuxt", 
           "NodeJS",
           "Babel", 
           "Jquery", 
           "ES6" ,
           "GIT", 
           "GITHUB", 
           ];

           const options = { 
               radius: 300, 
               maxSpeed: "normal", 
               initSpeed: "normal", 
               keep: true, 
           }; 

           TagCloud (container, texts, options); 

           // Cleanup function
           return () => {
               const element = document.querySelector('.tagcloud');
               if (element) {
                   element.innerHTML = '';
               }
           }; 
   }, []); 

   return ( 
       <> 
           <section id="TextShpere">  {/* Added section with ID */}
           <div className="text-shpere"> 
           {/* span tag className must be "tagcloud" */} 
               <span className="tagcloud"></span> 
           </div> 
           </section>
       </> 
   ); 
}; 

export default TextShpere;