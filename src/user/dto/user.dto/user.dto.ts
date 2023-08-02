import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { User } from '../../entities/user/user';

const UserDTOSchema = z.object({
  name: z.string().min(2).nonempty(),
  email: z.coerce.string().email().min(5).nonempty(),
  password: z.string().min(3).nonempty(),
});

export class UserDto extends createZodDto(UserDTOSchema) implements User {
  name: '';
  email: '';
  password: '';
}
