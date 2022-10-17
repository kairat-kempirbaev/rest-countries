import Flags from "./MapTypes"
const regEx = /(\d+?)(?=(\d{3})+(?!\d)|$)/g;

export default function formatSpec(props:Flags) {
    const capital = <p><span>Capital:</span> {props.capital ? props.capital[0] : "no capital"} </p>;
    const population: string = props.population?.toString().match(regEx)!.join(",");
    return {capital,population};
}

