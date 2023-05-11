import 'reflect-metadata';
import {Join, Transform} from "./transformation";
import {IsString, Length, Max, Min, Validate} from "./validation";


@Transform
@Validate
class Person {
  @Length(3, 15)
  @IsString()
  private readonly name: string;

  @Length(3, 15)
  @IsString()
  private readonly surname: string;

  @Max(45)
  @Min(18)
  private readonly age: number;

  @Join(['name', 'surname'], ' ')
  private readonly fullName: string;

  constructor(name: string, surname: string, age: number) {
    this.name = name;
    this.surname = surname;
    this.age = age;
  }
}

console.log(new Person('halil kaan', 'karakoc', 27));
