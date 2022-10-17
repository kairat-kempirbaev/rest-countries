export default interface Flags {
    name: {common:string},
    flags: [string, string],
    capital: [string],
    region: string,
    population: number,
}

export interface Details extends Flags{
    nativeName:string,
    subRegion: string,
    tld:string,
    currencies:string,
    languages:Array<string>,
}