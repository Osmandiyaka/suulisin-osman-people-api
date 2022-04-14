import { AxiosResponse } from "axios";
import { expect } from 'chai';
import { mock, instance, when } from "ts-mockito";
import { AppHttp } from '../core/appHttp';
import { Cache } from '../core/cache';
import { PersonService } from '../people/personService';
import { Gbr, us } from './helpers/mock.json';

let mockedHtpp: AppHttp = mock(AppHttp);
let htpp: AppHttp = instance(mockedHtpp);
let cache: Cache = new Cache();


const usResponse: AxiosResponse = {
    data: us,
    status: 200,
    statusText: 'OK',
    config: {},
    headers: {},
};

const gbrResponse: AxiosResponse = {
    data: Gbr,
    status: 200,
    statusText: 'OK',
    config: {},
    headers: {},
};

when(mockedHtpp.get('https://restcountries.com/v3.1/alpha/US')).thenReturn(new Promise(resolve => resolve(usResponse)));
when(mockedHtpp.get('https://restcountries.com/v3.1/alpha/GBR')).thenReturn(new Promise(resolve => resolve(gbrResponse)));

let personService: PersonService;
beforeEach(() => {
    personService = new PersonService(htpp, cache);
});

describe('People service', () => {
    describe('When getting person data', () => {
        it('should include bio data', async () => {
            let person = await personService.getPersonData({
                "firstName": "Roy",
                "lastName": "Testerton",
                "dateOfBirth": "19/02/1990",
                "jobTitle": "Software developer",
                "company": "Test co",
                "country": "US"
            });

            let personJson = person.toJSON();
            expect(personJson['firstName']).to.equal('Roy');
            expect(personJson['lastName']).to.equal('Testerton');
        });

        it('should include country fullname', async () => {
            let person = await personService.getPersonData({
                "firstName": "Roy",
                "lastName": "Testerton",
                "dateOfBirth": "19/02/1990",
                "jobTitle": "Software developer",
                "company": "Test co",
                "country": "US"
            });

            let countryData = person.toJSON()['countryData'];
            expect(countryData['fullName']['official']).to.equal('United States of America');
        });

        it('should include country currency', async () => {
            let person = await personService.getPersonData({
                "firstName": "Roy",
                "lastName": "Testerton",
                "dateOfBirth": "19/02/1990",
                "jobTitle": "Software developer",
                "company": "Test co",
                "country": "US"
            });

            let countryData = person.toJSON()['countryData'];
            expect(countryData['currency']['name']).to.equal('United States dollar');
        });

        it('should include country languages', async () => {
            let person = await personService.getPersonData({
                "firstName": "Roy",
                "lastName": "Testerton",
                "dateOfBirth": "19/02/1990",
                "jobTitle": "Software developer",
                "company": "Test co",
                "country": "US"
            });

            let countryData = person.toJSON()['countryData'];
            expect(countryData['languages']).to.eql(['English']);
        });

        it('should include country timezones', async () => {
            let person = await personService.getPersonData({
                "firstName": "Roy",
                "lastName": "Testerton",
                "dateOfBirth": "19/02/1990",
                "jobTitle": "Software developer",
                "company": "Test co",
                "country": "US"
            });

            let countryData = person.toJSON()['countryData'];
            expect(countryData['timeZone']).to.eql(["UTC-12:00",
                "UTC-11:00",
                "UTC-10:00",
                "UTC-09:00",
                "UTC-08:00",
                "UTC-07:00",
                "UTC-06:00",
                "UTC-05:00",
                "UTC-04:00",
                "UTC+10:00",
                "UTC+12:00"]);
        });

        it('should not include extra if person is not from special region', async () => {
            let person = await personService.getPersonData({
                "firstName": "Roy",
                "lastName": "Testerton",
                "dateOfBirth": "19/02/1990",
                "jobTitle": "Software developer",
                "company": "Test co",
                "country": "US"
            });
            const personJson = person.toJSON();

            expect(personJson['extra']).to.undefined;
        });
        it('should  include extra if person is  from special region', async () => {
            let person = await personService.getPersonData({
                "firstName": "Lisa",
                "lastName": "Testora",
                "dateOfBirth": "11/07/1984",
                "jobTitle": "CTO",
                "company": "Test co",
                "country": "GBR"
            });

            const personJson = person.toJSON();
            expect(personJson['extra']).to.not.undefined;
        });

        it('should  format extra correctly if person is  from special region', async () => {
            let person = await personService.getPersonData({
                "firstName": "Lisa",
                "lastName": "Testora",
                "dateOfBirth": "11/07/1984",
                "jobTitle": "CTO",
                "company": "Test co",
                "country": "GBR"
            });

            const personJson = person.toJSON();
            expect(personJson['extra']).to.equal('LisaTestora11071984');
        });
    });


});
