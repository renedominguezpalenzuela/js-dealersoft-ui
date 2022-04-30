import { NestedPropertyPipe } from './nested-property.pipe';

describe('NestedPropertyPipe', () => {
  it('create an instance', () => {
    const pipe = new NestedPropertyPipe();
    expect(pipe).toBeTruthy();
  });
});
