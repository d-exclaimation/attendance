/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"
import type { FieldAuthorizeResolver } from "nexus/dist/plugins/fieldAuthorizePlugin"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  Credentials: { // input type
    password: string; // String!
    username: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  AccessCredentials: { // root type
    expireAt: string; // String!
    token: string; // String!
  }
  Attendance: { // root type
    entryAt: string; // String!
    id: string; // ID!
    leaveAt?: string | null; // String
    userId: string; // String!
  }
  InvalidCredentials: { // root type
    password: string; // String!
  }
  Mutation: {};
  NoToken: { // root type
    message: string; // String!
  }
  NotClockedIn: { // root type
    message: string; // String!
  }
  Query: {};
  SignUpSuccess: { // root type
    userInfo: NexusGenRootTypes['User']; // User!
  }
  User: { // root type
    id: string; // ID!
    name: string; // String!
  }
  UserAlreadyExist: { // root type
    username: string; // String!
  }
  UserCredentials: { // root type
    expireAt: string; // String!
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  UserNotFound: { // root type
    username: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
  ClockIn: NexusGenRootTypes['Attendance'] | NexusGenRootTypes['UserNotFound'];
  ClockOut: NexusGenRootTypes['Attendance'] | NexusGenRootTypes['NotClockedIn'] | NexusGenRootTypes['UserNotFound'];
  LoginResult: NexusGenRootTypes['InvalidCredentials'] | NexusGenRootTypes['UserCredentials'] | NexusGenRootTypes['UserNotFound'];
  RefreshResult: NexusGenRootTypes['AccessCredentials'] | NexusGenRootTypes['NoToken'] | NexusGenRootTypes['UserNotFound'];
  SignUpResult: NexusGenRootTypes['InvalidCredentials'] | NexusGenRootTypes['SignUpSuccess'] | NexusGenRootTypes['UserAlreadyExist'];
}

export type NexusGenRootTypes = NexusGenObjects & NexusGenUnions

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AccessCredentials: { // field return type
    expireAt: string; // String!
    token: string; // String!
  }
  Attendance: { // field return type
    entryAt: string; // String!
    id: string; // ID!
    isCompleted: boolean; // Boolean!
    leaveAt: string | null; // String
    user: NexusGenRootTypes['User']; // User!
    userId: string; // String!
    workHours: string; // String!
  }
  InvalidCredentials: { // field return type
    password: string; // String!
  }
  Mutation: { // field return type
    clockIn: NexusGenRootTypes['ClockIn']; // ClockIn!
    clockOut: NexusGenRootTypes['ClockOut']; // ClockOut!
    login: NexusGenRootTypes['LoginResult']; // LoginResult!
    refresh: NexusGenRootTypes['RefreshResult']; // RefreshResult!
    signup: NexusGenRootTypes['SignUpResult']; // SignUpResult!
  }
  NoToken: { // field return type
    message: string; // String!
  }
  NotClockedIn: { // field return type
    message: string; // String!
  }
  Query: { // field return type
    employees: NexusGenRootTypes['User'][]; // [User!]!
    history: NexusGenRootTypes['Attendance'][]; // [Attendance!]!
    me: NexusGenRootTypes['User'] | null; // User
    recorded: NexusGenRootTypes['Attendance'][]; // [Attendance!]!
    state: NexusGenRootTypes['Attendance'] | null; // Attendance
  }
  SignUpSuccess: { // field return type
    userInfo: NexusGenRootTypes['User']; // User!
  }
  User: { // field return type
    attendances: NexusGenRootTypes['Attendance'][]; // [Attendance!]!
    id: string; // ID!
    name: string; // String!
  }
  UserAlreadyExist: { // field return type
    username: string; // String!
  }
  UserCredentials: { // field return type
    expireAt: string; // String!
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  UserNotFound: { // field return type
    username: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  AccessCredentials: { // field return type name
    expireAt: 'String'
    token: 'String'
  }
  Attendance: { // field return type name
    entryAt: 'String'
    id: 'ID'
    isCompleted: 'Boolean'
    leaveAt: 'String'
    user: 'User'
    userId: 'String'
    workHours: 'String'
  }
  InvalidCredentials: { // field return type name
    password: 'String'
  }
  Mutation: { // field return type name
    clockIn: 'ClockIn'
    clockOut: 'ClockOut'
    login: 'LoginResult'
    refresh: 'RefreshResult'
    signup: 'SignUpResult'
  }
  NoToken: { // field return type name
    message: 'String'
  }
  NotClockedIn: { // field return type name
    message: 'String'
  }
  Query: { // field return type name
    employees: 'User'
    history: 'Attendance'
    me: 'User'
    recorded: 'Attendance'
    state: 'Attendance'
  }
  SignUpSuccess: { // field return type name
    userInfo: 'User'
  }
  User: { // field return type name
    attendances: 'Attendance'
    id: 'ID'
    name: 'String'
  }
  UserAlreadyExist: { // field return type name
    username: 'String'
  }
  UserCredentials: { // field return type name
    expireAt: 'String'
    token: 'String'
    user: 'User'
  }
  UserNotFound: { // field return type name
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    clockOut: { // args
      id: string; // ID!
    }
    login: { // args
      credential: NexusGenInputs['Credentials']; // Credentials!
    }
    signup: { // args
      credential: NexusGenInputs['Credentials']; // Credentials!
    }
  }
  Query: {
    history: { // args
      last: number; // Int!
    }
    recorded: { // args
      last: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  ClockIn: "Attendance" | "UserNotFound"
  ClockOut: "Attendance" | "NotClockedIn" | "UserNotFound"
  LoginResult: "InvalidCredentials" | "UserCredentials" | "UserNotFound"
  RefreshResult: "AccessCredentials" | "NoToken" | "UserNotFound"
  SignUpResult: "InvalidCredentials" | "SignUpSuccess" | "UserAlreadyExist"
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = keyof NexusGenUnions;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = "ClockIn" | "ClockOut" | "LoginResult" | "RefreshResult" | "SignUpResult";

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}