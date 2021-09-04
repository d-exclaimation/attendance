import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Access token and friends without the user */
export type AccessCredentials = {
  __typename: 'AccessCredentials';
  token: Scalars['String'];
  expireAt: Scalars['String'];
};

/** Attendance timestamp for logging work hours */
export type Attendance = {
  __typename: 'Attendance';
  id: Scalars['ID'];
  userId: Scalars['String'];
  entryAt: Scalars['String'];
  leaveAt?: Maybe<Scalars['String']>;
  user: User;
};

/** Attendance clock in possible outcome */
export type ClockIn = Attendance | UserNotFound;

/** Attendance clock out possible outcome */
export type ClockOut = Attendance | UserNotFound | NotClockedIn;

/** User credentials */
export type Credentials = {
  username: Scalars['String'];
  password: Scalars['String'];
};

/** Result for indicating that the credentials are invalid */
export type InvalidCredentials = {
  __typename: 'InvalidCredentials';
  password: Scalars['String'];
};

/** Result of a log in mutation */
export type LoginResult = UserCredentials | UserNotFound | InvalidCredentials;

export type Mutation = {
  __typename: 'Mutation';
  /** Perform clock in and create a new record (Will not invalidate last un-clocked out record) */
  clockIn: ClockIn;
  /** Perform clock out if possible */
  clockOut: ClockOut;
  /** Log-in mutation with credentials */
  login: LoginResult;
  /** Sign-up mutation with credentials */
  signup: SignUpResult;
  /** Refresh token query */
  refresh: RefreshResult;
};


export type MutationClockOutArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  credential: Credentials;
};


export type MutationSignupArgs = {
  credential: Credentials;
};

/** No token found */
export type NoToken = {
  __typename: 'NoToken';
  message: Scalars['String'];
};

/** Not yet clocked in */
export type NotClockedIn = {
  __typename: 'NotClockedIn';
  message: Scalars['String'];
};

export type Query = {
  __typename: 'Query';
  /** Get last x attendance records */
  history: Array<Attendance>;
  /** Get the last record whether it exist or not */
  state?: Maybe<Attendance>;
  /** Gettings all employees */
  employees: Array<User>;
  /** Check for user data */
  me?: Maybe<User>;
};


export type QueryHistoryArgs = {
  last: Scalars['Int'];
};

/** Result of refreshing a token */
export type RefreshResult = UserNotFound | AccessCredentials | NoToken;

/** Result of a sign up mutation */
export type SignUpResult = UserCredentials | UserAlreadyExist | InvalidCredentials;

/** User object type for each employee signed-in */
export type User = {
  __typename: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  attendances: Array<Attendance>;
};

/** Result for indicating that user already exists */
export type UserAlreadyExist = {
  __typename: 'UserAlreadyExist';
  username: Scalars['String'];
};

/** Wrapper for user with jwt */
export type UserCredentials = {
  __typename: 'UserCredentials';
  user: User;
  token: Scalars['String'];
  expireAt: Scalars['String'];
};

/** Result for indicating that no user of that credentials is found */
export type UserNotFound = {
  __typename: 'UserNotFound';
  username: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  credential: Credentials;
}>;


export type LoginMutation = { __typename: 'Mutation', login: { __typename: 'UserCredentials', token: string, expireAt: string, user: { __typename: 'User', id: string, name: string } } | { __typename: 'UserNotFound', username: string } | { __typename: 'InvalidCredentials', password: string } };

export type RefreshMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshMutation = { __typename: 'Mutation', refresh: { __typename: 'UserNotFound', username: string } | { __typename: 'AccessCredentials', token: string, expireAt: string } | { __typename: 'NoToken', message: string } };

export type RegisterMutationVariables = Exact<{
  credential: Credentials;
}>;


export type RegisterMutation = { __typename: 'Mutation', signup: { __typename: 'UserCredentials', token: string, user: { __typename: 'User', id: string, name: string } } | { __typename: 'UserAlreadyExist', username: string } | { __typename: 'InvalidCredentials', password: string } };

export type CheckLoginQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckLoginQuery = { __typename: 'Query', me?: Maybe<{ __typename: 'User', id: string, name: string }> };


export const LoginDocument = gql`
    mutation Login($credential: Credentials!) {
  login(credential: $credential) {
    __typename
    ... on UserCredentials {
      user {
        id
        name
      }
      token
      expireAt
    }
    ... on UserNotFound {
      username
    }
    ... on InvalidCredentials {
      password
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RefreshDocument = gql`
    mutation Refresh {
  refresh {
    __typename
    ... on UserNotFound {
      username
    }
    ... on AccessCredentials {
      token
      expireAt
    }
    ... on NoToken {
      message
    }
  }
}
    `;

export function useRefreshMutation() {
  return Urql.useMutation<RefreshMutation, RefreshMutationVariables>(RefreshDocument);
};
export const RegisterDocument = gql`
    mutation Register($credential: Credentials!) {
  signup(credential: $credential) {
    __typename
    ... on UserCredentials {
      user {
        id
        name
      }
      token
    }
    ... on UserAlreadyExist {
      username
    }
    ... on InvalidCredentials {
      password
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const CheckLoginDocument = gql`
    query CheckLogin {
  me {
    id
    name
  }
}
    `;

export function useCheckLoginQuery(options: Omit<Urql.UseQueryArgs<CheckLoginQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CheckLoginQuery>({ query: CheckLoginDocument, ...options });
};