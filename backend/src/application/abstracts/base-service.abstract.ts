export abstract class BaseService {
  protected async executeWithErrorHandling<T>(
    operation: () => Promise<T>,
    errorMessage: string,
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      throw new Error(`${errorMessage}: ${error.message}`);
    }
  }
}
