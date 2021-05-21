import { InMemoryDbService } from 'angular-in-memory-web-api';

export class DataService implements InMemoryDbService  {
  createDb() {
    let owners = [
      {id: 'f838dd6c-3b52-4c21-9148-b73e3b60edb3', aLastName: 'Иванов', aFirstName: 'Иван', aMiddleName: 'Иванович', aCars: [
        {
          gosNumber: 'AX1111HP', nameManufacturer: 'ford', nameModel: 'c-max', yearProduction: 2007, id: '2e05cf0c-1abc-44c9-8bee-92815632a9aa'
        }
      ]
    },
      {id: '6bc91aa7-7df5-4e51-a2ef-4343d9e608a4', aLastName: 'Петрова', aFirstName: 'Наталья', aMiddleName: 'Игоревна', aCars: [
        {
        gosNumber: 'CB1441HH', nameManufacturer: 'mazda', nameModel: '6', yearProduction: 2009, id: '4d5fb628-3706-4339-b2a3-97bb2a06b3e8'
      },
    {
        gosNumber: 'CB4114YY', nameManufacturer: 'subaru', nameModel: 'outlander', yearProduction: 2012, id: 'd8a66df2-3a92-42a9-b5eb-d5afd252eb51'
    }
  ]
},
      {id: '0bceadaf-b443-49c3-b6da-d07a137b58b7', aLastName: 'Антонов', aFirstName: 'Алексей', aMiddleName: 'Сергеевич', aCars: [
        {
        gosNumber: 'AA5688BM', nameManufacturer: 'seat', nameModel: 'cordoba', yearProduction: 2005, id: '486c636d-4487-4d72-97a4-ce4ce27b3897'
      }
    ]
   },
    ];
    return {owners};
  }
}
