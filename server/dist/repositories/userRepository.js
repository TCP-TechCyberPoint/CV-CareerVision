"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findById = exports.findByEmail = void 0;
const User_1 = __importDefault(require("../models/User"));
const findByEmail = async (email) => {
    return User_1.default.findOne({ email });
};
exports.findByEmail = findByEmail;
const findById = async (id) => {
    return User_1.default.findById(id);
};
exports.findById = findById;
const createUser = async (userData) => {
    const user = new User_1.default(userData);
    return user.save();
};
exports.createUser = createUser;
