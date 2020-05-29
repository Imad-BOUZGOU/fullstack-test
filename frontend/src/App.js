import React,{useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Home from "./pages/Home"





function App() {

    const [content, setContent] = useState("");
    return (
        <Router>
            <Route path="/" exact component={Home} />

        </Router>
    );
}

export default App;
