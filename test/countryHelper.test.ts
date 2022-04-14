import { expect } from 'chai';
import { PeopleApiException } from '../core/applicationException';
// import  'mocha';
import { CountryHelper } from '../people/countryHelper';


describe('Country helper', () => {

    describe('when getting country name', () => {
        it('should throw an error if called with empty object', () => {
            expect(() => CountryHelper.getCountryFullName({})).to.throw(PeopleApiException);
        });

        it('should throw an error with error message if called with empty object', () => {
            try {
                CountryHelper.getCountryFullName({})
            } catch (error) {
                expect(error.message).to.equal('Name component cannot be null in country object');
            }
        });

        it('should failed  if called with empty object', () => {
            try {
                CountryHelper.getCountryFullName({})
                expect.fail();
            } catch (error) {
            }
        });


        it('should return full country name', () => {
            ``
            let nameComponent = {
                "common": "India",
                "official": "Republic of India",
                "nativeName": {
                    "eng": {
                        "official": "Republic of India",
                        "common": "India"
                    },
                    "hin": {
                        "official": "भारत गणराज्य",
                        "common": "भारत"
                    },
                    "tam": {
                        "official": "இந்தியக் குடியரசு",
                        "common": "இந்தியா"
                    }
                }
            }

            let countryFullName = CountryHelper.getCountryFullName(nameComponent);
            expect(countryFullName.common).to.equal('India');
            expect(countryFullName.official).to.equal('Republic of India');

        });

        it('should throw if called without common and official keys', () => {
            let nameComponent = {
                "common1": "India",
                "official1": "Republic of India",
                "nativeName": {
                    "eng": {
                        "official": "Republic of India",
                        "commonr": "India"
                    },
                    "hin": {
                        "officialr": "भारत गणराज्य",
                        "commonr": "भारत"
                    },
                    "tam": {
                        "officialr": "இந்தியக் குடியரசு",
                        "commonr": "இந்தியா"
                    }
                }
            }
            expect(() => CountryHelper.getCountryFullName(nameComponent)).to.throw(PeopleApiException);


        });
    });

    describe('When getting currency', () => {
        it('should return currency', () => {
            let currencyComponent = {
                "INR": {
                    "name": "Indian rupee",
                    "symbol": "₹"
                }
            };

            let currency = CountryHelper.getCurrency(currencyComponent);
            expect(currency.code).to.equal('INR');
            expect(currency.name).to.equal('Indian rupee');
            expect(currency.symbol).to.equal('₹');
        });

        it('should throw an error if called with empty object', () => {
            expect(() => CountryHelper.getCurrency({})).to.throw(PeopleApiException);
        });

        it('should throw an error if called with null', () => {
            expect(() => CountryHelper.getCurrency(null)).to.throw(PeopleApiException);
        });

        it('should throw when called without name and symbol properties', () => {
            let currencyComponent = {
                "INR": {
                    "namer": "Indian rupee",
                    "symbolr": "₹"
                }
            };

            expect(() => CountryHelper.getCurrency(currencyComponent)).to.throw(PeopleApiException);
        });
    })

    describe('When getting languages', () => {
        it('should return languages ', () => {
            let languageComponent = {
                "eng": "English",
                "hin": "Hindi",
                "tam": "Tamil"
            };
    
            let languages = CountryHelper.getLanguage(languageComponent);
            expect(languages.length).to.equal(3);
            expect(languages).to.include.members(['English', 'English', 'Tamil'])
        });

        it('should throw an error if called with null', () => {
            expect(() => CountryHelper.getLanguage(null)).to.throw(PeopleApiException);
        });
        it('should throw an error if called with empty object', () => {
            expect(() => CountryHelper.getLanguage({})).to.throw(PeopleApiException);
        });
    })

    

    it('should throw when called with empty object ', () => {
        expect(() => CountryHelper.getCurrency({})).to.throw(PeopleApiException);
    });

});