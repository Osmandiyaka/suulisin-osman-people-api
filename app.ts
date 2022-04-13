import express from 'express';
import { PersonController } from './peopleController';
import { AppHttp } from './appHttp';
import { CountryCache } from './countryCache';
import { PersonService } from './personService';

const app = express();
const port = 3001;

const http: AppHttp = new AppHttp();
const cache: CountryCache = new CountryCache();
const personService: PersonService = new PersonService(http, cache);
const personController: PersonController = new PersonController(personService);


app.listen(port, () => {
  console.log(`server running on port ${port}.`);
});



app.get('/people', (req, res) => personController.getPeople(req, res));

