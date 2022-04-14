import { Request, Response } from 'express';
import { Person } from './person';
import { PersonList } from './personList';
import { PersonService } from './personService';

export class PersonController {
   constructor(private personService: PersonService) {

   }

   async getPeople(req: Request, res: Response) {
      const people = PersonList.getPersonList();

      try {
         const peopleList = await Promise.all(people.map(async (person): Promise<Person> => this.personService.getPersonData(person)));
         const data = peopleList.map(person => person.toJSON());
         res.json(data);
      } catch (error) {
         res.status(500);
         res.send('error get people data')
      }
     

   }

}

