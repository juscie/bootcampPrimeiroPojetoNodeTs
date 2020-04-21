import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../respositories/AppointmentsRepository';

/**
 * Recebimento das informçoes
 * Tratativa de erros/excessões
 * Acesso ao repositório
 */

/***
 * Dependency Inversion , encontrar esse princípio dentro do (SOLID)
 */
interface Request {
  provider: string;
  date: Date;
}

/**
 * DRY: Don´t repeat Yourself
 */

class CrateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);


    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    };

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });
    return appointment;
  }
}
export default CrateAppointmentService;
