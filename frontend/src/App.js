import { Spin } from 'antd';
import { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import ProtectedRoute from './components/common/ProtectedRoute';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SingIn';
import Home from './pages/Home';
import useAxios from './hooks/useAxios';
import { isLoggedInSelector } from './recoil/user';

const SytledApp = styled.div`
  background: ${(props) => (props.isLoggedIn ? '#F2F2F2' : '#fff')};
  height: 100vh;
  width: 100%;
`;
function App() {
  const isLoggedIn = useRecoilValue(isLoggedInSelector);
  const { login, isLoadingLogin } = useAxios({ withAuth: true });

  useEffect(() => {
    login();
  }, [login]);

  if (isLoadingLogin) return <Spin />;

  return (
    <SytledApp isLoggedIn={isLoggedIn} className="App">
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
    </SytledApp>
  );
}

export default App;
