import { FC } from 'react';
import Flags from "./MapTypes";
import formatSpec from "./formatSpec";

const CountryComponents: FC<Flags> = (props): JSX.Element => {
    const {capital, population} = formatSpec(props);
    return (
        <div className='flex flex-col w-[220px] h-[260px] bg-white text-black'>
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