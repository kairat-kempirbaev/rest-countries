import { FunctionComponent, useState } from "react";
import Flags from "./MapTypes";
import CountryComponent from "./CountryComponent";
import { Link } from "react-router-dom";
import InputComponent from "./InputComponent";

interface AllCountriesProps {
    items: Array<Flags>,
}

const AllCountries: FunctionComponent<AllCountriesProps> = (props): JSX.Element  => {
    const items = props.items;

    const [search, setSearch] = useState<string>("");
    const [region, setRegion] = useState<string>("");

    function displayRecords() {
        let flags: Flags[] = props.items;
        if (search!.length) {
            flags = items.filter(item => (item.name.common.toLowerCase().includes(search.toLowerCase())))
        }

        if (region!.length) {
            flags = flags.filter(item => (item.region.toLowerCase().includes(region.toLowerCase())))
        }

        return flags.map((item, index) =>
            <Link key={index} to={"/country/" + item.name.common} state={{ country: item,countries:items }}>
                <CountryComponent  name={item.name} flags={item.flags} capital={item.capital} region={item.region} population={item.population}></CountryComponent>
            </Link>
        )
    }

    return <div>
        <InputComponent search={search} setSearch={setSearch} setRegion={setRegion} ></InputComponent>
        <div className='flex flex-wrap justify-around gap-20 bg-vlg md:mt-20 md:mx-16'>
            {displayRecords()}
        </div>
    </div>;
}

export default AllCountries;