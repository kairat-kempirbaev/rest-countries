
import React, { useState } from 'react'
import "./InputComponent.css"

export default function InputComponent(props:any): JSX.Element {
    const [display, setDisplay] = useState(1);
    const options = ["absolute", "hidden"]
    function incDisplay(){
        setDisplay((display + 1) % 2)
    }
    function clearFilter(e: any) {
        incDisplay()
        props.setRegion(e.target.getAttribute("data-name"));
        e.stopPropagation();
    }

    return (
        <div className='display-input-filter flex justify-around mb-4'>
            <input type="text" value={props.search} onChange={(e) => props.setSearch(e.target.value)} placeholder='Search for a country...' className='border-[1px] p-3 pl-12 w-[400px] bg-wht   rounded-lg' />
            <div className='flex flex-col w-[180px]'>
                <button className='border-[1px] p-4 text-left bg-white rounded-xl cursor-pointer' onClick={incDisplay}> Filter by Region </button>
                <div className={'border-[1px] p-4 mt-3 bg-white rounded-xl absolute w-[180px] top-[160px] ' + options[display]} onClick={event => clearFilter(event)}>
                    <div  className='flex flex-col cursor-pointer'>
                        <input className="sr-only" type="radio" id="Africa" name="region" value="Africa" data-name="Africa"/>
                        <label data-name="Africa" >Africa</label>
                        <input className="sr-only" type="radio" id="America" name="region" value="America" data-name="America"/>
                        <label data-name="America" >America</label>
                        <input className="sr-only" type="radio" id="Asia" name="region" value="Asia" data-name="Asia"/>
                        <label data-name="Asia" >Asia</label>
                        <input className="sr-only" type="radio" id="Europe" name="region" value="Europe" data-name="Europe"/>
                        <label data-name="Europe" >Europe</label>
                        <input className="sr-only" type="radio" id="Oceania" name="region" value="Oceania" data-name="Oceania"/>
                        <label data-name="Oceania" >Oceania</label>
                    </div>
                </div>
            </div>
        </div>
    )
}