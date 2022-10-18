import { FunctionComponent } from "react";
import Details from "./MapTypes"
import { Link, useLocation, useParams } from 'react-router-dom';
import formatSpec, { darkClasses } from "./formatSpec";
import { useSelector } from 'react-redux'
import { selectDark } from "./darkSlice"
import { selectItems } from "./itemsSlice";

const style = {
    backgroundImage: " url(/left_arrow.svg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "15% 50% ",
}

const shadowStyle = {
    boxShadow: "0px 0px 38px -12px #606060",
}

const DetailsComponent: FunctionComponent = (): JSX.Element => {
    const items = useSelector(selectItems);
    let { id } = useParams();
    const country: Details = items.filter((x) => x.name.common == id)[0];
    const { capital, population } = formatSpec(country);

    const dark = useSelector(selectDark);
    const inputFiledStyle = darkClasses(dark);
    return (
        <main className={'flex-1 p-5 md:p-10 flex flex-col gap-4 md:gap-20 ' + (dark ? "bg-vdb  text-white" : "bg-vlg  text-black")}>
            <Link to="/">
                <button style={{ ...style, ...shadowStyle }} className={"py-3 px-5 pl-12 rounded-lg " + inputFiledStyle}>Back</button>
            </Link>

            <div className="flex  flex-col flex-wrap md:flex-row gap-20 items-center ">
                <img src={country.flags[1]} className="h-[200px] w-[350px]  md:h-[300px] md:w-[450px]" />
                <div className='pt-1 md:pt-6 flex flex-col  gap-4 text-left'>
                    <h2 className="font-bold text-[2rem] ">{country.name.common}</h2>
                    <section className="flex flex-col md:flex-row gap-5 md:gap-16 flex-wrap">
                        <div>
                            {country.name.nativeName &&
                                <p><span className='font-bold text-[1.2rem]'>Native Name: </span>{(Object.entries(country.name.nativeName)[0][1].official)} <br /></p>
                            }
                            <p><span className='font-bold text-[1.2rem]'>Population: </span>{population} <br /></p>
                            <p><span className='font-bold text-[1.2rem]'>Region: </span>{country.region} </p>
                            <p><span className='font-bold text-[1.2rem]'>Sub Region: </span>{country.subregion} </p>
                            <p><span className='font-bold text-[1.2rem]'>Capital: </span>{capital}</p>
                        </div>
                        <div>
                            <p><span className='font-bold text-[1.2rem]'>Top Level Domain: </span>{country.tld[0]} </p>
                            <p><span className='font-bold text-[1.2rem]'>Currencies: </span>{Object.keys(country.currencies).join(", ")} </p>
                            <p><span className='font-bold text-[1.2rem]'>Languages: </span>{Object.values(country.languages).join(", ")} </p>
                        </div>
                    </section>
                    <div className="flex flex-col flex-wrap md:flex-row md:items-center gap-4">
                        <span className='font-bold text-[1.2rem]'>Border Countries: </span>
                        <ul className="flex gap-4 flex-wrap">
                            {("borders" in country &&
                                items.filter(x => x.borders && x.borders.includes(country.cca3)).map(x =>
                                    <li key={x.name.common} style={shadowStyle} className={"p-3  rounded-lg " + inputFiledStyle}>
                                        <Link to={"/country/" + x.name.common} state={{ country: x, countries: items }}>
                                            <span>{x.name.common}</span>
                                        </Link>
                                    </li>
                                )
                            )}
                            {(!("borders" in country) &&
                                <li>
                                    <span>None</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default DetailsComponent;