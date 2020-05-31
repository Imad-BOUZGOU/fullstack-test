import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import MapChart from "./components/projects-maps.component"
import ReactTooltip from "react-tooltip";
import Dropdown from "react-bootstrap/Dropdown";
import _ from "lodash";

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
    const [service, setService] = useState("All");


    //   console.log(projects);

     useEffect(()=>{
         axios.get('http://localhost:5000/projects/')
             .then(response => {
                 setProjects( response.data )
             })
             .catch((error) => {
                // console.log(error);
             })
     },[])



    const projectList=()=> {
        return projects.map(projectN => {
            return <Project project={projectN} key={projectN._id}/>;
        })
    }

  const getCountryData=(country)=>{

    var data=  projects.filter((p)=>p.country==country)
      if(service!="All"){
          data=data.filter((p)=>p.services==service)
      }
      return data;
  }


    const getServicesTo=()=>{
        const servicesName = _.uniq(
        _.map(projects, function(p) {

            return p.services; }))

        return ["All",...servicesName];
    }

    const getServices=()=>{

       return(
           <div>
               <Dropdown >
                   <Dropdown.Toggle variant="success" id="dropdown-basic" >
                       Services
                   </Dropdown.Toggle>
                   <Dropdown.Menu>
                       {

                           getServicesTo().map((value, index) => (
                               <>
                                   <Dropdown.Item key={index} onClick={()=>{setService(value)}}>{value}</Dropdown.Item>

                               </>
                           ))

                       }
                   </Dropdown.Menu>
               </Dropdown>
           </div>

       )
    }
    const  services=getServices(content)
    //console.log(getCountryData("France"));
     const project=getCountryData(content)
        return (
            <div>
                {getServices()}
            <div>

            <div>
                <MapChart setTooltipContent={setContent} />

                <ReactTooltip>

                    <div style={{display:'flex',flexDirection:'column',overflowY:'auto'}}>

                        <div style={{marginBottom:20}}><h5 style={{color:'red'}}>{content}</h5></div>
                        {project.map((value, index) => (
                            <div key={index}>

                                <div style={{marginBottom:  20}}><h5 style={{color:'green'}}>{value.company} - {value.services}</h5></div>
                                <div style={{marginBottom: 20}}>{value.description}</div>
                            </div>
                        ))

                        }
                    </div>
                </ReactTooltip>
            </div>

            </div>
            </div>
        );



}
export default ProjectsList;
