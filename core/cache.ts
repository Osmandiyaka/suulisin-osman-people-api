
export class Cache {
    private cache: { [key: string]: any } = {};

    public add(key: string, country: any) {
        this.cache[key] = country;
    }

    public get(key: string): any {
        return this.cache[key];
    }

    public exist(key: string): boolean {
        return !!this.get(key);
    }
}