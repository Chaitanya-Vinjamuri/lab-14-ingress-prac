import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import BookApiHome from './components/BookApiHome'
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element={<BookApiHome/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
