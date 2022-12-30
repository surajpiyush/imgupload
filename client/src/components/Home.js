import React, { useEffect,useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {json, NavLink} from 'react-router-dom';
import axios from 'axios';

const Home = () => {
const [data,setData]=useState([])
async function getUserdata(){
  const res=await axios.get('/getdata',{
    headers:{
      "Content-Type":"application/json"
    }
  }) 
 
if(res.data.status===201){
  console.log('get data')
  setData(res.data.data)
}

}




useEffect(()=>{
  getUserdata()
},[])


  return (
    <div>
    <h1>file upload profile</h1>
    <div><Button variant="primary"> <NavLink to='/register' style={{color:'white' ,textDecoration:"none"}} >Add User</NavLink> </Button></div>
    {
      data.length>0? data.map((item,i)=>{
        return(
          <div key={i} style={{display:'flex',flexDirection:'row'}} >
          <div className="card">
    <Card style={{ width: '18rem' }}>
      <Card.Img  src={`/uploads/${item.userimg}`} />
      <Card.Body>
        <Card.Title>Name:{item.username}</Card.Title>
        <Card.Text>
         {item.date}
        </Card.Text>
        <Button variant="danger">Delete</Button>
      </Card.Body>
    </Card>
    </div>
          </div>
        )
      }):''
    }
    </div>
  )
}

export default Home