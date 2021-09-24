import Header from './Header'
import { useLocation, Link } from 'react-router-dom'

const UserProfile = () => {

    const location = useLocation();
    const {firstName, lastName, dateOfBirth, email, registerDate, phone, picture} = location.state;

    return (
        <div>
        
        <Link to='/'>Go back home...</Link>

        <Header headerText={"User Profile"}></Header>

        <div className = "user-profile-container">
            <div classname = "userbox"><img src={picture}></img></div>
            <div classname = "userbox">
                <h2>Name: {firstName} {lastName}</h2>
                <h2>Date of Birth: {dateOfBirth}</h2>
                <h2>Email: {email}</h2>
                <h2>Registration Date: {registerDate}</h2>
                <h2>Phone: {phone}</h2>
            </div>
        </div>

        </div>
    )
}

export default UserProfile;