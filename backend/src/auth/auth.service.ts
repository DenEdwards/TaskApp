import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private configService: ConfigService) { }
    
    async validateUser(password: string): Promise<any>{ 
        const storedHash = this.configService.get('HASHED_PASSWORD'); 
        return await bcrypt.compare(password, storedHash); 
    }

    async login(user: any) {
        const payload = { loggedIn: user };
        const token = {access_token: this.jwtService.sign(payload),} 
        return token
    }

}
