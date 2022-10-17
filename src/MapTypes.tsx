export  interface Flags {
    name: {nativeName:{eng:{official:string}},common:string},
    flags: [string, string],
    capital: [string],
    region: string,
    population: number,
}

export default interface Details extends Flags{
    subRegion: string,
    currencies:string,
    languages:Array<string>,
    tld:Array<string>,
    borders:Array<string>,
    cca3:string
}