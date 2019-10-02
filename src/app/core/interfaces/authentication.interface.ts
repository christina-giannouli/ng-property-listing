import { AuthToken } from './auth-token.interface';
import {User} from './user.interface';

export interface Authentication {
    token: AuthToken;
    user: User;
}
