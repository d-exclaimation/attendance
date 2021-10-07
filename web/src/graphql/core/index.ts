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
  workHours: Scalars['String'];
  isCompleted: Scalars['Boolean'];
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
  /** Get last records for all users */
  recorded: Array<Attendance>;
  /** Get last x attendance records */
  history: Array<Attendance>;
  /** Get the last record whether it exist or not */
  state?: Maybe<Attendance>;
  /** Gettings all employees */
  employees: Array<User>;
  /** Check for user data */
  me?: Maybe<User>;
};


export type QueryRecordedArgs = {
  last: Scalars['Int'];
};


export type QueryHistoryArgs = {
  last: Scalars['Int'];
};

/** Result of refreshing a token */
export type RefreshResult = UserNotFound | AccessCredentials | NoToken;

/** Result of a sign up mutation */
export type SignUpResult = SignUpSuccess | UserAlreadyExist | InvalidCredentials;

/** User confirmation for sign up */
export type SignUpSuccess = {
  __typename: 'SignUpSuccess';
  userInfo: User;
};

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

export type ClockInMutationVariables = Exact<{ [key: string]: never; }>;


export type ClockInMutation = { __typename: 'Mutation', clockIn: { __typename: 'Attendance', id: string } | { __typename: 'UserNotFound', username: string } };

export type ClockOutMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ClockOutMutation = { __typename: 'Mutation', clockOut: { __typename: 'Attendance', id: string } | { __typename: 'UserNotFound', username: string } | { __typename: 'NotClockedIn', message: string } };

export type LoginMutationVariables = Exact<{
  credential: Credentials;
}>;


export type LoginMutation = { __typename: 'Mutation', login: { __typename: 'UserCredentials', token: string, expireAt: string, user: { __typename: 'User', name: string } } | { __typename: 'UserNotFound', username: string } | { __typename: 'InvalidCredentials', password: string } };

export type RefreshMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshMutation = { __typename: 'Mutation', refresh: { __typename: 'UserNotFound', username: string } | { __typename: 'AccessCredentials', token: string, expireAt: string } | { __typename: 'NoToken', message: string } };

export type RegisterMutationVariables = Exact<{
  credential: Credentials;
}>;


export type RegisterMutation = { __typename: 'Mutation', signup: { __typename: 'SignUpSuccess', userInfo: { __typename: 'User', name: string } } | { __typename: 'UserAlreadyExist', username: string } | { __typename: 'InvalidCredentials', password: string } };

export type AdminPanelQueryVariables = Exact<{
  last: Scalars['Int'];
}>;


export type AdminPanelQuery = { __typename: 'Query', recorded: Array<{ __typename: 'Attendance', id: string, entryAt: string, leaveAt?: Maybe<string>, workHours: string, user: { __typename: 'User', id: string, name: string } }> };

export type CheckLoginQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckLoginQuery = { __typename: 'Query', me?: Maybe<{ __typename: 'User', id: string, name: string }> };

export type StatusQueryVariables = Exact<{ [key: string]: never; }>;


export type StatusQuery = { __typename: 'Query', state?: Maybe<{ __typename: 'Attendance', id: string, entryAt: string, leaveAt?: Maybe<string> }> };


export const ClockInDocument = gql`
    mutation ClockIn {
  clockIn {
    __typename
    ... on Attendance {
      id
    }
    ... on UserNotFound {
      username
    }
  }
}
    `;

export function useClockInMutation() {
  return Urql.useMutation<ClockInMutation, ClockInMutationVariables>(ClockInDocument);
};
export const ClockOutDocument = gql`
    mutation ClockOut($id: ID!) {
  clockOut(id: $id) {
    __typename
    ... on Attendance {
      id
    }
    ... on UserNotFound {
      username
    }
    ... on NotClockedIn {
      message
    }
  }
}
    `;

export function useClockOutMutation() {
  return Urql.useMutation<ClockOutMutation, ClockOutMutationVariables>(ClockOutDocument);
};
export const LoginDocument = gql`
    mutation Login($credential: Credentials!) {
  login(credential: $credential) {
    __typename
    ... on UserCredentials {
      user {
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
    ... on SignUpSuccess {
      userInfo {
        name
      }
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
export const AdminPanelDocument = gql`
    query AdminPanel($last: Int!) {
  recorded(last: $last) {
    id
    entryAt
    leaveAt
    user {
      id
      name
    }
    workHours
  }
}
    `;

export function useAdminPanelQuery(options: Omit<Urql.UseQueryArgs<AdminPanelQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AdminPanelQuery>({ query: AdminPanelDocument, ...options });
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
export const StatusDocument = gql`
    query Status {
  state {
    id
    entryAt
    leaveAt
  }
}
    `;

export function useStatusQuery(options: Omit<Urql.UseQueryArgs<StatusQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<StatusQuery>({ query: StatusDocument, ...options });
};