import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/pages/Auth/SignUp';
import SignIn from './components/pages/Auth/SingIn';
import Home from './components/pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
