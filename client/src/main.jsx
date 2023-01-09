import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './context/authContext'
import { SearchContextProvider } from './context/searchContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
  <SearchContextProvider>
    <App />

  </SearchContextProvider>
    </AuthContextProvider>
   
   
  
)
