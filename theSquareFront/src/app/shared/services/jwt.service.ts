import { Injectable } from '@angular/core';
import * as JWT from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class JwtService {

    constructor() { }

    public getClaims(): Map<string, any> {
        const token = localStorage.getItem('token');
        const tokenDecode = JWT(token);
        let identity = new Map();
        identity.set('id', tokenDecode['id']['low']);
        identity.set('type', tokenDecode['type']);
        return identity;
    }

}
