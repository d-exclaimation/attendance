import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { gqlFetcher } from './fetcher';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  /**
   * Get last records for all users
   * @deprecated Use 'monthly' instead to filter by month instead by count
   */
  recorded: Array<Attendance>;
  /** Get last records for all users this month */
  monthly: Array<Attendance>;
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


export type QueryMonthlyArgs = {
  offset?: Scalars['Int'];
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

export type RecordFragment = { __typename: 'Attendance', id: string, entryAt: string, leaveAt?: Maybe<string>, workHours: string, user: { __typename: 'User', id: string, name: string } };

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

export type AdminPanelQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminPanelQuery = { __typename: 'Query', thisMonth: Array<{ __typename: 'Attendance', id: string, entryAt: string, leaveAt?: Maybe<string>, workHours: string, user: { __typename: 'User', id: string, name: string } }>, lastMonth: Array<{ __typename: 'Attendance', id: string, entryAt: string, leaveAt?: Maybe<string>, workHours: string, user: { __typename: 'User', id: string, name: string } }> };

export type CheckLoginQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckLoginQuery = { __typename: 'Query', me?: Maybe<{ __typename: 'User', id: string, name: string }> };

export type StatusQueryVariables = Exact<{ [key: string]: never; }>;


export type StatusQuery = { __typename: 'Query', state?: Maybe<{ __typename: 'Attendance', id: string, entryAt: string, leaveAt?: Maybe<string> }> };

export const RecordFragmentDoc = `
    fragment Record on Attendance {
  id
  entryAt
  leaveAt
  user {
    id
    name
  }
  workHours
}
    `;
export const ClockInDocument = `
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
export const useClockInMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ClockInMutation, TError, ClockInMutationVariables, TContext>) => 
    useMutation<ClockInMutation, TError, ClockInMutationVariables, TContext>(
      (variables?: ClockInMutationVariables) => gqlFetcher<ClockInMutation, ClockInMutationVariables>(ClockInDocument, variables)(),
      options
    );
export const ClockOutDocument = `
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
export const useClockOutMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ClockOutMutation, TError, ClockOutMutationVariables, TContext>) => 
    useMutation<ClockOutMutation, TError, ClockOutMutationVariables, TContext>(
      (variables?: ClockOutMutationVariables) => gqlFetcher<ClockOutMutation, ClockOutMutationVariables>(ClockOutDocument, variables)(),
      options
    );
export const LoginDocument = `
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
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>) => 
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      (variables?: LoginMutationVariables) => gqlFetcher<LoginMutation, LoginMutationVariables>(LoginDocument, variables)(),
      options
    );
export const RefreshDocument = `
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
export const useRefreshMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RefreshMutation, TError, RefreshMutationVariables, TContext>) => 
    useMutation<RefreshMutation, TError, RefreshMutationVariables, TContext>(
      (variables?: RefreshMutationVariables) => gqlFetcher<RefreshMutation, RefreshMutationVariables>(RefreshDocument, variables)(),
      options
    );
export const RegisterDocument = `
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
export const useRegisterMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>) => 
    useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
      (variables?: RegisterMutationVariables) => gqlFetcher<RegisterMutation, RegisterMutationVariables>(RegisterDocument, variables)(),
      options
    );
export const AdminPanelDocument = `
    query AdminPanel {
  thisMonth: monthly {
    ...Record
  }
  lastMonth: monthly(offset: -1) {
    ...Record
  }
}
    ${RecordFragmentDoc}`;
export const useAdminPanelQuery = <
      TData = AdminPanelQuery,
      TError = unknown
    >(
      variables?: AdminPanelQueryVariables, 
      options?: UseQueryOptions<AdminPanelQuery, TError, TData>
    ) => 
    useQuery<AdminPanelQuery, TError, TData>(
      variables === undefined ? ['AdminPanel'] : ['AdminPanel', variables],
      gqlFetcher<AdminPanelQuery, AdminPanelQueryVariables>(AdminPanelDocument, variables),
      options
    );
export const CheckLoginDocument = `
    query CheckLogin {
  me {
    id
    name
  }
}
    `;
export const useCheckLoginQuery = <
      TData = CheckLoginQuery,
      TError = unknown
    >(
      variables?: CheckLoginQueryVariables, 
      options?: UseQueryOptions<CheckLoginQuery, TError, TData>
    ) => 
    useQuery<CheckLoginQuery, TError, TData>(
      variables === undefined ? ['CheckLogin'] : ['CheckLogin', variables],
      gqlFetcher<CheckLoginQuery, CheckLoginQueryVariables>(CheckLoginDocument, variables),
      options
    );
export const StatusDocument = `
    query Status {
  state {
    id
    entryAt
    leaveAt
  }
}
    `;
export const useStatusQuery = <
      TData = StatusQuery,
      TError = unknown
    >(
      variables?: StatusQueryVariables, 
      options?: UseQueryOptions<StatusQuery, TError, TData>
    ) => 
    useQuery<StatusQuery, TError, TData>(
      variables === undefined ? ['Status'] : ['Status', variables],
      gqlFetcher<StatusQuery, StatusQueryVariables>(StatusDocument, variables),
      options
    );