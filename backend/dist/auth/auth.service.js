"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const qrcode_1 = require("qrcode");
const otplib_1 = require("otplib");
let AuthService = class AuthService {
    constructor(prisma, userService, jwtService) {
        this.prisma = prisma;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async generateAccessToken(user) {
        const payload = { sub: user.intra_id, nickname: user.login42 };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async valiadteUserAndCreateJWT(user) {
        try {
            const authResult = await this.userService.findByIntraId(user.intra_id);
            if (authResult) {
                return this.generateAccessToken(user);
            }
            else {
                return null;
            }
        }
        catch (error) {
            return null;
        }
    }
    async loginWith2fa(userWithoutPsw) {
        const payload = {
            email: userWithoutPsw.email,
            isTwoFactorAuthEnabled: !userWithoutPsw.isTwoFactorAuthEnabled,
            isTwoFactorAuthenticated: true,
        };
        return {
            email: payload.email,
            access_token: this.jwtService.sign(payload),
        };
    }
    async generateTwoFactorAuthSecret(user) {
        const secret = otplib_1.authenticator.generateSecret();
        const otpAuthUrl = otplib_1.authenticator.keyuri(user.nickname, 'ft_tranc', secret);
        await this.userService.setTwoFactorAuthSecret(secret, user.sub);
        return {
            secret,
            otpAuthUrl,
        };
    }
    async generateQrCodeDataURL(otpAuthUrl) {
        return (0, qrcode_1.toDataURL)(otpAuthUrl);
    }
    async isTwoFactorAuthCodeValid(authCode, intra_id) {
        const user = await this.prisma.user.findUnique({ where: { intra_id: intra_id } });
        return otplib_1.authenticator.verify({
            token: authCode,
            secret: user.twoFactorAuthSecret,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map