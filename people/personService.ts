import { AppHttp } from "../core/appHttp";
import { Cache } from "../core/cache";
import { countryHelper } from "./countryHelper";
import { ICountryData, IPerson, Person } from "./person";
import {countryApiUrl} from '../config/config.json'


export class PersonService {

    constructor(private http: AppHttp, private cache: Cache) {

    }


    public async getPersonData(person: any): Promise<Person> {
        const countryData = await this.getCountryDataByCode(person.country);
        const { firstName, lastName, dateOfBirth, jobTitle, company } = person;
        const personData: IPerson = { countryData: countryData, firstName, lastName, dateOfBirth, jobTitle, company };
        return new Person(personData, countryData.region);
    }

    private async getCountryDataByCode(countryCode: string): Promise<ICountryData> {
        if (this.cache.exist(countryCode))
            return this.cache.get(countryCode);

        const countryData = await this.http.get(`${countryApiUrl}/${countryCode}`);
        const country = countryData.data[0];

        const output: ICountryData = {
            timeZone: country['timezones'],
            currency: countryHelper.getCurrency(country.currencies),
            fullName: countryHelper.getCounryFullName(country.name),
            language: countryHelper.getLanguage(country.languages),
            region: country.region
        };

        this.cache.add(countryCode, output);

        return output;

    }
}