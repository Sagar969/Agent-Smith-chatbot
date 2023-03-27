import { useContext } from 'react';
import './styles/style.css'
import Query from './components/Query';
import MessageArray from './components/MessageArray';
import InitialMsg from './components/InitialMsg';
import Logo from './components/Logo'
import { MainContext } from './contexts/AppContext';

function App() {
  const { msgs } = useContext(MainContext);
  return (
    <div className='app'>
      <Logo />
      {msgs.length === 0 && <InitialMsg />}
      <MessageArray />
      <Query />
    </div>
  );
}

export default App;