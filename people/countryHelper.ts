import { PeopleApiException } from "../core/applicationException";

export class CountryHelper {

    public static getCounryFullName(nameComponent: any): { common: string; official: string; } {
        this.throwIfNull(nameComponent, 'Name component cannot be null in country object');
        this.throwIfKeysAreMissing(nameComponent, ['common', 'official'], 'Name component should have [common] and [official] keys');

        const { common, official } = nameComponent;
        return { common, official };
    }


    public static getCurrency(currencyComponent: any): { code: string, name: string, symbol: string } {
        this.throwIfNull(currencyComponent, 'currency component cannot be null in country object');
        this.throwIfKeysAreMissing(currencyComponent, ['name', 'symbol'], 'Currency component should have [symbol] and [name] keys');

        const code = Object.keys(currencyComponent)[0];
        const name = currencyComponent[code]['name'];
        const symbol = currencyComponent[code]['symbol'];
        return { code, name, symbol }
    }

    public static getLanguage(languageComponent: any): string[] {
        this.throwIfNull(languageComponent, 'language component cannot be null in country object');
        return Object.keys(languageComponent).map(languageKey => languageComponent[languageKey]);
    }

    private static throwIfNull(component: any, errorMessage: string) {
        if (this.isEmpty(component)) {
            throw new PeopleApiException(errorMessage);
        }
    }

    private static throwIfKeysAreMissing(object: any, keys: string[], message: string) {
        const hasMissingKey = keys.some(key => !this.hasKey(object, key));
        if (hasMissingKey)
            throw new PeopleApiException(message);
    }

    private static isEmpty(value): boolean {
        return ((value == null) || (value.hasOwnProperty('length') && value.length === 0) || (value.constructor === Object && Object.keys(value).length === 0)
        )
    }

    private static hasKey(obj, prop) {
        if (typeof obj === 'object' && obj !== null) {
            if (obj.hasOwnProperty(prop)) {
                return true;
            }
            for (var p in obj) {
                if (obj.hasOwnProperty(p) &&
                    this.hasKey(obj[p], prop)) {
                    return true;
                }
            }
        }
        return false;
    }


}