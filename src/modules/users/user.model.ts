import { UserSchema } from './user.schema';
import * as mongoose from 'mongoose';

export const User = mongoose.model('User', UserSchema);