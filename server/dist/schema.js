"use strict";
//
//  schema.ts
//  server
//
//  Created by d-exclaimation on 09:10.
//
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
var nexus_1 = require("nexus");
var posix_1 = __importDefault(require("path/posix"));
exports.schema = nexus_1.makeSchema({
    types: [],
    outputs: {
        schema: posix_1.default.join(__dirname, "generated/schema.graphql"),
        typegen: posix_1.default.join(__dirname, "generated/types.ts"),
    },
});
