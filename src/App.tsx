import { useState, useEffect } from 'react'
import './App.css'
import Details from "./MapTypes";
import {
  Routes,
  Route
} from "react-router-dom";
import AllCountries from './AllCountries';
import DetailsComponent from './DetailsComponent';

import { useSelector, useDispatch } from 'react-redux';
import { selectDark, toggle } from "./darkSlice"
import { setItems } from "./itemsSlice"

import { darkClasses } from "./formatSpec"

const URL: string = "https://restcountries.com/v3/all";

function App(): JSX.Element {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string, [key: string]: any } | null>(null);

  const dark = useSelector(selectDark);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("items") === null) {
      fetch(URL)
        .then(response => response.json())
        .then(
          (items) => {
            setIsLoaded(true);
            dispatch(setItems(items));
            localStorage.setItem('items', JSON.stringify(items));
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    } else {
      const items = JSON.parse(localStorage.getItem("items") as string);
      setIsLoaded(true);

      if (items) {
        dispatch(setItems(items));
      }
    }
  }, [])

  const componentClasses = darkClasses(dark);

  const svgDark = { "fill": !dark ? "black" : "white" };
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className='flex flex-col min-w-[100vw] min-h-[100vh]'>
        <header className={'flex py-7 px-10 justify-between ' + componentClasses}>
          <h1 className={'font-bold text-lg '}>Where in the world?</h1>
          <div className='mr-12 cursor-pointer ' onClick={(e) => { dispatch(toggle()); e.preventDefault() }} >
            <input type="checkbox" name="dark-toggle" id="dark" className='sr-only' />
            <label htmlFor="dark" className='cursor-pointer'>
              <svg width='20px' height='20px' className='inline ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path stroke="#f00" style={svgDark} fillRule="nonzero"
                d="M421.6 379.9c-.6641 0-1.35 .0625-2.049 .1953c-11.24 2.143-22.37 3.17-33.32 3.17c-94.81 0-174.1-77.14-174.1-175.5c0-63.19 33.79-121.3 88.73-152.6c8.467-4.812 6.339-17.66-3.279-19.44c-11.2-2.078-29.53-3.746-40.9-3.746C132.3 31.1 32 132.2 32 256c0 123.6 100.1 224 223.8 224c69.04 0 132.1-31.45 173.8-82.93C435.3 389.1 429.1 379.9 421.6 379.9zM255.8 432C158.9 432 80 353 80 256c0-76.32 48.77-141.4 116.7-165.8C175.2 125 163.2 165.6 163.2 207.8c0 99.44 65.13 183.9 154.9 212.8C298.5 428.1 277.4 432 255.8 432z" />
              </svg>
              Dark Mode
            </label>
          </div>
        </header>
          <Routes>
            <Route index path="/" element={<AllCountries />} />
            <Route path="/country/:id" element={<DetailsComponent />} />
          </Routes>
      </div>
    )
  }
}

export default App
