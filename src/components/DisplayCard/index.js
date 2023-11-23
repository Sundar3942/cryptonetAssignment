import {Component} from 'react'

import { FaPhone ,FaBirthdayCake,FaLinkedin,FaInstagramSquare} from "react-icons/fa";
import { SlSocialTwitter } from "react-icons/sl";
import { FcGoogle } from "react-icons/fc";
import {CirclesWithBar} from 'react-loader-spinner'

import './index.css'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class DisplayCard extends Component {
    state = {
        profileDetails : {},
        apiObtained: false,
    }

    componentDidMount(){
        this.getApiData()
    }

    getApiData = async () => {
        const Url ="https://randomuser.me/api/?page=1&results=1&seed=abc"
        const response = await fetch(Url)
        const data = await response.json()
        console.log(data.results[0])
        if(response.ok){
            this.setState({profileDetails: data.results[0], apiObtained: true})
        }
    }

    renderLoader = () => (
        <div className="loader-container">
      <CirclesWithBar
  height="100"
  width="100"
  color="#4fa94d"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  outerCircleColor=""
  innerCircleColor=""
  barColor=""
  ariaLabel='circles-with-bar-loading'
/>
    </div>
    )

    renderProfile = () => {
        const {profileDetails} = this.state
        const {picture,name,cell,dob,email,gender,location,login} = profileDetails
        const {username} = login
        const {large} = picture
        const {title,first,last} = name
        const {date} = dob
        const {city , state, country} = location
        const modifiedDate = new Date(date)
        const month = months[modifiedDate.getMonth()]

        return (
            <>
                <div className='profile-container'>   
                    <img src={large} alt="avatar" className='profile-image' />
                    <h1 className='name'>{title} {first} {last}</h1>
                    <h1 className='username'>@{username}</h1>
                    <h1 className='cell'><FaPhone color='#C0C0C0' size={20}/> : {cell}</h1>
                    <h1 className='cell'><FaBirthdayCake color='#C0C0C0' size={20}/> : {month} {modifiedDate.getDate()} {modifiedDate.getFullYear()}</h1>
                    <ul>
                        <li><p><span>Email</span> <br/>   : {email}</p></li>
                        <li><p><span>Gender</span> <br/>  : {gender}</p></li>
                        <li><p><span>Address</span>  <br/>: {city} city, {state} , {country}</p></li>
                    </ul>
                    <div className='social-media-container'>
                        <FcGoogle size={30}/>    
                        <FaInstagramSquare color='grey'  size={30}/>
                        <SlSocialTwitter color='grey' size={30}/>
                        <FaLinkedin color='grey' size={30} />
                    </div>
                </div>
            </>
        )
         
    }

    render() {
        const {apiObtained} = this.state
        return (
            <div className='display-page'>
                {!apiObtained ? this.renderLoader(): this.renderProfile()}
            </div>
        )
    }
}

export default DisplayCard