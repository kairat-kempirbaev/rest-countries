import React, { FC } from 'react';
import { useState, useEffect } from 'react';
import Flags from "./MapTypes";

const regEx = /(\d+?)(?=(\d{3})+(?!\d)|$)/g

const CountryComponents: FC<Flags> = (props): JSX.Element => {
    const capital =  <p ><span>Capital:</span> {props.capital ?  props.capital[0] :"no capital"} </p>
    const population: string = props.population.toString().match(regEx).join(",");

    return (
        <div key={props.key} className='flex flex-col w-[220px]  bg-white text-black'>
            <img src={props.flags[1]} className="h-[125px]" />
            <div className='p-4 pb-6 flex flex-col gap-4 text-left'>
                <h2 className="font-bold text-[1rem] ">{props.name.common}</h2>
                <div className='font-thin text-[0.8rem] '>
                    <p><span>Population:</span>{population} <br /></p>
                    <p><span>Region:</span>{props.region} </p>
                    {capital}
                </div>
            </div>
        </div>
    )
}
export default CountryComponents;