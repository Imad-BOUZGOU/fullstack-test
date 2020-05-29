import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import MapChart from "./components/projects-maps.component"
import ReactTooltip from "react-tooltip";

import Filter from "./components/filter.component"
import App from "../../App";


const Project = props => (
    <tr>
        <td>{props.project.company}</td>
        <td>{props.project.country}</td>
        <td>{props.project.description}</td>
        <td>{props.project.services}</td>

    </tr>
)

export  const ProjectsList =()=> {
    const [content, setContent] = useState("");
    const [projects, setProjects] = useState([]);

    console.log(projects);

     useEffect(()=>{
         axios.get('http://localhost:5000/projects/')
             .then(response => {
                 setProjects( response.data )
             })
             .catch((error) => {
                 console.log(error);
             })
     },[])



    const projectList=()=> {
        return projects.map(projectN => {
            return <Project project={projectN} key={projectN._id}/>;
        })
    }

  const getCountryData=(country)=>{

    const data=  projects.filter((p)=>p.country==country)
      return data;
  }
    console.log(getCountryData("France"));
     const project=getCountryData(content)
        return (
            <div>

                <MapChart setTooltipContent={setContent} />

                <ReactTooltip>

                    <div style={{display:'flex',flexDirection:'column',overflowY:'auto'}}>

                        <div style={{marginBottom:20}}><h5 style={{color:'red'}}>{content}</h5></div>
                        {project.map((value, index) => (
                            <>
                                <div style={{marginBottom:  20}}><h5 style={{color:'green'}}>{value.company}</h5></div>
                                <div style={{marginBottom: 20}}>{value.description}</div>
                            </>
                        ))

                        }
                    </div>
                </ReactTooltip>

            </div>
        );



}
export default ProjectsList;
