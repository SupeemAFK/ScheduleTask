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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const users_service_1 = require("./users.service");
const updateUserDto_1 = require("./dto/updateUserDto");
const createUserDto_1 = require("./dto/createUserDto");
const user_model_1 = require("./models/user.model");
let UsersResolver = exports.UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getCurrentUser(ctx) {
        if (ctx.req.session?.user_id) {
            const user = await this.usersService.getUserById(ctx.req.session.user_id);
            return user;
        }
        else {
            {
                user: null;
            }
        }
    }
    async getUsers() {
        const users = await this.usersService.getUsers();
        return users;
    }
    async getUserById(id) {
        const user = await this.usersService.getUserById(id);
        return user;
    }
    async getUserByEmail(email) {
        const user = await this.usersService.getUserByEmail(email);
        return user;
    }
    async createUser(createUserDto) {
        const user = await this.usersService.createUser(createUserDto);
        return user;
    }
    async updateUser(updateUserDto) {
        const user = await this.usersService.updateUser(updateUserDto);
        return user;
    }
};
__decorate([
    (0, graphql_1.Query)(returns => user_model_1.User),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getCurrentUser", null);
__decorate([
    (0, graphql_1.Query)(returns => [user_model_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getUsers", null);
__decorate([
    (0, graphql_1.Query)(returns => user_model_1.User),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getUserById", null);
__decorate([
    (0, graphql_1.Query)(returns => user_model_1.User),
    __param(0, (0, graphql_1.Args)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getUserByEmail", null);
__decorate([
    (0, graphql_1.Mutation)(returns => user_model_1.User, { nullable: true }),
    __param(0, (0, graphql_1.Args)('createUserData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUserDto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)(returns => user_model_1.User),
    __param(0, (0, graphql_1.Args)('updateUserData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateUserDto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUser", null);
exports.UsersResolver = UsersResolver = __decorate([
    (0, graphql_1.Resolver)(of => user_model_1.User),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
//# sourceMappingURL=users.resolver.js.map