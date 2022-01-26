import React from 'react';
import FacebookLogin from 'react-facebook-login';
import './Facebook.css'
import { useNavigate } from 'react-router-dom';

const createUser = async(
  userID,
  name,
  email,
  picture
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: userID,
      name: name,
      email: email,
      picture: picture
    }),
  };

  fetch("http://localhost:5000/facebook", requestOptions)
  .then(async (response) => {
    const data = await response.json();
    if (!response.ok) {
      const error = (data && data.message) || response.status;
      alert(error);
      return Promise.reject(error);
    }
    
  })

  .catch((error) => {
    console.error("There was an error!", error);
  });

  };
  


const Facebook = () => {
  const navigate = useNavigate()

  const responseFacebook = (response) => {
    localStorage.setItem('profile', JSON.stringify({ response }));
    console.log(response.name)
    createUser(response.userID, response.name, response.email,response.picture.data.url)
    navigate('/')
  }

  const componentClicked= (response) => console.log("clicked")
  
    return (
        <div className="button">
          <div>
          <FacebookLogin
            appId="924831181756717"
            autoLoad={true}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook} />
          </div>
        </div>
        
      
      );
    
  }

export default Facebook
 