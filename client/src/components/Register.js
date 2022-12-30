import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const Register = () => {
  const [name, setName] = useState("");
  const [pic,setPic]=useState('');
  const history=useNavigate()
  function setData(e){
  setName(e.target.value)
  }
  function setImg(e){
    setPic(e.target.files[0])
    console.log(e.target.files[0])
  }

async function addUserData(e){
  e.preventDefault();
var formData=new FormData()
formData.append('name',name)
formData.append('photo',pic)

const config={
 headers:{
  "Content-Type":"multipart/form-data"
 }
}
const res= await axios.post('/register',formData,config);
if(res.data.status===201){
  history('/')
}else{
  console.log('error')
}


}


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
      }}
    >
      <div>
        <h1>upload your image here</h1>
      </div>

      <div className="addForm" style={{ width: "800px", marginLeft: "500px" }}>
        <Form
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              {" "}
              <b>User Name</b>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={setData}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              {" "}
              <b>Select Your Image</b>{" "}
            </Form.Label>
            <Form.Control type="file" name="photo" onChange={setImg} />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            style={{ marginTop: "10px", width: "100px" }}
            onClick={addUserData}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
