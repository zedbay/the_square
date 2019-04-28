import { jsrasign } from 'jsrsasign';

export class Security {

    public header = { alg: 'HS256', typ: 'JWT' };
    public secretKey: string;
}