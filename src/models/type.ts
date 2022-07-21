export interface CountryType {
    label: string,
    value: string,
    currency: string,
    rate: number
}
export interface PackageType {
    type: string,
    price: number,
    percent: number,
    currency: string
}
export interface SummaryType {
    name: string,
    age: number,
    country: CountryType,
    pkageIdx: number,
    pkageData: Array<PackageType>
}