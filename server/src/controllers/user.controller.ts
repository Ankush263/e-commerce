import { User } from './../models/user.model';
import {getAll} from './factory.controller'


export const getAllUsers = getAll(User);