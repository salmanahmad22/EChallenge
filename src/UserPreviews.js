import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import generateKey from './KeyGenerator';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

const UserPreviews = () => {

  const Gender = {
    Default: 'default', Male: 'male', Female: 'female' 
  }

  const [previewList, setPreviewList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newPage, setNewPage] = useState();
  const [gender, setGender] = useState(Gender.Default)
  const [showFilters, changeFiltersVisibility] = useState(false);
  const [customRegistrationDateFilter, setRegisterDateFilter] = useState(new Date('1910-11-07T01:44:23.697Z'));
  const [customDateOfBirthFilter, setCustomDateOfBirthFilter] = useState(new Date('1910-11-07T01:44:23.697Z'));

  const changePage = () => {

    if(newPage === undefined || newPage < 1){
      alert("Please enter a valid page number.");
    }
    else{
      setPreviewList([]);
      setCurrentPage(newPage);
    }

  }

  useEffect(() => {
    fetch(`https://dummyapi.io/data/v1/user?limit=10&page=${currentPage - 1}/`, {
      method: 'get',
      headers: {
        'app-id': '614b7e089d6e894d78cc0a8a'
      },
    })
    .then(result => {
      return result.json();
    }).then(data => {
      console.log(data.data);

      for(let i = 0; i < data.data.length; i++){
        fetch(`https://dummyapi.io/data/v1/user/${data.data[i].id}`, {
          method: 'get',
          headers: {
            'app-id': '614b7e089d6e894d78cc0a8a'
          },
        })
        .then(result => {

          return result.json();

        }).then(data => {

          console.log(data);
          setPreviewList((previewList) => [...previewList, data]);

        })
        .catch(error => {
          console.log(error);
        })
      }

    }
    )
    .catch(error => {
      console.log(error);
    })
  }, [currentPage])

    return (
      <div>
        <div className="filtering-row-container">
          <button onClick={() => setGender(Gender.Male)}>Men</button>
          <button onClick={() => setGender(Gender.Female)}>Women</button>
          <button onClick={() => setGender(Gender.Default)}>Default(no filters applied)</button>
          <button onClick={() => changeFiltersVisibility(true)}>Filters</button>
        </div>

        {showFilters ? 
        <div className="special-filters-row">
          <p>Enter the registration date, only those who registered on or after this date will be shown:</p>
          <DatePicker className = "date-picker" placeholderText={"Registration date"} selected={customRegistrationDateFilter} onChange={date => {setRegisterDateFilter(date)}}></DatePicker>
          <p>Enter the date of birth date, only those who were born on or after this date will be shown:</p>
          <DatePicker className = "date-picker" placeholderText={"Date of birth"} selected={customDateOfBirthFilter} onChange={date => {setCustomDateOfBirthFilter(date)}}></DatePicker>
          <p>Tip: Type in the date if it's quite far backwards/forwards, as the widget being utilized currently does not have functionality to move between years quickly.</p>
          <p>After applying filters, click on "male" or "female." The default will not have filters applied.</p>
          <button onClick={() => {
            changeFiltersVisibility(false)
            console.log(new Date(customDateOfBirthFilter))}}>Done</button>
        </div> : 
        <div></div>
        }

        <div className = "user-previews-table">
            <table>
              <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>DOB</th>
                  <th>Phone</th>
                  <th>Full Profile</th>
                  <th>User Posts</th>
              </tr>
              
             {gender === Gender.Default &&
              previewList.map((individualPreview) => (
                <tr key={ generateKey(individualPreview.id) }>
                  <td>{individualPreview.firstName + " " + individualPreview.lastName}</td>
                  <td>{individualPreview.email}</td>
                  <td>{individualPreview.dateOfBirth}</td>
                  <td>{individualPreview.phone}</td>
                  <td><Link to={{pathname: '/profile', state: individualPreview}}>Profile</Link></td>
                  <td><Link to={{pathname: '/posts', state: individualPreview}}>Posts</Link></td>
                </tr>
              ))} 

              {gender === Gender.Male &&
              previewList.filter(initialPreview => {return (initialPreview.gender === Gender.Male && new Date(customDateOfBirthFilter) <= new Date(initialPreview.dateOfBirth) && new Date(customRegistrationDateFilter) <= new Date(initialPreview.registerDate))}).map((individualPreview) => (
                <tr key={ generateKey(individualPreview.id) }>
                  <td>{individualPreview.firstName + " " + individualPreview.lastName}</td>
                  <td>{individualPreview.email}</td>
                  <td>{individualPreview.dateOfBirth}</td>
                  <td>{individualPreview.phone}</td>
                  <td><Link to={{pathname: '/profile', state: individualPreview}}>Profile</Link></td>
                  <td><Link to={{pathname: '/posts', state: individualPreview}}>Posts</Link></td>
                </tr>
              ))} 

              {gender === Gender.Female &&
              previewList.filter(initialPreview => {return (initialPreview.gender === Gender.Female && new Date(customDateOfBirthFilter) <= new Date(initialPreview.dateOfBirth) && new Date(customRegistrationDateFilter) <= new Date(initialPreview.registerDate))}).map((individualPreview) => (
                <tr key={ generateKey(individualPreview.id) }>
                  <td>{individualPreview.firstName + " " + individualPreview.lastName}</td>
                  <td>{individualPreview.email}</td>
                  <td>{individualPreview.dateOfBirth}</td>
                  <td>{individualPreview.phone}</td>
                  <td><Link to={{pathname: '/profile', state: individualPreview}}>Profile</Link></td>
                  <td><Link to={{pathname: '/posts', state: individualPreview}}>Posts</Link></td>
                </tr>
              ))} 

            </table>

            <div className="page-navigator">
              <p>Currently on page {currentPage}, go to page: </p>
              <input type="number" value={newPage} onChange={(e) => setNewPage(e.target.value)}></input>
              <button onClick={changePage}>Enter</button>
            </div>
        </div>
      </div>
    )
}

export default UserPreviews;