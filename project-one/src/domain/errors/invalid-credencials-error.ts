export class InvalidCredencialsError extends Error {
  constructor() {
    super('Credenciais Inválidas');
    this.name = 'InvalidCredencialsError';
  }
}
