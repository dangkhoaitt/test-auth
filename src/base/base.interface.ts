import { ObjectId } from 'bson';

export interface Base {
  _id?: string | ObjectId;
  insertTime?: number;
  updateTime?: number;
  deleteTime?: number;
}
