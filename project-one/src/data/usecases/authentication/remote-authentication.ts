import {
  HttpPostClient,
  HttpStatusCode,
} from '@/data/protocols/http/index.http.data';
import {
  AuthenticationParams,
  Authentication,
} from '@/domain/usecases/index.usecases.domain';
import {
  InvalidCredencialsError,
  UnexpectedError,
} from '@/domain/errors/index.errors.domain';
import { AccountModel } from '@/domain/models/index.models.domain';

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >,
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredencialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
