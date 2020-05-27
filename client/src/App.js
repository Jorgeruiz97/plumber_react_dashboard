import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

// components
import Loading from './components/loading';
import Dashboard from './components/dashboard';

// actions
import init from './store/actions/init';

const App = () => {
  const { loading, data, agent } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init())
  }, [])

  if (loading) {
    return <Loading />
  } else {
    return <Dashboard />
  }
}

export default App;
