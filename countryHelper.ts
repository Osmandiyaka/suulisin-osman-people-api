export class countryHelper {

    public static getCounryFullName(name: any): { common: string; official: string; } {
        const { common, official } = name;
        return { common, official };
    }


    public static getCurrency(currencyObject: any): { code: string, name: string, symbol: string } {
        const code = Object.keys(currencyObject)[0];
        const name = currencyObject[code]['name'];
        const symbol = currencyObject[code]['symbol'];
        return { code, name, symbol }
    }

    public static getLanguage(languageObject: any): string {
        const key = Object.keys(languageObject)[0];
        return languageObject[key];
    }

}