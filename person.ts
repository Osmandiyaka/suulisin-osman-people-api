import { SPECIAL_REGIONS } from './specialRegions';

export interface IPerson {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  jobTitle: string;
  company: string;
  extra?: string;
  countryData: ICountryData
};

export interface ICountryData {
  fullName: { common: string, official: string };
  currency: { code: string, name: string, symbol: string };
  language: string;
  timeZone: string[];
  region: string;
}

export class Person {

  constructor(private personData: IPerson, private region: string) {

  }

  public toJSON() {
    const data = {};
    const countryData = {};

    data["firstName"] = this.personData.firstName;
    data["lastName"] = this.personData.lastName;
    data["dateOfBirth"] = this.personData.dateOfBirth;
    data["jobTitle"] = this.personData.jobTitle;
    data["company"] = this.personData.company;

    countryData["fullName"] = this.personData.countryData.fullName;
    countryData["currency"] = this.personData.countryData.currency;
    countryData["language"] = this.personData.countryData.language;
    countryData["timeZone"] = this.personData.countryData.timeZone;
    data["countryData"] = countryData;
    if (this.isFromASpecialRegion()) {
      data['extra'] = `${this.personData.firstName}${this.personData.lastName}${this.replaceAll(this.personData.dateOfBirth, '/', '')}`;
    }

    return data;
  }

  private isFromASpecialRegion(): boolean {
    return SPECIAL_REGIONS.includes(this.region);
  }

  private escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }
}