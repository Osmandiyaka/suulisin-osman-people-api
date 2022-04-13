import { ICountryData } from "./person";

export class CountryCache {
    private cache: { [key: string]: ICountryData } = {};

    public add(countryCode: string, country: ICountryData) {
        this.cache[countryCode] = country;
    }

    public get(countryCode: string): ICountryData {
        return this.cache[countryCode];
    }

    public exist(countryCode: string): boolean {
        return !!this.get(countryCode);
    }
}