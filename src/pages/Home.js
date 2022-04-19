import React from 'react'
import '../components/Design.css'

function Home(){

    return(
        <div>
            <br />
            <h1>Home Page</h1>
            <p>
            Shipments CRUD page:
            <br/><br/>
            Create an HTML Page with relevant Javascript to:
            <br/>
            - Load shipments data with AJAX from https://my.api.mockaroo.com/shipments.json?key=5e0b62d0<br/>
            (Note that that link might get overloaded, so you can also use off line version renaming shipment.txt file)
            <br/>
            - Display data in generated table (see attachment ShipmentsTable.png as example)
            <br/>
            - Provide a button in the table to open a panel to visualize details of single row (see attachment ShipmentsDetails.png as example) 
            <br/><br/>
            TECH:
            <br/>
            - You can implement it with vanilla javascript
            <br/>
            - More points if you implement it with React
            <br/><br/>
            BENEFICIAL ADDITIONAL POINTS:
            <br/>        
            - Use one CSS template (for example get some from here: https://www.creative-tim.com/templates/free)
            <br/>
            - Implement delete button on the table
            <br/>
            - Implement update on Details panel (field values could be changed in the UI)
            <br/>
            - Use Axios
            <br/>
            - Use React + Redux
            <br/>
            - Use React + Redux + Thunk middleware
            </p>
        </div>
    )
}
export default Home