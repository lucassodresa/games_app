import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ProtectedRoute from './components/common/ProtectedRoute';
import SignUp from './components/pages/Auth/SignUp';
import SignIn from './components/pages/Auth/SingIn';
import Home from './components/pages/Home';
import useAuth from './hooks/useAuth';
import { isLoggedInSelector } from './recoil/user';

function App() {
  const isLoggedIn = useRecoilValue(isLoggedInSelector);
  const { login } = useAuth();

  return (
    <div className="App">
      {login()}
      <Routes>
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/signin"
          element={isLoggedIn ? <Navigate to="/" /> : <SignIn />}
        />
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
