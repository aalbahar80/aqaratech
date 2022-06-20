import { UserDto } from 'src/users/dto/user.dto';

export type TRequest = Request & { user?: UserDto };
