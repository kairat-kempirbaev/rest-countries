
import React, { useState , Dispatch, SetStateAction} from 'react'
import "./InputComponent.css"
import {selectDark} from "./darkSlice"
import { darkClasses } from './formatSpec';
import { useSelector } from 'react-redux';

interface passingProps  {
    search:string,
    setSearch: Dispatch<React.SetStateAction<any>>,
    setRegion: Dispatch<React.SetStateAction<any>>,
}

export default function InputComponent(props:passingProps): JSX.Element {
    const [display, setDisplay] = useState(1);
    const dark = useSelector(selectDark);
    const options = ["absolute", "hidden"];

    function incDisplay(){
        setDisplay((display + 1) % 2)
    }

    function clearFilter(e: any) {
        incDisplay()
        props.setRegion(e.target.getAttribute("data-name"));
        e.stopPropagation();
    }

    const componentClasses = darkClasses(dark);

    return (
        <div className={'display-input-filter flex flex-col gap-3 md:flex-row justify-around p-5 mb-4'}>
            <input type="text" value={props.search} onChange={(e) => props.setSearch(e.target.value)} placeholder='Search for a country...' 
            className={'border-[1px] p-3 pl-12 w-[400px] rounded-lg ' + componentClasses} />
            <div className='flex flex-col w-[180px]'>
                <button className={'border-[1px] p-4 text-left rounded-xl cursor-pointer ' + componentClasses}onClick={incDisplay}> Filter by Region </button>
                <div className={ ' border-[1px] p-4 mt-3  rounded-xl absolute w-[180px] top-[180px] ' + options[display] +componentClasses} onClick={event => clearFilter(event)}>
                    <div  className={'flex flex-col cursor-pointer ' }>
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