import logo from './logo.svg';
import './App.css';
import Board from "./Board";

function App() {
  return (
    <div className="App">
      <Board nrows={6} ncols={6} chanceLightStartsOn={0.25} />
    </div>
  );
}

export default App;
