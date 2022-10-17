import { FunctionComponent } from "react";
import Flags from "./MapTypes"
import { Link, useParams } from 'react-router-dom';
interface AllCountriesProps {
    items: Array<Flags>
}

const style = {
    backgroundColor: "white",
    boxShadow: "0px 0px 38px -12px #606060",
    backgroundImage: " url(/left_arrow.svg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "15% 50% ",
}

const regEx = /(\d+?)(?=(\d{3})+(?!\d)|$)/g
const DetailsComponent: FunctionComponent<AllCountriesProps> = (props): JSX.Element => {
    const { id } = useParams();
    const country = props.items.filter(x => x.name.common == id)[0];
    const capital = <p ><span>Capital:</span> {country.capital ? country.capital[0] : "no capital"} </p>
    const population: string = country.population.toString().match(regEx).join(",");

    return (
        <div className='pl-20 flex flex-col gap-10  bg-white text-black'>
            <Link to="/">
                <button style={style} className="py-3 px-5 pl-12 rounded-lg ">Back</button>
            </Link>

            <main>
                <img src={country.flags[1]} className="h-[125px]" />
                <div className='p-4 pb-6 flex flex-col gap-4 text-left'>
                    <h2 className="font-bold text-[1rem] ">{country.name.common}</h2>
                    <div className='font-thin text-[0.8rem] '>
                        <p><span>Population:</span>{population} <br /></p>
                        <p><span>Region:</span>{country.region} </p>
                        {capital}
                    </div>
                </div>
            </main>

        </div>
    )
}

export default DetailsComponent;