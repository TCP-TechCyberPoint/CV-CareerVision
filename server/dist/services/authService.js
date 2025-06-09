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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository = __importStar(require("../repositories/userRepository"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const EXPIRES_IN = process.env.EXPIRES_IN || "7d";
const register = async (credentials) => {
    try {
        const { name, email, password } = credentials;
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            return {
                status: 400,
                message: "User already exists.",
            };
        }
        await userRepository.createUser({ name, email, password: hashedPassword });
        return {
            status: 201,
            message: "User created successfully",
        };
    }
    catch (error) {
        return {
            status: 500,
            message: "Failed to register.",
        };
    }
};
exports.register = register;
const login = async (credentials) => {
    try {
        const { email, password } = credentials;
        const user = await userRepository.findByEmail(email);
        if (!user) {
            return {
                status: 404,
                message: "Email not found.",
            };
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return {
                status: 401,
                message: "Invalid email or password.",
            };
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET);
        return {
            status: 200,
            message: "Login successful",
            token,
        };
    }
    catch (error) {
        return {
            status: 500,
            message: "Login failed",
        };
    }
};
exports.login = login;
const validateToken = async (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = await userRepository.findById(decoded.userId);
        if (!user) {
            return {
                valid: false,
                message: "User not found",
            };
        }
        return {
            valid: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        };
    }
    catch (error) {
        return {
            valid: false,
            message: "Invalid token",
        };
    }
};
exports.validateToken = validateToken;
