import { Spin } from 'antd';
import { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ProtectedRoute from './components/common/ProtectedRoute';
import SignUp from './components/pages/Auth/SignUp';
import SignIn from './components/pages/Auth/SingIn';
import Home from './components/pages/Home';
import useAxios from './hooks/useAxios';
import { isLoggedInSelector } from './recoil/user';

function App() {
  const isLoggedIn = useRecoilValue(isLoggedInSelector);
  const { login, isLoadingLogin } = useAxios({ withAuth: true });

  useEffect(() => {
    login();
  }, [login]);

  // if (isLoadingLogin) return <Spin />;
  return (
    <div className="App">
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
