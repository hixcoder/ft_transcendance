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
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const friendship_service_1 = require("../friendship/friendship.service");
let GameService = class GameService {
    constructor(friendshipService, prisma) {
        this.friendshipService = friendshipService;
        this.prisma = prisma;
    }
    async getGameHistory(senderId) {
        try {
            const allUsers = await this.prisma.user.findMany();
            const users = await this.prisma.gameHistory.findMany({
                where: {
                    OR: [
                        {
                            receiverId: senderId,
                        },
                        {
                            senderId: senderId,
                        },
                    ],
                },
            });
            const usersWithAvatar = users.map((user) => {
                const receiver = allUsers.find((item) => item.id === user.receiverId);
                const sender = allUsers.find((item) => item.id === user.senderId);
                return {
                    ...user,
                    receiverAvatar: receiver.profilePic,
                    senderAvatar: sender.profilePic,
                    receiverUsr: receiver.nickname,
                    senderUsr: sender.nickname,
                };
            });
            return usersWithAvatar;
        }
        catch (error) {
            throw error;
        }
    }
    isWined(record, isWined, user) {
        let senderId = record.receiverId;
        let receiverId = record.senderId;
        let senderPoints = record.senderPoints;
        let receiverPoints = record.receiverPoints;
        if (isWined) {
            senderId = record.receiverId;
            receiverId = record.senderId;
            senderPoints = record.receiverPoints;
            receiverPoints = record.senderPoints;
        }
        if (senderId === user.id) {
            return parseInt(senderPoints) > parseInt(receiverPoints);
        }
        else if (receiverId === user.id) {
            return parseInt(senderPoints) < parseInt(receiverPoints);
        }
    }
    async getUserById(recieverId) {
        try {
            const oneUser = await this.prisma.user.findFirst({
                where: {
                    id: recieverId,
                },
            });
            return oneUser;
        }
        catch (error) {
            throw error;
        }
    }
    async getNbrOfMatches(recieverId, isWined) {
        const user = await this.getUserById(recieverId);
        const gamesHistory = await this.getGameHistory(recieverId);
        let NbrOfMatches = 0;
        if (gamesHistory) {
            NbrOfMatches = gamesHistory.length;
            if (isWined === 1) {
                NbrOfMatches = gamesHistory.filter((record) => this.isWined(record, true, user)).length;
            }
            else if (isWined === 0) {
                NbrOfMatches = gamesHistory.filter((record) => this.isWined(record, false, user)).length;
            }
        }
        return NbrOfMatches;
    }
    catch(error) {
        throw error;
    }
    async getGlobalInfos(recieverId) {
        try {
            const globInfo = {
                NbrOfAllMatches: 0,
                NbrOfWinnedMatches: 0,
                NbrOfLosedMatches: 0,
                NbrOfFriends: 0,
                NbrOfBlockedFriends: 0,
                NbrOfInvitedFriends: 0,
            };
            const user = await this.getUserById(recieverId);
            const gamesHistory = await this.getGameHistory(recieverId);
            if (gamesHistory) {
                globInfo.NbrOfAllMatches = gamesHistory.length;
                globInfo.NbrOfWinnedMatches = gamesHistory.filter((record) => this.isWined(record, true, user)).length;
                globInfo.NbrOfLosedMatches = gamesHistory.filter((record) => this.isWined(record, false, user)).length;
            }
            const allFriends = await this.friendshipService.getAllFriends(user.id);
            if (allFriends) {
                globInfo.NbrOfFriends = allFriends.length;
            }
            const allBlocked = await this.friendshipService.getBlockedFriends(user.id);
            if (allBlocked) {
                globInfo.NbrOfBlockedFriends = allBlocked.length;
            }
            const allInvited = await this.friendshipService.getPendingFriends(user.id);
            if (allInvited) {
                globInfo.NbrOfInvitedFriends = allInvited.length;
            }
            return globInfo;
        }
        catch (error) {
            throw error;
        }
    }
    async getUserRanking(senderId) {
        try {
            const allUsers = await this.prisma.user.findMany();
            const usersRank = await Promise.all(allUsers.map(async (user) => {
                const userRank = await this.getNbrOfMatches(user.id, 1);
                return {
                    userId: user.id,
                    winedGames: userRank,
                };
            }));
            const sortedData = usersRank.sort((a, b) => b.winedGames - a.winedGames);
            let userRank = { userId: senderId, rank: 0 };
            sortedData.map((item, index) => {
                if (senderId === item.userId) {
                    userRank.rank = index + 1;
                }
            });
            return userRank;
        }
        catch (error) {
            throw error;
        }
    }
    async getLeaderBoard() {
        try {
            const allUsers = await this.prisma.user.findMany();
            const usersRank = await Promise.all(allUsers.map(async (user) => {
                const winedGames = await this.getNbrOfMatches(user.id, 1);
                const nbrOfMatches = await this.getNbrOfMatches(user.id, 3);
                let winRate = 0;
                if (nbrOfMatches != 0) {
                    winRate = (winedGames * 100) / nbrOfMatches;
                }
                return {
                    userName: user.nickname,
                    userAvatar: user.profilePic,
                    level: user.level,
                    nbrOfMatches: nbrOfMatches.toString(),
                    winRate: winRate.toFixed(0),
                    winedGames: winedGames,
                };
            }));
            const sortedData = usersRank.sort((a, b) => b.winedGames - a.winedGames);
            const rankedData = sortedData.map((item, index) => ({
                userName: item.userName,
                userAvatar: item.userAvatar,
                level: item.level,
                nbrOfMatches: item.nbrOfMatches,
                winRate: item.winRate,
                rank: (index + 1).toString(),
            }));
            return rankedData;
        }
        catch (error) {
            throw error;
        }
    }
    async updateGameHistory(senderId, recieverUsr, senderPt, recieverPt) {
        try {
            const user = await this.prisma.gameHistory.create({
                data: {
                    senderId: senderId,
                    receiverId: recieverUsr,
                    senderPoints: senderPt,
                    receiverPoints: recieverPt,
                },
            });
            if (parseInt(senderPt) > parseInt(recieverPt)) {
                this.updateLevelAfterGame(senderId, "0.23");
            }
            if (parseInt(senderPt) < parseInt(recieverPt)) {
                this.updateLevelAfterGame(recieverUsr, "0.23");
            }
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async updateLevel(senderId, newLevel) {
        try {
            const user = await this.prisma.user.update({
                where: {
                    id: senderId,
                },
                data: {
                    level: newLevel,
                },
            });
            return user;
        }
        catch (error) {
            return {
                error: error,
            };
        }
    }
    async updateLevelAfterGame(senderId, incrLevelBy) {
        try {
            const userT = await this.prisma.user.findUnique({
                where: {
                    id: senderId,
                },
            });
            const currentLevel = parseFloat(userT.level);
            const level = currentLevel + parseFloat(incrLevelBy);
            const user = await this.prisma.user.update({
                where: {
                    id: senderId,
                },
                data: {
                    level: level.toFixed(2),
                },
            });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    collision(ball, player) {
        ball.top = ball.y - ball.radius;
        ball.bottom = ball.y + ball.radius;
        ball.left = ball.x - ball.radius;
        ball.right = ball.x + ball.radius;
        player.top = player.y;
        player.bottom = player.y + player.height;
        player.left = player.x;
        player.right = player.x + player.width;
        return (ball.right > player.left &&
            ball.bottom > player.top &&
            ball.left < player.right &&
            ball.top < player.bottom);
    }
    resetBall(ball) {
        ball.x = 600 / 2;
        ball.y = 400 / 2;
        ball.speed = 5;
        ball.velocityX = 5;
        ball.velocityY = 5;
        ball.radius = 10;
    }
    startGame(ball, player1, player2) {
        ball.x += ball.velocityX;
        ball.y += ball.velocityY;
        if (ball.y + ball.radius > 400 || ball.y - ball.radius < 0) {
            ball.velocityY = -ball.velocityY;
        }
        let user = ball.x < 600 / 2 ? player1 : player2;
        if (this.collision(ball, user)) {
            let collidePoint = ball.y - (user.y + user.height / 2);
            collidePoint = collidePoint / (user.height / 2);
            let angleRad = (collidePoint * Math.PI) / 4;
            let direction = ball.x < 600 / 2 ? 1 : -1;
            ball.velocityX = direction * ball.speed * Math.cos(angleRad);
            ball.velocityY = ball.speed * Math.sin(angleRad);
            if (ball.speed + 0.5 > 15)
                ball.speed = 15;
            else
                ball.speed += 0.5;
        }
        if (ball.x - ball.radius <= 0) {
            this.resetBall(ball);
            player2.score++;
        }
        else if (ball.x + ball.radius >= 600) {
            this.resetBall(ball);
            player1.score++;
        }
    }
};
exports.GameService = GameService;
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [friendship_service_1.FriendshipService,
        prisma_service_1.PrismaService])
], GameService);
//# sourceMappingURL=game.service.js.map