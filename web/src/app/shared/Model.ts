export class Model {
  id: string;
  name: string;
  age: number;

  constructor(attributes: Partial<Model>) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.age = attributes.age;
  }

  validate(): boolean {
    return this.name !== '' && this.age > 0;
  }
}
