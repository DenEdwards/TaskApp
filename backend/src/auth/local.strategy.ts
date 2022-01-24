import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    logger: Logger;

    constructor(private authService: AuthService) {
        super();
        this.logger = new Logger();
    }  

    async validate(username: string, password: string): Promise<any> { 
        const valid = await this.authService.validateUser(password);  
        this.logger.log(valid + ' entry');
        if (!valid) {
            throw new UnauthorizedException(valid)
        }

        return valid
    }
}