import { ReversePipe } from './reverse.pipe';
//THIS TEST SHOWS ISOLATED UNIT TESTS, don't need inject anything. WOW
describe('ReversePipe', () => {
  it('create an instance of ReversePipe', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return reverse string', () => {
    const testString = 'memory';
    const expectedResult = 'yromem';
    const pipe = new ReversePipe();
    expect(pipe.transform(testString)).toEqual(expectedResult);
  });
});
