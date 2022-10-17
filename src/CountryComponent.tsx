import { FC } from 'react';
import Details from "./MapTypes";
import formatSpec from "./formatSpec";

interface CountryComponentProps{
    country:Details
}
const CountryComponents: FC<CountryComponentProps> = (props): JSX.Element => {
    const country =  props.country;
    const {capital, population} = formatSpec(country);
    return (
        <div className='flex flex-col w-[220px] h-[260px] bg-white text-black'>
            <img src={country.flags[1]} className="h-[125px]" />
            <div className='p-4 pb-6 flex flex-col gap-4 text-left'>
                <h2 className="font-bold text-[1rem] ">{country.name.common}</h2>
                <div className='font-thin text-[0.8rem] '>
                    <p><span>Population:</span>{population} <br /></p>
                    <p><span>Region:</span>{country.region} </p>
                    <p><span>Capital:</span>{capital}</p>
                </div>
            </div>
        </div>
    )
}
export default CountryComponents;