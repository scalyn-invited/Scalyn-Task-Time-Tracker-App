"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const demoUsers = [
    {
        name: 'Admin User',
        email: 'admin@scalyn.local',
        role: 'ADMIN',
    },
    {
        name: 'Manager User',
        email: 'manager@scalyn.local',
        role: 'MANAGER',
    },
    {
        name: 'Member User',
        email: 'member@scalyn.local',
        role: 'MEMBER',
    },
];
async function main() {
    const saltRounds = Number.parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '12', 10);
    const passwordHash = await bcrypt.hash('Password123!', Number.isNaN(saltRounds) ? 12 : saltRounds);
    for (const user of demoUsers) {
        await prisma.user.upsert({
            where: { email: user.email },
            update: {
                name: user.name,
                password: passwordHash,
                role: user.role,
            },
            create: {
                name: user.name,
                email: user.email,
                password: passwordHash,
                role: user.role,
            },
        });
    }
}
main()
    .catch((error) => {
    console.error(error);
    process.exitCode = 1;
})
    .finally(async () => {
    await prisma.$disconnect();
});
