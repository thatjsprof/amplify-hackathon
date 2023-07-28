import { Outlet } from 'react-router-dom'
import './App.css'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Header from './components/layout/header';
import { AmplifyProvider } from "@aws-amplify/ui-react";
import { studioTheme } from 'src/ui-components'


function App() {
  return (
    <div id="App">
      <AmplifyProvider theme={studioTheme}>
        <Header />
        {/* Run authentication loader here */}
        <Outlet />
      </AmplifyProvider>
    </div>
  )
}

export default App
