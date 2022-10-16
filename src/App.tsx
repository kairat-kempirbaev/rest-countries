import { useState, useEffect } from 'react'
import './App.css'
import Flags from "./MapTypes";
import CountryComponent from "./CountryComponent";
import InputComponent from "./InputComponent"

const URL: string = "https://restcountries.com/v3/all";


function App(): JSX.Element {
  const [items, setItems] = useState<Flags[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string, [key: string]: any } | null>(null);

  const [search, setSearch] = useState<string|null>(null);
  const [region, setRegion] = useState<string|null>(null);
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

  function displayRecords() {
    let flags:Flags[] = items;
    if (search?.length) {
      flags = items.filter(item=>(item.name.common.toLowerCase().includes(search.toLowerCase())))
    }
    return flags.map((item, index) =>
        <CountryComponent  name={item.name} flags={item.flags} capital={item.capital} region={item.region} population={item.population}></CountryComponent>
      )
  }

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
        <InputComponent setRegion={setRegion} search={search} setSearch={setSearch}></InputComponent>
        <main className='flex flex-wrap gap-3 bg-vlg'>
          {displayRecords()}
        </main>
      </div>
    )
  }
}

export default App
