import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
    
  createToken(data:any) {
    return this.jwtService.sign(data);
  }

  verifyToken(token: string) {
    if(!token) return ''
    return this.jwtService.verify(token)
  }
  
}