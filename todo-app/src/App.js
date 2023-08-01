import logo from './logo.svg';
import './App.css';
import Provider from './store/Provider';
import { Todos } from './components'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider>
      <div className='App'>
        <Todos />
      </div>
    </Provider>
  );
}

export default App;
