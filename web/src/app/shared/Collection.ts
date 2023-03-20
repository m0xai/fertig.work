import { Model } from './Model';

export class MyCollection extends Array<Model> {
  apiURL = 'https://example.com/my-api';

  constructor(models: Partial<Model>[] = []) {
    super(...models.map((model) => new Model(model)));
  }

  fetch(): Promise<void> {
    return fetch(this.apiURL)
      .then((response) => response.json())
      .then((models) => {
        this.length = 0;
        models.forEach((model: Model) => {
          this.push(new Model(model));
        });
      });
  }
}

// const collection = new MyCollection();
// collection.apiURL = 'https://example.com/another-api';
// collection.fetch().then(() => {
//   console.log(collection);
// });
