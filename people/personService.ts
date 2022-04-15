import { AppHttp } from "../core/appHttp";
import { Cache } from "../core/cache";
import { CountryHelper } from "./countryHelper";
import { ICountryData, IPerson, Person } from "./person";
import {countryApiUrl} from '../config/config.json'


export class PersonService {

    constructor(private http: AppHttp, private cache: Cache) {

    }


    public async getPersonData(person: any): Promise<Person> {
        const countryData = await this.getCountryDataByCode(person.country);
        const personData: IPerson = { countryData: countryData, ...person };
        return new Person(personData, countryData.region);
    }

    private async getCountryDataByCode(countryCode: string): Promise<ICountryData> {
        if (this.cache.exist(countryCode))
            return this.cache.get(countryCode);

        const countryData = await this.http.get(`${countryApiUrl}/${countryCode}`);
        const country = countryData.data[0];

        const output: ICountryData = {
            timeZone: country['timezones'],
            currency: CountryHelper.getCurrency(country.currencies),
            fullName: CountryHelper.getCountryFullName(country.name),
            language: CountryHelper.getLanguage(country.languages),
            region: country.region
        };

        this.cache.add(countryCode, output);

        return output;

    }
}