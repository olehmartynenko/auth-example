import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  ForbiddenException,
} from '@nestjs/common';

@Catch(ForbiddenException)
export class AuthExceptionFilter implements ExceptionFilter {
  private readonly authorizationErrorMessage = 'Please login to continue';

  public catch(exception: HttpException, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse();

    response.status(401).send({
      error: this.authorizationErrorMessage,
    });
  }
}
