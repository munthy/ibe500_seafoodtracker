import Button from '@mui/material/Button';
import PhishingIcon from '@mui/icons-material/Phishing';

function fish(){
    document.getElementById("fish").innerHTML = "Fish info will come to you.";
  }

function Main(){
    return (
    <div className="Main">
        <h1>Maritech Seafood Tracker</h1>
        <h3>Now with Blockchain&trade; Technology&reg;</h3>
        <Button onClick={fish} variant="contained" ><PhishingIcon />Click to receive fish info</Button>
        <p id="fish"></p>
    </div>
    )
}

export default Main;