import { AxiosResponse } from "axios";
import { expect } from 'chai';
import { mock, instance, when } from "ts-mockito";
import { AppHttp } from '../core/appHttp';
import { Cache } from '../core/cache';
import { PersonService } from '../people/personService';

let mockedHtpp: AppHttp = mock(AppHttp);
let htpp: AppHttp = instance(mockedHtpp);
let cache: Cache = new Cache();

let usCountry = [
    {
        "name": {
            "common": "United States",
            "official": "United States of America",
            "nativeName": {
                "eng": {
                    "official": "United States of America",
                    "common": "United States"
                }
            }
        },
        "tld": [
            ".us"
        ],
        "cca2": "US",
        "ccn3": "840",
        "cca3": "USA",
        "cioc": "USA",
        "independent": true,
        "status": "officially-assigned",
        "unMember": true,
        "currencies": {
            "USD": {
                "name": "United States dollar",
                "symbol": "$"
            }
        },
        "idd": {
            "root": "+1",
            "suffixes": [
                "201",
                "202",
                "203",
                "205",
                "206",
                "207",
                "208",
                "209",
                "210",
                "212",
                "213",
                "214",
                "215",
                "216",
                "217",
                "218",
                "219",
                "220",
                "224",
                "225",
                "227",
                "228",
                "229",
                "231",
                "234",
                "239",
                "240",
                "248",
                "251",
                "252",
                "253",
                "254",
                "256",
                "260",
                "262",
                "267",
                "269",
                "270",
                "272",
                "274",
                "276",
                "281",
                "283",
                "301",
                "302",
                "303",
                "304",
                "305",
                "307",
                "308",
                "309",
                "310",
                "312",
                "313",
                "314",
                "315",
                "316",
                "317",
                "318",
                "319",
                "320",
                "321",
                "323",
                "325",
                "327",
                "330",
                "331",
                "334",
                "336",
                "337",
                "339",
                "346",
                "347",
                "351",
                "352",
                "360",
                "361",
                "364",
                "380",
                "385",
                "386",
                "401",
                "402",
                "404",
                "405",
                "406",
                "407",
                "408",
                "409",
                "410",
                "412",
                "413",
                "414",
                "415",
                "417",
                "419",
                "423",
                "424",
                "425",
                "430",
                "432",
                "434",
                "435",
                "440",
                "442",
                "443",
                "447",
                "458",
                "463",
                "464",
                "469",
                "470",
                "475",
                "478",
                "479",
                "480",
                "484",
                "501",
                "502",
                "503",
                "504",
                "505",
                "507",
                "508",
                "509",
                "510",
                "512",
                "513",
                "515",
                "516",
                "517",
                "518",
                "520",
                "530",
                "531",
                "534",
                "539",
                "540",
                "541",
                "551",
                "559",
                "561",
                "562",
                "563",
                "564",
                "567",
                "570",
                "571",
                "573",
                "574",
                "575",
                "580",
                "585",
                "586",
                "601",
                "602",
                "603",
                "605",
                "606",
                "607",
                "608",
                "609",
                "610",
                "612",
                "614",
                "615",
                "616",
                "617",
                "618",
                "619",
                "620",
                "623",
                "626",
                "628",
                "629",
                "630",
                "631",
                "636",
                "641",
                "646",
                "650",
                "651",
                "657",
                "660",
                "661",
                "662",
                "667",
                "669",
                "678",
                "681",
                "682",
                "701",
                "702",
                "703",
                "704",
                "706",
                "707",
                "708",
                "712",
                "713",
                "714",
                "715",
                "716",
                "717",
                "718",
                "719",
                "720",
                "724",
                "725",
                "727",
                "730",
                "731",
                "732",
                "734",
                "737",
                "740",
                "743",
                "747",
                "754",
                "757",
                "760",
                "762",
                "763",
                "765",
                "769",
                "770",
                "772",
                "773",
                "774",
                "775",
                "779",
                "781",
                "785",
                "786",
                "801",
                "802",
                "803",
                "804",
                "805",
                "806",
                "808",
                "810",
                "812",
                "813",
                "814",
                "815",
                "816",
                "817",
                "818",
                "828",
                "830",
                "831",
                "832",
                "843",
                "845",
                "847",
                "848",
                "850",
                "854",
                "856",
                "857",
                "858",
                "859",
                "860",
                "862",
                "863",
                "864",
                "865",
                "870",
                "872",
                "878",
                "901",
                "903",
                "904",
                "906",
                "907",
                "908",
                "909",
                "910",
                "912",
                "913",
                "914",
                "915",
                "916",
                "917",
                "918",
                "919",
                "920",
                "925",
                "928",
                "929",
                "930",
                "931",
                "934",
                "936",
                "937",
                "938",
                "940",
                "941",
                "947",
                "949",
                "951",
                "952",
                "954",
                "956",
                "959",
                "970",
                "971",
                "972",
                "973",
                "975",
                "978",
                "979",
                "980",
                "984",
                "985",
                "989"
            ]
        },
        "capital": [
            "Washington, D.C."
        ],
        "altSpellings": [
            "US",
            "USA",
            "United States of America"
        ],
        "region": "Americas",
        "subregion": "North America",
        "languages": {
            "eng": "English"
        },
        "translations": {
            "ara": {
                "official": "الولايات المتحدة الامريكية",
                "common": "الولايات المتحدة"
            },
            "ces": {
                "official": "Spojené státy americké",
                "common": "Spojené státy"
            },
            "cym": {
                "official": "United States of America",
                "common": "United States"
            },
            "deu": {
                "official": "Vereinigte Staaten von Amerika",
                "common": "Vereinigte Staaten"
            },
            "est": {
                "official": "Ameerika Ühendriigid",
                "common": "Ameerika Ühendriigid"
            },
            "fin": {
                "official": "Amerikan yhdysvallat",
                "common": "Yhdysvallat"
            },
            "fra": {
                "official": "Les états-unis d'Amérique",
                "common": "États-Unis"
            },
            "hrv": {
                "official": "Sjedinjene Države Amerike",
                "common": "Sjedinjene Američke Države"
            },
            "hun": {
                "official": "Amerikai Egyesült Államok",
                "common": "Amerikai Egyesült Államok"
            },
            "ita": {
                "official": "Stati Uniti d'America",
                "common": "Stati Uniti d'America"
            },
            "jpn": {
                "official": "アメリカ合衆国",
                "common": "アメリカ合衆国"
            },
            "kor": {
                "official": "아메리카 합중국",
                "common": "미국"
            },
            "nld": {
                "official": "Verenigde Staten van Amerika",
                "common": "Verenigde Staten"
            },
            "per": {
                "official": "ایالات متحده آمریکا",
                "common": "ایالات متحده آمریکا"
            },
            "pol": {
                "official": "Stany Zjednoczone Ameryki",
                "common": "Stany Zjednoczone"
            },
            "por": {
                "official": "Estados Unidos da América",
                "common": "Estados Unidos"
            },
            "rus": {
                "official": "Соединенные Штаты Америки",
                "common": "Соединённые Штаты Америки"
            },
            "slk": {
                "official": "Spojené štáty Americké",
                "common": "Spojené štáty americké"
            },
            "spa": {
                "official": "Estados Unidos de América",
                "common": "Estados Unidos"
            },
            "swe": {
                "official": "Amerikas förenta stater",
                "common": "USA"
            },
            "urd": {
                "official": "ریاستہائے متحدہ امریکا",
                "common": "ریاستہائے متحدہ"
            },
            "zho": {
                "official": "美利坚合众国",
                "common": "美国"
            }
        },
        "latlng": [
            38.0,
            -97.0
        ],
        "landlocked": false,
        "borders": [
            "CAN",
            "MEX"
        ],
        "area": 9372610.0,
        "demonyms": {
            "eng": {
                "f": "American",
                "m": "American"
            },
            "fra": {
                "f": "Américaine",
                "m": "Américain"
            }
        },
        "flag": "🇺🇸",
        "maps": {
            "googleMaps": "https://goo.gl/maps/e8M246zY4BSjkjAv6",
            "openStreetMaps": "https://www.openstreetmap.org/relation/148838#map=2/20.6/-85.8"
        },
        "population": 329484123,
        "gini": {
            "2018": 41.4
        },
        "fifa": "USA",
        "car": {
            "signs": [
                "USA"
            ],
            "side": "right"
        },
        "timezones": [
            "UTC-12:00",
            "UTC-11:00",
            "UTC-10:00",
            "UTC-09:00",
            "UTC-08:00",
            "UTC-07:00",
            "UTC-06:00",
            "UTC-05:00",
            "UTC-04:00",
            "UTC+10:00",
            "UTC+12:00"
        ],
        "continents": [
            "North America"
        ],
        "flags": {
            "png": "https://flagcdn.com/w320/us.png",
            "svg": "https://flagcdn.com/us.svg"
        },
        "coatOfArms": {
            "png": "https://mainfacts.com/media/images/coats_of_arms/us.png",
            "svg": "https://mainfacts.com/media/images/coats_of_arms/us.svg"
        },
        "startOfWeek": "sunday",
        "capitalInfo": {
            "latlng": [
                38.89,
                -77.05
            ]
        },
        "postalCode": {
            "format": "#####-####",
            "regex": "^\\d{5}(-\\d{4})?$"
        }
    }
]
const axiosResponse: AxiosResponse = {
    data: usCountry,
    status: 200,
    statusText: 'OK',
    config: {},
    headers: {},
};

when(mockedHtpp.get('https://restcountries.com/v3.1/alpha/US')).thenReturn(new Promise(resolve => resolve(axiosResponse)));

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
    });


});
