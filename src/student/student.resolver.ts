import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentEntity } from './student.entity';
import { CreateStudentInput } from './student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query((returns) => [StudentType])
  students(): Promise<StudentEntity[]> {
    return this.studentService.getAllStudents();
  }

  @Query((returns) => StudentType)
  student(@Args('id') id: string): Promise<StudentEntity> {
    return this.studentService.getStudentById(id);
  }

  @Mutation((returns) => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<StudentEntity> {
    return this.studentService.createStudent(createStudentInput);
  }
}
