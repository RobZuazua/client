/*
Author: Robbie Zuazua
Date: 10/16/18
Info: Main React File from Notable Calendar Challenge Frontend
*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

const styles = {
   display: "flex",
   flexDirection: "row",
}

class Home extends Component {
constructor(props) {
    super(props);
    this.state = {
      curPhysician: "",
      physicians: [],
      patients: [],
    };

    this.renderPhysicianList = this.renderPhysicianList.bind(this);
    this.renderPatientList = this.renderPatientList.bind(this);
    this.updatePatients = this.updatePatients.bind(this);

  }

componentDidMount(){
    let that = this;
    fetch('http://localhost:5000/api/getPhysicians').then(function(response) {
      return response.json();
    }).then(function(serverData) {
      console.log(serverData);
      that.setState({physicians:serverData});
      if (serverData){
        that.setState({curPhysician:serverData[0]});
        that.updatePatients(serverData[0]);
      }
    }).catch(function(err) {
        console.log(err);
        console.log("Unsuccessful fetch");
    });
}

updatePointer(physician){
    console.log(physician);
    this.setState({curPhysician:physician});
    this.updatePatients(physician);
}

renderPhysicianList(){
    return(
        <div>
            <ListGroup>
                { this.state.physicians.map(
                    physician => 
                    <ListGroupItem key={physician} tag="button" action onClick={() => this.updatePointer(physician)}> {physician} </ListGroupItem> 
                )
                }
            </ListGroup>
        </div>
    )
}
updatePatients(physician){
    if(physician){
        let that = this;
        fetch(`http://localhost:5000/api/getPatients/${physician}`).then(function(response) {
        return response.json();
        }).then(function(serverData) {
        console.log(serverData);
        console.log(serverData[0].patients);
        that.setState({patients:serverData[0].patients})
        }).catch(function(err) {
            console.log(err);
            console.log("Unsuccessful fetch");
        });

    }
}

renderPatientList(){
    const map = this.state.patients.map(
            (patient,index) => ( 
            <tr>
                <td>{index}</td>
                <td>{patient.patient}</td>
                <td>{patient.time}</td>
                <td>
                    <Badge color="success">{patient.Kind}</Badge>
                </td>
            </tr>
            )
        );
    
    return(map)     
}

  render() {
    return (
        <div>
    <div className="App">
      <h1>Notable Calendar Challenge</h1>
    </div>
    <div style={styles}>
    <Col xs="4">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Physicians
              </CardHeader>
              <CardBody>
                  {this.renderPhysicianList()}
              </CardBody>
            </Card>
    </Col>
    <Col xs="7">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> {this.state.curPhysician}
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Kind</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.renderPatientList()}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          </div>
    </div>
    );
  }
}
export default Home;