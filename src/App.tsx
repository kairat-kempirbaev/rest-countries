import { useState, useEffect } from 'react'
import './App.css'
import Details from "./MapTypes";
import {
  Routes,
  Route
} from "react-router-dom";
import AllCountries from './AllCountries';
import DetailsComponent from './DetailsComponent';

const URL: string = "https://restcountries.com/v3/all";

function App(): JSX.Element {
  const [items, setItems] = useState<Details[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string, [key: string]: any } | null>(null);

  useEffect(() => {
    if (localStorage.getItem("items") === null) {
      fetch(URL)
        .then(response => response.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
            localStorage.setItem('items', JSON.stringify(result));
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
        setItems(items);
      }
    }
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    { console.log(items) }
    return (
      <div className='w-[100vw]'>
        <header className='flex p-5 px-10 justify-between mb-10'>
          <h1 className='font-bold text-lg bg-white'>Where in the world?</h1>
          <div className='mr-12'>
            <input type="checkbox" name="dark-toggle" id="dark" className='sr-only' />
            <label htmlFor="dark"><img src="/moon.svg" alt="" width='20px' height='20px' className='inline' /> Dark Mode</label>
          </div>
        </header>
        <main>
          <Routes>
            <Route  index path="/" element={<AllCountries items={items}/>} />
            <Route  path="/country/:id" element={<DetailsComponent/>}/>
          </Routes>
        </main>
      </div>
    )
  }
}

export default App
