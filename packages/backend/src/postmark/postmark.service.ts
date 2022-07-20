import { Injectable } from '@nestjs/common';
import { ServerClient } from 'postmark';

@Injectable()
export class PostmarkService {
  constructor() {}
  // TODO use config to get key
  client = new ServerClient('aecd4fd3-1314-44e9-b1b5-d7dbb89fd0ca'); // test
  // client = new ServerClient('d107c908-4ed3-45f4-b7e2-c40220cab455'); // prod
}
