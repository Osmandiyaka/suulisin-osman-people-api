import { expect } from 'chai';
import { PeopleApiException } from '../core/applicationException';
// import  'mocha';
import { CountryHelper } from '../people/countryHelper';


describe('Country helper', () => {

    describe('when getting country name', () => {
        it('should throw an error if called with empty object', () => {
            expect(() => CountryHelper.getCounryFullName({})).to.throw(PeopleApiException);
        });

        it('should throw an error with error message if called with empty object', () => {
            try {
                CountryHelper.getCounryFullName({})
            } catch (error) {
                expect(error.message).to.equal('Name component cannot be null in country object');
            }
        });

        it('should failed  if called with empty object', () => {
            try {
                CountryHelper.getCounryFullName({})
                expect.fail();
            } catch (error) {
            }
        });


        it('should return full country name', () => {``
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

            let countryFullName = CountryHelper.getCounryFullName(nameComponent);
            expect(countryFullName.common).to.equal('India');
            expect(countryFullName.official).to.equal('Republic of India');

        });
    });



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

    it('should throw when called with empty object ', () => {
        try {
            expect(() => CountryHelper.getCurrency({})).to.throw('currency component ddddcannot be null in country object');
            expect(() => CountryHelper.getCounryFullName({})).to.throw(PeopleApiException, /Name ddcomponent cannot be null in country object/);
        } catch (error) {
        }
    });

});