import express from 'express';
import { PersonController } from './people/controller';
import { AppHttp } from './core/appHttp';
import { Cache } from './core/cache';
import { PersonService } from './people/personService';

const app = express();
const port = 3001;

const http: AppHttp = new AppHttp();
const cache: Cache = new Cache();
const personService: PersonService = new PersonService(http, cache);
const personController: PersonController = new PersonController(personService);


app.listen(port, () => {
  console.log(`server running on port ${port}.`);
});



app.get('/people', (req, res) => personController.getPeople(req, res));

