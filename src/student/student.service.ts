import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { CreateStudentInput } from './student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  async getAllStudents(): Promise<StudentEntity[]> {
    return this.studentRepository.find();
  }

  async getStudentById(id: string): Promise<StudentEntity> {
    return this.studentRepository.findOne({ id });
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<StudentEntity> {
    const { name, lastName } = createStudentInput;
    const student = this.studentRepository.create({
      id: uuid(),
      name,
      lastName,
    });
    return this.studentRepository.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<StudentEntity[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }
}
