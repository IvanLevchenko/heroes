import './App.scss';

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Home from './components/Home/Home'
import Form from './components/Form/Form'
import HeroPage from './components/HeroPage/HeroPage';

function App() {

  const navigate = useNavigate()

  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title" onClick={() => navigate('/')}>Heroes</h1>
        <button className="header__create-btn" onClick={() => navigate('/create')}>Create</button>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Form />} />
        <Route path="/hero" element={<HeroPage />} />
        <Route path="/change-hero" element={<Form fillData={true} />} />
      </Routes>
    </div>
  );
}

export default App;
