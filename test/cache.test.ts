import { expect } from 'chai';
import 'mocha';
import { Cache } from '../core/cache';
import { ICountryData } from '../people/person';
 
let cache:Cache;
let countryData:ICountryData;
beforeEach(() => {
    cache=new Cache();
    countryData={
        currency:{code:'dollar',name:'Us Dollar',symbol:'$'},
        fullName:{common:'Usa',official:'United states of America'},
        language:['English'],
        region:'North America',
        timeZone:['+2','+3']
    }
});


describe('Country cache', () => { 
    it('should enable add item', () => { 
     cache.add('US',countryData);
     let result=cache.get('US');
     expect(result.currency).to.equal(countryData.currency);
     expect(result.fullName).to.equal(countryData.fullName);
     expect(result.language).to.equal(countryData.language);
     expect(result.region).to.equal(countryData.region);
  }); 

  it('should have item ', () => { 
    cache.add('US',countryData);
    let result=cache.exist('US');
    expect(result).to.equal(true);
 }); 

 it('should not have item ', () => { 
    cache.add('US',countryData);
    let result=cache.exist('Gh');
    expect(result).to.equal(false);
 }); 

});