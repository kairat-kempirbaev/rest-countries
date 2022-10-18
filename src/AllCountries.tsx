import { FunctionComponent, useState } from "react";
import Details from "./MapTypes";
import CountryComponent from "./CountryComponent";
import { Link } from "react-router-dom";
import InputComponent from "./InputComponent";

import { selectDark } from "./darkSlice"
import { selectItems } from "./itemsSlice"
import { useSelector } from "react-redux";

const AllCountries: FunctionComponent = (): JSX.Element => {
    const items = useSelector(selectItems);
    const dark = useSelector(selectDark);

    const [search, setSearch] = useState<string>("");
    const [region, setRegion] = useState<string>("");

    function displayRecords() {
        let flags: Details[] = items;
        if (search!.length) {
            flags = items.filter(item => (item.name.common.toLowerCase().includes(search.toLowerCase())))
        }

        if (region!.length) {
            flags = flags.filter(item => (item.region.toLowerCase().includes(region.toLowerCase())))
        }

        return flags.map((item, index) =>
            <Link key={index} to={"/country/" + item.name.common} state={{ country: item, countries: items }}>
                <CountryComponent country={item} ></CountryComponent>
            </Link>
        )
    }

    return <div className={"py-10 " + (dark ? "bg-vdb" : "bg-vlg")}>
        <InputComponent search={search} setSearch={setSearch} setRegion={setRegion}></InputComponent>
        <div className={'flex flex-wrap justify-around py-10 gap-20  md:px-16 '}>
            {displayRecords()}
        </div>
    </div>;
}

export default AllCountries;