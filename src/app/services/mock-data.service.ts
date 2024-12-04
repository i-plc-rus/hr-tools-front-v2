import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NegotiationView} from '../models/Negotiation';
import {ModelsNegotiationStatus} from '../api/data-contracts';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  responses: NegotiationView[] = [ 
    new NegotiationView({
    id: '1idi-hfgf-d1',
    photo_url: '',
    fio: 'Руденко Михаил',
    phone: '+79373456789',
    email: 'miketech@yandex.ru',
    age: 25,
    resume_title: 'Программист',
    address: 'Москва',
    comment: 'Посмотрите пожалуйста...',
    negotiation_date: '2024-10-20T00:00:00',
    salary: 50000,
    step: 'Откликнулся',
    step_time: '30 мин',
    negotiation_status: ModelsNegotiationStatus.NegotiationStatusRejected,
  }), 
  new NegotiationView({
    id: '2id-ddd-222',
    photo_url: '',
    fio: 'Макаров Илья Ярославович',
    phone: '+7 (934) 345-67-89',
    email: 'vaskaKrasa@gmail.com',
    age: 23,
    resume_title: 'Менеджер',
    address: 'Москва',
    comment: '',
    negotiation_date: '2024-09-18T00:00:00',
    salary: 100000,
    step: 'Откликнулся',
    step_time: '',
    negotiation_status: ModelsNegotiationStatus.NegotiationStatusWait,
  }), 
  new NegotiationView({
    id: '3ddd-ddd-ddd3',
    photo_url: 'https://marketplace.canva.com/EAFltIh8PKg/1/0/1600w/canva-cute-anime-cartoon-illustration-girl-avatar-J7nVyTlhTAE.jpg',
    fio: 'Григорьевa Марта Станиславовa',
    phone: '+7 (934) 345-67-89',
    email: 'vaskaKrasa@gmail.com',
    age: 21,
    resume_title: 'Программист',
    address: 'Санкт-Петербург',
    comment: '',
    negotiation_date: '2024-08-18T00:00:00',
    salary: 50000,
    step: 'Откликнулся',
    step_time: '1 час 30 мин',
    negotiation_status: undefined,
  }), 
  new NegotiationView({
    id: '4dd-ddddd-ddd4',
    photo_url: 'https://marketplace.canva.com/EAFltFTo1p0/1/0/1600w/canva-cute-anime-illustration-boy-avatar-d8N3f7Rn9aU.jpg',
    fio: 'Михайлов Павел Матвеевич',
    phone: '+7 (934) 345-67-89',
    email: 'vaskaKrasa@gmail.com',
    age: 23,
    resume_title: 'Разработчик',
    address: 'Ижевск',
    comment: '',
    negotiation_date: '2024-08-18T00:00:00',
    salary: 50000,
    step: 'Откликнулся',
    step_time: '1 час 30 мин',
    negotiation_status: ModelsNegotiationStatus.NegotiationStatusAccepted,
  }), 
  new NegotiationView({
    id: '5gggg-gggg-ggggg5',
    photo_url: '',
    fio: 'Киселёвa Кристина',
    phone: '+7 (934) 345-67-89',
    email: 'vaskaKrasa@gmail.com',
    age: 29,
    resume_title: 'Программист',
    address: 'Ижевск',
    comment: '',
    negotiation_date: '2024-08-18T00:00:00',
    salary: 50000,
    step: 'Откликнулся',
    step_time: '1 час 30 мин',
    negotiation_status: ModelsNegotiationStatus.NegotiationStatusWait,
  })
  ];
  constructor() { }

  getNegotiations(): Observable<NegotiationView[]> {
    return new Observable<NegotiationView[]>((observer) => {
      setTimeout(() => {
        observer.next(this.responses);
        observer.complete();
      }, 1000)
    })
  }

  getNegotiationById(id: string): Observable<NegotiationView> {
    const response = this.responses.find(x => x.id === id);
    return new Observable<NegotiationView>((observer) => {
      setTimeout(() => {
        if (!response) 
          observer.error();
        else
          observer.next(response);
        observer.complete();
      }, 100)
    })
  }

}
