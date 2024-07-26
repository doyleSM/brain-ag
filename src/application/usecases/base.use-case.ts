export default interface BaseUseCase<T, U> {
  execute(input: T): U | Promise<U>;
}
