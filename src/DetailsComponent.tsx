import { FunctionComponent } from "react";
import Details from "./MapTypes"
import { Link, useLocation } from 'react-router-dom';
import formatSpec from "./formatSpec";

const style = {
    backgroundImage: " url(/left_arrow.svg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "15% 50% ",
}

const shadowStyle = {
    backgroundColor: "white",
    boxShadow: "0px 0px 38px -12px #606060",
}

const DetailsComponent: FunctionComponent = (): JSX.Element => {
    const country: Details = useLocation().state.country;
    const items: Array<Details> = useLocation().state.countries;
    const { capital, population } = formatSpec(country);

    return (
        <div className='pl-20 flex flex-col gap-10  bg-white text-black'>
            <Link to="/">
                <button style={{ ...style, ...shadowStyle }} className="py-3 px-5 pl-12 rounded-lg ">Back</button>
            </Link>

            <main className="flex flex-col md:flex-row gap-20  ">
                <img src={country.flags[1]} className="h-[300px] w-[450px]" />
                <div className=' pt-6 flex md:flex-col flex-row gap-4 text-left'>
                    <h2 className="font-bold text-[2rem] ">{country.name.common}</h2>
                    <section>
                        <div>
                            {country.name.nativeName.eng != null &&
                                <p><span className='font-bold text-[1.2rem]'>Native Name:</span>{(country.name.nativeName.eng.official)} <br /></p>
                            }
                            <p><span className='font-bold text-[1.2rem]'>Population:</span>{population} <br /></p>
                            <p><span className='font-bold text-[1.2rem]'>Region:</span>{country.region} </p>
                            <p><span className='font-bold text-[1.2rem]'>Sub Region:</span>{country.subregion} </p>
                            <p><span className='font-bold text-[1.2rem]'>Capital:</span>{capital}</p>
                        </div>
                        <div>
                            <p><span className='font-bold text-[1.2rem]'>Top Level Domain:</span>{country.tld[0]} </p>
                            <p><span className='font-bold text-[1.2rem]'>Currencies:</span>{Object.keys(country.currencies).join(", ")} </p>
                            <p><span className='font-bold text-[1.2rem]'>Languages:</span>{Object.values(country.languages).join(", ")} </p>
                        </div>
                    </section>
                    <div>
                        <p><span className='font-bold text-[1.2rem]'>Border Countries:</span>
                            <ul className="flex gap-4">
                                {("borders" in country &&
                                    items.filter(x => x.borders && x.borders.includes(country.cca3)).map(x =>
                                        <li key={x.name.common} style={shadowStyle} className="p-3 bg-[red] rounded-lg">
                                            <Link to={"/country/" + x.name.common} state={{ country: x, countries: items }}>
                                                <span>{x.name.common}</span>
                                            </Link>
                                        </li>
                                    )
                                )}
                                {(!("borders" in country) &&
                                    <span>None</span>
                                )}
                            </ul>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DetailsComponent;