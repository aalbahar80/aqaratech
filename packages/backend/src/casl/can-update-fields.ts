import { ForbiddenError } from '@casl/ability';
import { instanceToPlain } from 'class-transformer';
import * as R from 'remeda';
import { Action } from 'src/casl/casl-ability.factory';
import { IUser } from 'src/interfaces/user.interface';

// TODO move to class?
export const canUpdateFields = ({
  user,
  subjectType,
  instance,
}: {
  user: IUser;
  subjectType: any;
  instance: any;
}) => {
  const fields = R.keys(instanceToPlain(instance));

  // check if user has permission to update fields
  fields.forEach((field) => {
    ForbiddenError.from(user.ability)
      .setMessage(`You are not allowed to update ${field}`)
      .throwUnlessCan(Action.Update, subjectType, field);
  });
};
