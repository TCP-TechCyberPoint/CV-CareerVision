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
exports.validateToken = exports.loginUser = exports.registerUser = void 0;
const AuthService = __importStar(require("../services/authService"));
const registerUser = async (req, res) => {
    try {
        const result = await AuthService.register(req.body);
        res.status(result.status).json({ message: result.message });
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "An unexpected error occurred during registration.";
        res.status(400).json({ error: errorMessage });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const result = await AuthService.login(req.body);
        if (result.token) {
            res
                .status(result.status)
                .json({ message: result.message, token: result.token });
        }
        else {
            console.log("result", result);
            res.status(result.status).json({ message: result.message });
        }
    }
    catch (err) {
        const errorMessage = err instanceof Error
            ? err.message
            : "An unexpected error occurred during login.";
        res.status(401).json({ error: errorMessage });
    }
};
exports.loginUser = loginUser;
const validateToken = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: "No token provided" });
            return;
        }
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        const result = await AuthService.validateToken(token);
        if (result.valid) {
            res.status(200).json({
                message: "Token is valid",
                user: result.user
            });
        }
        else {
            res.status(401).json({ message: "Invalid token" });
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "An unexpected error occurred during token validation.";
        res.status(401).json({ error: errorMessage });
    }
};
exports.validateToken = validateToken;
