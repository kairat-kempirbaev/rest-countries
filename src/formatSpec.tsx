import Flags from "./MapTypes"
const regEx = /(\d+?)(?=(\d{3})+(?!\d)|$)/g;

export default function formatSpec(props:Flags) {
    const capital = props.capital ? props.capital[0] : "no capital" ;
    const population: string = props.population?.toString().match(regEx)!.join(",");
    return {capital,population};
}

export const darkClasses = (dark:boolean) => (dark ? " bg-db  text-white " : " bg-white text-black ");