"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const client_module_1 = require("./client/client.module");
const prisma_module_1 = require("./prisma/prisma.module");
const env_validation_1 = require("./config/env.validation");
const user_module_1 = require("./user/user.module");
const web_module_1 = require("./web/web.module");
const task_module_1 = require("./task/task.module");
const time_tracking_module_1 = require("./time-tracking/time-tracking.module");
const timesheet_module_1 = require("./timesheet/timesheet.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
                envFilePath: '.env',
                validate: env_validation_1.validateEnv,
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            client_module_1.ClientModule,
            task_module_1.TaskModule,
            time_tracking_module_1.TimeTrackingModule,
            timesheet_module_1.TimesheetModule,
            web_module_1.WebModule,
        ],
    })
], AppModule);
