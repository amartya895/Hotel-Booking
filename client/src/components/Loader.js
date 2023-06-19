import React from "react";
import { useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";



function Loader() {
  let [loading, setLoading] = useState(true);
 

  return (
    <div>
      <div className="sweet-loading text-center" style={{marginTop:250}}>
        <PropagateLoader
          color="#36d7b7"
          loading={loading}
         
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loader;
