import { AppHttp } from "./appHttp";
import { CountryCache } from "./countryCache";
import { countryHelper } from "./countryHelper";
import { ICountryData, IPerson, Person } from "./person";

export class PersonService {

    constructor(private http: AppHttp, private countryCache: CountryCache) {

    }


    public async getPersonData(person: any): Promise<Person> {
        const countryData = await this.getCountryDataByCode(person.country);
        const { firstName, lastName, dateOfBirth, jobTitle, company } = person;
        const personData: IPerson = { countryData: countryData, firstName, lastName, dateOfBirth, jobTitle, company };
        return new Person(personData, countryData.region);
    }

    private async getCountryDataByCode(countryCode: string): Promise<ICountryData> {
        if (this.countryCache.exist(countryCode))
            return this.countryCache.get(countryCode);

        const countryData = await this.http.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const country = countryData.data[0];

        const output: ICountryData = {
            timeZone: country['timezones'],
            currency: countryHelper.getCurrency(country.currencies),
            fullName: countryHelper.getCounryFullName(country.name),
            language: countryHelper.getLanguage(country.languages),
            region: country.region
        };

        this.countryCache.add(countryCode, output);

        return output;

    }
}