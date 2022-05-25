import './App.css';
import TopicsChart from './components/TopicsChart';

function App() {

  return (
    <div className="App">
      <header>
        <h1>Explore blogging trends</h1>
      </header>

      {/* <TopicsChart/> */}
      <LineChart2 />
    </div>
  );
}

export default App;
