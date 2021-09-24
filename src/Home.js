import './Main.css';
import Header from './Header';
import UserPreviews from './UserPreviews';

function Home() {

  return (
    <div>
    <Header headerText = {"Employees Listing"}></Header>
    <UserPreviews></UserPreviews>

    </div>
  );
}

export default Home;
