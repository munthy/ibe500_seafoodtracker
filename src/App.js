import './App.css';
import Button from '@mui/material/Button';
import Header from './components/Header.js'
import Footer from './components/Footer.js'

function fish(){
  document.getElementById("fish").innerHTML = "Fish info will come to you.";
}

function App() {
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <h1>Maritech Seafood Tracker</h1>
        <h3>Now with Blockchain&trade; Technology&reg;</h3>
        <Button onClick={fish} variant="contained" >Click to receive fish info.</Button>
        <p id="fish"></p>
      </header>
      <Footer />
    </div>
  );
}

export default App;
