
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Team
 * 
 */
export type Team = $Result.DefaultSelection<Prisma.$TeamPayload>
/**
 * Model TeamMember
 * 
 */
export type TeamMember = $Result.DefaultSelection<Prisma.$TeamMemberPayload>
/**
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model TaskLabel
 * 
 */
export type TaskLabel = $Result.DefaultSelection<Prisma.$TaskLabelPayload>
/**
 * Model TaskAttachment
 * 
 */
export type TaskAttachment = $Result.DefaultSelection<Prisma.$TaskAttachmentPayload>
/**
 * Model TaskComment
 * 
 */
export type TaskComment = $Result.DefaultSelection<Prisma.$TaskCommentPayload>
/**
 * Model TaskActivity
 * 
 */
export type TaskActivity = $Result.DefaultSelection<Prisma.$TaskActivityPayload>
/**
 * Model TimeEntry
 * 
 */
export type TimeEntry = $Result.DefaultSelection<Prisma.$TimeEntryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  MEMBER: 'MEMBER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const TaskPriority: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH'
};

export type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority]


export const TaskStatus: {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  TO_REVIEW: 'TO_REVIEW',
  COMPLETED: 'COMPLETED',
  ON_HOLD: 'ON_HOLD'
};

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]


export const TaskActivityAction: {
  TASK_CREATED: 'TASK_CREATED',
  TASK_UPDATED: 'TASK_UPDATED',
  TASK_STATUS_CHANGED: 'TASK_STATUS_CHANGED',
  TASK_DESCRIPTION_UPDATED: 'TASK_DESCRIPTION_UPDATED',
  TASK_ASSIGNED: 'TASK_ASSIGNED',
  TASK_UNASSIGNED: 'TASK_UNASSIGNED',
  ATTACHMENT_UPLOADED: 'ATTACHMENT_UPLOADED',
  ATTACHMENT_DELETED: 'ATTACHMENT_DELETED',
  COMMENT_ADDED: 'COMMENT_ADDED',
  COMMENT_EDITED: 'COMMENT_EDITED',
  COMMENT_DELETED: 'COMMENT_DELETED',
  COMMENT_REPLIED: 'COMMENT_REPLIED',
  TIMER_PAUSED: 'TIMER_PAUSED',
  TIMER_RESUMED: 'TIMER_RESUMED',
  TIMER_STOPPED: 'TIMER_STOPPED'
};

export type TaskActivityAction = (typeof TaskActivityAction)[keyof typeof TaskActivityAction]


export const TimeEntryStatus: {
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED'
};

export type TimeEntryStatus = (typeof TimeEntryStatus)[keyof typeof TimeEntryStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type TaskPriority = $Enums.TaskPriority

export const TaskPriority: typeof $Enums.TaskPriority

export type TaskStatus = $Enums.TaskStatus

export const TaskStatus: typeof $Enums.TaskStatus

export type TaskActivityAction = $Enums.TaskActivityAction

export const TaskActivityAction: typeof $Enums.TaskActivityAction

export type TimeEntryStatus = $Enums.TimeEntryStatus

export const TimeEntryStatus: typeof $Enums.TimeEntryStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.team`: Exposes CRUD operations for the **Team** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teams
    * const teams = await prisma.team.findMany()
    * ```
    */
  get team(): Prisma.TeamDelegate<ExtArgs>;

  /**
   * `prisma.teamMember`: Exposes CRUD operations for the **TeamMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TeamMembers
    * const teamMembers = await prisma.teamMember.findMany()
    * ```
    */
  get teamMember(): Prisma.TeamMemberDelegate<ExtArgs>;

  /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs>;

  /**
   * `prisma.taskLabel`: Exposes CRUD operations for the **TaskLabel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskLabels
    * const taskLabels = await prisma.taskLabel.findMany()
    * ```
    */
  get taskLabel(): Prisma.TaskLabelDelegate<ExtArgs>;

  /**
   * `prisma.taskAttachment`: Exposes CRUD operations for the **TaskAttachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskAttachments
    * const taskAttachments = await prisma.taskAttachment.findMany()
    * ```
    */
  get taskAttachment(): Prisma.TaskAttachmentDelegate<ExtArgs>;

  /**
   * `prisma.taskComment`: Exposes CRUD operations for the **TaskComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskComments
    * const taskComments = await prisma.taskComment.findMany()
    * ```
    */
  get taskComment(): Prisma.TaskCommentDelegate<ExtArgs>;

  /**
   * `prisma.taskActivity`: Exposes CRUD operations for the **TaskActivity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskActivities
    * const taskActivities = await prisma.taskActivity.findMany()
    * ```
    */
  get taskActivity(): Prisma.TaskActivityDelegate<ExtArgs>;

  /**
   * `prisma.timeEntry`: Exposes CRUD operations for the **TimeEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TimeEntries
    * const timeEntries = await prisma.timeEntry.findMany()
    * ```
    */
  get timeEntry(): Prisma.TimeEntryDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Team: 'Team',
    TeamMember: 'TeamMember',
    Client: 'Client',
    Task: 'Task',
    TaskLabel: 'TaskLabel',
    TaskAttachment: 'TaskAttachment',
    TaskComment: 'TaskComment',
    TaskActivity: 'TaskActivity',
    TimeEntry: 'TimeEntry'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "team" | "teamMember" | "client" | "task" | "taskLabel" | "taskAttachment" | "taskComment" | "taskActivity" | "timeEntry"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Team: {
        payload: Prisma.$TeamPayload<ExtArgs>
        fields: Prisma.TeamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findFirst: {
            args: Prisma.TeamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findMany: {
            args: Prisma.TeamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          create: {
            args: Prisma.TeamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          createMany: {
            args: Prisma.TeamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TeamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          update: {
            args: Prisma.TeamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          deleteMany: {
            args: Prisma.TeamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TeamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          aggregate: {
            args: Prisma.TeamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeam>
          }
          groupBy: {
            args: Prisma.TeamGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamCountArgs<ExtArgs>
            result: $Utils.Optional<TeamCountAggregateOutputType> | number
          }
        }
      }
      TeamMember: {
        payload: Prisma.$TeamMemberPayload<ExtArgs>
        fields: Prisma.TeamMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          findFirst: {
            args: Prisma.TeamMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          findMany: {
            args: Prisma.TeamMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>[]
          }
          create: {
            args: Prisma.TeamMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          createMany: {
            args: Prisma.TeamMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TeamMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          update: {
            args: Prisma.TeamMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          deleteMany: {
            args: Prisma.TeamMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TeamMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          aggregate: {
            args: Prisma.TeamMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeamMember>
          }
          groupBy: {
            args: Prisma.TeamMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamMemberCountArgs<ExtArgs>
            result: $Utils.Optional<TeamMemberCountAggregateOutputType> | number
          }
        }
      }
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      TaskLabel: {
        payload: Prisma.$TaskLabelPayload<ExtArgs>
        fields: Prisma.TaskLabelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskLabelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLabelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskLabelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLabelPayload>
          }
          findFirst: {
            args: Prisma.TaskLabelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLabelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskLabelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLabelPayload>
          }
          findMany: {
            args: Prisma.TaskLabelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLabelPayload>[]
          }
          create: {
            args: Prisma.TaskLabelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLabelPayload>
          }
          createMany: {
            args: Prisma.TaskLabelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TaskLabelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLabelPayload>
          }
          update: {
            args: Prisma.TaskLabelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLabelPayload>
          }
          deleteMany: {
            args: Prisma.TaskLabelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskLabelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TaskLabelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLabelPayload>
          }
          aggregate: {
            args: Prisma.TaskLabelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskLabel>
          }
          groupBy: {
            args: Prisma.TaskLabelGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskLabelGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskLabelCountArgs<ExtArgs>
            result: $Utils.Optional<TaskLabelCountAggregateOutputType> | number
          }
        }
      }
      TaskAttachment: {
        payload: Prisma.$TaskAttachmentPayload<ExtArgs>
        fields: Prisma.TaskAttachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskAttachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskAttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskAttachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskAttachmentPayload>
          }
          findFirst: {
            args: Prisma.TaskAttachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskAttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskAttachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskAttachmentPayload>
          }
          findMany: {
            args: Prisma.TaskAttachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskAttachmentPayload>[]
          }
          create: {
            args: Prisma.TaskAttachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskAttachmentPayload>
          }
          createMany: {
            args: Prisma.TaskAttachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TaskAttachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskAttachmentPayload>
          }
          update: {
            args: Prisma.TaskAttachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskAttachmentPayload>
          }
          deleteMany: {
            args: Prisma.TaskAttachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskAttachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TaskAttachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskAttachmentPayload>
          }
          aggregate: {
            args: Prisma.TaskAttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskAttachment>
          }
          groupBy: {
            args: Prisma.TaskAttachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskAttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskAttachmentCountArgs<ExtArgs>
            result: $Utils.Optional<TaskAttachmentCountAggregateOutputType> | number
          }
        }
      }
      TaskComment: {
        payload: Prisma.$TaskCommentPayload<ExtArgs>
        fields: Prisma.TaskCommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskCommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskCommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCommentPayload>
          }
          findFirst: {
            args: Prisma.TaskCommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskCommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCommentPayload>
          }
          findMany: {
            args: Prisma.TaskCommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCommentPayload>[]
          }
          create: {
            args: Prisma.TaskCommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCommentPayload>
          }
          createMany: {
            args: Prisma.TaskCommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TaskCommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCommentPayload>
          }
          update: {
            args: Prisma.TaskCommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCommentPayload>
          }
          deleteMany: {
            args: Prisma.TaskCommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskCommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TaskCommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCommentPayload>
          }
          aggregate: {
            args: Prisma.TaskCommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskComment>
          }
          groupBy: {
            args: Prisma.TaskCommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskCommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCommentCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCommentCountAggregateOutputType> | number
          }
        }
      }
      TaskActivity: {
        payload: Prisma.$TaskActivityPayload<ExtArgs>
        fields: Prisma.TaskActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskActivityPayload>
          }
          findFirst: {
            args: Prisma.TaskActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskActivityPayload>
          }
          findMany: {
            args: Prisma.TaskActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskActivityPayload>[]
          }
          create: {
            args: Prisma.TaskActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskActivityPayload>
          }
          createMany: {
            args: Prisma.TaskActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TaskActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskActivityPayload>
          }
          update: {
            args: Prisma.TaskActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskActivityPayload>
          }
          deleteMany: {
            args: Prisma.TaskActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TaskActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskActivityPayload>
          }
          aggregate: {
            args: Prisma.TaskActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskActivity>
          }
          groupBy: {
            args: Prisma.TaskActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskActivityCountArgs<ExtArgs>
            result: $Utils.Optional<TaskActivityCountAggregateOutputType> | number
          }
        }
      }
      TimeEntry: {
        payload: Prisma.$TimeEntryPayload<ExtArgs>
        fields: Prisma.TimeEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimeEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimeEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeEntryPayload>
          }
          findFirst: {
            args: Prisma.TimeEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimeEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeEntryPayload>
          }
          findMany: {
            args: Prisma.TimeEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeEntryPayload>[]
          }
          create: {
            args: Prisma.TimeEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeEntryPayload>
          }
          createMany: {
            args: Prisma.TimeEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TimeEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeEntryPayload>
          }
          update: {
            args: Prisma.TimeEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeEntryPayload>
          }
          deleteMany: {
            args: Prisma.TimeEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimeEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TimeEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeEntryPayload>
          }
          aggregate: {
            args: Prisma.TimeEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimeEntry>
          }
          groupBy: {
            args: Prisma.TimeEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimeEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimeEntryCountArgs<ExtArgs>
            result: $Utils.Optional<TimeEntryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    clients: number
    assignedTasks: number
    timeEntries: number
    uploadedAttachments: number
    taskComments: number
    taskActivities: number
    createdTeams: number
    teamMemberships: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clients?: boolean | UserCountOutputTypeCountClientsArgs
    assignedTasks?: boolean | UserCountOutputTypeCountAssignedTasksArgs
    timeEntries?: boolean | UserCountOutputTypeCountTimeEntriesArgs
    uploadedAttachments?: boolean | UserCountOutputTypeCountUploadedAttachmentsArgs
    taskComments?: boolean | UserCountOutputTypeCountTaskCommentsArgs
    taskActivities?: boolean | UserCountOutputTypeCountTaskActivitiesArgs
    createdTeams?: boolean | UserCountOutputTypeCountCreatedTeamsArgs
    teamMemberships?: boolean | UserCountOutputTypeCountTeamMembershipsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssignedTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTimeEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeEntryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUploadedAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskAttachmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTaskCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskCommentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTaskActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskActivityWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTeamMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMemberWhereInput
  }


  /**
   * Count Type TeamCountOutputType
   */

  export type TeamCountOutputType = {
    members: number
  }

  export type TeamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | TeamCountOutputTypeCountMembersArgs
  }

  // Custom InputTypes
  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamCountOutputType
     */
    select?: TeamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMemberWhereInput
  }


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    tasks: number
    timeEntries: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | ClientCountOutputTypeCountTasksArgs
    timeEntries?: boolean | ClientCountOutputTypeCountTimeEntriesArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountTimeEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeEntryWhereInput
  }


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    labels: number
    attachments: number
    comments: number
    activities: number
    timeEntries: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    labels?: boolean | TaskCountOutputTypeCountLabelsArgs
    attachments?: boolean | TaskCountOutputTypeCountAttachmentsArgs
    comments?: boolean | TaskCountOutputTypeCountCommentsArgs
    activities?: boolean | TaskCountOutputTypeCountActivitiesArgs
    timeEntries?: boolean | TaskCountOutputTypeCountTimeEntriesArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountLabelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskLabelWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskAttachmentWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskCommentWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskActivityWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountTimeEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeEntryWhereInput
  }


  /**
   * Count Type TaskLabelCountOutputType
   */

  export type TaskLabelCountOutputType = {
    tasks: number
  }

  export type TaskLabelCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | TaskLabelCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * TaskLabelCountOutputType without action
   */
  export type TaskLabelCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLabelCountOutputType
     */
    select?: TaskLabelCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskLabelCountOutputType without action
   */
  export type TaskLabelCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }


  /**
   * Count Type TaskCommentCountOutputType
   */

  export type TaskCommentCountOutputType = {
    replies: number
  }

  export type TaskCommentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    replies?: boolean | TaskCommentCountOutputTypeCountRepliesArgs
  }

  // Custom InputTypes
  /**
   * TaskCommentCountOutputType without action
   */
  export type TaskCommentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCommentCountOutputType
     */
    select?: TaskCommentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCommentCountOutputType without action
   */
  export type TaskCommentCountOutputTypeCountRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskCommentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    systemRole: $Enums.UserRole | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    systemRole: $Enums.UserRole | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    systemRole: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    systemRole?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    systemRole?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    systemRole?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string
    email: string
    password: string
    systemRole: $Enums.UserRole
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    systemRole?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clients?: boolean | User$clientsArgs<ExtArgs>
    assignedTasks?: boolean | User$assignedTasksArgs<ExtArgs>
    timeEntries?: boolean | User$timeEntriesArgs<ExtArgs>
    uploadedAttachments?: boolean | User$uploadedAttachmentsArgs<ExtArgs>
    taskComments?: boolean | User$taskCommentsArgs<ExtArgs>
    taskActivities?: boolean | User$taskActivitiesArgs<ExtArgs>
    createdTeams?: boolean | User$createdTeamsArgs<ExtArgs>
    teamMemberships?: boolean | User$teamMembershipsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>


  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    systemRole?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clients?: boolean | User$clientsArgs<ExtArgs>
    assignedTasks?: boolean | User$assignedTasksArgs<ExtArgs>
    timeEntries?: boolean | User$timeEntriesArgs<ExtArgs>
    uploadedAttachments?: boolean | User$uploadedAttachmentsArgs<ExtArgs>
    taskComments?: boolean | User$taskCommentsArgs<ExtArgs>
    taskActivities?: boolean | User$taskActivitiesArgs<ExtArgs>
    createdTeams?: boolean | User$createdTeamsArgs<ExtArgs>
    teamMemberships?: boolean | User$teamMembershipsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      clients: Prisma.$ClientPayload<ExtArgs>[]
      assignedTasks: Prisma.$TaskPayload<ExtArgs>[]
      timeEntries: Prisma.$TimeEntryPayload<ExtArgs>[]
      uploadedAttachments: Prisma.$TaskAttachmentPayload<ExtArgs>[]
      taskComments: Prisma.$TaskCommentPayload<ExtArgs>[]
      taskActivities: Prisma.$TaskActivityPayload<ExtArgs>[]
      createdTeams: Prisma.$TeamPayload<ExtArgs>[]
      teamMemberships: Prisma.$TeamMemberPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      password: string
      systemRole: $Enums.UserRole
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clients<T extends User$clientsArgs<ExtArgs> = {}>(args?: Subset<T, User$clientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany"> | Null>
    assignedTasks<T extends User$assignedTasksArgs<ExtArgs> = {}>(args?: Subset<T, User$assignedTasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany"> | Null>
    timeEntries<T extends User$timeEntriesArgs<ExtArgs> = {}>(args?: Subset<T, User$timeEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "findMany"> | Null>
    uploadedAttachments<T extends User$uploadedAttachmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$uploadedAttachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskAttachmentPayload<ExtArgs>, T, "findMany"> | Null>
    taskComments<T extends User$taskCommentsArgs<ExtArgs> = {}>(args?: Subset<T, User$taskCommentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCommentPayload<ExtArgs>, T, "findMany"> | Null>
    taskActivities<T extends User$taskActivitiesArgs<ExtArgs> = {}>(args?: Subset<T, User$taskActivitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskActivityPayload<ExtArgs>, T, "findMany"> | Null>
    createdTeams<T extends User$createdTeamsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdTeamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany"> | Null>
    teamMemberships<T extends User$teamMembershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$teamMembershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly systemRole: FieldRef<"User", 'UserRole'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.clients
   */
  export type User$clientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    cursor?: ClientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * User.assignedTasks
   */
  export type User$assignedTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.timeEntries
   */
  export type User$timeEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeEntry
     */
    select?: TimeEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeEntryInclude<ExtArgs> | null
    where?: TimeEntryWhereInput
    orderBy?: TimeEntryOrderByWithRelationInput | TimeEntryOrderByWithRelationInput[]
    cursor?: TimeEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimeEntryScalarFieldEnum | TimeEntryScalarFieldEnum[]
  }

  /**
   * User.uploadedAttachments
   */
  export type User$uploadedAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAttachment
     */
    select?: TaskAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAttachmentInclude<ExtArgs> | null
    where?: TaskAttachmentWhereInput
    orderBy?: TaskAttachmentOrderByWithRelationInput | TaskAttachmentOrderByWithRelationInput[]
    cursor?: TaskAttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskAttachmentScalarFieldEnum | TaskAttachmentScalarFieldEnum[]
  }

  /**
   * User.taskComments
   */
  export type User$taskCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskComment
     */
    select?: TaskCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCommentInclude<ExtArgs> | null
    where?: TaskCommentWhereInput
    orderBy?: TaskCommentOrderByWithRelationInput | TaskCommentOrderByWithRelationInput[]
    cursor?: TaskCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskCommentScalarFieldEnum | TaskCommentScalarFieldEnum[]
  }

  /**
   * User.taskActivities
   */
  export type User$taskActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskActivity
     */
    select?: TaskActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskActivityInclude<ExtArgs> | null
    where?: TaskActivityWhereInput
    orderBy?: TaskActivityOrderByWithRelationInput | TaskActivityOrderByWithRelationInput[]
    cursor?: TaskActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskActivityScalarFieldEnum | TaskActivityScalarFieldEnum[]
  }

  /**
   * User.createdTeams
   */
  export type User$createdTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    cursor?: TeamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * User.teamMemberships
   */
  export type User$teamMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    where?: TeamMemberWhereInput
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    cursor?: TeamMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Team
   */

  export type AggregateTeam = {
    _count: TeamCountAggregateOutputType | null
    _avg: TeamAvgAggregateOutputType | null
    _sum: TeamSumAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  export type TeamAvgAggregateOutputType = {
    id: number | null
    createdById: number | null
  }

  export type TeamSumAggregateOutputType = {
    id: number | null
    createdById: number | null
  }

  export type TeamMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    createdById: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    createdById: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TeamAvgAggregateInputType = {
    id?: true
    createdById?: true
  }

  export type TeamSumAggregateInputType = {
    id?: true
    createdById?: true
  }

  export type TeamMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TeamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Team to aggregate.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teams
    **/
    _count?: true | TeamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeamAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeamSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMaxAggregateInputType
  }

  export type GetTeamAggregateType<T extends TeamAggregateArgs> = {
        [P in keyof T & keyof AggregateTeam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeam[P]>
      : GetScalarType<T[P], AggregateTeam[P]>
  }




  export type TeamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithAggregationInput | TeamOrderByWithAggregationInput[]
    by: TeamScalarFieldEnum[] | TeamScalarFieldEnum
    having?: TeamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamCountAggregateInputType | true
    _avg?: TeamAvgAggregateInputType
    _sum?: TeamSumAggregateInputType
    _min?: TeamMinAggregateInputType
    _max?: TeamMaxAggregateInputType
  }

  export type TeamGroupByOutputType = {
    id: number
    name: string
    description: string | null
    createdById: number
    createdAt: Date
    updatedAt: Date
    _count: TeamCountAggregateOutputType | null
    _avg: TeamAvgAggregateOutputType | null
    _sum: TeamSumAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  type GetTeamGroupByPayload<T extends TeamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamGroupByOutputType[P]>
            : GetScalarType<T[P], TeamGroupByOutputType[P]>
        }
      >
    >


  export type TeamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Team$membersArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>


  export type TeamSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TeamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Team$membersArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TeamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Team"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
      members: Prisma.$TeamMemberPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      createdById: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["team"]>
    composites: {}
  }

  type TeamGetPayload<S extends boolean | null | undefined | TeamDefaultArgs> = $Result.GetResult<Prisma.$TeamPayload, S>

  type TeamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TeamFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TeamCountAggregateInputType | true
    }

  export interface TeamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Team'], meta: { name: 'Team' } }
    /**
     * Find zero or one Team that matches the filter.
     * @param {TeamFindUniqueArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamFindUniqueArgs>(args: SelectSubset<T, TeamFindUniqueArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Team that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TeamFindUniqueOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Team that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamFindFirstArgs>(args?: SelectSubset<T, TeamFindFirstArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Team that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Teams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teams
     * const teams = await prisma.team.findMany()
     * 
     * // Get first 10 Teams
     * const teams = await prisma.team.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamWithIdOnly = await prisma.team.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamFindManyArgs>(args?: SelectSubset<T, TeamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Team.
     * @param {TeamCreateArgs} args - Arguments to create a Team.
     * @example
     * // Create one Team
     * const Team = await prisma.team.create({
     *   data: {
     *     // ... data to create a Team
     *   }
     * })
     * 
     */
    create<T extends TeamCreateArgs>(args: SelectSubset<T, TeamCreateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Teams.
     * @param {TeamCreateManyArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamCreateManyArgs>(args?: SelectSubset<T, TeamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Team.
     * @param {TeamDeleteArgs} args - Arguments to delete one Team.
     * @example
     * // Delete one Team
     * const Team = await prisma.team.delete({
     *   where: {
     *     // ... filter to delete one Team
     *   }
     * })
     * 
     */
    delete<T extends TeamDeleteArgs>(args: SelectSubset<T, TeamDeleteArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Team.
     * @param {TeamUpdateArgs} args - Arguments to update one Team.
     * @example
     * // Update one Team
     * const team = await prisma.team.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamUpdateArgs>(args: SelectSubset<T, TeamUpdateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Teams.
     * @param {TeamDeleteManyArgs} args - Arguments to filter Teams to delete.
     * @example
     * // Delete a few Teams
     * const { count } = await prisma.team.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamDeleteManyArgs>(args?: SelectSubset<T, TeamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamUpdateManyArgs>(args: SelectSubset<T, TeamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Team.
     * @param {TeamUpsertArgs} args - Arguments to update or create a Team.
     * @example
     * // Update or create a Team
     * const team = await prisma.team.upsert({
     *   create: {
     *     // ... data to create a Team
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Team we want to update
     *   }
     * })
     */
    upsert<T extends TeamUpsertArgs>(args: SelectSubset<T, TeamUpsertArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamCountArgs} args - Arguments to filter Teams to count.
     * @example
     * // Count the number of Teams
     * const count = await prisma.team.count({
     *   where: {
     *     // ... the filter for the Teams we want to count
     *   }
     * })
    **/
    count<T extends TeamCountArgs>(
      args?: Subset<T, TeamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamAggregateArgs>(args: Subset<T, TeamAggregateArgs>): Prisma.PrismaPromise<GetTeamAggregateType<T>>

    /**
     * Group by Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamGroupByArgs['orderBy'] }
        : { orderBy?: TeamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Team model
   */
  readonly fields: TeamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Team.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    members<T extends Team$membersArgs<ExtArgs> = {}>(args?: Subset<T, Team$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Team model
   */ 
  interface TeamFieldRefs {
    readonly id: FieldRef<"Team", 'Int'>
    readonly name: FieldRef<"Team", 'String'>
    readonly description: FieldRef<"Team", 'String'>
    readonly createdById: FieldRef<"Team", 'Int'>
    readonly createdAt: FieldRef<"Team", 'DateTime'>
    readonly updatedAt: FieldRef<"Team", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Team findUnique
   */
  export type TeamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findUniqueOrThrow
   */
  export type TeamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findFirst
   */
  export type TeamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findFirstOrThrow
   */
  export type TeamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findMany
   */
  export type TeamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Teams to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team create
   */
  export type TeamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to create a Team.
     */
    data: XOR<TeamCreateInput, TeamUncheckedCreateInput>
  }

  /**
   * Team createMany
   */
  export type TeamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Team update
   */
  export type TeamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to update a Team.
     */
    data: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
    /**
     * Choose, which Team to update.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team updateMany
   */
  export type TeamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
  }

  /**
   * Team upsert
   */
  export type TeamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The filter to search for the Team to update in case it exists.
     */
    where: TeamWhereUniqueInput
    /**
     * In case the Team found by the `where` argument doesn't exist, create a new Team with this data.
     */
    create: XOR<TeamCreateInput, TeamUncheckedCreateInput>
    /**
     * In case the Team was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
  }

  /**
   * Team delete
   */
  export type TeamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter which Team to delete.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team deleteMany
   */
  export type TeamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teams to delete
     */
    where?: TeamWhereInput
  }

  /**
   * Team.members
   */
  export type Team$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    where?: TeamMemberWhereInput
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    cursor?: TeamMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * Team without action
   */
  export type TeamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
  }


  /**
   * Model TeamMember
   */

  export type AggregateTeamMember = {
    _count: TeamMemberCountAggregateOutputType | null
    _avg: TeamMemberAvgAggregateOutputType | null
    _sum: TeamMemberSumAggregateOutputType | null
    _min: TeamMemberMinAggregateOutputType | null
    _max: TeamMemberMaxAggregateOutputType | null
  }

  export type TeamMemberAvgAggregateOutputType = {
    id: number | null
    teamId: number | null
    userId: number | null
  }

  export type TeamMemberSumAggregateOutputType = {
    id: number | null
    teamId: number | null
    userId: number | null
  }

  export type TeamMemberMinAggregateOutputType = {
    id: number | null
    teamId: number | null
    userId: number | null
    role: $Enums.UserRole | null
    joinedAt: Date | null
  }

  export type TeamMemberMaxAggregateOutputType = {
    id: number | null
    teamId: number | null
    userId: number | null
    role: $Enums.UserRole | null
    joinedAt: Date | null
  }

  export type TeamMemberCountAggregateOutputType = {
    id: number
    teamId: number
    userId: number
    role: number
    joinedAt: number
    _all: number
  }


  export type TeamMemberAvgAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
  }

  export type TeamMemberSumAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
  }

  export type TeamMemberMinAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    role?: true
    joinedAt?: true
  }

  export type TeamMemberMaxAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    role?: true
    joinedAt?: true
  }

  export type TeamMemberCountAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    role?: true
    joinedAt?: true
    _all?: true
  }

  export type TeamMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMember to aggregate.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TeamMembers
    **/
    _count?: true | TeamMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeamMemberAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeamMemberSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMemberMaxAggregateInputType
  }

  export type GetTeamMemberAggregateType<T extends TeamMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateTeamMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeamMember[P]>
      : GetScalarType<T[P], AggregateTeamMember[P]>
  }




  export type TeamMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMemberWhereInput
    orderBy?: TeamMemberOrderByWithAggregationInput | TeamMemberOrderByWithAggregationInput[]
    by: TeamMemberScalarFieldEnum[] | TeamMemberScalarFieldEnum
    having?: TeamMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamMemberCountAggregateInputType | true
    _avg?: TeamMemberAvgAggregateInputType
    _sum?: TeamMemberSumAggregateInputType
    _min?: TeamMemberMinAggregateInputType
    _max?: TeamMemberMaxAggregateInputType
  }

  export type TeamMemberGroupByOutputType = {
    id: number
    teamId: number
    userId: number
    role: $Enums.UserRole
    joinedAt: Date
    _count: TeamMemberCountAggregateOutputType | null
    _avg: TeamMemberAvgAggregateOutputType | null
    _sum: TeamMemberSumAggregateOutputType | null
    _min: TeamMemberMinAggregateOutputType | null
    _max: TeamMemberMaxAggregateOutputType | null
  }

  type GetTeamMemberGroupByPayload<T extends TeamMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamMemberGroupByOutputType[P]>
            : GetScalarType<T[P], TeamMemberGroupByOutputType[P]>
        }
      >
    >


  export type TeamMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teamMember"]>


  export type TeamMemberSelectScalar = {
    id?: boolean
    teamId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
  }

  export type TeamMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TeamMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TeamMember"
    objects: {
      team: Prisma.$TeamPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      teamId: number
      userId: number
      role: $Enums.UserRole
      joinedAt: Date
    }, ExtArgs["result"]["teamMember"]>
    composites: {}
  }

  type TeamMemberGetPayload<S extends boolean | null | undefined | TeamMemberDefaultArgs> = $Result.GetResult<Prisma.$TeamMemberPayload, S>

  type TeamMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TeamMemberFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TeamMemberCountAggregateInputType | true
    }

  export interface TeamMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TeamMember'], meta: { name: 'TeamMember' } }
    /**
     * Find zero or one TeamMember that matches the filter.
     * @param {TeamMemberFindUniqueArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamMemberFindUniqueArgs>(args: SelectSubset<T, TeamMemberFindUniqueArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TeamMember that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TeamMemberFindUniqueOrThrowArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TeamMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindFirstArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamMemberFindFirstArgs>(args?: SelectSubset<T, TeamMemberFindFirstArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TeamMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindFirstOrThrowArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TeamMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeamMembers
     * const teamMembers = await prisma.teamMember.findMany()
     * 
     * // Get first 10 TeamMembers
     * const teamMembers = await prisma.teamMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamMemberWithIdOnly = await prisma.teamMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamMemberFindManyArgs>(args?: SelectSubset<T, TeamMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TeamMember.
     * @param {TeamMemberCreateArgs} args - Arguments to create a TeamMember.
     * @example
     * // Create one TeamMember
     * const TeamMember = await prisma.teamMember.create({
     *   data: {
     *     // ... data to create a TeamMember
     *   }
     * })
     * 
     */
    create<T extends TeamMemberCreateArgs>(args: SelectSubset<T, TeamMemberCreateArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TeamMembers.
     * @param {TeamMemberCreateManyArgs} args - Arguments to create many TeamMembers.
     * @example
     * // Create many TeamMembers
     * const teamMember = await prisma.teamMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamMemberCreateManyArgs>(args?: SelectSubset<T, TeamMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TeamMember.
     * @param {TeamMemberDeleteArgs} args - Arguments to delete one TeamMember.
     * @example
     * // Delete one TeamMember
     * const TeamMember = await prisma.teamMember.delete({
     *   where: {
     *     // ... filter to delete one TeamMember
     *   }
     * })
     * 
     */
    delete<T extends TeamMemberDeleteArgs>(args: SelectSubset<T, TeamMemberDeleteArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TeamMember.
     * @param {TeamMemberUpdateArgs} args - Arguments to update one TeamMember.
     * @example
     * // Update one TeamMember
     * const teamMember = await prisma.teamMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamMemberUpdateArgs>(args: SelectSubset<T, TeamMemberUpdateArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TeamMembers.
     * @param {TeamMemberDeleteManyArgs} args - Arguments to filter TeamMembers to delete.
     * @example
     * // Delete a few TeamMembers
     * const { count } = await prisma.teamMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamMemberDeleteManyArgs>(args?: SelectSubset<T, TeamMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeamMembers
     * const teamMember = await prisma.teamMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamMemberUpdateManyArgs>(args: SelectSubset<T, TeamMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TeamMember.
     * @param {TeamMemberUpsertArgs} args - Arguments to update or create a TeamMember.
     * @example
     * // Update or create a TeamMember
     * const teamMember = await prisma.teamMember.upsert({
     *   create: {
     *     // ... data to create a TeamMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeamMember we want to update
     *   }
     * })
     */
    upsert<T extends TeamMemberUpsertArgs>(args: SelectSubset<T, TeamMemberUpsertArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TeamMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberCountArgs} args - Arguments to filter TeamMembers to count.
     * @example
     * // Count the number of TeamMembers
     * const count = await prisma.teamMember.count({
     *   where: {
     *     // ... the filter for the TeamMembers we want to count
     *   }
     * })
    **/
    count<T extends TeamMemberCountArgs>(
      args?: Subset<T, TeamMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TeamMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamMemberAggregateArgs>(args: Subset<T, TeamMemberAggregateArgs>): Prisma.PrismaPromise<GetTeamMemberAggregateType<T>>

    /**
     * Group by TeamMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamMemberGroupByArgs['orderBy'] }
        : { orderBy?: TeamMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TeamMember model
   */
  readonly fields: TeamMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TeamMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    team<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TeamMember model
   */ 
  interface TeamMemberFieldRefs {
    readonly id: FieldRef<"TeamMember", 'Int'>
    readonly teamId: FieldRef<"TeamMember", 'Int'>
    readonly userId: FieldRef<"TeamMember", 'Int'>
    readonly role: FieldRef<"TeamMember", 'UserRole'>
    readonly joinedAt: FieldRef<"TeamMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TeamMember findUnique
   */
  export type TeamMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember findUniqueOrThrow
   */
  export type TeamMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember findFirst
   */
  export type TeamMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMembers.
     */
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember findFirstOrThrow
   */
  export type TeamMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMembers.
     */
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember findMany
   */
  export type TeamMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMembers to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember create
   */
  export type TeamMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a TeamMember.
     */
    data: XOR<TeamMemberCreateInput, TeamMemberUncheckedCreateInput>
  }

  /**
   * TeamMember createMany
   */
  export type TeamMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TeamMembers.
     */
    data: TeamMemberCreateManyInput | TeamMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TeamMember update
   */
  export type TeamMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a TeamMember.
     */
    data: XOR<TeamMemberUpdateInput, TeamMemberUncheckedUpdateInput>
    /**
     * Choose, which TeamMember to update.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember updateMany
   */
  export type TeamMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TeamMembers.
     */
    data: XOR<TeamMemberUpdateManyMutationInput, TeamMemberUncheckedUpdateManyInput>
    /**
     * Filter which TeamMembers to update
     */
    where?: TeamMemberWhereInput
  }

  /**
   * TeamMember upsert
   */
  export type TeamMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the TeamMember to update in case it exists.
     */
    where: TeamMemberWhereUniqueInput
    /**
     * In case the TeamMember found by the `where` argument doesn't exist, create a new TeamMember with this data.
     */
    create: XOR<TeamMemberCreateInput, TeamMemberUncheckedCreateInput>
    /**
     * In case the TeamMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamMemberUpdateInput, TeamMemberUncheckedUpdateInput>
  }

  /**
   * TeamMember delete
   */
  export type TeamMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter which TeamMember to delete.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember deleteMany
   */
  export type TeamMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMembers to delete
     */
    where?: TeamMemberWhereInput
  }

  /**
   * TeamMember without action
   */
  export type TeamMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
  }


  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _avg: ClientAvgAggregateOutputType | null
    _sum: ClientSumAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientAvgAggregateOutputType = {
    id: number | null
    monthlyAllowanceMinutes: number | null
    userId: number | null
  }

  export type ClientSumAggregateOutputType = {
    id: number | null
    monthlyAllowanceMinutes: number | null
    userId: number | null
  }

  export type ClientMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    monthlyAllowanceMinutes: number | null
    billable: boolean | null
    archivedAt: Date | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    monthlyAllowanceMinutes: number | null
    billable: boolean | null
    archivedAt: Date | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    name: number
    description: number
    monthlyAllowanceMinutes: number
    billable: number
    archivedAt: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClientAvgAggregateInputType = {
    id?: true
    monthlyAllowanceMinutes?: true
    userId?: true
  }

  export type ClientSumAggregateInputType = {
    id?: true
    monthlyAllowanceMinutes?: true
    userId?: true
  }

  export type ClientMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    monthlyAllowanceMinutes?: true
    billable?: true
    archivedAt?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    monthlyAllowanceMinutes?: true
    billable?: true
    archivedAt?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    monthlyAllowanceMinutes?: true
    billable?: true
    archivedAt?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _avg?: ClientAvgAggregateInputType
    _sum?: ClientSumAggregateInputType
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: number
    name: string
    description: string | null
    monthlyAllowanceMinutes: number
    billable: boolean
    archivedAt: Date | null
    userId: number
    createdAt: Date
    updatedAt: Date
    _count: ClientCountAggregateOutputType | null
    _avg: ClientAvgAggregateOutputType | null
    _sum: ClientSumAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    monthlyAllowanceMinutes?: boolean
    billable?: boolean
    archivedAt?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    tasks?: boolean | Client$tasksArgs<ExtArgs>
    timeEntries?: boolean | Client$timeEntriesArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>


  export type ClientSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    monthlyAllowanceMinutes?: boolean
    billable?: boolean
    archivedAt?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    tasks?: boolean | Client$tasksArgs<ExtArgs>
    timeEntries?: boolean | Client$timeEntriesArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      timeEntries: Prisma.$TimeEntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      monthlyAllowanceMinutes: number
      billable: boolean
      archivedAt: Date | null
      userId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientCreateManyArgs>(args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientUpdateManyArgs>(args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    tasks<T extends Client$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Client$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany"> | Null>
    timeEntries<T extends Client$timeEntriesArgs<ExtArgs> = {}>(args?: Subset<T, Client$timeEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Client model
   */ 
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", 'Int'>
    readonly name: FieldRef<"Client", 'String'>
    readonly description: FieldRef<"Client", 'String'>
    readonly monthlyAllowanceMinutes: FieldRef<"Client", 'Int'>
    readonly billable: FieldRef<"Client", 'Boolean'>
    readonly archivedAt: FieldRef<"Client", 'DateTime'>
    readonly userId: FieldRef<"Client", 'Int'>
    readonly createdAt: FieldRef<"Client", 'DateTime'>
    readonly updatedAt: FieldRef<"Client", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
  }

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
  }

  /**
   * Client.tasks
   */
  export type Client$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Client.timeEntries
   */
  export type Client$timeEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeEntry
     */
    select?: TimeEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeEntryInclude<ExtArgs> | null
    where?: TimeEntryWhereInput
    orderBy?: TimeEntryOrderByWithRelationInput | TimeEntryOrderByWithRelationInput[]
    cursor?: TimeEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimeEntryScalarFieldEnum | TimeEntryScalarFieldEnum[]
  }

  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    id: number | null
    clientId: number | null
    userId: number | null
  }

  export type TaskSumAggregateOutputType = {
    id: number | null
    clientId: number | null
    userId: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: number | null
    title: string | null
    descriptionHtml: string | null
    priority: $Enums.TaskPriority | null
    status: $Enums.TaskStatus | null
    clientId: number | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskMaxAggregateOutputType = {
    id: number | null
    title: string | null
    descriptionHtml: string | null
    priority: $Enums.TaskPriority | null
    status: $Enums.TaskStatus | null
    clientId: number | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    title: number
    descriptionHtml: number
    priority: number
    status: number
    clientId: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    id?: true
    clientId?: true
    userId?: true
  }

  export type TaskSumAggregateInputType = {
    id?: true
    clientId?: true
    userId?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    title?: true
    descriptionHtml?: true
    priority?: true
    status?: true
    clientId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    title?: true
    descriptionHtml?: true
    priority?: true
    status?: true
    clientId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    title?: true
    descriptionHtml?: true
    priority?: true
    status?: true
    clientId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: number
    title: string
    descriptionHtml: string | null
    priority: $Enums.TaskPriority
    status: $Enums.TaskStatus
    clientId: number
    userId: number
    createdAt: Date
    updatedAt: Date
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    descriptionHtml?: boolean
    priority?: boolean
    status?: boolean
    clientId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    labels?: boolean | Task$labelsArgs<ExtArgs>
    attachments?: boolean | Task$attachmentsArgs<ExtArgs>
    comments?: boolean | Task$commentsArgs<ExtArgs>
    activities?: boolean | Task$activitiesArgs<ExtArgs>
    timeEntries?: boolean | Task$timeEntriesArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>


  export type TaskSelectScalar = {
    id?: boolean
    title?: boolean
    descriptionHtml?: boolean
    priority?: boolean
    status?: boolean
    clientId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    labels?: boolean | Task$labelsArgs<ExtArgs>
    attachments?: boolean | Task$attachmentsArgs<ExtArgs>
    comments?: boolean | Task$commentsArgs<ExtArgs>
    activities?: boolean | Task$activitiesArgs<ExtArgs>
    timeEntries?: boolean | Task$timeEntriesArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      labels: Prisma.$TaskLabelPayload<ExtArgs>[]
      attachments: Prisma.$TaskAttachmentPayload<ExtArgs>[]
      comments: Prisma.$TaskCommentPayload<ExtArgs>[]
      activities: Prisma.$TaskActivityPayload<ExtArgs>[]
      timeEntries: Prisma.$TimeEntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      descriptionHtml: string | null
      priority: $Enums.TaskPriority
      status: $Enums.TaskStatus
      clientId: number
      userId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    labels<T extends Task$labelsArgs<ExtArgs> = {}>(args?: Subset<T, Task$labelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskLabelPayload<ExtArgs>, T, "findMany"> | Null>
    attachments<T extends Task$attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Task$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskAttachmentPayload<ExtArgs>, T, "findMany"> | Null>
    comments<T extends Task$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Task$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCommentPayload<ExtArgs>, T, "findMany"> | Null>
    activities<T extends Task$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, Task$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskActivityPayload<ExtArgs>, T, "findMany"> | Null>
    timeEntries<T extends Task$timeEntriesArgs<ExtArgs> = {}>(args?: Subset<T, Task$timeEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */ 
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'Int'>
    readonly title: FieldRef<"Task", 'String'>
    readonly descriptionHtml: FieldRef<"Task", 'String'>
    readonly priority: FieldRef<"Task", 'TaskPriority'>
    readonly status: FieldRef<"Task", 'TaskStatus'>
    readonly clientId: FieldRef<"Task", 'Int'>
    readonly userId: FieldRef<"Task", 'Int'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly updatedAt: FieldRef<"Task", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
  }

  /**
   * Task.labels
   */
  export type Task$labelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLabel
     */
    select?: TaskLabelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLabelInclude<ExtArgs> | null
    where?: TaskLabelWhereInput
    orderBy?: TaskLabelOrderByWithRelationInput | TaskLabelOrderByWithRelationInput[]
    cursor?: TaskLabelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskLabelScalarFieldEnum | TaskLabelScalarFieldEnum[]
  }

  /**
   * Task.attachments
   */
  export type Task$attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAttachment
     */
    select?: TaskAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAttachmentInclude<ExtArgs> | null
    where?: TaskAttachmentWhereInput
    orderBy?: TaskAttachmentOrderByWithRelationInput | TaskAttachmentOrderByWithRelationInput[]
    cursor?: TaskAttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskAttachmentScalarFieldEnum | TaskAttachmentScalarFieldEnum[]
  }

  /**
   * Task.comments
   */
  export type Task$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskComment
     */
    select?: TaskCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCommentInclude<ExtArgs> | null
    where?: TaskCommentWhereInput
    orderBy?: TaskCommentOrderByWithRelationInput | TaskCommentOrderByWithRelationInput[]
    cursor?: TaskCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskCommentScalarFieldEnum | TaskCommentScalarFieldEnum[]
  }

  /**
   * Task.activities
   */
  export type Task$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskActivity
     */
    select?: TaskActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskActivityInclude<ExtArgs> | null
    where?: TaskActivityWhereInput
    orderBy?: TaskActivityOrderByWithRelationInput | TaskActivityOrderByWithRelationInput[]
    cursor?: TaskActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskActivityScalarFieldEnum | TaskActivityScalarFieldEnum[]
  }

  /**
   * Task.timeEntries
   */
  export type Task$timeEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeEntry
     */
    select?: TimeEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeEntryInclude<ExtArgs> | null
    where?: TimeEntryWhereInput
    orderBy?: TimeEntryOrderByWithRelationInput | TimeEntryOrderByWithRelationInput[]
    cursor?: TimeEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimeEntryScalarFieldEnum | TimeEntryScalarFieldEnum[]
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model TaskLabel
   */

  export type AggregateTaskLabel = {
    _count: TaskLabelCountAggregateOutputType | null
    _avg: TaskLabelAvgAggregateOutputType | null
    _sum: TaskLabelSumAggregateOutputType | null
    _min: TaskLabelMinAggregateOutputType | null
    _max: TaskLabelMaxAggregateOutputType | null
  }

  export type TaskLabelAvgAggregateOutputType = {
    id: number | null
  }

  export type TaskLabelSumAggregateOutputType = {
    id: number | null
  }

  export type TaskLabelMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskLabelMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskLabelCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskLabelAvgAggregateInputType = {
    id?: true
  }

  export type TaskLabelSumAggregateInputType = {
    id?: true
  }

  export type TaskLabelMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskLabelMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskLabelCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskLabelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskLabel to aggregate.
     */
    where?: TaskLabelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskLabels to fetch.
     */
    orderBy?: TaskLabelOrderByWithRelationInput | TaskLabelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskLabelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskLabels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskLabels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskLabels
    **/
    _count?: true | TaskLabelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskLabelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskLabelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskLabelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskLabelMaxAggregateInputType
  }

  export type GetTaskLabelAggregateType<T extends TaskLabelAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskLabel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskLabel[P]>
      : GetScalarType<T[P], AggregateTaskLabel[P]>
  }




  export type TaskLabelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskLabelWhereInput
    orderBy?: TaskLabelOrderByWithAggregationInput | TaskLabelOrderByWithAggregationInput[]
    by: TaskLabelScalarFieldEnum[] | TaskLabelScalarFieldEnum
    having?: TaskLabelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskLabelCountAggregateInputType | true
    _avg?: TaskLabelAvgAggregateInputType
    _sum?: TaskLabelSumAggregateInputType
    _min?: TaskLabelMinAggregateInputType
    _max?: TaskLabelMaxAggregateInputType
  }

  export type TaskLabelGroupByOutputType = {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    _count: TaskLabelCountAggregateOutputType | null
    _avg: TaskLabelAvgAggregateOutputType | null
    _sum: TaskLabelSumAggregateOutputType | null
    _min: TaskLabelMinAggregateOutputType | null
    _max: TaskLabelMaxAggregateOutputType | null
  }

  type GetTaskLabelGroupByPayload<T extends TaskLabelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskLabelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskLabelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskLabelGroupByOutputType[P]>
            : GetScalarType<T[P], TaskLabelGroupByOutputType[P]>
        }
      >
    >


  export type TaskLabelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tasks?: boolean | TaskLabel$tasksArgs<ExtArgs>
    _count?: boolean | TaskLabelCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskLabel"]>


  export type TaskLabelSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TaskLabelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | TaskLabel$tasksArgs<ExtArgs>
    _count?: boolean | TaskLabelCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TaskLabelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskLabel"
    objects: {
      tasks: Prisma.$TaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["taskLabel"]>
    composites: {}
  }

  type TaskLabelGetPayload<S extends boolean | null | undefined | TaskLabelDefaultArgs> = $Result.GetResult<Prisma.$TaskLabelPayload, S>

  type TaskLabelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TaskLabelFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TaskLabelCountAggregateInputType | true
    }

  export interface TaskLabelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskLabel'], meta: { name: 'TaskLabel' } }
    /**
     * Find zero or one TaskLabel that matches the filter.
     * @param {TaskLabelFindUniqueArgs} args - Arguments to find a TaskLabel
     * @example
     * // Get one TaskLabel
     * const taskLabel = await prisma.taskLabel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskLabelFindUniqueArgs>(args: SelectSubset<T, TaskLabelFindUniqueArgs<ExtArgs>>): Prisma__TaskLabelClient<$Result.GetResult<Prisma.$TaskLabelPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TaskLabel that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TaskLabelFindUniqueOrThrowArgs} args - Arguments to find a TaskLabel
     * @example
     * // Get one TaskLabel
     * const taskLabel = await prisma.taskLabel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskLabelFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskLabelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskLabelClient<$Result.GetResult<Prisma.$TaskLabelPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TaskLabel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLabelFindFirstArgs} args - Arguments to find a TaskLabel
     * @example
     * // Get one TaskLabel
     * const taskLabel = await prisma.taskLabel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskLabelFindFirstArgs>(args?: SelectSubset<T, TaskLabelFindFirstArgs<ExtArgs>>): Prisma__TaskLabelClient<$Result.GetResult<Prisma.$TaskLabelPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TaskLabel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLabelFindFirstOrThrowArgs} args - Arguments to find a TaskLabel
     * @example
     * // Get one TaskLabel
     * const taskLabel = await prisma.taskLabel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskLabelFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskLabelFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskLabelClient<$Result.GetResult<Prisma.$TaskLabelPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TaskLabels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLabelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskLabels
     * const taskLabels = await prisma.taskLabel.findMany()
     * 
     * // Get first 10 TaskLabels
     * const taskLabels = await prisma.taskLabel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskLabelWithIdOnly = await prisma.taskLabel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskLabelFindManyArgs>(args?: SelectSubset<T, TaskLabelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskLabelPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TaskLabel.
     * @param {TaskLabelCreateArgs} args - Arguments to create a TaskLabel.
     * @example
     * // Create one TaskLabel
     * const TaskLabel = await prisma.taskLabel.create({
     *   data: {
     *     // ... data to create a TaskLabel
     *   }
     * })
     * 
     */
    create<T extends TaskLabelCreateArgs>(args: SelectSubset<T, TaskLabelCreateArgs<ExtArgs>>): Prisma__TaskLabelClient<$Result.GetResult<Prisma.$TaskLabelPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TaskLabels.
     * @param {TaskLabelCreateManyArgs} args - Arguments to create many TaskLabels.
     * @example
     * // Create many TaskLabels
     * const taskLabel = await prisma.taskLabel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskLabelCreateManyArgs>(args?: SelectSubset<T, TaskLabelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TaskLabel.
     * @param {TaskLabelDeleteArgs} args - Arguments to delete one TaskLabel.
     * @example
     * // Delete one TaskLabel
     * const TaskLabel = await prisma.taskLabel.delete({
     *   where: {
     *     // ... filter to delete one TaskLabel
     *   }
     * })
     * 
     */
    delete<T extends TaskLabelDeleteArgs>(args: SelectSubset<T, TaskLabelDeleteArgs<ExtArgs>>): Prisma__TaskLabelClient<$Result.GetResult<Prisma.$TaskLabelPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TaskLabel.
     * @param {TaskLabelUpdateArgs} args - Arguments to update one TaskLabel.
     * @example
     * // Update one TaskLabel
     * const taskLabel = await prisma.taskLabel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskLabelUpdateArgs>(args: SelectSubset<T, TaskLabelUpdateArgs<ExtArgs>>): Prisma__TaskLabelClient<$Result.GetResult<Prisma.$TaskLabelPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TaskLabels.
     * @param {TaskLabelDeleteManyArgs} args - Arguments to filter TaskLabels to delete.
     * @example
     * // Delete a few TaskLabels
     * const { count } = await prisma.taskLabel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskLabelDeleteManyArgs>(args?: SelectSubset<T, TaskLabelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskLabels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLabelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskLabels
     * const taskLabel = await prisma.taskLabel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskLabelUpdateManyArgs>(args: SelectSubset<T, TaskLabelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TaskLabel.
     * @param {TaskLabelUpsertArgs} args - Arguments to update or create a TaskLabel.
     * @example
     * // Update or create a TaskLabel
     * const taskLabel = await prisma.taskLabel.upsert({
     *   create: {
     *     // ... data to create a TaskLabel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskLabel we want to update
     *   }
     * })
     */
    upsert<T extends TaskLabelUpsertArgs>(args: SelectSubset<T, TaskLabelUpsertArgs<ExtArgs>>): Prisma__TaskLabelClient<$Result.GetResult<Prisma.$TaskLabelPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TaskLabels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLabelCountArgs} args - Arguments to filter TaskLabels to count.
     * @example
     * // Count the number of TaskLabels
     * const count = await prisma.taskLabel.count({
     *   where: {
     *     // ... the filter for the TaskLabels we want to count
     *   }
     * })
    **/
    count<T extends TaskLabelCountArgs>(
      args?: Subset<T, TaskLabelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskLabelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskLabel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLabelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskLabelAggregateArgs>(args: Subset<T, TaskLabelAggregateArgs>): Prisma.PrismaPromise<GetTaskLabelAggregateType<T>>

    /**
     * Group by TaskLabel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLabelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskLabelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskLabelGroupByArgs['orderBy'] }
        : { orderBy?: TaskLabelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskLabelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskLabelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskLabel model
   */
  readonly fields: TaskLabelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskLabel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskLabelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tasks<T extends TaskLabel$tasksArgs<ExtArgs> = {}>(args?: Subset<T, TaskLabel$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskLabel model
   */ 
  interface TaskLabelFieldRefs {
    readonly id: FieldRef<"TaskLabel", 'Int'>
    readonly name: FieldRef<"TaskLabel", 'String'>
    readonly createdAt: FieldRef<"TaskLabel", 'DateTime'>
    readonly updatedAt: FieldRef<"TaskLabel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TaskLabel findUnique
   */
  export type TaskLabelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLabel
     */
    select?: TaskLabelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLabelInclude<ExtArgs> | null
    /**
     * Filter, which TaskLabel to fetch.
     */
    where: TaskLabelWhereUniqueInput
  }

  /**
   * TaskLabel findUniqueOrThrow
   */
  export type TaskLabelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLabel
     */
    select?: TaskLabelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLabelInclude<ExtArgs> | null
    /**
     * Filter, which TaskLabel to fetch.
     */
    where: TaskLabelWhereUniqueInput
  }

  /**
   * TaskLabel findFirst
   */
  export type TaskLabelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLabel
     */
    select?: TaskLabelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLabelInclude<ExtArgs> | null
    /**
     * Filter, which TaskLabel to fetch.
     */
    where?: TaskLabelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskLabels to fetch.
     */
    orderBy?: TaskLabelOrderByWithRelationInput | TaskLabelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskLabels.
     */
    cursor?: TaskLabelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskLabels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskLabels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskLabels.
     */
    distinct?: TaskLabelScalarFieldEnum | TaskLabelScalarFieldEnum[]
  }

  /**
   * TaskLabel findFirstOrThrow
   */
  export type TaskLabelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLabel
     */
    select?: TaskLabelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLabelInclude<ExtArgs> | null
    /**
     * Filter, which TaskLabel to fetch.
     */
    where?: TaskLabelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskLabels to fetch.
     */
    orderBy?: TaskLabelOrderByWithRelationInput | TaskLabelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskLabels.
     */
    cursor?: TaskLabelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskLabels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskLabels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskLabels.
     */
    distinct?: TaskLabelScalarFieldEnum | TaskLabelScalarFieldEnum[]
  }

  /**
   * TaskLabel findMany
   */
  export type TaskLabelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLabel
     */
    select?: TaskLabelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLabelInclude<ExtArgs> | null
    /**
     * Filter, which TaskLabels to fetch.
     */
    where?: TaskLabelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskLabels to fetch.
     */
    orderBy?: TaskLabelOrderByWithRelationInput | TaskLabelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskLabels.
     */
    cursor?: TaskLabelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskLabels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskLabels.
     */
    skip?: number
    distinct?: TaskLabelScalarFieldEnum | TaskLabelScalarFieldEnum[]
  }

  /**
   * TaskLabel create
   */
  export type TaskLabelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLabel
     */
    select?: TaskLabelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLabelInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskLabel.
     */
    data: XOR<TaskLabelCreateInput, TaskLabelUncheckedCreateInput>
  }

  /**
   * TaskLabel createMany
   */
  export type TaskLabelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskLabels.
     */
    data: TaskLabelCreateManyInput | TaskLabelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaskLabel update
   */
  export type TaskLabelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLabel
     */
    select?: TaskLabelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLabelInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskLabel.
     */
    data: XOR<TaskLabelUpdateInput, TaskLabelUncheckedUpdateInput>
    /**
     * Choose, which TaskLabel to update.
     */
    where: TaskLabelWhereUniqueInput
  }

  /**
   * TaskLabel updateMany
   */
  export type TaskLabelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskLabels.
     */
    data: XOR<TaskLabelUpdateManyMutationInput, TaskLabelUncheckedUpdateManyInput>
    /**
     * Filter which TaskLabels to update
     */
    where?: TaskLabelWhereInput
  }

  /**
   * TaskLabel upsert
   */
  export type TaskLabelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLabel
     */
    select?: TaskLabelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLabelInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskLabel to update in case it exists.
     */
    where: TaskLabelWhereUniqueInput
    /**
     * In case the TaskLabel found by the `where` argument doesn't exist, create a new TaskLabel with this data.
     */
    create: XOR<TaskLabelCreateInput, TaskLabelUncheckedCreateInput>
    /**
     * In case the TaskLabel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskLabelUpdateInput, TaskLabelUncheckedUpdateInput>
  }

  /**
   * TaskLabel delete
   */
  export type TaskLabelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLabel
     */
    select?: TaskLabelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLabelInclude<ExtArgs> | null
    /**
     * Filter which TaskLabel to delete.
     */
    where: TaskLabelWhereUniqueInput
  }

  /**
   * TaskLabel deleteMany
   */
  export type TaskLabelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskLabels to delete
     */
    where?: TaskLabelWhereInput
  }

  /**
   * TaskLabel.tasks
   */
  export type TaskLabel$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * TaskLabel without action
   */
  export type TaskLabelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLabel
     */
    select?: TaskLabelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLabelInclude<ExtArgs> | null
  }


  /**
   * Model TaskAttachment
   */

  export type AggregateTaskAttachment = {
    _count: TaskAttachmentCountAggregateOutputType | null
    _avg: TaskAttachmentAvgAggregateOutputType | null
    _sum: TaskAttachmentSumAggregateOutputType | null
    _min: TaskAttachmentMinAggregateOutputType | null
    _max: TaskAttachmentMaxAggregateOutputType | null
  }

  export type TaskAttachmentAvgAggregateOutputType = {
    id: number | null
    taskId: number | null
    uploadedBy: number | null
    fileSize: number | null
  }

  export type TaskAttachmentSumAggregateOutputType = {
    id: number | null
    taskId: number | null
    uploadedBy: number | null
    fileSize: number | null
  }

  export type TaskAttachmentMinAggregateOutputType = {
    id: number | null
    taskId: number | null
    uploadedBy: number | null
    fileName: string | null
    originalName: string | null
    fileSize: number | null
    mimeType: string | null
    filePath: string | null
    createdAt: Date | null
  }

  export type TaskAttachmentMaxAggregateOutputType = {
    id: number | null
    taskId: number | null
    uploadedBy: number | null
    fileName: string | null
    originalName: string | null
    fileSize: number | null
    mimeType: string | null
    filePath: string | null
    createdAt: Date | null
  }

  export type TaskAttachmentCountAggregateOutputType = {
    id: number
    taskId: number
    uploadedBy: number
    fileName: number
    originalName: number
    fileSize: number
    mimeType: number
    filePath: number
    createdAt: number
    _all: number
  }


  export type TaskAttachmentAvgAggregateInputType = {
    id?: true
    taskId?: true
    uploadedBy?: true
    fileSize?: true
  }

  export type TaskAttachmentSumAggregateInputType = {
    id?: true
    taskId?: true
    uploadedBy?: true
    fileSize?: true
  }

  export type TaskAttachmentMinAggregateInputType = {
    id?: true
    taskId?: true
    uploadedBy?: true
    fileName?: true
    originalName?: true
    fileSize?: true
    mimeType?: true
    filePath?: true
    createdAt?: true
  }

  export type TaskAttachmentMaxAggregateInputType = {
    id?: true
    taskId?: true
    uploadedBy?: true
    fileName?: true
    originalName?: true
    fileSize?: true
    mimeType?: true
    filePath?: true
    createdAt?: true
  }

  export type TaskAttachmentCountAggregateInputType = {
    id?: true
    taskId?: true
    uploadedBy?: true
    fileName?: true
    originalName?: true
    fileSize?: true
    mimeType?: true
    filePath?: true
    createdAt?: true
    _all?: true
  }

  export type TaskAttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskAttachment to aggregate.
     */
    where?: TaskAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskAttachments to fetch.
     */
    orderBy?: TaskAttachmentOrderByWithRelationInput | TaskAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskAttachments
    **/
    _count?: true | TaskAttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAttachmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskAttachmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskAttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskAttachmentMaxAggregateInputType
  }

  export type GetTaskAttachmentAggregateType<T extends TaskAttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskAttachment[P]>
      : GetScalarType<T[P], AggregateTaskAttachment[P]>
  }




  export type TaskAttachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskAttachmentWhereInput
    orderBy?: TaskAttachmentOrderByWithAggregationInput | TaskAttachmentOrderByWithAggregationInput[]
    by: TaskAttachmentScalarFieldEnum[] | TaskAttachmentScalarFieldEnum
    having?: TaskAttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskAttachmentCountAggregateInputType | true
    _avg?: TaskAttachmentAvgAggregateInputType
    _sum?: TaskAttachmentSumAggregateInputType
    _min?: TaskAttachmentMinAggregateInputType
    _max?: TaskAttachmentMaxAggregateInputType
  }

  export type TaskAttachmentGroupByOutputType = {
    id: number
    taskId: number
    uploadedBy: number
    fileName: string
    originalName: string
    fileSize: number
    mimeType: string
    filePath: string
    createdAt: Date
    _count: TaskAttachmentCountAggregateOutputType | null
    _avg: TaskAttachmentAvgAggregateOutputType | null
    _sum: TaskAttachmentSumAggregateOutputType | null
    _min: TaskAttachmentMinAggregateOutputType | null
    _max: TaskAttachmentMaxAggregateOutputType | null
  }

  type GetTaskAttachmentGroupByPayload<T extends TaskAttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskAttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskAttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskAttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], TaskAttachmentGroupByOutputType[P]>
        }
      >
    >


  export type TaskAttachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    uploadedBy?: boolean
    fileName?: boolean
    originalName?: boolean
    fileSize?: boolean
    mimeType?: boolean
    filePath?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    uploadedByUser?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskAttachment"]>


  export type TaskAttachmentSelectScalar = {
    id?: boolean
    taskId?: boolean
    uploadedBy?: boolean
    fileName?: boolean
    originalName?: boolean
    fileSize?: boolean
    mimeType?: boolean
    filePath?: boolean
    createdAt?: boolean
  }

  export type TaskAttachmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    uploadedByUser?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TaskAttachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskAttachment"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      uploadedByUser: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      taskId: number
      uploadedBy: number
      fileName: string
      originalName: string
      fileSize: number
      mimeType: string
      filePath: string
      createdAt: Date
    }, ExtArgs["result"]["taskAttachment"]>
    composites: {}
  }

  type TaskAttachmentGetPayload<S extends boolean | null | undefined | TaskAttachmentDefaultArgs> = $Result.GetResult<Prisma.$TaskAttachmentPayload, S>

  type TaskAttachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TaskAttachmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TaskAttachmentCountAggregateInputType | true
    }

  export interface TaskAttachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskAttachment'], meta: { name: 'TaskAttachment' } }
    /**
     * Find zero or one TaskAttachment that matches the filter.
     * @param {TaskAttachmentFindUniqueArgs} args - Arguments to find a TaskAttachment
     * @example
     * // Get one TaskAttachment
     * const taskAttachment = await prisma.taskAttachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskAttachmentFindUniqueArgs>(args: SelectSubset<T, TaskAttachmentFindUniqueArgs<ExtArgs>>): Prisma__TaskAttachmentClient<$Result.GetResult<Prisma.$TaskAttachmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TaskAttachment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TaskAttachmentFindUniqueOrThrowArgs} args - Arguments to find a TaskAttachment
     * @example
     * // Get one TaskAttachment
     * const taskAttachment = await prisma.taskAttachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskAttachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskAttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskAttachmentClient<$Result.GetResult<Prisma.$TaskAttachmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TaskAttachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAttachmentFindFirstArgs} args - Arguments to find a TaskAttachment
     * @example
     * // Get one TaskAttachment
     * const taskAttachment = await prisma.taskAttachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskAttachmentFindFirstArgs>(args?: SelectSubset<T, TaskAttachmentFindFirstArgs<ExtArgs>>): Prisma__TaskAttachmentClient<$Result.GetResult<Prisma.$TaskAttachmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TaskAttachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAttachmentFindFirstOrThrowArgs} args - Arguments to find a TaskAttachment
     * @example
     * // Get one TaskAttachment
     * const taskAttachment = await prisma.taskAttachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskAttachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskAttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskAttachmentClient<$Result.GetResult<Prisma.$TaskAttachmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TaskAttachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskAttachments
     * const taskAttachments = await prisma.taskAttachment.findMany()
     * 
     * // Get first 10 TaskAttachments
     * const taskAttachments = await prisma.taskAttachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskAttachmentWithIdOnly = await prisma.taskAttachment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskAttachmentFindManyArgs>(args?: SelectSubset<T, TaskAttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskAttachmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TaskAttachment.
     * @param {TaskAttachmentCreateArgs} args - Arguments to create a TaskAttachment.
     * @example
     * // Create one TaskAttachment
     * const TaskAttachment = await prisma.taskAttachment.create({
     *   data: {
     *     // ... data to create a TaskAttachment
     *   }
     * })
     * 
     */
    create<T extends TaskAttachmentCreateArgs>(args: SelectSubset<T, TaskAttachmentCreateArgs<ExtArgs>>): Prisma__TaskAttachmentClient<$Result.GetResult<Prisma.$TaskAttachmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TaskAttachments.
     * @param {TaskAttachmentCreateManyArgs} args - Arguments to create many TaskAttachments.
     * @example
     * // Create many TaskAttachments
     * const taskAttachment = await prisma.taskAttachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskAttachmentCreateManyArgs>(args?: SelectSubset<T, TaskAttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TaskAttachment.
     * @param {TaskAttachmentDeleteArgs} args - Arguments to delete one TaskAttachment.
     * @example
     * // Delete one TaskAttachment
     * const TaskAttachment = await prisma.taskAttachment.delete({
     *   where: {
     *     // ... filter to delete one TaskAttachment
     *   }
     * })
     * 
     */
    delete<T extends TaskAttachmentDeleteArgs>(args: SelectSubset<T, TaskAttachmentDeleteArgs<ExtArgs>>): Prisma__TaskAttachmentClient<$Result.GetResult<Prisma.$TaskAttachmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TaskAttachment.
     * @param {TaskAttachmentUpdateArgs} args - Arguments to update one TaskAttachment.
     * @example
     * // Update one TaskAttachment
     * const taskAttachment = await prisma.taskAttachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskAttachmentUpdateArgs>(args: SelectSubset<T, TaskAttachmentUpdateArgs<ExtArgs>>): Prisma__TaskAttachmentClient<$Result.GetResult<Prisma.$TaskAttachmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TaskAttachments.
     * @param {TaskAttachmentDeleteManyArgs} args - Arguments to filter TaskAttachments to delete.
     * @example
     * // Delete a few TaskAttachments
     * const { count } = await prisma.taskAttachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskAttachmentDeleteManyArgs>(args?: SelectSubset<T, TaskAttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskAttachments
     * const taskAttachment = await prisma.taskAttachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskAttachmentUpdateManyArgs>(args: SelectSubset<T, TaskAttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TaskAttachment.
     * @param {TaskAttachmentUpsertArgs} args - Arguments to update or create a TaskAttachment.
     * @example
     * // Update or create a TaskAttachment
     * const taskAttachment = await prisma.taskAttachment.upsert({
     *   create: {
     *     // ... data to create a TaskAttachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskAttachment we want to update
     *   }
     * })
     */
    upsert<T extends TaskAttachmentUpsertArgs>(args: SelectSubset<T, TaskAttachmentUpsertArgs<ExtArgs>>): Prisma__TaskAttachmentClient<$Result.GetResult<Prisma.$TaskAttachmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TaskAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAttachmentCountArgs} args - Arguments to filter TaskAttachments to count.
     * @example
     * // Count the number of TaskAttachments
     * const count = await prisma.taskAttachment.count({
     *   where: {
     *     // ... the filter for the TaskAttachments we want to count
     *   }
     * })
    **/
    count<T extends TaskAttachmentCountArgs>(
      args?: Subset<T, TaskAttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskAttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAttachmentAggregateArgs>(args: Subset<T, TaskAttachmentAggregateArgs>): Prisma.PrismaPromise<GetTaskAttachmentAggregateType<T>>

    /**
     * Group by TaskAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAttachmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskAttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskAttachmentGroupByArgs['orderBy'] }
        : { orderBy?: TaskAttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskAttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskAttachment model
   */
  readonly fields: TaskAttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskAttachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskAttachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    uploadedByUser<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskAttachment model
   */ 
  interface TaskAttachmentFieldRefs {
    readonly id: FieldRef<"TaskAttachment", 'Int'>
    readonly taskId: FieldRef<"TaskAttachment", 'Int'>
    readonly uploadedBy: FieldRef<"TaskAttachment", 'Int'>
    readonly fileName: FieldRef<"TaskAttachment", 'String'>
    readonly originalName: FieldRef<"TaskAttachment", 'String'>
    readonly fileSize: FieldRef<"TaskAttachment", 'Int'>
    readonly mimeType: FieldRef<"TaskAttachment", 'String'>
    readonly filePath: FieldRef<"TaskAttachment", 'String'>
    readonly createdAt: FieldRef<"TaskAttachment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TaskAttachment findUnique
   */
  export type TaskAttachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAttachment
     */
    select?: TaskAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which TaskAttachment to fetch.
     */
    where: TaskAttachmentWhereUniqueInput
  }

  /**
   * TaskAttachment findUniqueOrThrow
   */
  export type TaskAttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAttachment
     */
    select?: TaskAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which TaskAttachment to fetch.
     */
    where: TaskAttachmentWhereUniqueInput
  }

  /**
   * TaskAttachment findFirst
   */
  export type TaskAttachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAttachment
     */
    select?: TaskAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which TaskAttachment to fetch.
     */
    where?: TaskAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskAttachments to fetch.
     */
    orderBy?: TaskAttachmentOrderByWithRelationInput | TaskAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskAttachments.
     */
    cursor?: TaskAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskAttachments.
     */
    distinct?: TaskAttachmentScalarFieldEnum | TaskAttachmentScalarFieldEnum[]
  }

  /**
   * TaskAttachment findFirstOrThrow
   */
  export type TaskAttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAttachment
     */
    select?: TaskAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which TaskAttachment to fetch.
     */
    where?: TaskAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskAttachments to fetch.
     */
    orderBy?: TaskAttachmentOrderByWithRelationInput | TaskAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskAttachments.
     */
    cursor?: TaskAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskAttachments.
     */
    distinct?: TaskAttachmentScalarFieldEnum | TaskAttachmentScalarFieldEnum[]
  }

  /**
   * TaskAttachment findMany
   */
  export type TaskAttachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAttachment
     */
    select?: TaskAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which TaskAttachments to fetch.
     */
    where?: TaskAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskAttachments to fetch.
     */
    orderBy?: TaskAttachmentOrderByWithRelationInput | TaskAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskAttachments.
     */
    cursor?: TaskAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskAttachments.
     */
    skip?: number
    distinct?: TaskAttachmentScalarFieldEnum | TaskAttachmentScalarFieldEnum[]
  }

  /**
   * TaskAttachment create
   */
  export type TaskAttachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAttachment
     */
    select?: TaskAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskAttachment.
     */
    data: XOR<TaskAttachmentCreateInput, TaskAttachmentUncheckedCreateInput>
  }

  /**
   * TaskAttachment createMany
   */
  export type TaskAttachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskAttachments.
     */
    data: TaskAttachmentCreateManyInput | TaskAttachmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaskAttachment update
   */
  export type TaskAttachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAttachment
     */
    select?: TaskAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskAttachment.
     */
    data: XOR<TaskAttachmentUpdateInput, TaskAttachmentUncheckedUpdateInput>
    /**
     * Choose, which TaskAttachment to update.
     */
    where: TaskAttachmentWhereUniqueInput
  }

  /**
   * TaskAttachment updateMany
   */
  export type TaskAttachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskAttachments.
     */
    data: XOR<TaskAttachmentUpdateManyMutationInput, TaskAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which TaskAttachments to update
     */
    where?: TaskAttachmentWhereInput
  }

  /**
   * TaskAttachment upsert
   */
  export type TaskAttachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAttachment
     */
    select?: TaskAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAttachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskAttachment to update in case it exists.
     */
    where: TaskAttachmentWhereUniqueInput
    /**
     * In case the TaskAttachment found by the `where` argument doesn't exist, create a new TaskAttachment with this data.
     */
    create: XOR<TaskAttachmentCreateInput, TaskAttachmentUncheckedCreateInput>
    /**
     * In case the TaskAttachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskAttachmentUpdateInput, TaskAttachmentUncheckedUpdateInput>
  }

  /**
   * TaskAttachment delete
   */
  export type TaskAttachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAttachment
     */
    select?: TaskAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAttachmentInclude<ExtArgs> | null
    /**
     * Filter which TaskAttachment to delete.
     */
    where: TaskAttachmentWhereUniqueInput
  }

  /**
   * TaskAttachment deleteMany
   */
  export type TaskAttachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskAttachments to delete
     */
    where?: TaskAttachmentWhereInput
  }

  /**
   * TaskAttachment without action
   */
  export type TaskAttachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAttachment
     */
    select?: TaskAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAttachmentInclude<ExtArgs> | null
  }


  /**
   * Model TaskComment
   */

  export type AggregateTaskComment = {
    _count: TaskCommentCountAggregateOutputType | null
    _avg: TaskCommentAvgAggregateOutputType | null
    _sum: TaskCommentSumAggregateOutputType | null
    _min: TaskCommentMinAggregateOutputType | null
    _max: TaskCommentMaxAggregateOutputType | null
  }

  export type TaskCommentAvgAggregateOutputType = {
    id: number | null
    taskId: number | null
    userId: number | null
    parentId: number | null
  }

  export type TaskCommentSumAggregateOutputType = {
    id: number | null
    taskId: number | null
    userId: number | null
    parentId: number | null
  }

  export type TaskCommentMinAggregateOutputType = {
    id: number | null
    taskId: number | null
    userId: number | null
    parentId: number | null
    content: string | null
    editedAt: Date | null
    createdAt: Date | null
  }

  export type TaskCommentMaxAggregateOutputType = {
    id: number | null
    taskId: number | null
    userId: number | null
    parentId: number | null
    content: string | null
    editedAt: Date | null
    createdAt: Date | null
  }

  export type TaskCommentCountAggregateOutputType = {
    id: number
    taskId: number
    userId: number
    parentId: number
    content: number
    editedAt: number
    createdAt: number
    _all: number
  }


  export type TaskCommentAvgAggregateInputType = {
    id?: true
    taskId?: true
    userId?: true
    parentId?: true
  }

  export type TaskCommentSumAggregateInputType = {
    id?: true
    taskId?: true
    userId?: true
    parentId?: true
  }

  export type TaskCommentMinAggregateInputType = {
    id?: true
    taskId?: true
    userId?: true
    parentId?: true
    content?: true
    editedAt?: true
    createdAt?: true
  }

  export type TaskCommentMaxAggregateInputType = {
    id?: true
    taskId?: true
    userId?: true
    parentId?: true
    content?: true
    editedAt?: true
    createdAt?: true
  }

  export type TaskCommentCountAggregateInputType = {
    id?: true
    taskId?: true
    userId?: true
    parentId?: true
    content?: true
    editedAt?: true
    createdAt?: true
    _all?: true
  }

  export type TaskCommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskComment to aggregate.
     */
    where?: TaskCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskComments to fetch.
     */
    orderBy?: TaskCommentOrderByWithRelationInput | TaskCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskComments
    **/
    _count?: true | TaskCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskCommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskCommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskCommentMaxAggregateInputType
  }

  export type GetTaskCommentAggregateType<T extends TaskCommentAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskComment[P]>
      : GetScalarType<T[P], AggregateTaskComment[P]>
  }




  export type TaskCommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskCommentWhereInput
    orderBy?: TaskCommentOrderByWithAggregationInput | TaskCommentOrderByWithAggregationInput[]
    by: TaskCommentScalarFieldEnum[] | TaskCommentScalarFieldEnum
    having?: TaskCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCommentCountAggregateInputType | true
    _avg?: TaskCommentAvgAggregateInputType
    _sum?: TaskCommentSumAggregateInputType
    _min?: TaskCommentMinAggregateInputType
    _max?: TaskCommentMaxAggregateInputType
  }

  export type TaskCommentGroupByOutputType = {
    id: number
    taskId: number
    userId: number
    parentId: number | null
    content: string
    editedAt: Date | null
    createdAt: Date
    _count: TaskCommentCountAggregateOutputType | null
    _avg: TaskCommentAvgAggregateOutputType | null
    _sum: TaskCommentSumAggregateOutputType | null
    _min: TaskCommentMinAggregateOutputType | null
    _max: TaskCommentMaxAggregateOutputType | null
  }

  type GetTaskCommentGroupByPayload<T extends TaskCommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskCommentGroupByOutputType[P]>
            : GetScalarType<T[P], TaskCommentGroupByOutputType[P]>
        }
      >
    >


  export type TaskCommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    userId?: boolean
    parentId?: boolean
    content?: boolean
    editedAt?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | TaskComment$parentArgs<ExtArgs>
    replies?: boolean | TaskComment$repliesArgs<ExtArgs>
    _count?: boolean | TaskCommentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskComment"]>


  export type TaskCommentSelectScalar = {
    id?: boolean
    taskId?: boolean
    userId?: boolean
    parentId?: boolean
    content?: boolean
    editedAt?: boolean
    createdAt?: boolean
  }

  export type TaskCommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | TaskComment$parentArgs<ExtArgs>
    replies?: boolean | TaskComment$repliesArgs<ExtArgs>
    _count?: boolean | TaskCommentCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TaskCommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskComment"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      parent: Prisma.$TaskCommentPayload<ExtArgs> | null
      replies: Prisma.$TaskCommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      taskId: number
      userId: number
      parentId: number | null
      content: string
      editedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["taskComment"]>
    composites: {}
  }

  type TaskCommentGetPayload<S extends boolean | null | undefined | TaskCommentDefaultArgs> = $Result.GetResult<Prisma.$TaskCommentPayload, S>

  type TaskCommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TaskCommentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TaskCommentCountAggregateInputType | true
    }

  export interface TaskCommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskComment'], meta: { name: 'TaskComment' } }
    /**
     * Find zero or one TaskComment that matches the filter.
     * @param {TaskCommentFindUniqueArgs} args - Arguments to find a TaskComment
     * @example
     * // Get one TaskComment
     * const taskComment = await prisma.taskComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskCommentFindUniqueArgs>(args: SelectSubset<T, TaskCommentFindUniqueArgs<ExtArgs>>): Prisma__TaskCommentClient<$Result.GetResult<Prisma.$TaskCommentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TaskComment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TaskCommentFindUniqueOrThrowArgs} args - Arguments to find a TaskComment
     * @example
     * // Get one TaskComment
     * const taskComment = await prisma.taskComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskCommentFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskCommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskCommentClient<$Result.GetResult<Prisma.$TaskCommentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TaskComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCommentFindFirstArgs} args - Arguments to find a TaskComment
     * @example
     * // Get one TaskComment
     * const taskComment = await prisma.taskComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskCommentFindFirstArgs>(args?: SelectSubset<T, TaskCommentFindFirstArgs<ExtArgs>>): Prisma__TaskCommentClient<$Result.GetResult<Prisma.$TaskCommentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TaskComment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCommentFindFirstOrThrowArgs} args - Arguments to find a TaskComment
     * @example
     * // Get one TaskComment
     * const taskComment = await prisma.taskComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskCommentFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskCommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskCommentClient<$Result.GetResult<Prisma.$TaskCommentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TaskComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskComments
     * const taskComments = await prisma.taskComment.findMany()
     * 
     * // Get first 10 TaskComments
     * const taskComments = await prisma.taskComment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskCommentWithIdOnly = await prisma.taskComment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskCommentFindManyArgs>(args?: SelectSubset<T, TaskCommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCommentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TaskComment.
     * @param {TaskCommentCreateArgs} args - Arguments to create a TaskComment.
     * @example
     * // Create one TaskComment
     * const TaskComment = await prisma.taskComment.create({
     *   data: {
     *     // ... data to create a TaskComment
     *   }
     * })
     * 
     */
    create<T extends TaskCommentCreateArgs>(args: SelectSubset<T, TaskCommentCreateArgs<ExtArgs>>): Prisma__TaskCommentClient<$Result.GetResult<Prisma.$TaskCommentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TaskComments.
     * @param {TaskCommentCreateManyArgs} args - Arguments to create many TaskComments.
     * @example
     * // Create many TaskComments
     * const taskComment = await prisma.taskComment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCommentCreateManyArgs>(args?: SelectSubset<T, TaskCommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TaskComment.
     * @param {TaskCommentDeleteArgs} args - Arguments to delete one TaskComment.
     * @example
     * // Delete one TaskComment
     * const TaskComment = await prisma.taskComment.delete({
     *   where: {
     *     // ... filter to delete one TaskComment
     *   }
     * })
     * 
     */
    delete<T extends TaskCommentDeleteArgs>(args: SelectSubset<T, TaskCommentDeleteArgs<ExtArgs>>): Prisma__TaskCommentClient<$Result.GetResult<Prisma.$TaskCommentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TaskComment.
     * @param {TaskCommentUpdateArgs} args - Arguments to update one TaskComment.
     * @example
     * // Update one TaskComment
     * const taskComment = await prisma.taskComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskCommentUpdateArgs>(args: SelectSubset<T, TaskCommentUpdateArgs<ExtArgs>>): Prisma__TaskCommentClient<$Result.GetResult<Prisma.$TaskCommentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TaskComments.
     * @param {TaskCommentDeleteManyArgs} args - Arguments to filter TaskComments to delete.
     * @example
     * // Delete a few TaskComments
     * const { count } = await prisma.taskComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskCommentDeleteManyArgs>(args?: SelectSubset<T, TaskCommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskComments
     * const taskComment = await prisma.taskComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskCommentUpdateManyArgs>(args: SelectSubset<T, TaskCommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TaskComment.
     * @param {TaskCommentUpsertArgs} args - Arguments to update or create a TaskComment.
     * @example
     * // Update or create a TaskComment
     * const taskComment = await prisma.taskComment.upsert({
     *   create: {
     *     // ... data to create a TaskComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskComment we want to update
     *   }
     * })
     */
    upsert<T extends TaskCommentUpsertArgs>(args: SelectSubset<T, TaskCommentUpsertArgs<ExtArgs>>): Prisma__TaskCommentClient<$Result.GetResult<Prisma.$TaskCommentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TaskComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCommentCountArgs} args - Arguments to filter TaskComments to count.
     * @example
     * // Count the number of TaskComments
     * const count = await prisma.taskComment.count({
     *   where: {
     *     // ... the filter for the TaskComments we want to count
     *   }
     * })
    **/
    count<T extends TaskCommentCountArgs>(
      args?: Subset<T, TaskCommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskCommentAggregateArgs>(args: Subset<T, TaskCommentAggregateArgs>): Prisma.PrismaPromise<GetTaskCommentAggregateType<T>>

    /**
     * Group by TaskComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskCommentGroupByArgs['orderBy'] }
        : { orderBy?: TaskCommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskComment model
   */
  readonly fields: TaskCommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskCommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    parent<T extends TaskComment$parentArgs<ExtArgs> = {}>(args?: Subset<T, TaskComment$parentArgs<ExtArgs>>): Prisma__TaskCommentClient<$Result.GetResult<Prisma.$TaskCommentPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    replies<T extends TaskComment$repliesArgs<ExtArgs> = {}>(args?: Subset<T, TaskComment$repliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCommentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskComment model
   */ 
  interface TaskCommentFieldRefs {
    readonly id: FieldRef<"TaskComment", 'Int'>
    readonly taskId: FieldRef<"TaskComment", 'Int'>
    readonly userId: FieldRef<"TaskComment", 'Int'>
    readonly parentId: FieldRef<"TaskComment", 'Int'>
    readonly content: FieldRef<"TaskComment", 'String'>
    readonly editedAt: FieldRef<"TaskComment", 'DateTime'>
    readonly createdAt: FieldRef<"TaskComment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TaskComment findUnique
   */
  export type TaskCommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskComment
     */
    select?: TaskCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCommentInclude<ExtArgs> | null
    /**
     * Filter, which TaskComment to fetch.
     */
    where: TaskCommentWhereUniqueInput
  }

  /**
   * TaskComment findUniqueOrThrow
   */
  export type TaskCommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskComment
     */
    select?: TaskCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCommentInclude<ExtArgs> | null
    /**
     * Filter, which TaskComment to fetch.
     */
    where: TaskCommentWhereUniqueInput
  }

  /**
   * TaskComment findFirst
   */
  export type TaskCommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskComment
     */
    select?: TaskCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCommentInclude<ExtArgs> | null
    /**
     * Filter, which TaskComment to fetch.
     */
    where?: TaskCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskComments to fetch.
     */
    orderBy?: TaskCommentOrderByWithRelationInput | TaskCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskComments.
     */
    cursor?: TaskCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskComments.
     */
    distinct?: TaskCommentScalarFieldEnum | TaskCommentScalarFieldEnum[]
  }

  /**
   * TaskComment findFirstOrThrow
   */
  export type TaskCommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskComment
     */
    select?: TaskCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCommentInclude<ExtArgs> | null
    /**
     * Filter, which TaskComment to fetch.
     */
    where?: TaskCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskComments to fetch.
     */
    orderBy?: TaskCommentOrderByWithRelationInput | TaskCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskComments.
     */
    cursor?: TaskCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskComments.
     */
    distinct?: TaskCommentScalarFieldEnum | TaskCommentScalarFieldEnum[]
  }

  /**
   * TaskComment findMany
   */
  export type TaskCommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskComment
     */
    select?: TaskCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCommentInclude<ExtArgs> | null
    /**
     * Filter, which TaskComments to fetch.
     */
    where?: TaskCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskComments to fetch.
     */
    orderBy?: TaskCommentOrderByWithRelationInput | TaskCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskComments.
     */
    cursor?: TaskCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskComments.
     */
    skip?: number
    distinct?: TaskCommentScalarFieldEnum | TaskCommentScalarFieldEnum[]
  }

  /**
   * TaskComment create
   */
  export type TaskCommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskComment
     */
    select?: TaskCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCommentInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskComment.
     */
    data: XOR<TaskCommentCreateInput, TaskCommentUncheckedCreateInput>
  }

  /**
   * TaskComment createMany
   */
  export type TaskCommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskComments.
     */
    data: TaskCommentCreateManyInput | TaskCommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaskComment update
   */
  export type TaskCommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskComment
     */
    select?: TaskCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCommentInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskComment.
     */
    data: XOR<TaskCommentUpdateInput, TaskCommentUncheckedUpdateInput>
    /**
     * Choose, which TaskComment to update.
     */
    where: TaskCommentWhereUniqueInput
  }

  /**
   * TaskComment updateMany
   */
  export type TaskCommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskComments.
     */
    data: XOR<TaskCommentUpdateManyMutationInput, TaskCommentUncheckedUpdateManyInput>
    /**
     * Filter which TaskComments to update
     */
    where?: TaskCommentWhereInput
  }

  /**
   * TaskComment upsert
   */
  export type TaskCommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskComment
     */
    select?: TaskCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCommentInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskComment to update in case it exists.
     */
    where: TaskCommentWhereUniqueInput
    /**
     * In case the TaskComment found by the `where` argument doesn't exist, create a new TaskComment with this data.
     */
    create: XOR<TaskCommentCreateInput, TaskCommentUncheckedCreateInput>
    /**
     * In case the TaskComment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskCommentUpdateInput, TaskCommentUncheckedUpdateInput>
  }

  /**
   * TaskComment delete
   */
  export type TaskCommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskComment
     */
    select?: TaskCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCommentInclude<ExtArgs> | null
    /**
     * Filter which TaskComment to delete.
     */
    where: TaskCommentWhereUniqueInput
  }

  /**
   * TaskComment deleteMany
   */
  export type TaskCommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskComments to delete
     */
    where?: TaskCommentWhereInput
  }

  /**
   * TaskComment.parent
   */
  export type TaskComment$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskComment
     */
    select?: TaskCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCommentInclude<ExtArgs> | null
    where?: TaskCommentWhereInput
  }

  /**
   * TaskComment.replies
   */
  export type TaskComment$repliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskComment
     */
    select?: TaskCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCommentInclude<ExtArgs> | null
    where?: TaskCommentWhereInput
    orderBy?: TaskCommentOrderByWithRelationInput | TaskCommentOrderByWithRelationInput[]
    cursor?: TaskCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskCommentScalarFieldEnum | TaskCommentScalarFieldEnum[]
  }

  /**
   * TaskComment without action
   */
  export type TaskCommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskComment
     */
    select?: TaskCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCommentInclude<ExtArgs> | null
  }


  /**
   * Model TaskActivity
   */

  export type AggregateTaskActivity = {
    _count: TaskActivityCountAggregateOutputType | null
    _avg: TaskActivityAvgAggregateOutputType | null
    _sum: TaskActivitySumAggregateOutputType | null
    _min: TaskActivityMinAggregateOutputType | null
    _max: TaskActivityMaxAggregateOutputType | null
  }

  export type TaskActivityAvgAggregateOutputType = {
    id: number | null
    taskId: number | null
    userId: number | null
    entityId: number | null
  }

  export type TaskActivitySumAggregateOutputType = {
    id: number | null
    taskId: number | null
    userId: number | null
    entityId: number | null
  }

  export type TaskActivityMinAggregateOutputType = {
    id: number | null
    taskId: number | null
    userId: number | null
    action: $Enums.TaskActivityAction | null
    entityType: string | null
    entityId: number | null
    createdAt: Date | null
  }

  export type TaskActivityMaxAggregateOutputType = {
    id: number | null
    taskId: number | null
    userId: number | null
    action: $Enums.TaskActivityAction | null
    entityType: string | null
    entityId: number | null
    createdAt: Date | null
  }

  export type TaskActivityCountAggregateOutputType = {
    id: number
    taskId: number
    userId: number
    action: number
    entityType: number
    entityId: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type TaskActivityAvgAggregateInputType = {
    id?: true
    taskId?: true
    userId?: true
    entityId?: true
  }

  export type TaskActivitySumAggregateInputType = {
    id?: true
    taskId?: true
    userId?: true
    entityId?: true
  }

  export type TaskActivityMinAggregateInputType = {
    id?: true
    taskId?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    createdAt?: true
  }

  export type TaskActivityMaxAggregateInputType = {
    id?: true
    taskId?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    createdAt?: true
  }

  export type TaskActivityCountAggregateInputType = {
    id?: true
    taskId?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type TaskActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskActivity to aggregate.
     */
    where?: TaskActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskActivities to fetch.
     */
    orderBy?: TaskActivityOrderByWithRelationInput | TaskActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskActivities
    **/
    _count?: true | TaskActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskActivityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskActivitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskActivityMaxAggregateInputType
  }

  export type GetTaskActivityAggregateType<T extends TaskActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskActivity[P]>
      : GetScalarType<T[P], AggregateTaskActivity[P]>
  }




  export type TaskActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskActivityWhereInput
    orderBy?: TaskActivityOrderByWithAggregationInput | TaskActivityOrderByWithAggregationInput[]
    by: TaskActivityScalarFieldEnum[] | TaskActivityScalarFieldEnum
    having?: TaskActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskActivityCountAggregateInputType | true
    _avg?: TaskActivityAvgAggregateInputType
    _sum?: TaskActivitySumAggregateInputType
    _min?: TaskActivityMinAggregateInputType
    _max?: TaskActivityMaxAggregateInputType
  }

  export type TaskActivityGroupByOutputType = {
    id: number
    taskId: number
    userId: number
    action: $Enums.TaskActivityAction
    entityType: string
    entityId: number | null
    metadata: JsonValue | null
    createdAt: Date
    _count: TaskActivityCountAggregateOutputType | null
    _avg: TaskActivityAvgAggregateOutputType | null
    _sum: TaskActivitySumAggregateOutputType | null
    _min: TaskActivityMinAggregateOutputType | null
    _max: TaskActivityMaxAggregateOutputType | null
  }

  type GetTaskActivityGroupByPayload<T extends TaskActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskActivityGroupByOutputType[P]>
            : GetScalarType<T[P], TaskActivityGroupByOutputType[P]>
        }
      >
    >


  export type TaskActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    metadata?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskActivity"]>


  export type TaskActivitySelectScalar = {
    id?: boolean
    taskId?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type TaskActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TaskActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskActivity"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      taskId: number
      userId: number
      action: $Enums.TaskActivityAction
      entityType: string
      entityId: number | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["taskActivity"]>
    composites: {}
  }

  type TaskActivityGetPayload<S extends boolean | null | undefined | TaskActivityDefaultArgs> = $Result.GetResult<Prisma.$TaskActivityPayload, S>

  type TaskActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TaskActivityFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TaskActivityCountAggregateInputType | true
    }

  export interface TaskActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskActivity'], meta: { name: 'TaskActivity' } }
    /**
     * Find zero or one TaskActivity that matches the filter.
     * @param {TaskActivityFindUniqueArgs} args - Arguments to find a TaskActivity
     * @example
     * // Get one TaskActivity
     * const taskActivity = await prisma.taskActivity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskActivityFindUniqueArgs>(args: SelectSubset<T, TaskActivityFindUniqueArgs<ExtArgs>>): Prisma__TaskActivityClient<$Result.GetResult<Prisma.$TaskActivityPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TaskActivity that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TaskActivityFindUniqueOrThrowArgs} args - Arguments to find a TaskActivity
     * @example
     * // Get one TaskActivity
     * const taskActivity = await prisma.taskActivity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskActivityClient<$Result.GetResult<Prisma.$TaskActivityPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TaskActivity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskActivityFindFirstArgs} args - Arguments to find a TaskActivity
     * @example
     * // Get one TaskActivity
     * const taskActivity = await prisma.taskActivity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskActivityFindFirstArgs>(args?: SelectSubset<T, TaskActivityFindFirstArgs<ExtArgs>>): Prisma__TaskActivityClient<$Result.GetResult<Prisma.$TaskActivityPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TaskActivity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskActivityFindFirstOrThrowArgs} args - Arguments to find a TaskActivity
     * @example
     * // Get one TaskActivity
     * const taskActivity = await prisma.taskActivity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskActivityClient<$Result.GetResult<Prisma.$TaskActivityPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TaskActivities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskActivities
     * const taskActivities = await prisma.taskActivity.findMany()
     * 
     * // Get first 10 TaskActivities
     * const taskActivities = await prisma.taskActivity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskActivityWithIdOnly = await prisma.taskActivity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskActivityFindManyArgs>(args?: SelectSubset<T, TaskActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskActivityPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TaskActivity.
     * @param {TaskActivityCreateArgs} args - Arguments to create a TaskActivity.
     * @example
     * // Create one TaskActivity
     * const TaskActivity = await prisma.taskActivity.create({
     *   data: {
     *     // ... data to create a TaskActivity
     *   }
     * })
     * 
     */
    create<T extends TaskActivityCreateArgs>(args: SelectSubset<T, TaskActivityCreateArgs<ExtArgs>>): Prisma__TaskActivityClient<$Result.GetResult<Prisma.$TaskActivityPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TaskActivities.
     * @param {TaskActivityCreateManyArgs} args - Arguments to create many TaskActivities.
     * @example
     * // Create many TaskActivities
     * const taskActivity = await prisma.taskActivity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskActivityCreateManyArgs>(args?: SelectSubset<T, TaskActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TaskActivity.
     * @param {TaskActivityDeleteArgs} args - Arguments to delete one TaskActivity.
     * @example
     * // Delete one TaskActivity
     * const TaskActivity = await prisma.taskActivity.delete({
     *   where: {
     *     // ... filter to delete one TaskActivity
     *   }
     * })
     * 
     */
    delete<T extends TaskActivityDeleteArgs>(args: SelectSubset<T, TaskActivityDeleteArgs<ExtArgs>>): Prisma__TaskActivityClient<$Result.GetResult<Prisma.$TaskActivityPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TaskActivity.
     * @param {TaskActivityUpdateArgs} args - Arguments to update one TaskActivity.
     * @example
     * // Update one TaskActivity
     * const taskActivity = await prisma.taskActivity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskActivityUpdateArgs>(args: SelectSubset<T, TaskActivityUpdateArgs<ExtArgs>>): Prisma__TaskActivityClient<$Result.GetResult<Prisma.$TaskActivityPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TaskActivities.
     * @param {TaskActivityDeleteManyArgs} args - Arguments to filter TaskActivities to delete.
     * @example
     * // Delete a few TaskActivities
     * const { count } = await prisma.taskActivity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskActivityDeleteManyArgs>(args?: SelectSubset<T, TaskActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskActivities
     * const taskActivity = await prisma.taskActivity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskActivityUpdateManyArgs>(args: SelectSubset<T, TaskActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TaskActivity.
     * @param {TaskActivityUpsertArgs} args - Arguments to update or create a TaskActivity.
     * @example
     * // Update or create a TaskActivity
     * const taskActivity = await prisma.taskActivity.upsert({
     *   create: {
     *     // ... data to create a TaskActivity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskActivity we want to update
     *   }
     * })
     */
    upsert<T extends TaskActivityUpsertArgs>(args: SelectSubset<T, TaskActivityUpsertArgs<ExtArgs>>): Prisma__TaskActivityClient<$Result.GetResult<Prisma.$TaskActivityPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TaskActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskActivityCountArgs} args - Arguments to filter TaskActivities to count.
     * @example
     * // Count the number of TaskActivities
     * const count = await prisma.taskActivity.count({
     *   where: {
     *     // ... the filter for the TaskActivities we want to count
     *   }
     * })
    **/
    count<T extends TaskActivityCountArgs>(
      args?: Subset<T, TaskActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskActivityAggregateArgs>(args: Subset<T, TaskActivityAggregateArgs>): Prisma.PrismaPromise<GetTaskActivityAggregateType<T>>

    /**
     * Group by TaskActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskActivityGroupByArgs['orderBy'] }
        : { orderBy?: TaskActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskActivity model
   */
  readonly fields: TaskActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskActivity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskActivity model
   */ 
  interface TaskActivityFieldRefs {
    readonly id: FieldRef<"TaskActivity", 'Int'>
    readonly taskId: FieldRef<"TaskActivity", 'Int'>
    readonly userId: FieldRef<"TaskActivity", 'Int'>
    readonly action: FieldRef<"TaskActivity", 'TaskActivityAction'>
    readonly entityType: FieldRef<"TaskActivity", 'String'>
    readonly entityId: FieldRef<"TaskActivity", 'Int'>
    readonly metadata: FieldRef<"TaskActivity", 'Json'>
    readonly createdAt: FieldRef<"TaskActivity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TaskActivity findUnique
   */
  export type TaskActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskActivity
     */
    select?: TaskActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskActivityInclude<ExtArgs> | null
    /**
     * Filter, which TaskActivity to fetch.
     */
    where: TaskActivityWhereUniqueInput
  }

  /**
   * TaskActivity findUniqueOrThrow
   */
  export type TaskActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskActivity
     */
    select?: TaskActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskActivityInclude<ExtArgs> | null
    /**
     * Filter, which TaskActivity to fetch.
     */
    where: TaskActivityWhereUniqueInput
  }

  /**
   * TaskActivity findFirst
   */
  export type TaskActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskActivity
     */
    select?: TaskActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskActivityInclude<ExtArgs> | null
    /**
     * Filter, which TaskActivity to fetch.
     */
    where?: TaskActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskActivities to fetch.
     */
    orderBy?: TaskActivityOrderByWithRelationInput | TaskActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskActivities.
     */
    cursor?: TaskActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskActivities.
     */
    distinct?: TaskActivityScalarFieldEnum | TaskActivityScalarFieldEnum[]
  }

  /**
   * TaskActivity findFirstOrThrow
   */
  export type TaskActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskActivity
     */
    select?: TaskActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskActivityInclude<ExtArgs> | null
    /**
     * Filter, which TaskActivity to fetch.
     */
    where?: TaskActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskActivities to fetch.
     */
    orderBy?: TaskActivityOrderByWithRelationInput | TaskActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskActivities.
     */
    cursor?: TaskActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskActivities.
     */
    distinct?: TaskActivityScalarFieldEnum | TaskActivityScalarFieldEnum[]
  }

  /**
   * TaskActivity findMany
   */
  export type TaskActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskActivity
     */
    select?: TaskActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskActivityInclude<ExtArgs> | null
    /**
     * Filter, which TaskActivities to fetch.
     */
    where?: TaskActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskActivities to fetch.
     */
    orderBy?: TaskActivityOrderByWithRelationInput | TaskActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskActivities.
     */
    cursor?: TaskActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskActivities.
     */
    skip?: number
    distinct?: TaskActivityScalarFieldEnum | TaskActivityScalarFieldEnum[]
  }

  /**
   * TaskActivity create
   */
  export type TaskActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskActivity
     */
    select?: TaskActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskActivity.
     */
    data: XOR<TaskActivityCreateInput, TaskActivityUncheckedCreateInput>
  }

  /**
   * TaskActivity createMany
   */
  export type TaskActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskActivities.
     */
    data: TaskActivityCreateManyInput | TaskActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaskActivity update
   */
  export type TaskActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskActivity
     */
    select?: TaskActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskActivity.
     */
    data: XOR<TaskActivityUpdateInput, TaskActivityUncheckedUpdateInput>
    /**
     * Choose, which TaskActivity to update.
     */
    where: TaskActivityWhereUniqueInput
  }

  /**
   * TaskActivity updateMany
   */
  export type TaskActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskActivities.
     */
    data: XOR<TaskActivityUpdateManyMutationInput, TaskActivityUncheckedUpdateManyInput>
    /**
     * Filter which TaskActivities to update
     */
    where?: TaskActivityWhereInput
  }

  /**
   * TaskActivity upsert
   */
  export type TaskActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskActivity
     */
    select?: TaskActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskActivity to update in case it exists.
     */
    where: TaskActivityWhereUniqueInput
    /**
     * In case the TaskActivity found by the `where` argument doesn't exist, create a new TaskActivity with this data.
     */
    create: XOR<TaskActivityCreateInput, TaskActivityUncheckedCreateInput>
    /**
     * In case the TaskActivity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskActivityUpdateInput, TaskActivityUncheckedUpdateInput>
  }

  /**
   * TaskActivity delete
   */
  export type TaskActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskActivity
     */
    select?: TaskActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskActivityInclude<ExtArgs> | null
    /**
     * Filter which TaskActivity to delete.
     */
    where: TaskActivityWhereUniqueInput
  }

  /**
   * TaskActivity deleteMany
   */
  export type TaskActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskActivities to delete
     */
    where?: TaskActivityWhereInput
  }

  /**
   * TaskActivity without action
   */
  export type TaskActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskActivity
     */
    select?: TaskActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskActivityInclude<ExtArgs> | null
  }


  /**
   * Model TimeEntry
   */

  export type AggregateTimeEntry = {
    _count: TimeEntryCountAggregateOutputType | null
    _avg: TimeEntryAvgAggregateOutputType | null
    _sum: TimeEntrySumAggregateOutputType | null
    _min: TimeEntryMinAggregateOutputType | null
    _max: TimeEntryMaxAggregateOutputType | null
  }

  export type TimeEntryAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    taskId: number | null
    clientId: number | null
    durationSeconds: number | null
    totalPausedSeconds: number | null
  }

  export type TimeEntrySumAggregateOutputType = {
    id: number | null
    userId: number | null
    taskId: number | null
    clientId: number | null
    durationSeconds: number | null
    totalPausedSeconds: number | null
  }

  export type TimeEntryMinAggregateOutputType = {
    id: number | null
    userId: number | null
    taskId: number | null
    clientId: number | null
    startTime: Date | null
    endTime: Date | null
    durationSeconds: number | null
    totalPausedSeconds: number | null
    pausedAt: Date | null
    status: $Enums.TimeEntryStatus | null
    description: string | null
    isManual: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TimeEntryMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    taskId: number | null
    clientId: number | null
    startTime: Date | null
    endTime: Date | null
    durationSeconds: number | null
    totalPausedSeconds: number | null
    pausedAt: Date | null
    status: $Enums.TimeEntryStatus | null
    description: string | null
    isManual: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TimeEntryCountAggregateOutputType = {
    id: number
    userId: number
    taskId: number
    clientId: number
    startTime: number
    endTime: number
    durationSeconds: number
    totalPausedSeconds: number
    pausedAt: number
    status: number
    description: number
    isManual: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TimeEntryAvgAggregateInputType = {
    id?: true
    userId?: true
    taskId?: true
    clientId?: true
    durationSeconds?: true
    totalPausedSeconds?: true
  }

  export type TimeEntrySumAggregateInputType = {
    id?: true
    userId?: true
    taskId?: true
    clientId?: true
    durationSeconds?: true
    totalPausedSeconds?: true
  }

  export type TimeEntryMinAggregateInputType = {
    id?: true
    userId?: true
    taskId?: true
    clientId?: true
    startTime?: true
    endTime?: true
    durationSeconds?: true
    totalPausedSeconds?: true
    pausedAt?: true
    status?: true
    description?: true
    isManual?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TimeEntryMaxAggregateInputType = {
    id?: true
    userId?: true
    taskId?: true
    clientId?: true
    startTime?: true
    endTime?: true
    durationSeconds?: true
    totalPausedSeconds?: true
    pausedAt?: true
    status?: true
    description?: true
    isManual?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TimeEntryCountAggregateInputType = {
    id?: true
    userId?: true
    taskId?: true
    clientId?: true
    startTime?: true
    endTime?: true
    durationSeconds?: true
    totalPausedSeconds?: true
    pausedAt?: true
    status?: true
    description?: true
    isManual?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TimeEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimeEntry to aggregate.
     */
    where?: TimeEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeEntries to fetch.
     */
    orderBy?: TimeEntryOrderByWithRelationInput | TimeEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimeEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TimeEntries
    **/
    _count?: true | TimeEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TimeEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TimeEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimeEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimeEntryMaxAggregateInputType
  }

  export type GetTimeEntryAggregateType<T extends TimeEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateTimeEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimeEntry[P]>
      : GetScalarType<T[P], AggregateTimeEntry[P]>
  }




  export type TimeEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeEntryWhereInput
    orderBy?: TimeEntryOrderByWithAggregationInput | TimeEntryOrderByWithAggregationInput[]
    by: TimeEntryScalarFieldEnum[] | TimeEntryScalarFieldEnum
    having?: TimeEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimeEntryCountAggregateInputType | true
    _avg?: TimeEntryAvgAggregateInputType
    _sum?: TimeEntrySumAggregateInputType
    _min?: TimeEntryMinAggregateInputType
    _max?: TimeEntryMaxAggregateInputType
  }

  export type TimeEntryGroupByOutputType = {
    id: number
    userId: number
    taskId: number
    clientId: number
    startTime: Date
    endTime: Date | null
    durationSeconds: number
    totalPausedSeconds: number
    pausedAt: Date | null
    status: $Enums.TimeEntryStatus
    description: string | null
    isManual: boolean
    createdAt: Date
    updatedAt: Date
    _count: TimeEntryCountAggregateOutputType | null
    _avg: TimeEntryAvgAggregateOutputType | null
    _sum: TimeEntrySumAggregateOutputType | null
    _min: TimeEntryMinAggregateOutputType | null
    _max: TimeEntryMaxAggregateOutputType | null
  }

  type GetTimeEntryGroupByPayload<T extends TimeEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimeEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimeEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimeEntryGroupByOutputType[P]>
            : GetScalarType<T[P], TimeEntryGroupByOutputType[P]>
        }
      >
    >


  export type TimeEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    taskId?: boolean
    clientId?: boolean
    startTime?: boolean
    endTime?: boolean
    durationSeconds?: boolean
    totalPausedSeconds?: boolean
    pausedAt?: boolean
    status?: boolean
    description?: boolean
    isManual?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    task?: boolean | TaskDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeEntry"]>


  export type TimeEntrySelectScalar = {
    id?: boolean
    userId?: boolean
    taskId?: boolean
    clientId?: boolean
    startTime?: boolean
    endTime?: boolean
    durationSeconds?: boolean
    totalPausedSeconds?: boolean
    pausedAt?: boolean
    status?: boolean
    description?: boolean
    isManual?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TimeEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    task?: boolean | TaskDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $TimeEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TimeEntry"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      task: Prisma.$TaskPayload<ExtArgs>
      client: Prisma.$ClientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      taskId: number
      clientId: number
      startTime: Date
      endTime: Date | null
      durationSeconds: number
      totalPausedSeconds: number
      pausedAt: Date | null
      status: $Enums.TimeEntryStatus
      description: string | null
      isManual: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["timeEntry"]>
    composites: {}
  }

  type TimeEntryGetPayload<S extends boolean | null | undefined | TimeEntryDefaultArgs> = $Result.GetResult<Prisma.$TimeEntryPayload, S>

  type TimeEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TimeEntryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TimeEntryCountAggregateInputType | true
    }

  export interface TimeEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TimeEntry'], meta: { name: 'TimeEntry' } }
    /**
     * Find zero or one TimeEntry that matches the filter.
     * @param {TimeEntryFindUniqueArgs} args - Arguments to find a TimeEntry
     * @example
     * // Get one TimeEntry
     * const timeEntry = await prisma.timeEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimeEntryFindUniqueArgs>(args: SelectSubset<T, TimeEntryFindUniqueArgs<ExtArgs>>): Prisma__TimeEntryClient<$Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TimeEntry that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TimeEntryFindUniqueOrThrowArgs} args - Arguments to find a TimeEntry
     * @example
     * // Get one TimeEntry
     * const timeEntry = await prisma.timeEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimeEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, TimeEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimeEntryClient<$Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TimeEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeEntryFindFirstArgs} args - Arguments to find a TimeEntry
     * @example
     * // Get one TimeEntry
     * const timeEntry = await prisma.timeEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimeEntryFindFirstArgs>(args?: SelectSubset<T, TimeEntryFindFirstArgs<ExtArgs>>): Prisma__TimeEntryClient<$Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TimeEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeEntryFindFirstOrThrowArgs} args - Arguments to find a TimeEntry
     * @example
     * // Get one TimeEntry
     * const timeEntry = await prisma.timeEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimeEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, TimeEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimeEntryClient<$Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TimeEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TimeEntries
     * const timeEntries = await prisma.timeEntry.findMany()
     * 
     * // Get first 10 TimeEntries
     * const timeEntries = await prisma.timeEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timeEntryWithIdOnly = await prisma.timeEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimeEntryFindManyArgs>(args?: SelectSubset<T, TimeEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TimeEntry.
     * @param {TimeEntryCreateArgs} args - Arguments to create a TimeEntry.
     * @example
     * // Create one TimeEntry
     * const TimeEntry = await prisma.timeEntry.create({
     *   data: {
     *     // ... data to create a TimeEntry
     *   }
     * })
     * 
     */
    create<T extends TimeEntryCreateArgs>(args: SelectSubset<T, TimeEntryCreateArgs<ExtArgs>>): Prisma__TimeEntryClient<$Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TimeEntries.
     * @param {TimeEntryCreateManyArgs} args - Arguments to create many TimeEntries.
     * @example
     * // Create many TimeEntries
     * const timeEntry = await prisma.timeEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimeEntryCreateManyArgs>(args?: SelectSubset<T, TimeEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TimeEntry.
     * @param {TimeEntryDeleteArgs} args - Arguments to delete one TimeEntry.
     * @example
     * // Delete one TimeEntry
     * const TimeEntry = await prisma.timeEntry.delete({
     *   where: {
     *     // ... filter to delete one TimeEntry
     *   }
     * })
     * 
     */
    delete<T extends TimeEntryDeleteArgs>(args: SelectSubset<T, TimeEntryDeleteArgs<ExtArgs>>): Prisma__TimeEntryClient<$Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TimeEntry.
     * @param {TimeEntryUpdateArgs} args - Arguments to update one TimeEntry.
     * @example
     * // Update one TimeEntry
     * const timeEntry = await prisma.timeEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimeEntryUpdateArgs>(args: SelectSubset<T, TimeEntryUpdateArgs<ExtArgs>>): Prisma__TimeEntryClient<$Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TimeEntries.
     * @param {TimeEntryDeleteManyArgs} args - Arguments to filter TimeEntries to delete.
     * @example
     * // Delete a few TimeEntries
     * const { count } = await prisma.timeEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimeEntryDeleteManyArgs>(args?: SelectSubset<T, TimeEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimeEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TimeEntries
     * const timeEntry = await prisma.timeEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimeEntryUpdateManyArgs>(args: SelectSubset<T, TimeEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TimeEntry.
     * @param {TimeEntryUpsertArgs} args - Arguments to update or create a TimeEntry.
     * @example
     * // Update or create a TimeEntry
     * const timeEntry = await prisma.timeEntry.upsert({
     *   create: {
     *     // ... data to create a TimeEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TimeEntry we want to update
     *   }
     * })
     */
    upsert<T extends TimeEntryUpsertArgs>(args: SelectSubset<T, TimeEntryUpsertArgs<ExtArgs>>): Prisma__TimeEntryClient<$Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TimeEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeEntryCountArgs} args - Arguments to filter TimeEntries to count.
     * @example
     * // Count the number of TimeEntries
     * const count = await prisma.timeEntry.count({
     *   where: {
     *     // ... the filter for the TimeEntries we want to count
     *   }
     * })
    **/
    count<T extends TimeEntryCountArgs>(
      args?: Subset<T, TimeEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimeEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TimeEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TimeEntryAggregateArgs>(args: Subset<T, TimeEntryAggregateArgs>): Prisma.PrismaPromise<GetTimeEntryAggregateType<T>>

    /**
     * Group by TimeEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TimeEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimeEntryGroupByArgs['orderBy'] }
        : { orderBy?: TimeEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TimeEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimeEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TimeEntry model
   */
  readonly fields: TimeEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TimeEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimeEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TimeEntry model
   */ 
  interface TimeEntryFieldRefs {
    readonly id: FieldRef<"TimeEntry", 'Int'>
    readonly userId: FieldRef<"TimeEntry", 'Int'>
    readonly taskId: FieldRef<"TimeEntry", 'Int'>
    readonly clientId: FieldRef<"TimeEntry", 'Int'>
    readonly startTime: FieldRef<"TimeEntry", 'DateTime'>
    readonly endTime: FieldRef<"TimeEntry", 'DateTime'>
    readonly durationSeconds: FieldRef<"TimeEntry", 'Int'>
    readonly totalPausedSeconds: FieldRef<"TimeEntry", 'Int'>
    readonly pausedAt: FieldRef<"TimeEntry", 'DateTime'>
    readonly status: FieldRef<"TimeEntry", 'TimeEntryStatus'>
    readonly description: FieldRef<"TimeEntry", 'String'>
    readonly isManual: FieldRef<"TimeEntry", 'Boolean'>
    readonly createdAt: FieldRef<"TimeEntry", 'DateTime'>
    readonly updatedAt: FieldRef<"TimeEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TimeEntry findUnique
   */
  export type TimeEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeEntry
     */
    select?: TimeEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeEntryInclude<ExtArgs> | null
    /**
     * Filter, which TimeEntry to fetch.
     */
    where: TimeEntryWhereUniqueInput
  }

  /**
   * TimeEntry findUniqueOrThrow
   */
  export type TimeEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeEntry
     */
    select?: TimeEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeEntryInclude<ExtArgs> | null
    /**
     * Filter, which TimeEntry to fetch.
     */
    where: TimeEntryWhereUniqueInput
  }

  /**
   * TimeEntry findFirst
   */
  export type TimeEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeEntry
     */
    select?: TimeEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeEntryInclude<ExtArgs> | null
    /**
     * Filter, which TimeEntry to fetch.
     */
    where?: TimeEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeEntries to fetch.
     */
    orderBy?: TimeEntryOrderByWithRelationInput | TimeEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimeEntries.
     */
    cursor?: TimeEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeEntries.
     */
    distinct?: TimeEntryScalarFieldEnum | TimeEntryScalarFieldEnum[]
  }

  /**
   * TimeEntry findFirstOrThrow
   */
  export type TimeEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeEntry
     */
    select?: TimeEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeEntryInclude<ExtArgs> | null
    /**
     * Filter, which TimeEntry to fetch.
     */
    where?: TimeEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeEntries to fetch.
     */
    orderBy?: TimeEntryOrderByWithRelationInput | TimeEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimeEntries.
     */
    cursor?: TimeEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeEntries.
     */
    distinct?: TimeEntryScalarFieldEnum | TimeEntryScalarFieldEnum[]
  }

  /**
   * TimeEntry findMany
   */
  export type TimeEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeEntry
     */
    select?: TimeEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeEntryInclude<ExtArgs> | null
    /**
     * Filter, which TimeEntries to fetch.
     */
    where?: TimeEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeEntries to fetch.
     */
    orderBy?: TimeEntryOrderByWithRelationInput | TimeEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TimeEntries.
     */
    cursor?: TimeEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeEntries.
     */
    skip?: number
    distinct?: TimeEntryScalarFieldEnum | TimeEntryScalarFieldEnum[]
  }

  /**
   * TimeEntry create
   */
  export type TimeEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeEntry
     */
    select?: TimeEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a TimeEntry.
     */
    data: XOR<TimeEntryCreateInput, TimeEntryUncheckedCreateInput>
  }

  /**
   * TimeEntry createMany
   */
  export type TimeEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TimeEntries.
     */
    data: TimeEntryCreateManyInput | TimeEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimeEntry update
   */
  export type TimeEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeEntry
     */
    select?: TimeEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a TimeEntry.
     */
    data: XOR<TimeEntryUpdateInput, TimeEntryUncheckedUpdateInput>
    /**
     * Choose, which TimeEntry to update.
     */
    where: TimeEntryWhereUniqueInput
  }

  /**
   * TimeEntry updateMany
   */
  export type TimeEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TimeEntries.
     */
    data: XOR<TimeEntryUpdateManyMutationInput, TimeEntryUncheckedUpdateManyInput>
    /**
     * Filter which TimeEntries to update
     */
    where?: TimeEntryWhereInput
  }

  /**
   * TimeEntry upsert
   */
  export type TimeEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeEntry
     */
    select?: TimeEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the TimeEntry to update in case it exists.
     */
    where: TimeEntryWhereUniqueInput
    /**
     * In case the TimeEntry found by the `where` argument doesn't exist, create a new TimeEntry with this data.
     */
    create: XOR<TimeEntryCreateInput, TimeEntryUncheckedCreateInput>
    /**
     * In case the TimeEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimeEntryUpdateInput, TimeEntryUncheckedUpdateInput>
  }

  /**
   * TimeEntry delete
   */
  export type TimeEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeEntry
     */
    select?: TimeEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeEntryInclude<ExtArgs> | null
    /**
     * Filter which TimeEntry to delete.
     */
    where: TimeEntryWhereUniqueInput
  }

  /**
   * TimeEntry deleteMany
   */
  export type TimeEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimeEntries to delete
     */
    where?: TimeEntryWhereInput
  }

  /**
   * TimeEntry without action
   */
  export type TimeEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeEntry
     */
    select?: TimeEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeEntryInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    systemRole: 'systemRole',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TeamScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TeamScalarFieldEnum = (typeof TeamScalarFieldEnum)[keyof typeof TeamScalarFieldEnum]


  export const TeamMemberScalarFieldEnum: {
    id: 'id',
    teamId: 'teamId',
    userId: 'userId',
    role: 'role',
    joinedAt: 'joinedAt'
  };

  export type TeamMemberScalarFieldEnum = (typeof TeamMemberScalarFieldEnum)[keyof typeof TeamMemberScalarFieldEnum]


  export const ClientScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    monthlyAllowanceMinutes: 'monthlyAllowanceMinutes',
    billable: 'billable',
    archivedAt: 'archivedAt',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    title: 'title',
    descriptionHtml: 'descriptionHtml',
    priority: 'priority',
    status: 'status',
    clientId: 'clientId',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const TaskLabelScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaskLabelScalarFieldEnum = (typeof TaskLabelScalarFieldEnum)[keyof typeof TaskLabelScalarFieldEnum]


  export const TaskAttachmentScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    uploadedBy: 'uploadedBy',
    fileName: 'fileName',
    originalName: 'originalName',
    fileSize: 'fileSize',
    mimeType: 'mimeType',
    filePath: 'filePath',
    createdAt: 'createdAt'
  };

  export type TaskAttachmentScalarFieldEnum = (typeof TaskAttachmentScalarFieldEnum)[keyof typeof TaskAttachmentScalarFieldEnum]


  export const TaskCommentScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    userId: 'userId',
    parentId: 'parentId',
    content: 'content',
    editedAt: 'editedAt',
    createdAt: 'createdAt'
  };

  export type TaskCommentScalarFieldEnum = (typeof TaskCommentScalarFieldEnum)[keyof typeof TaskCommentScalarFieldEnum]


  export const TaskActivityScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    userId: 'userId',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type TaskActivityScalarFieldEnum = (typeof TaskActivityScalarFieldEnum)[keyof typeof TaskActivityScalarFieldEnum]


  export const TimeEntryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    taskId: 'taskId',
    clientId: 'clientId',
    startTime: 'startTime',
    endTime: 'endTime',
    durationSeconds: 'durationSeconds',
    totalPausedSeconds: 'totalPausedSeconds',
    pausedAt: 'pausedAt',
    status: 'status',
    description: 'description',
    isManual: 'isManual',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TimeEntryScalarFieldEnum = (typeof TimeEntryScalarFieldEnum)[keyof typeof TimeEntryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'TaskPriority'
   */
  export type EnumTaskPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskPriority'>
    


  /**
   * Reference to a field of type 'TaskStatus'
   */
  export type EnumTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskStatus'>
    


  /**
   * Reference to a field of type 'TaskActivityAction'
   */
  export type EnumTaskActivityActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskActivityAction'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'TimeEntryStatus'
   */
  export type EnumTimeEntryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TimeEntryStatus'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    systemRole?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    clients?: ClientListRelationFilter
    assignedTasks?: TaskListRelationFilter
    timeEntries?: TimeEntryListRelationFilter
    uploadedAttachments?: TaskAttachmentListRelationFilter
    taskComments?: TaskCommentListRelationFilter
    taskActivities?: TaskActivityListRelationFilter
    createdTeams?: TeamListRelationFilter
    teamMemberships?: TeamMemberListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    systemRole?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clients?: ClientOrderByRelationAggregateInput
    assignedTasks?: TaskOrderByRelationAggregateInput
    timeEntries?: TimeEntryOrderByRelationAggregateInput
    uploadedAttachments?: TaskAttachmentOrderByRelationAggregateInput
    taskComments?: TaskCommentOrderByRelationAggregateInput
    taskActivities?: TaskActivityOrderByRelationAggregateInput
    createdTeams?: TeamOrderByRelationAggregateInput
    teamMemberships?: TeamMemberOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    systemRole?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    clients?: ClientListRelationFilter
    assignedTasks?: TaskListRelationFilter
    timeEntries?: TimeEntryListRelationFilter
    uploadedAttachments?: TaskAttachmentListRelationFilter
    taskComments?: TaskCommentListRelationFilter
    taskActivities?: TaskActivityListRelationFilter
    createdTeams?: TeamListRelationFilter
    teamMemberships?: TeamMemberListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    systemRole?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    systemRole?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TeamWhereInput = {
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    id?: IntFilter<"Team"> | number
    name?: StringFilter<"Team"> | string
    description?: StringNullableFilter<"Team"> | string | null
    createdById?: IntFilter<"Team"> | number
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
    createdBy?: XOR<UserRelationFilter, UserWhereInput>
    members?: TeamMemberListRelationFilter
  }

  export type TeamOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    members?: TeamMemberOrderByRelationAggregateInput
  }

  export type TeamWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    description?: StringNullableFilter<"Team"> | string | null
    createdById?: IntFilter<"Team"> | number
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
    createdBy?: XOR<UserRelationFilter, UserWhereInput>
    members?: TeamMemberListRelationFilter
  }, "id" | "name">

  export type TeamOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TeamCountOrderByAggregateInput
    _avg?: TeamAvgOrderByAggregateInput
    _max?: TeamMaxOrderByAggregateInput
    _min?: TeamMinOrderByAggregateInput
    _sum?: TeamSumOrderByAggregateInput
  }

  export type TeamScalarWhereWithAggregatesInput = {
    AND?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    OR?: TeamScalarWhereWithAggregatesInput[]
    NOT?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Team"> | number
    name?: StringWithAggregatesFilter<"Team"> | string
    description?: StringNullableWithAggregatesFilter<"Team"> | string | null
    createdById?: IntWithAggregatesFilter<"Team"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Team"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Team"> | Date | string
  }

  export type TeamMemberWhereInput = {
    AND?: TeamMemberWhereInput | TeamMemberWhereInput[]
    OR?: TeamMemberWhereInput[]
    NOT?: TeamMemberWhereInput | TeamMemberWhereInput[]
    id?: IntFilter<"TeamMember"> | number
    teamId?: IntFilter<"TeamMember"> | number
    userId?: IntFilter<"TeamMember"> | number
    role?: EnumUserRoleFilter<"TeamMember"> | $Enums.UserRole
    joinedAt?: DateTimeFilter<"TeamMember"> | Date | string
    team?: XOR<TeamRelationFilter, TeamWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type TeamMemberOrderByWithRelationInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    team?: TeamOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type TeamMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    teamId_userId?: TeamMemberTeamIdUserIdCompoundUniqueInput
    AND?: TeamMemberWhereInput | TeamMemberWhereInput[]
    OR?: TeamMemberWhereInput[]
    NOT?: TeamMemberWhereInput | TeamMemberWhereInput[]
    teamId?: IntFilter<"TeamMember"> | number
    userId?: IntFilter<"TeamMember"> | number
    role?: EnumUserRoleFilter<"TeamMember"> | $Enums.UserRole
    joinedAt?: DateTimeFilter<"TeamMember"> | Date | string
    team?: XOR<TeamRelationFilter, TeamWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "teamId_userId">

  export type TeamMemberOrderByWithAggregationInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    _count?: TeamMemberCountOrderByAggregateInput
    _avg?: TeamMemberAvgOrderByAggregateInput
    _max?: TeamMemberMaxOrderByAggregateInput
    _min?: TeamMemberMinOrderByAggregateInput
    _sum?: TeamMemberSumOrderByAggregateInput
  }

  export type TeamMemberScalarWhereWithAggregatesInput = {
    AND?: TeamMemberScalarWhereWithAggregatesInput | TeamMemberScalarWhereWithAggregatesInput[]
    OR?: TeamMemberScalarWhereWithAggregatesInput[]
    NOT?: TeamMemberScalarWhereWithAggregatesInput | TeamMemberScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TeamMember"> | number
    teamId?: IntWithAggregatesFilter<"TeamMember"> | number
    userId?: IntWithAggregatesFilter<"TeamMember"> | number
    role?: EnumUserRoleWithAggregatesFilter<"TeamMember"> | $Enums.UserRole
    joinedAt?: DateTimeWithAggregatesFilter<"TeamMember"> | Date | string
  }

  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: IntFilter<"Client"> | number
    name?: StringFilter<"Client"> | string
    description?: StringNullableFilter<"Client"> | string | null
    monthlyAllowanceMinutes?: IntFilter<"Client"> | number
    billable?: BoolFilter<"Client"> | boolean
    archivedAt?: DateTimeNullableFilter<"Client"> | Date | string | null
    userId?: IntFilter<"Client"> | number
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    tasks?: TaskListRelationFilter
    timeEntries?: TimeEntryListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    monthlyAllowanceMinutes?: SortOrder
    billable?: SortOrder
    archivedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    tasks?: TaskOrderByRelationAggregateInput
    timeEntries?: TimeEntryOrderByRelationAggregateInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    name?: StringFilter<"Client"> | string
    description?: StringNullableFilter<"Client"> | string | null
    monthlyAllowanceMinutes?: IntFilter<"Client"> | number
    billable?: BoolFilter<"Client"> | boolean
    archivedAt?: DateTimeNullableFilter<"Client"> | Date | string | null
    userId?: IntFilter<"Client"> | number
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    tasks?: TaskListRelationFilter
    timeEntries?: TimeEntryListRelationFilter
  }, "id">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    monthlyAllowanceMinutes?: SortOrder
    billable?: SortOrder
    archivedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClientCountOrderByAggregateInput
    _avg?: ClientAvgOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
    _sum?: ClientSumOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Client"> | number
    name?: StringWithAggregatesFilter<"Client"> | string
    description?: StringNullableWithAggregatesFilter<"Client"> | string | null
    monthlyAllowanceMinutes?: IntWithAggregatesFilter<"Client"> | number
    billable?: BoolWithAggregatesFilter<"Client"> | boolean
    archivedAt?: DateTimeNullableWithAggregatesFilter<"Client"> | Date | string | null
    userId?: IntWithAggregatesFilter<"Client"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: IntFilter<"Task"> | number
    title?: StringFilter<"Task"> | string
    descriptionHtml?: StringNullableFilter<"Task"> | string | null
    priority?: EnumTaskPriorityFilter<"Task"> | $Enums.TaskPriority
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    clientId?: IntFilter<"Task"> | number
    userId?: IntFilter<"Task"> | number
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    client?: XOR<ClientRelationFilter, ClientWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
    labels?: TaskLabelListRelationFilter
    attachments?: TaskAttachmentListRelationFilter
    comments?: TaskCommentListRelationFilter
    activities?: TaskActivityListRelationFilter
    timeEntries?: TimeEntryListRelationFilter
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    descriptionHtml?: SortOrderInput | SortOrder
    priority?: SortOrder
    status?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    client?: ClientOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    labels?: TaskLabelOrderByRelationAggregateInput
    attachments?: TaskAttachmentOrderByRelationAggregateInput
    comments?: TaskCommentOrderByRelationAggregateInput
    activities?: TaskActivityOrderByRelationAggregateInput
    timeEntries?: TimeEntryOrderByRelationAggregateInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    title?: StringFilter<"Task"> | string
    descriptionHtml?: StringNullableFilter<"Task"> | string | null
    priority?: EnumTaskPriorityFilter<"Task"> | $Enums.TaskPriority
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    clientId?: IntFilter<"Task"> | number
    userId?: IntFilter<"Task"> | number
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    client?: XOR<ClientRelationFilter, ClientWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
    labels?: TaskLabelListRelationFilter
    attachments?: TaskAttachmentListRelationFilter
    comments?: TaskCommentListRelationFilter
    activities?: TaskActivityListRelationFilter
    timeEntries?: TimeEntryListRelationFilter
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    descriptionHtml?: SortOrderInput | SortOrder
    priority?: SortOrder
    status?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Task"> | number
    title?: StringWithAggregatesFilter<"Task"> | string
    descriptionHtml?: StringNullableWithAggregatesFilter<"Task"> | string | null
    priority?: EnumTaskPriorityWithAggregatesFilter<"Task"> | $Enums.TaskPriority
    status?: EnumTaskStatusWithAggregatesFilter<"Task"> | $Enums.TaskStatus
    clientId?: IntWithAggregatesFilter<"Task"> | number
    userId?: IntWithAggregatesFilter<"Task"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
  }

  export type TaskLabelWhereInput = {
    AND?: TaskLabelWhereInput | TaskLabelWhereInput[]
    OR?: TaskLabelWhereInput[]
    NOT?: TaskLabelWhereInput | TaskLabelWhereInput[]
    id?: IntFilter<"TaskLabel"> | number
    name?: StringFilter<"TaskLabel"> | string
    createdAt?: DateTimeFilter<"TaskLabel"> | Date | string
    updatedAt?: DateTimeFilter<"TaskLabel"> | Date | string
    tasks?: TaskListRelationFilter
  }

  export type TaskLabelOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tasks?: TaskOrderByRelationAggregateInput
  }

  export type TaskLabelWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: TaskLabelWhereInput | TaskLabelWhereInput[]
    OR?: TaskLabelWhereInput[]
    NOT?: TaskLabelWhereInput | TaskLabelWhereInput[]
    createdAt?: DateTimeFilter<"TaskLabel"> | Date | string
    updatedAt?: DateTimeFilter<"TaskLabel"> | Date | string
    tasks?: TaskListRelationFilter
  }, "id" | "name">

  export type TaskLabelOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskLabelCountOrderByAggregateInput
    _avg?: TaskLabelAvgOrderByAggregateInput
    _max?: TaskLabelMaxOrderByAggregateInput
    _min?: TaskLabelMinOrderByAggregateInput
    _sum?: TaskLabelSumOrderByAggregateInput
  }

  export type TaskLabelScalarWhereWithAggregatesInput = {
    AND?: TaskLabelScalarWhereWithAggregatesInput | TaskLabelScalarWhereWithAggregatesInput[]
    OR?: TaskLabelScalarWhereWithAggregatesInput[]
    NOT?: TaskLabelScalarWhereWithAggregatesInput | TaskLabelScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TaskLabel"> | number
    name?: StringWithAggregatesFilter<"TaskLabel"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TaskLabel"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TaskLabel"> | Date | string
  }

  export type TaskAttachmentWhereInput = {
    AND?: TaskAttachmentWhereInput | TaskAttachmentWhereInput[]
    OR?: TaskAttachmentWhereInput[]
    NOT?: TaskAttachmentWhereInput | TaskAttachmentWhereInput[]
    id?: IntFilter<"TaskAttachment"> | number
    taskId?: IntFilter<"TaskAttachment"> | number
    uploadedBy?: IntFilter<"TaskAttachment"> | number
    fileName?: StringFilter<"TaskAttachment"> | string
    originalName?: StringFilter<"TaskAttachment"> | string
    fileSize?: IntFilter<"TaskAttachment"> | number
    mimeType?: StringFilter<"TaskAttachment"> | string
    filePath?: StringFilter<"TaskAttachment"> | string
    createdAt?: DateTimeFilter<"TaskAttachment"> | Date | string
    task?: XOR<TaskRelationFilter, TaskWhereInput>
    uploadedByUser?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type TaskAttachmentOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    uploadedBy?: SortOrder
    fileName?: SortOrder
    originalName?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    filePath?: SortOrder
    createdAt?: SortOrder
    task?: TaskOrderByWithRelationInput
    uploadedByUser?: UserOrderByWithRelationInput
  }

  export type TaskAttachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TaskAttachmentWhereInput | TaskAttachmentWhereInput[]
    OR?: TaskAttachmentWhereInput[]
    NOT?: TaskAttachmentWhereInput | TaskAttachmentWhereInput[]
    taskId?: IntFilter<"TaskAttachment"> | number
    uploadedBy?: IntFilter<"TaskAttachment"> | number
    fileName?: StringFilter<"TaskAttachment"> | string
    originalName?: StringFilter<"TaskAttachment"> | string
    fileSize?: IntFilter<"TaskAttachment"> | number
    mimeType?: StringFilter<"TaskAttachment"> | string
    filePath?: StringFilter<"TaskAttachment"> | string
    createdAt?: DateTimeFilter<"TaskAttachment"> | Date | string
    task?: XOR<TaskRelationFilter, TaskWhereInput>
    uploadedByUser?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type TaskAttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    uploadedBy?: SortOrder
    fileName?: SortOrder
    originalName?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    filePath?: SortOrder
    createdAt?: SortOrder
    _count?: TaskAttachmentCountOrderByAggregateInput
    _avg?: TaskAttachmentAvgOrderByAggregateInput
    _max?: TaskAttachmentMaxOrderByAggregateInput
    _min?: TaskAttachmentMinOrderByAggregateInput
    _sum?: TaskAttachmentSumOrderByAggregateInput
  }

  export type TaskAttachmentScalarWhereWithAggregatesInput = {
    AND?: TaskAttachmentScalarWhereWithAggregatesInput | TaskAttachmentScalarWhereWithAggregatesInput[]
    OR?: TaskAttachmentScalarWhereWithAggregatesInput[]
    NOT?: TaskAttachmentScalarWhereWithAggregatesInput | TaskAttachmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TaskAttachment"> | number
    taskId?: IntWithAggregatesFilter<"TaskAttachment"> | number
    uploadedBy?: IntWithAggregatesFilter<"TaskAttachment"> | number
    fileName?: StringWithAggregatesFilter<"TaskAttachment"> | string
    originalName?: StringWithAggregatesFilter<"TaskAttachment"> | string
    fileSize?: IntWithAggregatesFilter<"TaskAttachment"> | number
    mimeType?: StringWithAggregatesFilter<"TaskAttachment"> | string
    filePath?: StringWithAggregatesFilter<"TaskAttachment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TaskAttachment"> | Date | string
  }

  export type TaskCommentWhereInput = {
    AND?: TaskCommentWhereInput | TaskCommentWhereInput[]
    OR?: TaskCommentWhereInput[]
    NOT?: TaskCommentWhereInput | TaskCommentWhereInput[]
    id?: IntFilter<"TaskComment"> | number
    taskId?: IntFilter<"TaskComment"> | number
    userId?: IntFilter<"TaskComment"> | number
    parentId?: IntNullableFilter<"TaskComment"> | number | null
    content?: StringFilter<"TaskComment"> | string
    editedAt?: DateTimeNullableFilter<"TaskComment"> | Date | string | null
    createdAt?: DateTimeFilter<"TaskComment"> | Date | string
    task?: XOR<TaskRelationFilter, TaskWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
    parent?: XOR<TaskCommentNullableRelationFilter, TaskCommentWhereInput> | null
    replies?: TaskCommentListRelationFilter
  }

  export type TaskCommentOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    content?: SortOrder
    editedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    task?: TaskOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    parent?: TaskCommentOrderByWithRelationInput
    replies?: TaskCommentOrderByRelationAggregateInput
  }

  export type TaskCommentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TaskCommentWhereInput | TaskCommentWhereInput[]
    OR?: TaskCommentWhereInput[]
    NOT?: TaskCommentWhereInput | TaskCommentWhereInput[]
    taskId?: IntFilter<"TaskComment"> | number
    userId?: IntFilter<"TaskComment"> | number
    parentId?: IntNullableFilter<"TaskComment"> | number | null
    content?: StringFilter<"TaskComment"> | string
    editedAt?: DateTimeNullableFilter<"TaskComment"> | Date | string | null
    createdAt?: DateTimeFilter<"TaskComment"> | Date | string
    task?: XOR<TaskRelationFilter, TaskWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
    parent?: XOR<TaskCommentNullableRelationFilter, TaskCommentWhereInput> | null
    replies?: TaskCommentListRelationFilter
  }, "id">

  export type TaskCommentOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    content?: SortOrder
    editedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TaskCommentCountOrderByAggregateInput
    _avg?: TaskCommentAvgOrderByAggregateInput
    _max?: TaskCommentMaxOrderByAggregateInput
    _min?: TaskCommentMinOrderByAggregateInput
    _sum?: TaskCommentSumOrderByAggregateInput
  }

  export type TaskCommentScalarWhereWithAggregatesInput = {
    AND?: TaskCommentScalarWhereWithAggregatesInput | TaskCommentScalarWhereWithAggregatesInput[]
    OR?: TaskCommentScalarWhereWithAggregatesInput[]
    NOT?: TaskCommentScalarWhereWithAggregatesInput | TaskCommentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TaskComment"> | number
    taskId?: IntWithAggregatesFilter<"TaskComment"> | number
    userId?: IntWithAggregatesFilter<"TaskComment"> | number
    parentId?: IntNullableWithAggregatesFilter<"TaskComment"> | number | null
    content?: StringWithAggregatesFilter<"TaskComment"> | string
    editedAt?: DateTimeNullableWithAggregatesFilter<"TaskComment"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TaskComment"> | Date | string
  }

  export type TaskActivityWhereInput = {
    AND?: TaskActivityWhereInput | TaskActivityWhereInput[]
    OR?: TaskActivityWhereInput[]
    NOT?: TaskActivityWhereInput | TaskActivityWhereInput[]
    id?: IntFilter<"TaskActivity"> | number
    taskId?: IntFilter<"TaskActivity"> | number
    userId?: IntFilter<"TaskActivity"> | number
    action?: EnumTaskActivityActionFilter<"TaskActivity"> | $Enums.TaskActivityAction
    entityType?: StringFilter<"TaskActivity"> | string
    entityId?: IntNullableFilter<"TaskActivity"> | number | null
    metadata?: JsonNullableFilter<"TaskActivity">
    createdAt?: DateTimeFilter<"TaskActivity"> | Date | string
    task?: XOR<TaskRelationFilter, TaskWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type TaskActivityOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    task?: TaskOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type TaskActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TaskActivityWhereInput | TaskActivityWhereInput[]
    OR?: TaskActivityWhereInput[]
    NOT?: TaskActivityWhereInput | TaskActivityWhereInput[]
    taskId?: IntFilter<"TaskActivity"> | number
    userId?: IntFilter<"TaskActivity"> | number
    action?: EnumTaskActivityActionFilter<"TaskActivity"> | $Enums.TaskActivityAction
    entityType?: StringFilter<"TaskActivity"> | string
    entityId?: IntNullableFilter<"TaskActivity"> | number | null
    metadata?: JsonNullableFilter<"TaskActivity">
    createdAt?: DateTimeFilter<"TaskActivity"> | Date | string
    task?: XOR<TaskRelationFilter, TaskWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type TaskActivityOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TaskActivityCountOrderByAggregateInput
    _avg?: TaskActivityAvgOrderByAggregateInput
    _max?: TaskActivityMaxOrderByAggregateInput
    _min?: TaskActivityMinOrderByAggregateInput
    _sum?: TaskActivitySumOrderByAggregateInput
  }

  export type TaskActivityScalarWhereWithAggregatesInput = {
    AND?: TaskActivityScalarWhereWithAggregatesInput | TaskActivityScalarWhereWithAggregatesInput[]
    OR?: TaskActivityScalarWhereWithAggregatesInput[]
    NOT?: TaskActivityScalarWhereWithAggregatesInput | TaskActivityScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TaskActivity"> | number
    taskId?: IntWithAggregatesFilter<"TaskActivity"> | number
    userId?: IntWithAggregatesFilter<"TaskActivity"> | number
    action?: EnumTaskActivityActionWithAggregatesFilter<"TaskActivity"> | $Enums.TaskActivityAction
    entityType?: StringWithAggregatesFilter<"TaskActivity"> | string
    entityId?: IntNullableWithAggregatesFilter<"TaskActivity"> | number | null
    metadata?: JsonNullableWithAggregatesFilter<"TaskActivity">
    createdAt?: DateTimeWithAggregatesFilter<"TaskActivity"> | Date | string
  }

  export type TimeEntryWhereInput = {
    AND?: TimeEntryWhereInput | TimeEntryWhereInput[]
    OR?: TimeEntryWhereInput[]
    NOT?: TimeEntryWhereInput | TimeEntryWhereInput[]
    id?: IntFilter<"TimeEntry"> | number
    userId?: IntFilter<"TimeEntry"> | number
    taskId?: IntFilter<"TimeEntry"> | number
    clientId?: IntFilter<"TimeEntry"> | number
    startTime?: DateTimeFilter<"TimeEntry"> | Date | string
    endTime?: DateTimeNullableFilter<"TimeEntry"> | Date | string | null
    durationSeconds?: IntFilter<"TimeEntry"> | number
    totalPausedSeconds?: IntFilter<"TimeEntry"> | number
    pausedAt?: DateTimeNullableFilter<"TimeEntry"> | Date | string | null
    status?: EnumTimeEntryStatusFilter<"TimeEntry"> | $Enums.TimeEntryStatus
    description?: StringNullableFilter<"TimeEntry"> | string | null
    isManual?: BoolFilter<"TimeEntry"> | boolean
    createdAt?: DateTimeFilter<"TimeEntry"> | Date | string
    updatedAt?: DateTimeFilter<"TimeEntry"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    task?: XOR<TaskRelationFilter, TaskWhereInput>
    client?: XOR<ClientRelationFilter, ClientWhereInput>
  }

  export type TimeEntryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    taskId?: SortOrder
    clientId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    durationSeconds?: SortOrder
    totalPausedSeconds?: SortOrder
    pausedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    description?: SortOrderInput | SortOrder
    isManual?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    task?: TaskOrderByWithRelationInput
    client?: ClientOrderByWithRelationInput
  }

  export type TimeEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TimeEntryWhereInput | TimeEntryWhereInput[]
    OR?: TimeEntryWhereInput[]
    NOT?: TimeEntryWhereInput | TimeEntryWhereInput[]
    userId?: IntFilter<"TimeEntry"> | number
    taskId?: IntFilter<"TimeEntry"> | number
    clientId?: IntFilter<"TimeEntry"> | number
    startTime?: DateTimeFilter<"TimeEntry"> | Date | string
    endTime?: DateTimeNullableFilter<"TimeEntry"> | Date | string | null
    durationSeconds?: IntFilter<"TimeEntry"> | number
    totalPausedSeconds?: IntFilter<"TimeEntry"> | number
    pausedAt?: DateTimeNullableFilter<"TimeEntry"> | Date | string | null
    status?: EnumTimeEntryStatusFilter<"TimeEntry"> | $Enums.TimeEntryStatus
    description?: StringNullableFilter<"TimeEntry"> | string | null
    isManual?: BoolFilter<"TimeEntry"> | boolean
    createdAt?: DateTimeFilter<"TimeEntry"> | Date | string
    updatedAt?: DateTimeFilter<"TimeEntry"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    task?: XOR<TaskRelationFilter, TaskWhereInput>
    client?: XOR<ClientRelationFilter, ClientWhereInput>
  }, "id">

  export type TimeEntryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    taskId?: SortOrder
    clientId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    durationSeconds?: SortOrder
    totalPausedSeconds?: SortOrder
    pausedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    description?: SortOrderInput | SortOrder
    isManual?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TimeEntryCountOrderByAggregateInput
    _avg?: TimeEntryAvgOrderByAggregateInput
    _max?: TimeEntryMaxOrderByAggregateInput
    _min?: TimeEntryMinOrderByAggregateInput
    _sum?: TimeEntrySumOrderByAggregateInput
  }

  export type TimeEntryScalarWhereWithAggregatesInput = {
    AND?: TimeEntryScalarWhereWithAggregatesInput | TimeEntryScalarWhereWithAggregatesInput[]
    OR?: TimeEntryScalarWhereWithAggregatesInput[]
    NOT?: TimeEntryScalarWhereWithAggregatesInput | TimeEntryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TimeEntry"> | number
    userId?: IntWithAggregatesFilter<"TimeEntry"> | number
    taskId?: IntWithAggregatesFilter<"TimeEntry"> | number
    clientId?: IntWithAggregatesFilter<"TimeEntry"> | number
    startTime?: DateTimeWithAggregatesFilter<"TimeEntry"> | Date | string
    endTime?: DateTimeNullableWithAggregatesFilter<"TimeEntry"> | Date | string | null
    durationSeconds?: IntWithAggregatesFilter<"TimeEntry"> | number
    totalPausedSeconds?: IntWithAggregatesFilter<"TimeEntry"> | number
    pausedAt?: DateTimeNullableWithAggregatesFilter<"TimeEntry"> | Date | string | null
    status?: EnumTimeEntryStatusWithAggregatesFilter<"TimeEntry"> | $Enums.TimeEntryStatus
    description?: StringNullableWithAggregatesFilter<"TimeEntry"> | string | null
    isManual?: BoolWithAggregatesFilter<"TimeEntry"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"TimeEntry"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TimeEntry"> | Date | string
  }

  export type UserCreateInput = {
    name: string
    email: string
    password: string
    systemRole?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clients?: ClientCreateNestedManyWithoutUserInput
    assignedTasks?: TaskCreateNestedManyWithoutUserInput
    timeEntries?: TimeEntryCreateNestedManyWithoutUserInput
    uploadedAttachments?: TaskAttachmentCreateNestedManyWithoutUploadedByUserInput
    taskComments?: TaskCommentCreateNestedManyWithoutUserInput
    taskActivities?: TaskActivityCreateNestedManyWithoutUserInput
    createdTeams?: TeamCreateNestedManyWithoutCreatedByInput
    teamMemberships?: TeamMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    password: string
    systemRole?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clients?: ClientUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    timeEntries?: TimeEntryUncheckedCreateNestedManyWithoutUserInput
    uploadedAttachments?: TaskAttachmentUncheckedCreateNestedManyWithoutUploadedByUserInput
    taskComments?: TaskCommentUncheckedCreateNestedManyWithoutUserInput
    taskActivities?: TaskActivityUncheckedCreateNestedManyWithoutUserInput
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatedByInput
    teamMemberships?: TeamMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    systemRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUpdateManyWithoutUserNestedInput
    timeEntries?: TimeEntryUpdateManyWithoutUserNestedInput
    uploadedAttachments?: TaskAttachmentUpdateManyWithoutUploadedByUserNestedInput
    taskComments?: TaskCommentUpdateManyWithoutUserNestedInput
    taskActivities?: TaskActivityUpdateManyWithoutUserNestedInput
    createdTeams?: TeamUpdateManyWithoutCreatedByNestedInput
    teamMemberships?: TeamMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    systemRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    timeEntries?: TimeEntryUncheckedUpdateManyWithoutUserNestedInput
    uploadedAttachments?: TaskAttachmentUncheckedUpdateManyWithoutUploadedByUserNestedInput
    taskComments?: TaskCommentUncheckedUpdateManyWithoutUserNestedInput
    taskActivities?: TaskActivityUncheckedUpdateManyWithoutUserNestedInput
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatedByNestedInput
    teamMemberships?: TeamMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name: string
    email: string
    password: string
    systemRole?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    systemRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    systemRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamCreateInput = {
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedTeamsInput
    members?: TeamMemberCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    createdById: number
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: TeamMemberUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedTeamsNestedInput
    members?: TeamMemberUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: TeamMemberUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    createdById: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberCreateInput = {
    role: $Enums.UserRole
    joinedAt?: Date | string
    team: TeamCreateNestedOneWithoutMembersInput
    user: UserCreateNestedOneWithoutTeamMembershipsInput
  }

  export type TeamMemberUncheckedCreateInput = {
    id?: number
    teamId: number
    userId: number
    role: $Enums.UserRole
    joinedAt?: Date | string
  }

  export type TeamMemberUpdateInput = {
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutMembersNestedInput
    user?: UserUpdateOneRequiredWithoutTeamMembershipsNestedInput
  }

  export type TeamMemberUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    teamId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberCreateManyInput = {
    id?: number
    teamId: number
    userId: number
    role: $Enums.UserRole
    joinedAt?: Date | string
  }

  export type TeamMemberUpdateManyMutationInput = {
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    teamId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientCreateInput = {
    name: string
    description?: string | null
    monthlyAllowanceMinutes?: number
    billable?: boolean
    archivedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutClientsInput
    tasks?: TaskCreateNestedManyWithoutClientInput
    timeEntries?: TimeEntryCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    monthlyAllowanceMinutes?: number
    billable?: boolean
    archivedAt?: Date | string | null
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutClientInput
    timeEntries?: TimeEntryUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyAllowanceMinutes?: IntFieldUpdateOperationsInput | number
    billable?: BoolFieldUpdateOperationsInput | boolean
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutClientsNestedInput
    tasks?: TaskUpdateManyWithoutClientNestedInput
    timeEntries?: TimeEntryUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyAllowanceMinutes?: IntFieldUpdateOperationsInput | number
    billable?: BoolFieldUpdateOperationsInput | boolean
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutClientNestedInput
    timeEntries?: TimeEntryUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    monthlyAllowanceMinutes?: number
    billable?: boolean
    archivedAt?: Date | string | null
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyAllowanceMinutes?: IntFieldUpdateOperationsInput | number
    billable?: BoolFieldUpdateOperationsInput | boolean
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyAllowanceMinutes?: IntFieldUpdateOperationsInput | number
    billable?: BoolFieldUpdateOperationsInput | boolean
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateInput = {
    title: string
    descriptionHtml?: string | null
    priority?: $Enums.TaskPriority
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutTasksInput
    user: UserCreateNestedOneWithoutAssignedTasksInput
    labels?: TaskLabelCreateNestedManyWithoutTasksInput
    attachments?: TaskAttachmentCreateNestedManyWithoutTaskInput
    comments?: TaskCommentCreateNestedManyWithoutTaskInput
    activities?: TaskActivityCreateNestedManyWithoutTaskInput
    timeEntries?: TimeEntryCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    id?: number
    title: string
    descriptionHtml?: string | null
    priority?: $Enums.TaskPriority
    status?: $Enums.TaskStatus
    clientId: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    labels?: TaskLabelUncheckedCreateNestedManyWithoutTasksInput
    attachments?: TaskAttachmentUncheckedCreateNestedManyWithoutTaskInput
    comments?: TaskCommentUncheckedCreateNestedManyWithoutTaskInput
    activities?: TaskActivityUncheckedCreateNestedManyWithoutTaskInput
    timeEntries?: TimeEntryUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutTasksNestedInput
    user?: UserUpdateOneRequiredWithoutAssignedTasksNestedInput
    labels?: TaskLabelUpdateManyWithoutTasksNestedInput
    attachments?: TaskAttachmentUpdateManyWithoutTaskNestedInput
    comments?: TaskCommentUpdateManyWithoutTaskNestedInput
    activities?: TaskActivityUpdateManyWithoutTaskNestedInput
    timeEntries?: TimeEntryUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    clientId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    labels?: TaskLabelUncheckedUpdateManyWithoutTasksNestedInput
    attachments?: TaskAttachmentUncheckedUpdateManyWithoutTaskNestedInput
    comments?: TaskCommentUncheckedUpdateManyWithoutTaskNestedInput
    activities?: TaskActivityUncheckedUpdateManyWithoutTaskNestedInput
    timeEntries?: TimeEntryUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateManyInput = {
    id?: number
    title: string
    descriptionHtml?: string | null
    priority?: $Enums.TaskPriority
    status?: $Enums.TaskStatus
    clientId: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    clientId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLabelCreateInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutLabelsInput
  }

  export type TaskLabelUncheckedCreateInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutLabelsInput
  }

  export type TaskLabelUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutLabelsNestedInput
  }

  export type TaskLabelUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutLabelsNestedInput
  }

  export type TaskLabelCreateManyInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskLabelUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLabelUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskAttachmentCreateInput = {
    fileName: string
    originalName: string
    fileSize: number
    mimeType: string
    filePath: string
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutAttachmentsInput
    uploadedByUser: UserCreateNestedOneWithoutUploadedAttachmentsInput
  }

  export type TaskAttachmentUncheckedCreateInput = {
    id?: number
    taskId: number
    uploadedBy: number
    fileName: string
    originalName: string
    fileSize: number
    mimeType: string
    filePath: string
    createdAt?: Date | string
  }

  export type TaskAttachmentUpdateInput = {
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutAttachmentsNestedInput
    uploadedByUser?: UserUpdateOneRequiredWithoutUploadedAttachmentsNestedInput
  }

  export type TaskAttachmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    uploadedBy?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskAttachmentCreateManyInput = {
    id?: number
    taskId: number
    uploadedBy: number
    fileName: string
    originalName: string
    fileSize: number
    mimeType: string
    filePath: string
    createdAt?: Date | string
  }

  export type TaskAttachmentUpdateManyMutationInput = {
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskAttachmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    uploadedBy?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCommentCreateInput = {
    content: string
    editedAt?: Date | string | null
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutCommentsInput
    user: UserCreateNestedOneWithoutTaskCommentsInput
    parent?: TaskCommentCreateNestedOneWithoutRepliesInput
    replies?: TaskCommentCreateNestedManyWithoutParentInput
  }

  export type TaskCommentUncheckedCreateInput = {
    id?: number
    taskId: number
    userId: number
    parentId?: number | null
    content: string
    editedAt?: Date | string | null
    createdAt?: Date | string
    replies?: TaskCommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type TaskCommentUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutCommentsNestedInput
    user?: UserUpdateOneRequiredWithoutTaskCommentsNestedInput
    parent?: TaskCommentUpdateOneWithoutRepliesNestedInput
    replies?: TaskCommentUpdateManyWithoutParentNestedInput
  }

  export type TaskCommentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: TaskCommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type TaskCommentCreateManyInput = {
    id?: number
    taskId: number
    userId: number
    parentId?: number | null
    content: string
    editedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type TaskCommentUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCommentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskActivityCreateInput = {
    action: $Enums.TaskActivityAction
    entityType: string
    entityId?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutActivitiesInput
    user: UserCreateNestedOneWithoutTaskActivitiesInput
  }

  export type TaskActivityUncheckedCreateInput = {
    id?: number
    taskId: number
    userId: number
    action: $Enums.TaskActivityAction
    entityType: string
    entityId?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TaskActivityUpdateInput = {
    action?: EnumTaskActivityActionFieldUpdateOperationsInput | $Enums.TaskActivityAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutActivitiesNestedInput
    user?: UserUpdateOneRequiredWithoutTaskActivitiesNestedInput
  }

  export type TaskActivityUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    action?: EnumTaskActivityActionFieldUpdateOperationsInput | $Enums.TaskActivityAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskActivityCreateManyInput = {
    id?: number
    taskId: number
    userId: number
    action: $Enums.TaskActivityAction
    entityType: string
    entityId?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TaskActivityUpdateManyMutationInput = {
    action?: EnumTaskActivityActionFieldUpdateOperationsInput | $Enums.TaskActivityAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskActivityUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    action?: EnumTaskActivityActionFieldUpdateOperationsInput | $Enums.TaskActivityAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeEntryCreateInput = {
    startTime: Date | string
    endTime?: Date | string | null
    durationSeconds: number
    totalPausedSeconds?: number
    pausedAt?: Date | string | null
    status?: $Enums.TimeEntryStatus
    description?: string | null
    isManual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTimeEntriesInput
    task: TaskCreateNestedOneWithoutTimeEntriesInput
    client: ClientCreateNestedOneWithoutTimeEntriesInput
  }

  export type TimeEntryUncheckedCreateInput = {
    id?: number
    userId: number
    taskId: number
    clientId: number
    startTime: Date | string
    endTime?: Date | string | null
    durationSeconds: number
    totalPausedSeconds?: number
    pausedAt?: Date | string | null
    status?: $Enums.TimeEntryStatus
    description?: string | null
    isManual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeEntryUpdateInput = {
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: IntFieldUpdateOperationsInput | number
    totalPausedSeconds?: IntFieldUpdateOperationsInput | number
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTimeEntryStatusFieldUpdateOperationsInput | $Enums.TimeEntryStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isManual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTimeEntriesNestedInput
    task?: TaskUpdateOneRequiredWithoutTimeEntriesNestedInput
    client?: ClientUpdateOneRequiredWithoutTimeEntriesNestedInput
  }

  export type TimeEntryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    clientId?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: IntFieldUpdateOperationsInput | number
    totalPausedSeconds?: IntFieldUpdateOperationsInput | number
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTimeEntryStatusFieldUpdateOperationsInput | $Enums.TimeEntryStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isManual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeEntryCreateManyInput = {
    id?: number
    userId: number
    taskId: number
    clientId: number
    startTime: Date | string
    endTime?: Date | string | null
    durationSeconds: number
    totalPausedSeconds?: number
    pausedAt?: Date | string | null
    status?: $Enums.TimeEntryStatus
    description?: string | null
    isManual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeEntryUpdateManyMutationInput = {
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: IntFieldUpdateOperationsInput | number
    totalPausedSeconds?: IntFieldUpdateOperationsInput | number
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTimeEntryStatusFieldUpdateOperationsInput | $Enums.TimeEntryStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isManual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeEntryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    clientId?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: IntFieldUpdateOperationsInput | number
    totalPausedSeconds?: IntFieldUpdateOperationsInput | number
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTimeEntryStatusFieldUpdateOperationsInput | $Enums.TimeEntryStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isManual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[]
    notIn?: $Enums.UserRole[]
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ClientListRelationFilter = {
    every?: ClientWhereInput
    some?: ClientWhereInput
    none?: ClientWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type TimeEntryListRelationFilter = {
    every?: TimeEntryWhereInput
    some?: TimeEntryWhereInput
    none?: TimeEntryWhereInput
  }

  export type TaskAttachmentListRelationFilter = {
    every?: TaskAttachmentWhereInput
    some?: TaskAttachmentWhereInput
    none?: TaskAttachmentWhereInput
  }

  export type TaskCommentListRelationFilter = {
    every?: TaskCommentWhereInput
    some?: TaskCommentWhereInput
    none?: TaskCommentWhereInput
  }

  export type TaskActivityListRelationFilter = {
    every?: TaskActivityWhereInput
    some?: TaskActivityWhereInput
    none?: TaskActivityWhereInput
  }

  export type TeamListRelationFilter = {
    every?: TeamWhereInput
    some?: TeamWhereInput
    none?: TeamWhereInput
  }

  export type TeamMemberListRelationFilter = {
    every?: TeamMemberWhereInput
    some?: TeamMemberWhereInput
    none?: TeamMemberWhereInput
  }

  export type ClientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TimeEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskAttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskCommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    systemRole?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    systemRole?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    systemRole?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[]
    notIn?: $Enums.UserRole[]
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TeamCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamAvgOrderByAggregateInput = {
    id?: SortOrder
    createdById?: SortOrder
  }

  export type TeamMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamSumOrderByAggregateInput = {
    id?: SortOrder
    createdById?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type TeamRelationFilter = {
    is?: TeamWhereInput
    isNot?: TeamWhereInput
  }

  export type TeamMemberTeamIdUserIdCompoundUniqueInput = {
    teamId: number
    userId: number
  }

  export type TeamMemberCountOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type TeamMemberAvgOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
  }

  export type TeamMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type TeamMemberMinOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type TeamMemberSumOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    monthlyAllowanceMinutes?: SortOrder
    billable?: SortOrder
    archivedAt?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientAvgOrderByAggregateInput = {
    id?: SortOrder
    monthlyAllowanceMinutes?: SortOrder
    userId?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    monthlyAllowanceMinutes?: SortOrder
    billable?: SortOrder
    archivedAt?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    monthlyAllowanceMinutes?: SortOrder
    billable?: SortOrder
    archivedAt?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientSumOrderByAggregateInput = {
    id?: SortOrder
    monthlyAllowanceMinutes?: SortOrder
    userId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumTaskPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskPriority | EnumTaskPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TaskPriority[]
    notIn?: $Enums.TaskPriority[]
    not?: NestedEnumTaskPriorityFilter<$PrismaModel> | $Enums.TaskPriority
  }

  export type EnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[]
    notIn?: $Enums.TaskStatus[]
    not?: NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus
  }

  export type ClientRelationFilter = {
    is?: ClientWhereInput
    isNot?: ClientWhereInput
  }

  export type TaskLabelListRelationFilter = {
    every?: TaskLabelWhereInput
    some?: TaskLabelWhereInput
    none?: TaskLabelWhereInput
  }

  export type TaskLabelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    descriptionHtml?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    descriptionHtml?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    descriptionHtml?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
  }

  export type EnumTaskPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskPriority | EnumTaskPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TaskPriority[]
    notIn?: $Enums.TaskPriority[]
    not?: NestedEnumTaskPriorityWithAggregatesFilter<$PrismaModel> | $Enums.TaskPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskPriorityFilter<$PrismaModel>
    _max?: NestedEnumTaskPriorityFilter<$PrismaModel>
  }

  export type EnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[]
    notIn?: $Enums.TaskStatus[]
    not?: NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskStatusFilter<$PrismaModel>
  }

  export type TaskLabelCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskLabelAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TaskLabelMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskLabelMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskLabelSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TaskRelationFilter = {
    is?: TaskWhereInput
    isNot?: TaskWhereInput
  }

  export type TaskAttachmentCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    uploadedBy?: SortOrder
    fileName?: SortOrder
    originalName?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    filePath?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskAttachmentAvgOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    uploadedBy?: SortOrder
    fileSize?: SortOrder
  }

  export type TaskAttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    uploadedBy?: SortOrder
    fileName?: SortOrder
    originalName?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    filePath?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskAttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    uploadedBy?: SortOrder
    fileName?: SortOrder
    originalName?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    filePath?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskAttachmentSumOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    uploadedBy?: SortOrder
    fileSize?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TaskCommentNullableRelationFilter = {
    is?: TaskCommentWhereInput | null
    isNot?: TaskCommentWhereInput | null
  }

  export type TaskCommentCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    content?: SortOrder
    editedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskCommentAvgOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
  }

  export type TaskCommentMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    content?: SortOrder
    editedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskCommentMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    content?: SortOrder
    editedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskCommentSumOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumTaskActivityActionFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskActivityAction | EnumTaskActivityActionFieldRefInput<$PrismaModel>
    in?: $Enums.TaskActivityAction[]
    notIn?: $Enums.TaskActivityAction[]
    not?: NestedEnumTaskActivityActionFilter<$PrismaModel> | $Enums.TaskActivityAction
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TaskActivityCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskActivityAvgOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    entityId?: SortOrder
  }

  export type TaskActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskActivityMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskActivitySumOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    entityId?: SortOrder
  }

  export type EnumTaskActivityActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskActivityAction | EnumTaskActivityActionFieldRefInput<$PrismaModel>
    in?: $Enums.TaskActivityAction[]
    notIn?: $Enums.TaskActivityAction[]
    not?: NestedEnumTaskActivityActionWithAggregatesFilter<$PrismaModel> | $Enums.TaskActivityAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskActivityActionFilter<$PrismaModel>
    _max?: NestedEnumTaskActivityActionFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumTimeEntryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeEntryStatus | EnumTimeEntryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TimeEntryStatus[]
    notIn?: $Enums.TimeEntryStatus[]
    not?: NestedEnumTimeEntryStatusFilter<$PrismaModel> | $Enums.TimeEntryStatus
  }

  export type TimeEntryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    taskId?: SortOrder
    clientId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    durationSeconds?: SortOrder
    totalPausedSeconds?: SortOrder
    pausedAt?: SortOrder
    status?: SortOrder
    description?: SortOrder
    isManual?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TimeEntryAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    taskId?: SortOrder
    clientId?: SortOrder
    durationSeconds?: SortOrder
    totalPausedSeconds?: SortOrder
  }

  export type TimeEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    taskId?: SortOrder
    clientId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    durationSeconds?: SortOrder
    totalPausedSeconds?: SortOrder
    pausedAt?: SortOrder
    status?: SortOrder
    description?: SortOrder
    isManual?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TimeEntryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    taskId?: SortOrder
    clientId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    durationSeconds?: SortOrder
    totalPausedSeconds?: SortOrder
    pausedAt?: SortOrder
    status?: SortOrder
    description?: SortOrder
    isManual?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TimeEntrySumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    taskId?: SortOrder
    clientId?: SortOrder
    durationSeconds?: SortOrder
    totalPausedSeconds?: SortOrder
  }

  export type EnumTimeEntryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeEntryStatus | EnumTimeEntryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TimeEntryStatus[]
    notIn?: $Enums.TimeEntryStatus[]
    not?: NestedEnumTimeEntryStatusWithAggregatesFilter<$PrismaModel> | $Enums.TimeEntryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTimeEntryStatusFilter<$PrismaModel>
    _max?: NestedEnumTimeEntryStatusFilter<$PrismaModel>
  }

  export type ClientCreateNestedManyWithoutUserInput = {
    create?: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput> | ClientCreateWithoutUserInput[] | ClientUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutUserInput | ClientCreateOrConnectWithoutUserInput[]
    createMany?: ClientCreateManyUserInputEnvelope
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TimeEntryCreateNestedManyWithoutUserInput = {
    create?: XOR<TimeEntryCreateWithoutUserInput, TimeEntryUncheckedCreateWithoutUserInput> | TimeEntryCreateWithoutUserInput[] | TimeEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TimeEntryCreateOrConnectWithoutUserInput | TimeEntryCreateOrConnectWithoutUserInput[]
    createMany?: TimeEntryCreateManyUserInputEnvelope
    connect?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
  }

  export type TaskAttachmentCreateNestedManyWithoutUploadedByUserInput = {
    create?: XOR<TaskAttachmentCreateWithoutUploadedByUserInput, TaskAttachmentUncheckedCreateWithoutUploadedByUserInput> | TaskAttachmentCreateWithoutUploadedByUserInput[] | TaskAttachmentUncheckedCreateWithoutUploadedByUserInput[]
    connectOrCreate?: TaskAttachmentCreateOrConnectWithoutUploadedByUserInput | TaskAttachmentCreateOrConnectWithoutUploadedByUserInput[]
    createMany?: TaskAttachmentCreateManyUploadedByUserInputEnvelope
    connect?: TaskAttachmentWhereUniqueInput | TaskAttachmentWhereUniqueInput[]
  }

  export type TaskCommentCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCommentCreateWithoutUserInput, TaskCommentUncheckedCreateWithoutUserInput> | TaskCommentCreateWithoutUserInput[] | TaskCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCommentCreateOrConnectWithoutUserInput | TaskCommentCreateOrConnectWithoutUserInput[]
    createMany?: TaskCommentCreateManyUserInputEnvelope
    connect?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
  }

  export type TaskActivityCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskActivityCreateWithoutUserInput, TaskActivityUncheckedCreateWithoutUserInput> | TaskActivityCreateWithoutUserInput[] | TaskActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskActivityCreateOrConnectWithoutUserInput | TaskActivityCreateOrConnectWithoutUserInput[]
    createMany?: TaskActivityCreateManyUserInputEnvelope
    connect?: TaskActivityWhereUniqueInput | TaskActivityWhereUniqueInput[]
  }

  export type TeamCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TeamCreateWithoutCreatedByInput, TeamUncheckedCreateWithoutCreatedByInput> | TeamCreateWithoutCreatedByInput[] | TeamUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutCreatedByInput | TeamCreateOrConnectWithoutCreatedByInput[]
    createMany?: TeamCreateManyCreatedByInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type TeamMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput> | TeamMemberCreateWithoutUserInput[] | TeamMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutUserInput | TeamMemberCreateOrConnectWithoutUserInput[]
    createMany?: TeamMemberCreateManyUserInputEnvelope
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
  }

  export type ClientUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput> | ClientCreateWithoutUserInput[] | ClientUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutUserInput | ClientCreateOrConnectWithoutUserInput[]
    createMany?: ClientCreateManyUserInputEnvelope
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TimeEntryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TimeEntryCreateWithoutUserInput, TimeEntryUncheckedCreateWithoutUserInput> | TimeEntryCreateWithoutUserInput[] | TimeEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TimeEntryCreateOrConnectWithoutUserInput | TimeEntryCreateOrConnectWithoutUserInput[]
    createMany?: TimeEntryCreateManyUserInputEnvelope
    connect?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
  }

  export type TaskAttachmentUncheckedCreateNestedManyWithoutUploadedByUserInput = {
    create?: XOR<TaskAttachmentCreateWithoutUploadedByUserInput, TaskAttachmentUncheckedCreateWithoutUploadedByUserInput> | TaskAttachmentCreateWithoutUploadedByUserInput[] | TaskAttachmentUncheckedCreateWithoutUploadedByUserInput[]
    connectOrCreate?: TaskAttachmentCreateOrConnectWithoutUploadedByUserInput | TaskAttachmentCreateOrConnectWithoutUploadedByUserInput[]
    createMany?: TaskAttachmentCreateManyUploadedByUserInputEnvelope
    connect?: TaskAttachmentWhereUniqueInput | TaskAttachmentWhereUniqueInput[]
  }

  export type TaskCommentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCommentCreateWithoutUserInput, TaskCommentUncheckedCreateWithoutUserInput> | TaskCommentCreateWithoutUserInput[] | TaskCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCommentCreateOrConnectWithoutUserInput | TaskCommentCreateOrConnectWithoutUserInput[]
    createMany?: TaskCommentCreateManyUserInputEnvelope
    connect?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
  }

  export type TaskActivityUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskActivityCreateWithoutUserInput, TaskActivityUncheckedCreateWithoutUserInput> | TaskActivityCreateWithoutUserInput[] | TaskActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskActivityCreateOrConnectWithoutUserInput | TaskActivityCreateOrConnectWithoutUserInput[]
    createMany?: TaskActivityCreateManyUserInputEnvelope
    connect?: TaskActivityWhereUniqueInput | TaskActivityWhereUniqueInput[]
  }

  export type TeamUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TeamCreateWithoutCreatedByInput, TeamUncheckedCreateWithoutCreatedByInput> | TeamCreateWithoutCreatedByInput[] | TeamUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutCreatedByInput | TeamCreateOrConnectWithoutCreatedByInput[]
    createMany?: TeamCreateManyCreatedByInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type TeamMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput> | TeamMemberCreateWithoutUserInput[] | TeamMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutUserInput | TeamMemberCreateOrConnectWithoutUserInput[]
    createMany?: TeamMemberCreateManyUserInputEnvelope
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ClientUpdateManyWithoutUserNestedInput = {
    create?: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput> | ClientCreateWithoutUserInput[] | ClientUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutUserInput | ClientCreateOrConnectWithoutUserInput[]
    upsert?: ClientUpsertWithWhereUniqueWithoutUserInput | ClientUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ClientCreateManyUserInputEnvelope
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    update?: ClientUpdateWithWhereUniqueWithoutUserInput | ClientUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ClientUpdateManyWithWhereWithoutUserInput | ClientUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutUserInput | TaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutUserInput | TaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutUserInput | TaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TimeEntryUpdateManyWithoutUserNestedInput = {
    create?: XOR<TimeEntryCreateWithoutUserInput, TimeEntryUncheckedCreateWithoutUserInput> | TimeEntryCreateWithoutUserInput[] | TimeEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TimeEntryCreateOrConnectWithoutUserInput | TimeEntryCreateOrConnectWithoutUserInput[]
    upsert?: TimeEntryUpsertWithWhereUniqueWithoutUserInput | TimeEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TimeEntryCreateManyUserInputEnvelope
    set?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    disconnect?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    delete?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    connect?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    update?: TimeEntryUpdateWithWhereUniqueWithoutUserInput | TimeEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TimeEntryUpdateManyWithWhereWithoutUserInput | TimeEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TimeEntryScalarWhereInput | TimeEntryScalarWhereInput[]
  }

  export type TaskAttachmentUpdateManyWithoutUploadedByUserNestedInput = {
    create?: XOR<TaskAttachmentCreateWithoutUploadedByUserInput, TaskAttachmentUncheckedCreateWithoutUploadedByUserInput> | TaskAttachmentCreateWithoutUploadedByUserInput[] | TaskAttachmentUncheckedCreateWithoutUploadedByUserInput[]
    connectOrCreate?: TaskAttachmentCreateOrConnectWithoutUploadedByUserInput | TaskAttachmentCreateOrConnectWithoutUploadedByUserInput[]
    upsert?: TaskAttachmentUpsertWithWhereUniqueWithoutUploadedByUserInput | TaskAttachmentUpsertWithWhereUniqueWithoutUploadedByUserInput[]
    createMany?: TaskAttachmentCreateManyUploadedByUserInputEnvelope
    set?: TaskAttachmentWhereUniqueInput | TaskAttachmentWhereUniqueInput[]
    disconnect?: TaskAttachmentWhereUniqueInput | TaskAttachmentWhereUniqueInput[]
    delete?: TaskAttachmentWhereUniqueInput | TaskAttachmentWhereUniqueInput[]
    connect?: TaskAttachmentWhereUniqueInput | TaskAttachmentWhereUniqueInput[]
    update?: TaskAttachmentUpdateWithWhereUniqueWithoutUploadedByUserInput | TaskAttachmentUpdateWithWhereUniqueWithoutUploadedByUserInput[]
    updateMany?: TaskAttachmentUpdateManyWithWhereWithoutUploadedByUserInput | TaskAttachmentUpdateManyWithWhereWithoutUploadedByUserInput[]
    deleteMany?: TaskAttachmentScalarWhereInput | TaskAttachmentScalarWhereInput[]
  }

  export type TaskCommentUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCommentCreateWithoutUserInput, TaskCommentUncheckedCreateWithoutUserInput> | TaskCommentCreateWithoutUserInput[] | TaskCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCommentCreateOrConnectWithoutUserInput | TaskCommentCreateOrConnectWithoutUserInput[]
    upsert?: TaskCommentUpsertWithWhereUniqueWithoutUserInput | TaskCommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCommentCreateManyUserInputEnvelope
    set?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    disconnect?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    delete?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    connect?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    update?: TaskCommentUpdateWithWhereUniqueWithoutUserInput | TaskCommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskCommentUpdateManyWithWhereWithoutUserInput | TaskCommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskCommentScalarWhereInput | TaskCommentScalarWhereInput[]
  }

  export type TaskActivityUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskActivityCreateWithoutUserInput, TaskActivityUncheckedCreateWithoutUserInput> | TaskActivityCreateWithoutUserInput[] | TaskActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskActivityCreateOrConnectWithoutUserInput | TaskActivityCreateOrConnectWithoutUserInput[]
    upsert?: TaskActivityUpsertWithWhereUniqueWithoutUserInput | TaskActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskActivityCreateManyUserInputEnvelope
    set?: TaskActivityWhereUniqueInput | TaskActivityWhereUniqueInput[]
    disconnect?: TaskActivityWhereUniqueInput | TaskActivityWhereUniqueInput[]
    delete?: TaskActivityWhereUniqueInput | TaskActivityWhereUniqueInput[]
    connect?: TaskActivityWhereUniqueInput | TaskActivityWhereUniqueInput[]
    update?: TaskActivityUpdateWithWhereUniqueWithoutUserInput | TaskActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskActivityUpdateManyWithWhereWithoutUserInput | TaskActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskActivityScalarWhereInput | TaskActivityScalarWhereInput[]
  }

  export type TeamUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TeamCreateWithoutCreatedByInput, TeamUncheckedCreateWithoutCreatedByInput> | TeamCreateWithoutCreatedByInput[] | TeamUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutCreatedByInput | TeamCreateOrConnectWithoutCreatedByInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutCreatedByInput | TeamUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TeamCreateManyCreatedByInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutCreatedByInput | TeamUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutCreatedByInput | TeamUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type TeamMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput> | TeamMemberCreateWithoutUserInput[] | TeamMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutUserInput | TeamMemberCreateOrConnectWithoutUserInput[]
    upsert?: TeamMemberUpsertWithWhereUniqueWithoutUserInput | TeamMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TeamMemberCreateManyUserInputEnvelope
    set?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    disconnect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    delete?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    update?: TeamMemberUpdateWithWhereUniqueWithoutUserInput | TeamMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TeamMemberUpdateManyWithWhereWithoutUserInput | TeamMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ClientUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput> | ClientCreateWithoutUserInput[] | ClientUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutUserInput | ClientCreateOrConnectWithoutUserInput[]
    upsert?: ClientUpsertWithWhereUniqueWithoutUserInput | ClientUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ClientCreateManyUserInputEnvelope
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    update?: ClientUpdateWithWhereUniqueWithoutUserInput | ClientUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ClientUpdateManyWithWhereWithoutUserInput | ClientUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutUserInput | TaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutUserInput | TaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutUserInput | TaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TimeEntryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TimeEntryCreateWithoutUserInput, TimeEntryUncheckedCreateWithoutUserInput> | TimeEntryCreateWithoutUserInput[] | TimeEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TimeEntryCreateOrConnectWithoutUserInput | TimeEntryCreateOrConnectWithoutUserInput[]
    upsert?: TimeEntryUpsertWithWhereUniqueWithoutUserInput | TimeEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TimeEntryCreateManyUserInputEnvelope
    set?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    disconnect?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    delete?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    connect?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    update?: TimeEntryUpdateWithWhereUniqueWithoutUserInput | TimeEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TimeEntryUpdateManyWithWhereWithoutUserInput | TimeEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TimeEntryScalarWhereInput | TimeEntryScalarWhereInput[]
  }

  export type TaskAttachmentUncheckedUpdateManyWithoutUploadedByUserNestedInput = {
    create?: XOR<TaskAttachmentCreateWithoutUploadedByUserInput, TaskAttachmentUncheckedCreateWithoutUploadedByUserInput> | TaskAttachmentCreateWithoutUploadedByUserInput[] | TaskAttachmentUncheckedCreateWithoutUploadedByUserInput[]
    connectOrCreate?: TaskAttachmentCreateOrConnectWithoutUploadedByUserInput | TaskAttachmentCreateOrConnectWithoutUploadedByUserInput[]
    upsert?: TaskAttachmentUpsertWithWhereUniqueWithoutUploadedByUserInput | TaskAttachmentUpsertWithWhereUniqueWithoutUploadedByUserInput[]
    createMany?: TaskAttachmentCreateManyUploadedByUserInputEnvelope
    set?: TaskAttachmentWhereUniqueInput | TaskAttachmentWhereUniqueInput[]
    disconnect?: TaskAttachmentWhereUniqueInput | TaskAttachmentWhereUniqueInput[]
    delete?: TaskAttachmentWhereUniqueInput | TaskAttachmentWhereUniqueInput[]
    connect?: TaskAttachmentWhereUniqueInput | TaskAttachmentWhereUniqueInput[]
    update?: TaskAttachmentUpdateWithWhereUniqueWithoutUploadedByUserInput | TaskAttachmentUpdateWithWhereUniqueWithoutUploadedByUserInput[]
    updateMany?: TaskAttachmentUpdateManyWithWhereWithoutUploadedByUserInput | TaskAttachmentUpdateManyWithWhereWithoutUploadedByUserInput[]
    deleteMany?: TaskAttachmentScalarWhereInput | TaskAttachmentScalarWhereInput[]
  }

  export type TaskCommentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCommentCreateWithoutUserInput, TaskCommentUncheckedCreateWithoutUserInput> | TaskCommentCreateWithoutUserInput[] | TaskCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCommentCreateOrConnectWithoutUserInput | TaskCommentCreateOrConnectWithoutUserInput[]
    upsert?: TaskCommentUpsertWithWhereUniqueWithoutUserInput | TaskCommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCommentCreateManyUserInputEnvelope
    set?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    disconnect?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    delete?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    connect?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    update?: TaskCommentUpdateWithWhereUniqueWithoutUserInput | TaskCommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskCommentUpdateManyWithWhereWithoutUserInput | TaskCommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskCommentScalarWhereInput | TaskCommentScalarWhereInput[]
  }

  export type TaskActivityUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskActivityCreateWithoutUserInput, TaskActivityUncheckedCreateWithoutUserInput> | TaskActivityCreateWithoutUserInput[] | TaskActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskActivityCreateOrConnectWithoutUserInput | TaskActivityCreateOrConnectWithoutUserInput[]
    upsert?: TaskActivityUpsertWithWhereUniqueWithoutUserInput | TaskActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskActivityCreateManyUserInputEnvelope
    set?: TaskActivityWhereUniqueInput | TaskActivityWhereUniqueInput[]
    disconnect?: TaskActivityWhereUniqueInput | TaskActivityWhereUniqueInput[]
    delete?: TaskActivityWhereUniqueInput | TaskActivityWhereUniqueInput[]
    connect?: TaskActivityWhereUniqueInput | TaskActivityWhereUniqueInput[]
    update?: TaskActivityUpdateWithWhereUniqueWithoutUserInput | TaskActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskActivityUpdateManyWithWhereWithoutUserInput | TaskActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskActivityScalarWhereInput | TaskActivityScalarWhereInput[]
  }

  export type TeamUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TeamCreateWithoutCreatedByInput, TeamUncheckedCreateWithoutCreatedByInput> | TeamCreateWithoutCreatedByInput[] | TeamUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutCreatedByInput | TeamCreateOrConnectWithoutCreatedByInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutCreatedByInput | TeamUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TeamCreateManyCreatedByInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutCreatedByInput | TeamUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutCreatedByInput | TeamUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type TeamMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput> | TeamMemberCreateWithoutUserInput[] | TeamMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutUserInput | TeamMemberCreateOrConnectWithoutUserInput[]
    upsert?: TeamMemberUpsertWithWhereUniqueWithoutUserInput | TeamMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TeamMemberCreateManyUserInputEnvelope
    set?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    disconnect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    delete?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    update?: TeamMemberUpdateWithWhereUniqueWithoutUserInput | TeamMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TeamMemberUpdateManyWithWhereWithoutUserInput | TeamMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCreatedTeamsInput = {
    create?: XOR<UserCreateWithoutCreatedTeamsInput, UserUncheckedCreateWithoutCreatedTeamsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTeamsInput
    connect?: UserWhereUniqueInput
  }

  export type TeamMemberCreateNestedManyWithoutTeamInput = {
    create?: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput> | TeamMemberCreateWithoutTeamInput[] | TeamMemberUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutTeamInput | TeamMemberCreateOrConnectWithoutTeamInput[]
    createMany?: TeamMemberCreateManyTeamInputEnvelope
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
  }

  export type TeamMemberUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput> | TeamMemberCreateWithoutTeamInput[] | TeamMemberUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutTeamInput | TeamMemberCreateOrConnectWithoutTeamInput[]
    createMany?: TeamMemberCreateManyTeamInputEnvelope
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneRequiredWithoutCreatedTeamsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedTeamsInput, UserUncheckedCreateWithoutCreatedTeamsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTeamsInput
    upsert?: UserUpsertWithoutCreatedTeamsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedTeamsInput, UserUpdateWithoutCreatedTeamsInput>, UserUncheckedUpdateWithoutCreatedTeamsInput>
  }

  export type TeamMemberUpdateManyWithoutTeamNestedInput = {
    create?: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput> | TeamMemberCreateWithoutTeamInput[] | TeamMemberUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutTeamInput | TeamMemberCreateOrConnectWithoutTeamInput[]
    upsert?: TeamMemberUpsertWithWhereUniqueWithoutTeamInput | TeamMemberUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: TeamMemberCreateManyTeamInputEnvelope
    set?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    disconnect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    delete?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    update?: TeamMemberUpdateWithWhereUniqueWithoutTeamInput | TeamMemberUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: TeamMemberUpdateManyWithWhereWithoutTeamInput | TeamMemberUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
  }

  export type TeamMemberUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput> | TeamMemberCreateWithoutTeamInput[] | TeamMemberUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutTeamInput | TeamMemberCreateOrConnectWithoutTeamInput[]
    upsert?: TeamMemberUpsertWithWhereUniqueWithoutTeamInput | TeamMemberUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: TeamMemberCreateManyTeamInputEnvelope
    set?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    disconnect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    delete?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    update?: TeamMemberUpdateWithWhereUniqueWithoutTeamInput | TeamMemberUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: TeamMemberUpdateManyWithWhereWithoutTeamInput | TeamMemberUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
  }

  export type TeamCreateNestedOneWithoutMembersInput = {
    create?: XOR<TeamCreateWithoutMembersInput, TeamUncheckedCreateWithoutMembersInput>
    connectOrCreate?: TeamCreateOrConnectWithoutMembersInput
    connect?: TeamWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTeamMembershipsInput = {
    create?: XOR<UserCreateWithoutTeamMembershipsInput, UserUncheckedCreateWithoutTeamMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeamMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type TeamUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<TeamCreateWithoutMembersInput, TeamUncheckedCreateWithoutMembersInput>
    connectOrCreate?: TeamCreateOrConnectWithoutMembersInput
    upsert?: TeamUpsertWithoutMembersInput
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutMembersInput, TeamUpdateWithoutMembersInput>, TeamUncheckedUpdateWithoutMembersInput>
  }

  export type UserUpdateOneRequiredWithoutTeamMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutTeamMembershipsInput, UserUncheckedCreateWithoutTeamMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeamMembershipsInput
    upsert?: UserUpsertWithoutTeamMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTeamMembershipsInput, UserUpdateWithoutTeamMembershipsInput>, UserUncheckedUpdateWithoutTeamMembershipsInput>
  }

  export type UserCreateNestedOneWithoutClientsInput = {
    create?: XOR<UserCreateWithoutClientsInput, UserUncheckedCreateWithoutClientsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClientsInput
    connect?: UserWhereUniqueInput
  }

  export type TaskCreateNestedManyWithoutClientInput = {
    create?: XOR<TaskCreateWithoutClientInput, TaskUncheckedCreateWithoutClientInput> | TaskCreateWithoutClientInput[] | TaskUncheckedCreateWithoutClientInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutClientInput | TaskCreateOrConnectWithoutClientInput[]
    createMany?: TaskCreateManyClientInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TimeEntryCreateNestedManyWithoutClientInput = {
    create?: XOR<TimeEntryCreateWithoutClientInput, TimeEntryUncheckedCreateWithoutClientInput> | TimeEntryCreateWithoutClientInput[] | TimeEntryUncheckedCreateWithoutClientInput[]
    connectOrCreate?: TimeEntryCreateOrConnectWithoutClientInput | TimeEntryCreateOrConnectWithoutClientInput[]
    createMany?: TimeEntryCreateManyClientInputEnvelope
    connect?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<TaskCreateWithoutClientInput, TaskUncheckedCreateWithoutClientInput> | TaskCreateWithoutClientInput[] | TaskUncheckedCreateWithoutClientInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutClientInput | TaskCreateOrConnectWithoutClientInput[]
    createMany?: TaskCreateManyClientInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TimeEntryUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<TimeEntryCreateWithoutClientInput, TimeEntryUncheckedCreateWithoutClientInput> | TimeEntryCreateWithoutClientInput[] | TimeEntryUncheckedCreateWithoutClientInput[]
    connectOrCreate?: TimeEntryCreateOrConnectWithoutClientInput | TimeEntryCreateOrConnectWithoutClientInput[]
    createMany?: TimeEntryCreateManyClientInputEnvelope
    connect?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutClientsNestedInput = {
    create?: XOR<UserCreateWithoutClientsInput, UserUncheckedCreateWithoutClientsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClientsInput
    upsert?: UserUpsertWithoutClientsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClientsInput, UserUpdateWithoutClientsInput>, UserUncheckedUpdateWithoutClientsInput>
  }

  export type TaskUpdateManyWithoutClientNestedInput = {
    create?: XOR<TaskCreateWithoutClientInput, TaskUncheckedCreateWithoutClientInput> | TaskCreateWithoutClientInput[] | TaskUncheckedCreateWithoutClientInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutClientInput | TaskCreateOrConnectWithoutClientInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutClientInput | TaskUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: TaskCreateManyClientInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutClientInput | TaskUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutClientInput | TaskUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TimeEntryUpdateManyWithoutClientNestedInput = {
    create?: XOR<TimeEntryCreateWithoutClientInput, TimeEntryUncheckedCreateWithoutClientInput> | TimeEntryCreateWithoutClientInput[] | TimeEntryUncheckedCreateWithoutClientInput[]
    connectOrCreate?: TimeEntryCreateOrConnectWithoutClientInput | TimeEntryCreateOrConnectWithoutClientInput[]
    upsert?: TimeEntryUpsertWithWhereUniqueWithoutClientInput | TimeEntryUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: TimeEntryCreateManyClientInputEnvelope
    set?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    disconnect?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    delete?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    connect?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    update?: TimeEntryUpdateWithWhereUniqueWithoutClientInput | TimeEntryUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: TimeEntryUpdateManyWithWhereWithoutClientInput | TimeEntryUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: TimeEntryScalarWhereInput | TimeEntryScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<TaskCreateWithoutClientInput, TaskUncheckedCreateWithoutClientInput> | TaskCreateWithoutClientInput[] | TaskUncheckedCreateWithoutClientInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutClientInput | TaskCreateOrConnectWithoutClientInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutClientInput | TaskUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: TaskCreateManyClientInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutClientInput | TaskUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutClientInput | TaskUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TimeEntryUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<TimeEntryCreateWithoutClientInput, TimeEntryUncheckedCreateWithoutClientInput> | TimeEntryCreateWithoutClientInput[] | TimeEntryUncheckedCreateWithoutClientInput[]
    connectOrCreate?: TimeEntryCreateOrConnectWithoutClientInput | TimeEntryCreateOrConnectWithoutClientInput[]
    upsert?: TimeEntryUpsertWithWhereUniqueWithoutClientInput | TimeEntryUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: TimeEntryCreateManyClientInputEnvelope
    set?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    disconnect?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    delete?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    connect?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    update?: TimeEntryUpdateWithWhereUniqueWithoutClientInput | TimeEntryUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: TimeEntryUpdateManyWithWhereWithoutClientInput | TimeEntryUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: TimeEntryScalarWhereInput | TimeEntryScalarWhereInput[]
  }

  export type ClientCreateNestedOneWithoutTasksInput = {
    create?: XOR<ClientCreateWithoutTasksInput, ClientUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ClientCreateOrConnectWithoutTasksInput
    connect?: ClientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAssignedTasksInput = {
    create?: XOR<UserCreateWithoutAssignedTasksInput, UserUncheckedCreateWithoutAssignedTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedTasksInput
    connect?: UserWhereUniqueInput
  }

  export type TaskLabelCreateNestedManyWithoutTasksInput = {
    create?: XOR<TaskLabelCreateWithoutTasksInput, TaskLabelUncheckedCreateWithoutTasksInput> | TaskLabelCreateWithoutTasksInput[] | TaskLabelUncheckedCreateWithoutTasksInput[]
    connectOrCreate?: TaskLabelCreateOrConnectWithoutTasksInput | TaskLabelCreateOrConnectWithoutTasksInput[]
    connect?: TaskLabelWhereUniqueInput | TaskLabelWhereUniqueInput[]
  }

  export type TaskAttachmentCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskAttachmentCreateWithoutTaskInput, TaskAttachmentUncheckedCreateWithoutTaskInput> | TaskAttachmentCreateWithoutTaskInput[] | TaskAttachmentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskAttachmentCreateOrConnectWithoutTaskInput | TaskAttachmentCreateOrConnectWithoutTaskInput[]
    createMany?: TaskAttachmentCreateManyTaskInputEnvelope
    connect?: TaskAttachmentWhereUniqueInput | TaskAttachmentWhereUniqueInput[]
  }

  export type TaskCommentCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskCommentCreateWithoutTaskInput, TaskCommentUncheckedCreateWithoutTaskInput> | TaskCommentCreateWithoutTaskInput[] | TaskCommentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskCommentCreateOrConnectWithoutTaskInput | TaskCommentCreateOrConnectWithoutTaskInput[]
    createMany?: TaskCommentCreateManyTaskInputEnvelope
    connect?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
  }

  export type TaskActivityCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskActivityCreateWithoutTaskInput, TaskActivityUncheckedCreateWithoutTaskInput> | TaskActivityCreateWithoutTaskInput[] | TaskActivityUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskActivityCreateOrConnectWithoutTaskInput | TaskActivityCreateOrConnectWithoutTaskInput[]
    createMany?: TaskActivityCreateManyTaskInputEnvelope
    connect?: TaskActivityWhereUniqueInput | TaskActivityWhereUniqueInput[]
  }

  export type TimeEntryCreateNestedManyWithoutTaskInput = {
    create?: XOR<TimeEntryCreateWithoutTaskInput, TimeEntryUncheckedCreateWithoutTaskInput> | TimeEntryCreateWithoutTaskInput[] | TimeEntryUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TimeEntryCreateOrConnectWithoutTaskInput | TimeEntryCreateOrConnectWithoutTaskInput[]
    createMany?: TimeEntryCreateManyTaskInputEnvelope
    connect?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
  }

  export type TaskLabelUncheckedCreateNestedManyWithoutTasksInput = {
    create?: XOR<TaskLabelCreateWithoutTasksInput, TaskLabelUncheckedCreateWithoutTasksInput> | TaskLabelCreateWithoutTasksInput[] | TaskLabelUncheckedCreateWithoutTasksInput[]
    connectOrCreate?: TaskLabelCreateOrConnectWithoutTasksInput | TaskLabelCreateOrConnectWithoutTasksInput[]
    connect?: TaskLabelWhereUniqueInput | TaskLabelWhereUniqueInput[]
  }

  export type TaskAttachmentUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskAttachmentCreateWithoutTaskInput, TaskAttachmentUncheckedCreateWithoutTaskInput> | TaskAttachmentCreateWithoutTaskInput[] | TaskAttachmentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskAttachmentCreateOrConnectWithoutTaskInput | TaskAttachmentCreateOrConnectWithoutTaskInput[]
    createMany?: TaskAttachmentCreateManyTaskInputEnvelope
    connect?: TaskAttachmentWhereUniqueInput | TaskAttachmentWhereUniqueInput[]
  }

  export type TaskCommentUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskCommentCreateWithoutTaskInput, TaskCommentUncheckedCreateWithoutTaskInput> | TaskCommentCreateWithoutTaskInput[] | TaskCommentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskCommentCreateOrConnectWithoutTaskInput | TaskCommentCreateOrConnectWithoutTaskInput[]
    createMany?: TaskCommentCreateManyTaskInputEnvelope
    connect?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
  }

  export type TaskActivityUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskActivityCreateWithoutTaskInput, TaskActivityUncheckedCreateWithoutTaskInput> | TaskActivityCreateWithoutTaskInput[] | TaskActivityUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskActivityCreateOrConnectWithoutTaskInput | TaskActivityCreateOrConnectWithoutTaskInput[]
    createMany?: TaskActivityCreateManyTaskInputEnvelope
    connect?: TaskActivityWhereUniqueInput | TaskActivityWhereUniqueInput[]
  }

  export type TimeEntryUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<TimeEntryCreateWithoutTaskInput, TimeEntryUncheckedCreateWithoutTaskInput> | TimeEntryCreateWithoutTaskInput[] | TimeEntryUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TimeEntryCreateOrConnectWithoutTaskInput | TimeEntryCreateOrConnectWithoutTaskInput[]
    createMany?: TimeEntryCreateManyTaskInputEnvelope
    connect?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
  }

  export type EnumTaskPriorityFieldUpdateOperationsInput = {
    set?: $Enums.TaskPriority
  }

  export type EnumTaskStatusFieldUpdateOperationsInput = {
    set?: $Enums.TaskStatus
  }

  export type ClientUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<ClientCreateWithoutTasksInput, ClientUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ClientCreateOrConnectWithoutTasksInput
    upsert?: ClientUpsertWithoutTasksInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutTasksInput, ClientUpdateWithoutTasksInput>, ClientUncheckedUpdateWithoutTasksInput>
  }

  export type UserUpdateOneRequiredWithoutAssignedTasksNestedInput = {
    create?: XOR<UserCreateWithoutAssignedTasksInput, UserUncheckedCreateWithoutAssignedTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedTasksInput
    upsert?: UserUpsertWithoutAssignedTasksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssignedTasksInput, UserUpdateWithoutAssignedTasksInput>, UserUncheckedUpdateWithoutAssignedTasksInput>
  }

  export type TaskLabelUpdateManyWithoutTasksNestedInput = {
    create?: XOR<TaskLabelCreateWithoutTasksInput, TaskLabelUncheckedCreateWithoutTasksInput> | TaskLabelCreateWithoutTasksInput[] | TaskLabelUncheckedCreateWithoutTasksInput[]
    connectOrCreate?: TaskLabelCreateOrConnectWithoutTasksInput | TaskLabelCreateOrConnectWithoutTasksInput[]
    upsert?: TaskLabelUpsertWithWhereUniqueWithoutTasksInput | TaskLabelUpsertWithWhereUniqueWithoutTasksInput[]
    set?: TaskLabelWhereUniqueInput | TaskLabelWhereUniqueInput[]
    disconnect?: TaskLabelWhereUniqueInput | TaskLabelWhereUniqueInput[]
    delete?: TaskLabelWhereUniqueInput | TaskLabelWhereUniqueInput[]
    connect?: TaskLabelWhereUniqueInput | TaskLabelWhereUniqueInput[]
    update?: TaskLabelUpdateWithWhereUniqueWithoutTasksInput | TaskLabelUpdateWithWhereUniqueWithoutTasksInput[]
    updateMany?: TaskLabelUpdateManyWithWhereWithoutTasksInput | TaskLabelUpdateManyWithWhereWithoutTasksInput[]
    deleteMany?: TaskLabelScalarWhereInput | TaskLabelScalarWhereInput[]
  }

  export type TaskAttachmentUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskAttachmentCreateWithoutTaskInput, TaskAttachmentUncheckedCreateWithoutTaskInput> | TaskAttachmentCreateWithoutTaskInput[] | TaskAttachmentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskAttachmentCreateOrConnectWithoutTaskInput | TaskAttachmentCreateOrConnectWithoutTaskInput[]
    upsert?: TaskAttachmentUpsertWithWhereUniqueWithoutTaskInput | TaskAttachmentUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskAttachmentCreateManyTaskInputEnvelope
    set?: TaskAttachmentWhereUniqueInput | TaskAttachmentWhereUniqueInput[]
    disconnect?: TaskAttachmentWhereUniqueInput | TaskAttachmentWhereUniqueInput[]
    delete?: TaskAttachmentWhereUniqueInput | TaskAttachmentWhereUniqueInput[]
    connect?: TaskAttachmentWhereUniqueInput | TaskAttachmentWhereUniqueInput[]
    update?: TaskAttachmentUpdateWithWhereUniqueWithoutTaskInput | TaskAttachmentUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskAttachmentUpdateManyWithWhereWithoutTaskInput | TaskAttachmentUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskAttachmentScalarWhereInput | TaskAttachmentScalarWhereInput[]
  }

  export type TaskCommentUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskCommentCreateWithoutTaskInput, TaskCommentUncheckedCreateWithoutTaskInput> | TaskCommentCreateWithoutTaskInput[] | TaskCommentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskCommentCreateOrConnectWithoutTaskInput | TaskCommentCreateOrConnectWithoutTaskInput[]
    upsert?: TaskCommentUpsertWithWhereUniqueWithoutTaskInput | TaskCommentUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskCommentCreateManyTaskInputEnvelope
    set?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    disconnect?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    delete?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    connect?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    update?: TaskCommentUpdateWithWhereUniqueWithoutTaskInput | TaskCommentUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskCommentUpdateManyWithWhereWithoutTaskInput | TaskCommentUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskCommentScalarWhereInput | TaskCommentScalarWhereInput[]
  }

  export type TaskActivityUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskActivityCreateWithoutTaskInput, TaskActivityUncheckedCreateWithoutTaskInput> | TaskActivityCreateWithoutTaskInput[] | TaskActivityUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskActivityCreateOrConnectWithoutTaskInput | TaskActivityCreateOrConnectWithoutTaskInput[]
    upsert?: TaskActivityUpsertWithWhereUniqueWithoutTaskInput | TaskActivityUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskActivityCreateManyTaskInputEnvelope
    set?: TaskActivityWhereUniqueInput | TaskActivityWhereUniqueInput[]
    disconnect?: TaskActivityWhereUniqueInput | TaskActivityWhereUniqueInput[]
    delete?: TaskActivityWhereUniqueInput | TaskActivityWhereUniqueInput[]
    connect?: TaskActivityWhereUniqueInput | TaskActivityWhereUniqueInput[]
    update?: TaskActivityUpdateWithWhereUniqueWithoutTaskInput | TaskActivityUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskActivityUpdateManyWithWhereWithoutTaskInput | TaskActivityUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskActivityScalarWhereInput | TaskActivityScalarWhereInput[]
  }

  export type TimeEntryUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TimeEntryCreateWithoutTaskInput, TimeEntryUncheckedCreateWithoutTaskInput> | TimeEntryCreateWithoutTaskInput[] | TimeEntryUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TimeEntryCreateOrConnectWithoutTaskInput | TimeEntryCreateOrConnectWithoutTaskInput[]
    upsert?: TimeEntryUpsertWithWhereUniqueWithoutTaskInput | TimeEntryUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TimeEntryCreateManyTaskInputEnvelope
    set?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    disconnect?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    delete?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    connect?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    update?: TimeEntryUpdateWithWhereUniqueWithoutTaskInput | TimeEntryUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TimeEntryUpdateManyWithWhereWithoutTaskInput | TimeEntryUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TimeEntryScalarWhereInput | TimeEntryScalarWhereInput[]
  }

  export type TaskLabelUncheckedUpdateManyWithoutTasksNestedInput = {
    create?: XOR<TaskLabelCreateWithoutTasksInput, TaskLabelUncheckedCreateWithoutTasksInput> | TaskLabelCreateWithoutTasksInput[] | TaskLabelUncheckedCreateWithoutTasksInput[]
    connectOrCreate?: TaskLabelCreateOrConnectWithoutTasksInput | TaskLabelCreateOrConnectWithoutTasksInput[]
    upsert?: TaskLabelUpsertWithWhereUniqueWithoutTasksInput | TaskLabelUpsertWithWhereUniqueWithoutTasksInput[]
    set?: TaskLabelWhereUniqueInput | TaskLabelWhereUniqueInput[]
    disconnect?: TaskLabelWhereUniqueInput | TaskLabelWhereUniqueInput[]
    delete?: TaskLabelWhereUniqueInput | TaskLabelWhereUniqueInput[]
    connect?: TaskLabelWhereUniqueInput | TaskLabelWhereUniqueInput[]
    update?: TaskLabelUpdateWithWhereUniqueWithoutTasksInput | TaskLabelUpdateWithWhereUniqueWithoutTasksInput[]
    updateMany?: TaskLabelUpdateManyWithWhereWithoutTasksInput | TaskLabelUpdateManyWithWhereWithoutTasksInput[]
    deleteMany?: TaskLabelScalarWhereInput | TaskLabelScalarWhereInput[]
  }

  export type TaskAttachmentUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskAttachmentCreateWithoutTaskInput, TaskAttachmentUncheckedCreateWithoutTaskInput> | TaskAttachmentCreateWithoutTaskInput[] | TaskAttachmentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskAttachmentCreateOrConnectWithoutTaskInput | TaskAttachmentCreateOrConnectWithoutTaskInput[]
    upsert?: TaskAttachmentUpsertWithWhereUniqueWithoutTaskInput | TaskAttachmentUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskAttachmentCreateManyTaskInputEnvelope
    set?: TaskAttachmentWhereUniqueInput | TaskAttachmentWhereUniqueInput[]
    disconnect?: TaskAttachmentWhereUniqueInput | TaskAttachmentWhereUniqueInput[]
    delete?: TaskAttachmentWhereUniqueInput | TaskAttachmentWhereUniqueInput[]
    connect?: TaskAttachmentWhereUniqueInput | TaskAttachmentWhereUniqueInput[]
    update?: TaskAttachmentUpdateWithWhereUniqueWithoutTaskInput | TaskAttachmentUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskAttachmentUpdateManyWithWhereWithoutTaskInput | TaskAttachmentUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskAttachmentScalarWhereInput | TaskAttachmentScalarWhereInput[]
  }

  export type TaskCommentUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskCommentCreateWithoutTaskInput, TaskCommentUncheckedCreateWithoutTaskInput> | TaskCommentCreateWithoutTaskInput[] | TaskCommentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskCommentCreateOrConnectWithoutTaskInput | TaskCommentCreateOrConnectWithoutTaskInput[]
    upsert?: TaskCommentUpsertWithWhereUniqueWithoutTaskInput | TaskCommentUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskCommentCreateManyTaskInputEnvelope
    set?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    disconnect?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    delete?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    connect?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    update?: TaskCommentUpdateWithWhereUniqueWithoutTaskInput | TaskCommentUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskCommentUpdateManyWithWhereWithoutTaskInput | TaskCommentUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskCommentScalarWhereInput | TaskCommentScalarWhereInput[]
  }

  export type TaskActivityUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskActivityCreateWithoutTaskInput, TaskActivityUncheckedCreateWithoutTaskInput> | TaskActivityCreateWithoutTaskInput[] | TaskActivityUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskActivityCreateOrConnectWithoutTaskInput | TaskActivityCreateOrConnectWithoutTaskInput[]
    upsert?: TaskActivityUpsertWithWhereUniqueWithoutTaskInput | TaskActivityUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskActivityCreateManyTaskInputEnvelope
    set?: TaskActivityWhereUniqueInput | TaskActivityWhereUniqueInput[]
    disconnect?: TaskActivityWhereUniqueInput | TaskActivityWhereUniqueInput[]
    delete?: TaskActivityWhereUniqueInput | TaskActivityWhereUniqueInput[]
    connect?: TaskActivityWhereUniqueInput | TaskActivityWhereUniqueInput[]
    update?: TaskActivityUpdateWithWhereUniqueWithoutTaskInput | TaskActivityUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskActivityUpdateManyWithWhereWithoutTaskInput | TaskActivityUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskActivityScalarWhereInput | TaskActivityScalarWhereInput[]
  }

  export type TimeEntryUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TimeEntryCreateWithoutTaskInput, TimeEntryUncheckedCreateWithoutTaskInput> | TimeEntryCreateWithoutTaskInput[] | TimeEntryUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TimeEntryCreateOrConnectWithoutTaskInput | TimeEntryCreateOrConnectWithoutTaskInput[]
    upsert?: TimeEntryUpsertWithWhereUniqueWithoutTaskInput | TimeEntryUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TimeEntryCreateManyTaskInputEnvelope
    set?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    disconnect?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    delete?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    connect?: TimeEntryWhereUniqueInput | TimeEntryWhereUniqueInput[]
    update?: TimeEntryUpdateWithWhereUniqueWithoutTaskInput | TimeEntryUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TimeEntryUpdateManyWithWhereWithoutTaskInput | TimeEntryUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TimeEntryScalarWhereInput | TimeEntryScalarWhereInput[]
  }

  export type TaskCreateNestedManyWithoutLabelsInput = {
    create?: XOR<TaskCreateWithoutLabelsInput, TaskUncheckedCreateWithoutLabelsInput> | TaskCreateWithoutLabelsInput[] | TaskUncheckedCreateWithoutLabelsInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutLabelsInput | TaskCreateOrConnectWithoutLabelsInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutLabelsInput = {
    create?: XOR<TaskCreateWithoutLabelsInput, TaskUncheckedCreateWithoutLabelsInput> | TaskCreateWithoutLabelsInput[] | TaskUncheckedCreateWithoutLabelsInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutLabelsInput | TaskCreateOrConnectWithoutLabelsInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskUpdateManyWithoutLabelsNestedInput = {
    create?: XOR<TaskCreateWithoutLabelsInput, TaskUncheckedCreateWithoutLabelsInput> | TaskCreateWithoutLabelsInput[] | TaskUncheckedCreateWithoutLabelsInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutLabelsInput | TaskCreateOrConnectWithoutLabelsInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutLabelsInput | TaskUpsertWithWhereUniqueWithoutLabelsInput[]
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutLabelsInput | TaskUpdateWithWhereUniqueWithoutLabelsInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutLabelsInput | TaskUpdateManyWithWhereWithoutLabelsInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutLabelsNestedInput = {
    create?: XOR<TaskCreateWithoutLabelsInput, TaskUncheckedCreateWithoutLabelsInput> | TaskCreateWithoutLabelsInput[] | TaskUncheckedCreateWithoutLabelsInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutLabelsInput | TaskCreateOrConnectWithoutLabelsInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutLabelsInput | TaskUpsertWithWhereUniqueWithoutLabelsInput[]
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutLabelsInput | TaskUpdateWithWhereUniqueWithoutLabelsInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutLabelsInput | TaskUpdateManyWithWhereWithoutLabelsInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<TaskCreateWithoutAttachmentsInput, TaskUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutAttachmentsInput
    connect?: TaskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUploadedAttachmentsInput = {
    create?: XOR<UserCreateWithoutUploadedAttachmentsInput, UserUncheckedCreateWithoutUploadedAttachmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUploadedAttachmentsInput
    connect?: UserWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutAttachmentsNestedInput = {
    create?: XOR<TaskCreateWithoutAttachmentsInput, TaskUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutAttachmentsInput
    upsert?: TaskUpsertWithoutAttachmentsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutAttachmentsInput, TaskUpdateWithoutAttachmentsInput>, TaskUncheckedUpdateWithoutAttachmentsInput>
  }

  export type UserUpdateOneRequiredWithoutUploadedAttachmentsNestedInput = {
    create?: XOR<UserCreateWithoutUploadedAttachmentsInput, UserUncheckedCreateWithoutUploadedAttachmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUploadedAttachmentsInput
    upsert?: UserUpsertWithoutUploadedAttachmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUploadedAttachmentsInput, UserUpdateWithoutUploadedAttachmentsInput>, UserUncheckedUpdateWithoutUploadedAttachmentsInput>
  }

  export type TaskCreateNestedOneWithoutCommentsInput = {
    create?: XOR<TaskCreateWithoutCommentsInput, TaskUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutCommentsInput
    connect?: TaskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTaskCommentsInput = {
    create?: XOR<UserCreateWithoutTaskCommentsInput, UserUncheckedCreateWithoutTaskCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTaskCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type TaskCommentCreateNestedOneWithoutRepliesInput = {
    create?: XOR<TaskCommentCreateWithoutRepliesInput, TaskCommentUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: TaskCommentCreateOrConnectWithoutRepliesInput
    connect?: TaskCommentWhereUniqueInput
  }

  export type TaskCommentCreateNestedManyWithoutParentInput = {
    create?: XOR<TaskCommentCreateWithoutParentInput, TaskCommentUncheckedCreateWithoutParentInput> | TaskCommentCreateWithoutParentInput[] | TaskCommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: TaskCommentCreateOrConnectWithoutParentInput | TaskCommentCreateOrConnectWithoutParentInput[]
    createMany?: TaskCommentCreateManyParentInputEnvelope
    connect?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
  }

  export type TaskCommentUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<TaskCommentCreateWithoutParentInput, TaskCommentUncheckedCreateWithoutParentInput> | TaskCommentCreateWithoutParentInput[] | TaskCommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: TaskCommentCreateOrConnectWithoutParentInput | TaskCommentCreateOrConnectWithoutParentInput[]
    createMany?: TaskCommentCreateManyParentInputEnvelope
    connect?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
  }

  export type TaskUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<TaskCreateWithoutCommentsInput, TaskUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutCommentsInput
    upsert?: TaskUpsertWithoutCommentsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutCommentsInput, TaskUpdateWithoutCommentsInput>, TaskUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateOneRequiredWithoutTaskCommentsNestedInput = {
    create?: XOR<UserCreateWithoutTaskCommentsInput, UserUncheckedCreateWithoutTaskCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTaskCommentsInput
    upsert?: UserUpsertWithoutTaskCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTaskCommentsInput, UserUpdateWithoutTaskCommentsInput>, UserUncheckedUpdateWithoutTaskCommentsInput>
  }

  export type TaskCommentUpdateOneWithoutRepliesNestedInput = {
    create?: XOR<TaskCommentCreateWithoutRepliesInput, TaskCommentUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: TaskCommentCreateOrConnectWithoutRepliesInput
    upsert?: TaskCommentUpsertWithoutRepliesInput
    disconnect?: TaskCommentWhereInput | boolean
    delete?: TaskCommentWhereInput | boolean
    connect?: TaskCommentWhereUniqueInput
    update?: XOR<XOR<TaskCommentUpdateToOneWithWhereWithoutRepliesInput, TaskCommentUpdateWithoutRepliesInput>, TaskCommentUncheckedUpdateWithoutRepliesInput>
  }

  export type TaskCommentUpdateManyWithoutParentNestedInput = {
    create?: XOR<TaskCommentCreateWithoutParentInput, TaskCommentUncheckedCreateWithoutParentInput> | TaskCommentCreateWithoutParentInput[] | TaskCommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: TaskCommentCreateOrConnectWithoutParentInput | TaskCommentCreateOrConnectWithoutParentInput[]
    upsert?: TaskCommentUpsertWithWhereUniqueWithoutParentInput | TaskCommentUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: TaskCommentCreateManyParentInputEnvelope
    set?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    disconnect?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    delete?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    connect?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    update?: TaskCommentUpdateWithWhereUniqueWithoutParentInput | TaskCommentUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: TaskCommentUpdateManyWithWhereWithoutParentInput | TaskCommentUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: TaskCommentScalarWhereInput | TaskCommentScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TaskCommentUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<TaskCommentCreateWithoutParentInput, TaskCommentUncheckedCreateWithoutParentInput> | TaskCommentCreateWithoutParentInput[] | TaskCommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: TaskCommentCreateOrConnectWithoutParentInput | TaskCommentCreateOrConnectWithoutParentInput[]
    upsert?: TaskCommentUpsertWithWhereUniqueWithoutParentInput | TaskCommentUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: TaskCommentCreateManyParentInputEnvelope
    set?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    disconnect?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    delete?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    connect?: TaskCommentWhereUniqueInput | TaskCommentWhereUniqueInput[]
    update?: TaskCommentUpdateWithWhereUniqueWithoutParentInput | TaskCommentUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: TaskCommentUpdateManyWithWhereWithoutParentInput | TaskCommentUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: TaskCommentScalarWhereInput | TaskCommentScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<TaskCreateWithoutActivitiesInput, TaskUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutActivitiesInput
    connect?: TaskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTaskActivitiesInput = {
    create?: XOR<UserCreateWithoutTaskActivitiesInput, UserUncheckedCreateWithoutTaskActivitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTaskActivitiesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTaskActivityActionFieldUpdateOperationsInput = {
    set?: $Enums.TaskActivityAction
  }

  export type TaskUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: XOR<TaskCreateWithoutActivitiesInput, TaskUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutActivitiesInput
    upsert?: TaskUpsertWithoutActivitiesInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutActivitiesInput, TaskUpdateWithoutActivitiesInput>, TaskUncheckedUpdateWithoutActivitiesInput>
  }

  export type UserUpdateOneRequiredWithoutTaskActivitiesNestedInput = {
    create?: XOR<UserCreateWithoutTaskActivitiesInput, UserUncheckedCreateWithoutTaskActivitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTaskActivitiesInput
    upsert?: UserUpsertWithoutTaskActivitiesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTaskActivitiesInput, UserUpdateWithoutTaskActivitiesInput>, UserUncheckedUpdateWithoutTaskActivitiesInput>
  }

  export type UserCreateNestedOneWithoutTimeEntriesInput = {
    create?: XOR<UserCreateWithoutTimeEntriesInput, UserUncheckedCreateWithoutTimeEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTimeEntriesInput
    connect?: UserWhereUniqueInput
  }

  export type TaskCreateNestedOneWithoutTimeEntriesInput = {
    create?: XOR<TaskCreateWithoutTimeEntriesInput, TaskUncheckedCreateWithoutTimeEntriesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutTimeEntriesInput
    connect?: TaskWhereUniqueInput
  }

  export type ClientCreateNestedOneWithoutTimeEntriesInput = {
    create?: XOR<ClientCreateWithoutTimeEntriesInput, ClientUncheckedCreateWithoutTimeEntriesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutTimeEntriesInput
    connect?: ClientWhereUniqueInput
  }

  export type EnumTimeEntryStatusFieldUpdateOperationsInput = {
    set?: $Enums.TimeEntryStatus
  }

  export type UserUpdateOneRequiredWithoutTimeEntriesNestedInput = {
    create?: XOR<UserCreateWithoutTimeEntriesInput, UserUncheckedCreateWithoutTimeEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTimeEntriesInput
    upsert?: UserUpsertWithoutTimeEntriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTimeEntriesInput, UserUpdateWithoutTimeEntriesInput>, UserUncheckedUpdateWithoutTimeEntriesInput>
  }

  export type TaskUpdateOneRequiredWithoutTimeEntriesNestedInput = {
    create?: XOR<TaskCreateWithoutTimeEntriesInput, TaskUncheckedCreateWithoutTimeEntriesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutTimeEntriesInput
    upsert?: TaskUpsertWithoutTimeEntriesInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutTimeEntriesInput, TaskUpdateWithoutTimeEntriesInput>, TaskUncheckedUpdateWithoutTimeEntriesInput>
  }

  export type ClientUpdateOneRequiredWithoutTimeEntriesNestedInput = {
    create?: XOR<ClientCreateWithoutTimeEntriesInput, ClientUncheckedCreateWithoutTimeEntriesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutTimeEntriesInput
    upsert?: ClientUpsertWithoutTimeEntriesInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutTimeEntriesInput, ClientUpdateWithoutTimeEntriesInput>, ClientUncheckedUpdateWithoutTimeEntriesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[]
    notIn?: $Enums.UserRole[]
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[]
    notIn?: $Enums.UserRole[]
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTaskPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskPriority | EnumTaskPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TaskPriority[]
    notIn?: $Enums.TaskPriority[]
    not?: NestedEnumTaskPriorityFilter<$PrismaModel> | $Enums.TaskPriority
  }

  export type NestedEnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[]
    notIn?: $Enums.TaskStatus[]
    not?: NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus
  }

  export type NestedEnumTaskPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskPriority | EnumTaskPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TaskPriority[]
    notIn?: $Enums.TaskPriority[]
    not?: NestedEnumTaskPriorityWithAggregatesFilter<$PrismaModel> | $Enums.TaskPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskPriorityFilter<$PrismaModel>
    _max?: NestedEnumTaskPriorityFilter<$PrismaModel>
  }

  export type NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[]
    notIn?: $Enums.TaskStatus[]
    not?: NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumTaskActivityActionFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskActivityAction | EnumTaskActivityActionFieldRefInput<$PrismaModel>
    in?: $Enums.TaskActivityAction[]
    notIn?: $Enums.TaskActivityAction[]
    not?: NestedEnumTaskActivityActionFilter<$PrismaModel> | $Enums.TaskActivityAction
  }

  export type NestedEnumTaskActivityActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskActivityAction | EnumTaskActivityActionFieldRefInput<$PrismaModel>
    in?: $Enums.TaskActivityAction[]
    notIn?: $Enums.TaskActivityAction[]
    not?: NestedEnumTaskActivityActionWithAggregatesFilter<$PrismaModel> | $Enums.TaskActivityAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskActivityActionFilter<$PrismaModel>
    _max?: NestedEnumTaskActivityActionFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumTimeEntryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeEntryStatus | EnumTimeEntryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TimeEntryStatus[]
    notIn?: $Enums.TimeEntryStatus[]
    not?: NestedEnumTimeEntryStatusFilter<$PrismaModel> | $Enums.TimeEntryStatus
  }

  export type NestedEnumTimeEntryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeEntryStatus | EnumTimeEntryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TimeEntryStatus[]
    notIn?: $Enums.TimeEntryStatus[]
    not?: NestedEnumTimeEntryStatusWithAggregatesFilter<$PrismaModel> | $Enums.TimeEntryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTimeEntryStatusFilter<$PrismaModel>
    _max?: NestedEnumTimeEntryStatusFilter<$PrismaModel>
  }

  export type ClientCreateWithoutUserInput = {
    name: string
    description?: string | null
    monthlyAllowanceMinutes?: number
    billable?: boolean
    archivedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutClientInput
    timeEntries?: TimeEntryCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    description?: string | null
    monthlyAllowanceMinutes?: number
    billable?: boolean
    archivedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutClientInput
    timeEntries?: TimeEntryUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutUserInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput>
  }

  export type ClientCreateManyUserInputEnvelope = {
    data: ClientCreateManyUserInput | ClientCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutUserInput = {
    title: string
    descriptionHtml?: string | null
    priority?: $Enums.TaskPriority
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutTasksInput
    labels?: TaskLabelCreateNestedManyWithoutTasksInput
    attachments?: TaskAttachmentCreateNestedManyWithoutTaskInput
    comments?: TaskCommentCreateNestedManyWithoutTaskInput
    activities?: TaskActivityCreateNestedManyWithoutTaskInput
    timeEntries?: TimeEntryCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutUserInput = {
    id?: number
    title: string
    descriptionHtml?: string | null
    priority?: $Enums.TaskPriority
    status?: $Enums.TaskStatus
    clientId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    labels?: TaskLabelUncheckedCreateNestedManyWithoutTasksInput
    attachments?: TaskAttachmentUncheckedCreateNestedManyWithoutTaskInput
    comments?: TaskCommentUncheckedCreateNestedManyWithoutTaskInput
    activities?: TaskActivityUncheckedCreateNestedManyWithoutTaskInput
    timeEntries?: TimeEntryUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutUserInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput>
  }

  export type TaskCreateManyUserInputEnvelope = {
    data: TaskCreateManyUserInput | TaskCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TimeEntryCreateWithoutUserInput = {
    startTime: Date | string
    endTime?: Date | string | null
    durationSeconds: number
    totalPausedSeconds?: number
    pausedAt?: Date | string | null
    status?: $Enums.TimeEntryStatus
    description?: string | null
    isManual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    task: TaskCreateNestedOneWithoutTimeEntriesInput
    client: ClientCreateNestedOneWithoutTimeEntriesInput
  }

  export type TimeEntryUncheckedCreateWithoutUserInput = {
    id?: number
    taskId: number
    clientId: number
    startTime: Date | string
    endTime?: Date | string | null
    durationSeconds: number
    totalPausedSeconds?: number
    pausedAt?: Date | string | null
    status?: $Enums.TimeEntryStatus
    description?: string | null
    isManual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeEntryCreateOrConnectWithoutUserInput = {
    where: TimeEntryWhereUniqueInput
    create: XOR<TimeEntryCreateWithoutUserInput, TimeEntryUncheckedCreateWithoutUserInput>
  }

  export type TimeEntryCreateManyUserInputEnvelope = {
    data: TimeEntryCreateManyUserInput | TimeEntryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskAttachmentCreateWithoutUploadedByUserInput = {
    fileName: string
    originalName: string
    fileSize: number
    mimeType: string
    filePath: string
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutAttachmentsInput
  }

  export type TaskAttachmentUncheckedCreateWithoutUploadedByUserInput = {
    id?: number
    taskId: number
    fileName: string
    originalName: string
    fileSize: number
    mimeType: string
    filePath: string
    createdAt?: Date | string
  }

  export type TaskAttachmentCreateOrConnectWithoutUploadedByUserInput = {
    where: TaskAttachmentWhereUniqueInput
    create: XOR<TaskAttachmentCreateWithoutUploadedByUserInput, TaskAttachmentUncheckedCreateWithoutUploadedByUserInput>
  }

  export type TaskAttachmentCreateManyUploadedByUserInputEnvelope = {
    data: TaskAttachmentCreateManyUploadedByUserInput | TaskAttachmentCreateManyUploadedByUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskCommentCreateWithoutUserInput = {
    content: string
    editedAt?: Date | string | null
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutCommentsInput
    parent?: TaskCommentCreateNestedOneWithoutRepliesInput
    replies?: TaskCommentCreateNestedManyWithoutParentInput
  }

  export type TaskCommentUncheckedCreateWithoutUserInput = {
    id?: number
    taskId: number
    parentId?: number | null
    content: string
    editedAt?: Date | string | null
    createdAt?: Date | string
    replies?: TaskCommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type TaskCommentCreateOrConnectWithoutUserInput = {
    where: TaskCommentWhereUniqueInput
    create: XOR<TaskCommentCreateWithoutUserInput, TaskCommentUncheckedCreateWithoutUserInput>
  }

  export type TaskCommentCreateManyUserInputEnvelope = {
    data: TaskCommentCreateManyUserInput | TaskCommentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskActivityCreateWithoutUserInput = {
    action: $Enums.TaskActivityAction
    entityType: string
    entityId?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutActivitiesInput
  }

  export type TaskActivityUncheckedCreateWithoutUserInput = {
    id?: number
    taskId: number
    action: $Enums.TaskActivityAction
    entityType: string
    entityId?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TaskActivityCreateOrConnectWithoutUserInput = {
    where: TaskActivityWhereUniqueInput
    create: XOR<TaskActivityCreateWithoutUserInput, TaskActivityUncheckedCreateWithoutUserInput>
  }

  export type TaskActivityCreateManyUserInputEnvelope = {
    data: TaskActivityCreateManyUserInput | TaskActivityCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TeamCreateWithoutCreatedByInput = {
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: TeamMemberCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutCreatedByInput = {
    id?: number
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: TeamMemberUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutCreatedByInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutCreatedByInput, TeamUncheckedCreateWithoutCreatedByInput>
  }

  export type TeamCreateManyCreatedByInputEnvelope = {
    data: TeamCreateManyCreatedByInput | TeamCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type TeamMemberCreateWithoutUserInput = {
    role: $Enums.UserRole
    joinedAt?: Date | string
    team: TeamCreateNestedOneWithoutMembersInput
  }

  export type TeamMemberUncheckedCreateWithoutUserInput = {
    id?: number
    teamId: number
    role: $Enums.UserRole
    joinedAt?: Date | string
  }

  export type TeamMemberCreateOrConnectWithoutUserInput = {
    where: TeamMemberWhereUniqueInput
    create: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput>
  }

  export type TeamMemberCreateManyUserInputEnvelope = {
    data: TeamMemberCreateManyUserInput | TeamMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ClientUpsertWithWhereUniqueWithoutUserInput = {
    where: ClientWhereUniqueInput
    update: XOR<ClientUpdateWithoutUserInput, ClientUncheckedUpdateWithoutUserInput>
    create: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput>
  }

  export type ClientUpdateWithWhereUniqueWithoutUserInput = {
    where: ClientWhereUniqueInput
    data: XOR<ClientUpdateWithoutUserInput, ClientUncheckedUpdateWithoutUserInput>
  }

  export type ClientUpdateManyWithWhereWithoutUserInput = {
    where: ClientScalarWhereInput
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyWithoutUserInput>
  }

  export type ClientScalarWhereInput = {
    AND?: ClientScalarWhereInput | ClientScalarWhereInput[]
    OR?: ClientScalarWhereInput[]
    NOT?: ClientScalarWhereInput | ClientScalarWhereInput[]
    id?: IntFilter<"Client"> | number
    name?: StringFilter<"Client"> | string
    description?: StringNullableFilter<"Client"> | string | null
    monthlyAllowanceMinutes?: IntFilter<"Client"> | number
    billable?: BoolFilter<"Client"> | boolean
    archivedAt?: DateTimeNullableFilter<"Client"> | Date | string | null
    userId?: IntFilter<"Client"> | number
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
  }

  export type TaskUpsertWithWhereUniqueWithoutUserInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutUserInput, TaskUncheckedUpdateWithoutUserInput>
    create: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutUserInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutUserInput, TaskUncheckedUpdateWithoutUserInput>
  }

  export type TaskUpdateManyWithWhereWithoutUserInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutUserInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: IntFilter<"Task"> | number
    title?: StringFilter<"Task"> | string
    descriptionHtml?: StringNullableFilter<"Task"> | string | null
    priority?: EnumTaskPriorityFilter<"Task"> | $Enums.TaskPriority
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    clientId?: IntFilter<"Task"> | number
    userId?: IntFilter<"Task"> | number
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
  }

  export type TimeEntryUpsertWithWhereUniqueWithoutUserInput = {
    where: TimeEntryWhereUniqueInput
    update: XOR<TimeEntryUpdateWithoutUserInput, TimeEntryUncheckedUpdateWithoutUserInput>
    create: XOR<TimeEntryCreateWithoutUserInput, TimeEntryUncheckedCreateWithoutUserInput>
  }

  export type TimeEntryUpdateWithWhereUniqueWithoutUserInput = {
    where: TimeEntryWhereUniqueInput
    data: XOR<TimeEntryUpdateWithoutUserInput, TimeEntryUncheckedUpdateWithoutUserInput>
  }

  export type TimeEntryUpdateManyWithWhereWithoutUserInput = {
    where: TimeEntryScalarWhereInput
    data: XOR<TimeEntryUpdateManyMutationInput, TimeEntryUncheckedUpdateManyWithoutUserInput>
  }

  export type TimeEntryScalarWhereInput = {
    AND?: TimeEntryScalarWhereInput | TimeEntryScalarWhereInput[]
    OR?: TimeEntryScalarWhereInput[]
    NOT?: TimeEntryScalarWhereInput | TimeEntryScalarWhereInput[]
    id?: IntFilter<"TimeEntry"> | number
    userId?: IntFilter<"TimeEntry"> | number
    taskId?: IntFilter<"TimeEntry"> | number
    clientId?: IntFilter<"TimeEntry"> | number
    startTime?: DateTimeFilter<"TimeEntry"> | Date | string
    endTime?: DateTimeNullableFilter<"TimeEntry"> | Date | string | null
    durationSeconds?: IntFilter<"TimeEntry"> | number
    totalPausedSeconds?: IntFilter<"TimeEntry"> | number
    pausedAt?: DateTimeNullableFilter<"TimeEntry"> | Date | string | null
    status?: EnumTimeEntryStatusFilter<"TimeEntry"> | $Enums.TimeEntryStatus
    description?: StringNullableFilter<"TimeEntry"> | string | null
    isManual?: BoolFilter<"TimeEntry"> | boolean
    createdAt?: DateTimeFilter<"TimeEntry"> | Date | string
    updatedAt?: DateTimeFilter<"TimeEntry"> | Date | string
  }

  export type TaskAttachmentUpsertWithWhereUniqueWithoutUploadedByUserInput = {
    where: TaskAttachmentWhereUniqueInput
    update: XOR<TaskAttachmentUpdateWithoutUploadedByUserInput, TaskAttachmentUncheckedUpdateWithoutUploadedByUserInput>
    create: XOR<TaskAttachmentCreateWithoutUploadedByUserInput, TaskAttachmentUncheckedCreateWithoutUploadedByUserInput>
  }

  export type TaskAttachmentUpdateWithWhereUniqueWithoutUploadedByUserInput = {
    where: TaskAttachmentWhereUniqueInput
    data: XOR<TaskAttachmentUpdateWithoutUploadedByUserInput, TaskAttachmentUncheckedUpdateWithoutUploadedByUserInput>
  }

  export type TaskAttachmentUpdateManyWithWhereWithoutUploadedByUserInput = {
    where: TaskAttachmentScalarWhereInput
    data: XOR<TaskAttachmentUpdateManyMutationInput, TaskAttachmentUncheckedUpdateManyWithoutUploadedByUserInput>
  }

  export type TaskAttachmentScalarWhereInput = {
    AND?: TaskAttachmentScalarWhereInput | TaskAttachmentScalarWhereInput[]
    OR?: TaskAttachmentScalarWhereInput[]
    NOT?: TaskAttachmentScalarWhereInput | TaskAttachmentScalarWhereInput[]
    id?: IntFilter<"TaskAttachment"> | number
    taskId?: IntFilter<"TaskAttachment"> | number
    uploadedBy?: IntFilter<"TaskAttachment"> | number
    fileName?: StringFilter<"TaskAttachment"> | string
    originalName?: StringFilter<"TaskAttachment"> | string
    fileSize?: IntFilter<"TaskAttachment"> | number
    mimeType?: StringFilter<"TaskAttachment"> | string
    filePath?: StringFilter<"TaskAttachment"> | string
    createdAt?: DateTimeFilter<"TaskAttachment"> | Date | string
  }

  export type TaskCommentUpsertWithWhereUniqueWithoutUserInput = {
    where: TaskCommentWhereUniqueInput
    update: XOR<TaskCommentUpdateWithoutUserInput, TaskCommentUncheckedUpdateWithoutUserInput>
    create: XOR<TaskCommentCreateWithoutUserInput, TaskCommentUncheckedCreateWithoutUserInput>
  }

  export type TaskCommentUpdateWithWhereUniqueWithoutUserInput = {
    where: TaskCommentWhereUniqueInput
    data: XOR<TaskCommentUpdateWithoutUserInput, TaskCommentUncheckedUpdateWithoutUserInput>
  }

  export type TaskCommentUpdateManyWithWhereWithoutUserInput = {
    where: TaskCommentScalarWhereInput
    data: XOR<TaskCommentUpdateManyMutationInput, TaskCommentUncheckedUpdateManyWithoutUserInput>
  }

  export type TaskCommentScalarWhereInput = {
    AND?: TaskCommentScalarWhereInput | TaskCommentScalarWhereInput[]
    OR?: TaskCommentScalarWhereInput[]
    NOT?: TaskCommentScalarWhereInput | TaskCommentScalarWhereInput[]
    id?: IntFilter<"TaskComment"> | number
    taskId?: IntFilter<"TaskComment"> | number
    userId?: IntFilter<"TaskComment"> | number
    parentId?: IntNullableFilter<"TaskComment"> | number | null
    content?: StringFilter<"TaskComment"> | string
    editedAt?: DateTimeNullableFilter<"TaskComment"> | Date | string | null
    createdAt?: DateTimeFilter<"TaskComment"> | Date | string
  }

  export type TaskActivityUpsertWithWhereUniqueWithoutUserInput = {
    where: TaskActivityWhereUniqueInput
    update: XOR<TaskActivityUpdateWithoutUserInput, TaskActivityUncheckedUpdateWithoutUserInput>
    create: XOR<TaskActivityCreateWithoutUserInput, TaskActivityUncheckedCreateWithoutUserInput>
  }

  export type TaskActivityUpdateWithWhereUniqueWithoutUserInput = {
    where: TaskActivityWhereUniqueInput
    data: XOR<TaskActivityUpdateWithoutUserInput, TaskActivityUncheckedUpdateWithoutUserInput>
  }

  export type TaskActivityUpdateManyWithWhereWithoutUserInput = {
    where: TaskActivityScalarWhereInput
    data: XOR<TaskActivityUpdateManyMutationInput, TaskActivityUncheckedUpdateManyWithoutUserInput>
  }

  export type TaskActivityScalarWhereInput = {
    AND?: TaskActivityScalarWhereInput | TaskActivityScalarWhereInput[]
    OR?: TaskActivityScalarWhereInput[]
    NOT?: TaskActivityScalarWhereInput | TaskActivityScalarWhereInput[]
    id?: IntFilter<"TaskActivity"> | number
    taskId?: IntFilter<"TaskActivity"> | number
    userId?: IntFilter<"TaskActivity"> | number
    action?: EnumTaskActivityActionFilter<"TaskActivity"> | $Enums.TaskActivityAction
    entityType?: StringFilter<"TaskActivity"> | string
    entityId?: IntNullableFilter<"TaskActivity"> | number | null
    metadata?: JsonNullableFilter<"TaskActivity">
    createdAt?: DateTimeFilter<"TaskActivity"> | Date | string
  }

  export type TeamUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: TeamWhereUniqueInput
    update: XOR<TeamUpdateWithoutCreatedByInput, TeamUncheckedUpdateWithoutCreatedByInput>
    create: XOR<TeamCreateWithoutCreatedByInput, TeamUncheckedCreateWithoutCreatedByInput>
  }

  export type TeamUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: TeamWhereUniqueInput
    data: XOR<TeamUpdateWithoutCreatedByInput, TeamUncheckedUpdateWithoutCreatedByInput>
  }

  export type TeamUpdateManyWithWhereWithoutCreatedByInput = {
    where: TeamScalarWhereInput
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type TeamScalarWhereInput = {
    AND?: TeamScalarWhereInput | TeamScalarWhereInput[]
    OR?: TeamScalarWhereInput[]
    NOT?: TeamScalarWhereInput | TeamScalarWhereInput[]
    id?: IntFilter<"Team"> | number
    name?: StringFilter<"Team"> | string
    description?: StringNullableFilter<"Team"> | string | null
    createdById?: IntFilter<"Team"> | number
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
  }

  export type TeamMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: TeamMemberWhereUniqueInput
    update: XOR<TeamMemberUpdateWithoutUserInput, TeamMemberUncheckedUpdateWithoutUserInput>
    create: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput>
  }

  export type TeamMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: TeamMemberWhereUniqueInput
    data: XOR<TeamMemberUpdateWithoutUserInput, TeamMemberUncheckedUpdateWithoutUserInput>
  }

  export type TeamMemberUpdateManyWithWhereWithoutUserInput = {
    where: TeamMemberScalarWhereInput
    data: XOR<TeamMemberUpdateManyMutationInput, TeamMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type TeamMemberScalarWhereInput = {
    AND?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
    OR?: TeamMemberScalarWhereInput[]
    NOT?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
    id?: IntFilter<"TeamMember"> | number
    teamId?: IntFilter<"TeamMember"> | number
    userId?: IntFilter<"TeamMember"> | number
    role?: EnumUserRoleFilter<"TeamMember"> | $Enums.UserRole
    joinedAt?: DateTimeFilter<"TeamMember"> | Date | string
  }

  export type UserCreateWithoutCreatedTeamsInput = {
    name: string
    email: string
    password: string
    systemRole?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clients?: ClientCreateNestedManyWithoutUserInput
    assignedTasks?: TaskCreateNestedManyWithoutUserInput
    timeEntries?: TimeEntryCreateNestedManyWithoutUserInput
    uploadedAttachments?: TaskAttachmentCreateNestedManyWithoutUploadedByUserInput
    taskComments?: TaskCommentCreateNestedManyWithoutUserInput
    taskActivities?: TaskActivityCreateNestedManyWithoutUserInput
    teamMemberships?: TeamMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedTeamsInput = {
    id?: number
    name: string
    email: string
    password: string
    systemRole?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clients?: ClientUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    timeEntries?: TimeEntryUncheckedCreateNestedManyWithoutUserInput
    uploadedAttachments?: TaskAttachmentUncheckedCreateNestedManyWithoutUploadedByUserInput
    taskComments?: TaskCommentUncheckedCreateNestedManyWithoutUserInput
    taskActivities?: TaskActivityUncheckedCreateNestedManyWithoutUserInput
    teamMemberships?: TeamMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedTeamsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedTeamsInput, UserUncheckedCreateWithoutCreatedTeamsInput>
  }

  export type TeamMemberCreateWithoutTeamInput = {
    role: $Enums.UserRole
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutTeamMembershipsInput
  }

  export type TeamMemberUncheckedCreateWithoutTeamInput = {
    id?: number
    userId: number
    role: $Enums.UserRole
    joinedAt?: Date | string
  }

  export type TeamMemberCreateOrConnectWithoutTeamInput = {
    where: TeamMemberWhereUniqueInput
    create: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput>
  }

  export type TeamMemberCreateManyTeamInputEnvelope = {
    data: TeamMemberCreateManyTeamInput | TeamMemberCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedTeamsInput = {
    update: XOR<UserUpdateWithoutCreatedTeamsInput, UserUncheckedUpdateWithoutCreatedTeamsInput>
    create: XOR<UserCreateWithoutCreatedTeamsInput, UserUncheckedCreateWithoutCreatedTeamsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedTeamsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedTeamsInput, UserUncheckedUpdateWithoutCreatedTeamsInput>
  }

  export type UserUpdateWithoutCreatedTeamsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    systemRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUpdateManyWithoutUserNestedInput
    timeEntries?: TimeEntryUpdateManyWithoutUserNestedInput
    uploadedAttachments?: TaskAttachmentUpdateManyWithoutUploadedByUserNestedInput
    taskComments?: TaskCommentUpdateManyWithoutUserNestedInput
    taskActivities?: TaskActivityUpdateManyWithoutUserNestedInput
    teamMemberships?: TeamMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedTeamsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    systemRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    timeEntries?: TimeEntryUncheckedUpdateManyWithoutUserNestedInput
    uploadedAttachments?: TaskAttachmentUncheckedUpdateManyWithoutUploadedByUserNestedInput
    taskComments?: TaskCommentUncheckedUpdateManyWithoutUserNestedInput
    taskActivities?: TaskActivityUncheckedUpdateManyWithoutUserNestedInput
    teamMemberships?: TeamMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TeamMemberUpsertWithWhereUniqueWithoutTeamInput = {
    where: TeamMemberWhereUniqueInput
    update: XOR<TeamMemberUpdateWithoutTeamInput, TeamMemberUncheckedUpdateWithoutTeamInput>
    create: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput>
  }

  export type TeamMemberUpdateWithWhereUniqueWithoutTeamInput = {
    where: TeamMemberWhereUniqueInput
    data: XOR<TeamMemberUpdateWithoutTeamInput, TeamMemberUncheckedUpdateWithoutTeamInput>
  }

  export type TeamMemberUpdateManyWithWhereWithoutTeamInput = {
    where: TeamMemberScalarWhereInput
    data: XOR<TeamMemberUpdateManyMutationInput, TeamMemberUncheckedUpdateManyWithoutTeamInput>
  }

  export type TeamCreateWithoutMembersInput = {
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedTeamsInput
  }

  export type TeamUncheckedCreateWithoutMembersInput = {
    id?: number
    name: string
    description?: string | null
    createdById: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamCreateOrConnectWithoutMembersInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutMembersInput, TeamUncheckedCreateWithoutMembersInput>
  }

  export type UserCreateWithoutTeamMembershipsInput = {
    name: string
    email: string
    password: string
    systemRole?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clients?: ClientCreateNestedManyWithoutUserInput
    assignedTasks?: TaskCreateNestedManyWithoutUserInput
    timeEntries?: TimeEntryCreateNestedManyWithoutUserInput
    uploadedAttachments?: TaskAttachmentCreateNestedManyWithoutUploadedByUserInput
    taskComments?: TaskCommentCreateNestedManyWithoutUserInput
    taskActivities?: TaskActivityCreateNestedManyWithoutUserInput
    createdTeams?: TeamCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutTeamMembershipsInput = {
    id?: number
    name: string
    email: string
    password: string
    systemRole?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clients?: ClientUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    timeEntries?: TimeEntryUncheckedCreateNestedManyWithoutUserInput
    uploadedAttachments?: TaskAttachmentUncheckedCreateNestedManyWithoutUploadedByUserInput
    taskComments?: TaskCommentUncheckedCreateNestedManyWithoutUserInput
    taskActivities?: TaskActivityUncheckedCreateNestedManyWithoutUserInput
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutTeamMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTeamMembershipsInput, UserUncheckedCreateWithoutTeamMembershipsInput>
  }

  export type TeamUpsertWithoutMembersInput = {
    update: XOR<TeamUpdateWithoutMembersInput, TeamUncheckedUpdateWithoutMembersInput>
    create: XOR<TeamCreateWithoutMembersInput, TeamUncheckedCreateWithoutMembersInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutMembersInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutMembersInput, TeamUncheckedUpdateWithoutMembersInput>
  }

  export type TeamUpdateWithoutMembersInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedTeamsNestedInput
  }

  export type TeamUncheckedUpdateWithoutMembersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutTeamMembershipsInput = {
    update: XOR<UserUpdateWithoutTeamMembershipsInput, UserUncheckedUpdateWithoutTeamMembershipsInput>
    create: XOR<UserCreateWithoutTeamMembershipsInput, UserUncheckedCreateWithoutTeamMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTeamMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTeamMembershipsInput, UserUncheckedUpdateWithoutTeamMembershipsInput>
  }

  export type UserUpdateWithoutTeamMembershipsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    systemRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUpdateManyWithoutUserNestedInput
    timeEntries?: TimeEntryUpdateManyWithoutUserNestedInput
    uploadedAttachments?: TaskAttachmentUpdateManyWithoutUploadedByUserNestedInput
    taskComments?: TaskCommentUpdateManyWithoutUserNestedInput
    taskActivities?: TaskActivityUpdateManyWithoutUserNestedInput
    createdTeams?: TeamUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutTeamMembershipsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    systemRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    timeEntries?: TimeEntryUncheckedUpdateManyWithoutUserNestedInput
    uploadedAttachments?: TaskAttachmentUncheckedUpdateManyWithoutUploadedByUserNestedInput
    taskComments?: TaskCommentUncheckedUpdateManyWithoutUserNestedInput
    taskActivities?: TaskActivityUncheckedUpdateManyWithoutUserNestedInput
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateWithoutClientsInput = {
    name: string
    email: string
    password: string
    systemRole?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTasks?: TaskCreateNestedManyWithoutUserInput
    timeEntries?: TimeEntryCreateNestedManyWithoutUserInput
    uploadedAttachments?: TaskAttachmentCreateNestedManyWithoutUploadedByUserInput
    taskComments?: TaskCommentCreateNestedManyWithoutUserInput
    taskActivities?: TaskActivityCreateNestedManyWithoutUserInput
    createdTeams?: TeamCreateNestedManyWithoutCreatedByInput
    teamMemberships?: TeamMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutClientsInput = {
    id?: number
    name: string
    email: string
    password: string
    systemRole?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    timeEntries?: TimeEntryUncheckedCreateNestedManyWithoutUserInput
    uploadedAttachments?: TaskAttachmentUncheckedCreateNestedManyWithoutUploadedByUserInput
    taskComments?: TaskCommentUncheckedCreateNestedManyWithoutUserInput
    taskActivities?: TaskActivityUncheckedCreateNestedManyWithoutUserInput
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatedByInput
    teamMemberships?: TeamMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutClientsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClientsInput, UserUncheckedCreateWithoutClientsInput>
  }

  export type TaskCreateWithoutClientInput = {
    title: string
    descriptionHtml?: string | null
    priority?: $Enums.TaskPriority
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAssignedTasksInput
    labels?: TaskLabelCreateNestedManyWithoutTasksInput
    attachments?: TaskAttachmentCreateNestedManyWithoutTaskInput
    comments?: TaskCommentCreateNestedManyWithoutTaskInput
    activities?: TaskActivityCreateNestedManyWithoutTaskInput
    timeEntries?: TimeEntryCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutClientInput = {
    id?: number
    title: string
    descriptionHtml?: string | null
    priority?: $Enums.TaskPriority
    status?: $Enums.TaskStatus
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    labels?: TaskLabelUncheckedCreateNestedManyWithoutTasksInput
    attachments?: TaskAttachmentUncheckedCreateNestedManyWithoutTaskInput
    comments?: TaskCommentUncheckedCreateNestedManyWithoutTaskInput
    activities?: TaskActivityUncheckedCreateNestedManyWithoutTaskInput
    timeEntries?: TimeEntryUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutClientInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutClientInput, TaskUncheckedCreateWithoutClientInput>
  }

  export type TaskCreateManyClientInputEnvelope = {
    data: TaskCreateManyClientInput | TaskCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type TimeEntryCreateWithoutClientInput = {
    startTime: Date | string
    endTime?: Date | string | null
    durationSeconds: number
    totalPausedSeconds?: number
    pausedAt?: Date | string | null
    status?: $Enums.TimeEntryStatus
    description?: string | null
    isManual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTimeEntriesInput
    task: TaskCreateNestedOneWithoutTimeEntriesInput
  }

  export type TimeEntryUncheckedCreateWithoutClientInput = {
    id?: number
    userId: number
    taskId: number
    startTime: Date | string
    endTime?: Date | string | null
    durationSeconds: number
    totalPausedSeconds?: number
    pausedAt?: Date | string | null
    status?: $Enums.TimeEntryStatus
    description?: string | null
    isManual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeEntryCreateOrConnectWithoutClientInput = {
    where: TimeEntryWhereUniqueInput
    create: XOR<TimeEntryCreateWithoutClientInput, TimeEntryUncheckedCreateWithoutClientInput>
  }

  export type TimeEntryCreateManyClientInputEnvelope = {
    data: TimeEntryCreateManyClientInput | TimeEntryCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutClientsInput = {
    update: XOR<UserUpdateWithoutClientsInput, UserUncheckedUpdateWithoutClientsInput>
    create: XOR<UserCreateWithoutClientsInput, UserUncheckedCreateWithoutClientsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClientsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClientsInput, UserUncheckedUpdateWithoutClientsInput>
  }

  export type UserUpdateWithoutClientsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    systemRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTasks?: TaskUpdateManyWithoutUserNestedInput
    timeEntries?: TimeEntryUpdateManyWithoutUserNestedInput
    uploadedAttachments?: TaskAttachmentUpdateManyWithoutUploadedByUserNestedInput
    taskComments?: TaskCommentUpdateManyWithoutUserNestedInput
    taskActivities?: TaskActivityUpdateManyWithoutUserNestedInput
    createdTeams?: TeamUpdateManyWithoutCreatedByNestedInput
    teamMemberships?: TeamMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutClientsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    systemRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    timeEntries?: TimeEntryUncheckedUpdateManyWithoutUserNestedInput
    uploadedAttachments?: TaskAttachmentUncheckedUpdateManyWithoutUploadedByUserNestedInput
    taskComments?: TaskCommentUncheckedUpdateManyWithoutUserNestedInput
    taskActivities?: TaskActivityUncheckedUpdateManyWithoutUserNestedInput
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatedByNestedInput
    teamMemberships?: TeamMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TaskUpsertWithWhereUniqueWithoutClientInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutClientInput, TaskUncheckedUpdateWithoutClientInput>
    create: XOR<TaskCreateWithoutClientInput, TaskUncheckedCreateWithoutClientInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutClientInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutClientInput, TaskUncheckedUpdateWithoutClientInput>
  }

  export type TaskUpdateManyWithWhereWithoutClientInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutClientInput>
  }

  export type TimeEntryUpsertWithWhereUniqueWithoutClientInput = {
    where: TimeEntryWhereUniqueInput
    update: XOR<TimeEntryUpdateWithoutClientInput, TimeEntryUncheckedUpdateWithoutClientInput>
    create: XOR<TimeEntryCreateWithoutClientInput, TimeEntryUncheckedCreateWithoutClientInput>
  }

  export type TimeEntryUpdateWithWhereUniqueWithoutClientInput = {
    where: TimeEntryWhereUniqueInput
    data: XOR<TimeEntryUpdateWithoutClientInput, TimeEntryUncheckedUpdateWithoutClientInput>
  }

  export type TimeEntryUpdateManyWithWhereWithoutClientInput = {
    where: TimeEntryScalarWhereInput
    data: XOR<TimeEntryUpdateManyMutationInput, TimeEntryUncheckedUpdateManyWithoutClientInput>
  }

  export type ClientCreateWithoutTasksInput = {
    name: string
    description?: string | null
    monthlyAllowanceMinutes?: number
    billable?: boolean
    archivedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutClientsInput
    timeEntries?: TimeEntryCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutTasksInput = {
    id?: number
    name: string
    description?: string | null
    monthlyAllowanceMinutes?: number
    billable?: boolean
    archivedAt?: Date | string | null
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    timeEntries?: TimeEntryUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutTasksInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutTasksInput, ClientUncheckedCreateWithoutTasksInput>
  }

  export type UserCreateWithoutAssignedTasksInput = {
    name: string
    email: string
    password: string
    systemRole?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clients?: ClientCreateNestedManyWithoutUserInput
    timeEntries?: TimeEntryCreateNestedManyWithoutUserInput
    uploadedAttachments?: TaskAttachmentCreateNestedManyWithoutUploadedByUserInput
    taskComments?: TaskCommentCreateNestedManyWithoutUserInput
    taskActivities?: TaskActivityCreateNestedManyWithoutUserInput
    createdTeams?: TeamCreateNestedManyWithoutCreatedByInput
    teamMemberships?: TeamMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAssignedTasksInput = {
    id?: number
    name: string
    email: string
    password: string
    systemRole?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clients?: ClientUncheckedCreateNestedManyWithoutUserInput
    timeEntries?: TimeEntryUncheckedCreateNestedManyWithoutUserInput
    uploadedAttachments?: TaskAttachmentUncheckedCreateNestedManyWithoutUploadedByUserInput
    taskComments?: TaskCommentUncheckedCreateNestedManyWithoutUserInput
    taskActivities?: TaskActivityUncheckedCreateNestedManyWithoutUserInput
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatedByInput
    teamMemberships?: TeamMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAssignedTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignedTasksInput, UserUncheckedCreateWithoutAssignedTasksInput>
  }

  export type TaskLabelCreateWithoutTasksInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskLabelUncheckedCreateWithoutTasksInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskLabelCreateOrConnectWithoutTasksInput = {
    where: TaskLabelWhereUniqueInput
    create: XOR<TaskLabelCreateWithoutTasksInput, TaskLabelUncheckedCreateWithoutTasksInput>
  }

  export type TaskAttachmentCreateWithoutTaskInput = {
    fileName: string
    originalName: string
    fileSize: number
    mimeType: string
    filePath: string
    createdAt?: Date | string
    uploadedByUser: UserCreateNestedOneWithoutUploadedAttachmentsInput
  }

  export type TaskAttachmentUncheckedCreateWithoutTaskInput = {
    id?: number
    uploadedBy: number
    fileName: string
    originalName: string
    fileSize: number
    mimeType: string
    filePath: string
    createdAt?: Date | string
  }

  export type TaskAttachmentCreateOrConnectWithoutTaskInput = {
    where: TaskAttachmentWhereUniqueInput
    create: XOR<TaskAttachmentCreateWithoutTaskInput, TaskAttachmentUncheckedCreateWithoutTaskInput>
  }

  export type TaskAttachmentCreateManyTaskInputEnvelope = {
    data: TaskAttachmentCreateManyTaskInput | TaskAttachmentCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type TaskCommentCreateWithoutTaskInput = {
    content: string
    editedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTaskCommentsInput
    parent?: TaskCommentCreateNestedOneWithoutRepliesInput
    replies?: TaskCommentCreateNestedManyWithoutParentInput
  }

  export type TaskCommentUncheckedCreateWithoutTaskInput = {
    id?: number
    userId: number
    parentId?: number | null
    content: string
    editedAt?: Date | string | null
    createdAt?: Date | string
    replies?: TaskCommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type TaskCommentCreateOrConnectWithoutTaskInput = {
    where: TaskCommentWhereUniqueInput
    create: XOR<TaskCommentCreateWithoutTaskInput, TaskCommentUncheckedCreateWithoutTaskInput>
  }

  export type TaskCommentCreateManyTaskInputEnvelope = {
    data: TaskCommentCreateManyTaskInput | TaskCommentCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type TaskActivityCreateWithoutTaskInput = {
    action: $Enums.TaskActivityAction
    entityType: string
    entityId?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTaskActivitiesInput
  }

  export type TaskActivityUncheckedCreateWithoutTaskInput = {
    id?: number
    userId: number
    action: $Enums.TaskActivityAction
    entityType: string
    entityId?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TaskActivityCreateOrConnectWithoutTaskInput = {
    where: TaskActivityWhereUniqueInput
    create: XOR<TaskActivityCreateWithoutTaskInput, TaskActivityUncheckedCreateWithoutTaskInput>
  }

  export type TaskActivityCreateManyTaskInputEnvelope = {
    data: TaskActivityCreateManyTaskInput | TaskActivityCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type TimeEntryCreateWithoutTaskInput = {
    startTime: Date | string
    endTime?: Date | string | null
    durationSeconds: number
    totalPausedSeconds?: number
    pausedAt?: Date | string | null
    status?: $Enums.TimeEntryStatus
    description?: string | null
    isManual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTimeEntriesInput
    client: ClientCreateNestedOneWithoutTimeEntriesInput
  }

  export type TimeEntryUncheckedCreateWithoutTaskInput = {
    id?: number
    userId: number
    clientId: number
    startTime: Date | string
    endTime?: Date | string | null
    durationSeconds: number
    totalPausedSeconds?: number
    pausedAt?: Date | string | null
    status?: $Enums.TimeEntryStatus
    description?: string | null
    isManual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeEntryCreateOrConnectWithoutTaskInput = {
    where: TimeEntryWhereUniqueInput
    create: XOR<TimeEntryCreateWithoutTaskInput, TimeEntryUncheckedCreateWithoutTaskInput>
  }

  export type TimeEntryCreateManyTaskInputEnvelope = {
    data: TimeEntryCreateManyTaskInput | TimeEntryCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type ClientUpsertWithoutTasksInput = {
    update: XOR<ClientUpdateWithoutTasksInput, ClientUncheckedUpdateWithoutTasksInput>
    create: XOR<ClientCreateWithoutTasksInput, ClientUncheckedCreateWithoutTasksInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutTasksInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutTasksInput, ClientUncheckedUpdateWithoutTasksInput>
  }

  export type ClientUpdateWithoutTasksInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyAllowanceMinutes?: IntFieldUpdateOperationsInput | number
    billable?: BoolFieldUpdateOperationsInput | boolean
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutClientsNestedInput
    timeEntries?: TimeEntryUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutTasksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyAllowanceMinutes?: IntFieldUpdateOperationsInput | number
    billable?: BoolFieldUpdateOperationsInput | boolean
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeEntries?: TimeEntryUncheckedUpdateManyWithoutClientNestedInput
  }

  export type UserUpsertWithoutAssignedTasksInput = {
    update: XOR<UserUpdateWithoutAssignedTasksInput, UserUncheckedUpdateWithoutAssignedTasksInput>
    create: XOR<UserCreateWithoutAssignedTasksInput, UserUncheckedCreateWithoutAssignedTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssignedTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssignedTasksInput, UserUncheckedUpdateWithoutAssignedTasksInput>
  }

  export type UserUpdateWithoutAssignedTasksInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    systemRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUpdateManyWithoutUserNestedInput
    timeEntries?: TimeEntryUpdateManyWithoutUserNestedInput
    uploadedAttachments?: TaskAttachmentUpdateManyWithoutUploadedByUserNestedInput
    taskComments?: TaskCommentUpdateManyWithoutUserNestedInput
    taskActivities?: TaskActivityUpdateManyWithoutUserNestedInput
    createdTeams?: TeamUpdateManyWithoutCreatedByNestedInput
    teamMemberships?: TeamMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAssignedTasksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    systemRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUncheckedUpdateManyWithoutUserNestedInput
    timeEntries?: TimeEntryUncheckedUpdateManyWithoutUserNestedInput
    uploadedAttachments?: TaskAttachmentUncheckedUpdateManyWithoutUploadedByUserNestedInput
    taskComments?: TaskCommentUncheckedUpdateManyWithoutUserNestedInput
    taskActivities?: TaskActivityUncheckedUpdateManyWithoutUserNestedInput
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatedByNestedInput
    teamMemberships?: TeamMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TaskLabelUpsertWithWhereUniqueWithoutTasksInput = {
    where: TaskLabelWhereUniqueInput
    update: XOR<TaskLabelUpdateWithoutTasksInput, TaskLabelUncheckedUpdateWithoutTasksInput>
    create: XOR<TaskLabelCreateWithoutTasksInput, TaskLabelUncheckedCreateWithoutTasksInput>
  }

  export type TaskLabelUpdateWithWhereUniqueWithoutTasksInput = {
    where: TaskLabelWhereUniqueInput
    data: XOR<TaskLabelUpdateWithoutTasksInput, TaskLabelUncheckedUpdateWithoutTasksInput>
  }

  export type TaskLabelUpdateManyWithWhereWithoutTasksInput = {
    where: TaskLabelScalarWhereInput
    data: XOR<TaskLabelUpdateManyMutationInput, TaskLabelUncheckedUpdateManyWithoutTasksInput>
  }

  export type TaskLabelScalarWhereInput = {
    AND?: TaskLabelScalarWhereInput | TaskLabelScalarWhereInput[]
    OR?: TaskLabelScalarWhereInput[]
    NOT?: TaskLabelScalarWhereInput | TaskLabelScalarWhereInput[]
    id?: IntFilter<"TaskLabel"> | number
    name?: StringFilter<"TaskLabel"> | string
    createdAt?: DateTimeFilter<"TaskLabel"> | Date | string
    updatedAt?: DateTimeFilter<"TaskLabel"> | Date | string
  }

  export type TaskAttachmentUpsertWithWhereUniqueWithoutTaskInput = {
    where: TaskAttachmentWhereUniqueInput
    update: XOR<TaskAttachmentUpdateWithoutTaskInput, TaskAttachmentUncheckedUpdateWithoutTaskInput>
    create: XOR<TaskAttachmentCreateWithoutTaskInput, TaskAttachmentUncheckedCreateWithoutTaskInput>
  }

  export type TaskAttachmentUpdateWithWhereUniqueWithoutTaskInput = {
    where: TaskAttachmentWhereUniqueInput
    data: XOR<TaskAttachmentUpdateWithoutTaskInput, TaskAttachmentUncheckedUpdateWithoutTaskInput>
  }

  export type TaskAttachmentUpdateManyWithWhereWithoutTaskInput = {
    where: TaskAttachmentScalarWhereInput
    data: XOR<TaskAttachmentUpdateManyMutationInput, TaskAttachmentUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskCommentUpsertWithWhereUniqueWithoutTaskInput = {
    where: TaskCommentWhereUniqueInput
    update: XOR<TaskCommentUpdateWithoutTaskInput, TaskCommentUncheckedUpdateWithoutTaskInput>
    create: XOR<TaskCommentCreateWithoutTaskInput, TaskCommentUncheckedCreateWithoutTaskInput>
  }

  export type TaskCommentUpdateWithWhereUniqueWithoutTaskInput = {
    where: TaskCommentWhereUniqueInput
    data: XOR<TaskCommentUpdateWithoutTaskInput, TaskCommentUncheckedUpdateWithoutTaskInput>
  }

  export type TaskCommentUpdateManyWithWhereWithoutTaskInput = {
    where: TaskCommentScalarWhereInput
    data: XOR<TaskCommentUpdateManyMutationInput, TaskCommentUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskActivityUpsertWithWhereUniqueWithoutTaskInput = {
    where: TaskActivityWhereUniqueInput
    update: XOR<TaskActivityUpdateWithoutTaskInput, TaskActivityUncheckedUpdateWithoutTaskInput>
    create: XOR<TaskActivityCreateWithoutTaskInput, TaskActivityUncheckedCreateWithoutTaskInput>
  }

  export type TaskActivityUpdateWithWhereUniqueWithoutTaskInput = {
    where: TaskActivityWhereUniqueInput
    data: XOR<TaskActivityUpdateWithoutTaskInput, TaskActivityUncheckedUpdateWithoutTaskInput>
  }

  export type TaskActivityUpdateManyWithWhereWithoutTaskInput = {
    where: TaskActivityScalarWhereInput
    data: XOR<TaskActivityUpdateManyMutationInput, TaskActivityUncheckedUpdateManyWithoutTaskInput>
  }

  export type TimeEntryUpsertWithWhereUniqueWithoutTaskInput = {
    where: TimeEntryWhereUniqueInput
    update: XOR<TimeEntryUpdateWithoutTaskInput, TimeEntryUncheckedUpdateWithoutTaskInput>
    create: XOR<TimeEntryCreateWithoutTaskInput, TimeEntryUncheckedCreateWithoutTaskInput>
  }

  export type TimeEntryUpdateWithWhereUniqueWithoutTaskInput = {
    where: TimeEntryWhereUniqueInput
    data: XOR<TimeEntryUpdateWithoutTaskInput, TimeEntryUncheckedUpdateWithoutTaskInput>
  }

  export type TimeEntryUpdateManyWithWhereWithoutTaskInput = {
    where: TimeEntryScalarWhereInput
    data: XOR<TimeEntryUpdateManyMutationInput, TimeEntryUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskCreateWithoutLabelsInput = {
    title: string
    descriptionHtml?: string | null
    priority?: $Enums.TaskPriority
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutTasksInput
    user: UserCreateNestedOneWithoutAssignedTasksInput
    attachments?: TaskAttachmentCreateNestedManyWithoutTaskInput
    comments?: TaskCommentCreateNestedManyWithoutTaskInput
    activities?: TaskActivityCreateNestedManyWithoutTaskInput
    timeEntries?: TimeEntryCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutLabelsInput = {
    id?: number
    title: string
    descriptionHtml?: string | null
    priority?: $Enums.TaskPriority
    status?: $Enums.TaskStatus
    clientId: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    attachments?: TaskAttachmentUncheckedCreateNestedManyWithoutTaskInput
    comments?: TaskCommentUncheckedCreateNestedManyWithoutTaskInput
    activities?: TaskActivityUncheckedCreateNestedManyWithoutTaskInput
    timeEntries?: TimeEntryUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutLabelsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutLabelsInput, TaskUncheckedCreateWithoutLabelsInput>
  }

  export type TaskUpsertWithWhereUniqueWithoutLabelsInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutLabelsInput, TaskUncheckedUpdateWithoutLabelsInput>
    create: XOR<TaskCreateWithoutLabelsInput, TaskUncheckedCreateWithoutLabelsInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutLabelsInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutLabelsInput, TaskUncheckedUpdateWithoutLabelsInput>
  }

  export type TaskUpdateManyWithWhereWithoutLabelsInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutLabelsInput>
  }

  export type TaskCreateWithoutAttachmentsInput = {
    title: string
    descriptionHtml?: string | null
    priority?: $Enums.TaskPriority
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutTasksInput
    user: UserCreateNestedOneWithoutAssignedTasksInput
    labels?: TaskLabelCreateNestedManyWithoutTasksInput
    comments?: TaskCommentCreateNestedManyWithoutTaskInput
    activities?: TaskActivityCreateNestedManyWithoutTaskInput
    timeEntries?: TimeEntryCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutAttachmentsInput = {
    id?: number
    title: string
    descriptionHtml?: string | null
    priority?: $Enums.TaskPriority
    status?: $Enums.TaskStatus
    clientId: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    labels?: TaskLabelUncheckedCreateNestedManyWithoutTasksInput
    comments?: TaskCommentUncheckedCreateNestedManyWithoutTaskInput
    activities?: TaskActivityUncheckedCreateNestedManyWithoutTaskInput
    timeEntries?: TimeEntryUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutAttachmentsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutAttachmentsInput, TaskUncheckedCreateWithoutAttachmentsInput>
  }

  export type UserCreateWithoutUploadedAttachmentsInput = {
    name: string
    email: string
    password: string
    systemRole?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clients?: ClientCreateNestedManyWithoutUserInput
    assignedTasks?: TaskCreateNestedManyWithoutUserInput
    timeEntries?: TimeEntryCreateNestedManyWithoutUserInput
    taskComments?: TaskCommentCreateNestedManyWithoutUserInput
    taskActivities?: TaskActivityCreateNestedManyWithoutUserInput
    createdTeams?: TeamCreateNestedManyWithoutCreatedByInput
    teamMemberships?: TeamMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUploadedAttachmentsInput = {
    id?: number
    name: string
    email: string
    password: string
    systemRole?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clients?: ClientUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    timeEntries?: TimeEntryUncheckedCreateNestedManyWithoutUserInput
    taskComments?: TaskCommentUncheckedCreateNestedManyWithoutUserInput
    taskActivities?: TaskActivityUncheckedCreateNestedManyWithoutUserInput
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatedByInput
    teamMemberships?: TeamMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUploadedAttachmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUploadedAttachmentsInput, UserUncheckedCreateWithoutUploadedAttachmentsInput>
  }

  export type TaskUpsertWithoutAttachmentsInput = {
    update: XOR<TaskUpdateWithoutAttachmentsInput, TaskUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<TaskCreateWithoutAttachmentsInput, TaskUncheckedCreateWithoutAttachmentsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutAttachmentsInput, TaskUncheckedUpdateWithoutAttachmentsInput>
  }

  export type TaskUpdateWithoutAttachmentsInput = {
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutTasksNestedInput
    user?: UserUpdateOneRequiredWithoutAssignedTasksNestedInput
    labels?: TaskLabelUpdateManyWithoutTasksNestedInput
    comments?: TaskCommentUpdateManyWithoutTaskNestedInput
    activities?: TaskActivityUpdateManyWithoutTaskNestedInput
    timeEntries?: TimeEntryUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutAttachmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    clientId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    labels?: TaskLabelUncheckedUpdateManyWithoutTasksNestedInput
    comments?: TaskCommentUncheckedUpdateManyWithoutTaskNestedInput
    activities?: TaskActivityUncheckedUpdateManyWithoutTaskNestedInput
    timeEntries?: TimeEntryUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type UserUpsertWithoutUploadedAttachmentsInput = {
    update: XOR<UserUpdateWithoutUploadedAttachmentsInput, UserUncheckedUpdateWithoutUploadedAttachmentsInput>
    create: XOR<UserCreateWithoutUploadedAttachmentsInput, UserUncheckedCreateWithoutUploadedAttachmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUploadedAttachmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUploadedAttachmentsInput, UserUncheckedUpdateWithoutUploadedAttachmentsInput>
  }

  export type UserUpdateWithoutUploadedAttachmentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    systemRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUpdateManyWithoutUserNestedInput
    timeEntries?: TimeEntryUpdateManyWithoutUserNestedInput
    taskComments?: TaskCommentUpdateManyWithoutUserNestedInput
    taskActivities?: TaskActivityUpdateManyWithoutUserNestedInput
    createdTeams?: TeamUpdateManyWithoutCreatedByNestedInput
    teamMemberships?: TeamMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUploadedAttachmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    systemRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    timeEntries?: TimeEntryUncheckedUpdateManyWithoutUserNestedInput
    taskComments?: TaskCommentUncheckedUpdateManyWithoutUserNestedInput
    taskActivities?: TaskActivityUncheckedUpdateManyWithoutUserNestedInput
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatedByNestedInput
    teamMemberships?: TeamMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TaskCreateWithoutCommentsInput = {
    title: string
    descriptionHtml?: string | null
    priority?: $Enums.TaskPriority
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutTasksInput
    user: UserCreateNestedOneWithoutAssignedTasksInput
    labels?: TaskLabelCreateNestedManyWithoutTasksInput
    attachments?: TaskAttachmentCreateNestedManyWithoutTaskInput
    activities?: TaskActivityCreateNestedManyWithoutTaskInput
    timeEntries?: TimeEntryCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutCommentsInput = {
    id?: number
    title: string
    descriptionHtml?: string | null
    priority?: $Enums.TaskPriority
    status?: $Enums.TaskStatus
    clientId: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    labels?: TaskLabelUncheckedCreateNestedManyWithoutTasksInput
    attachments?: TaskAttachmentUncheckedCreateNestedManyWithoutTaskInput
    activities?: TaskActivityUncheckedCreateNestedManyWithoutTaskInput
    timeEntries?: TimeEntryUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutCommentsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutCommentsInput, TaskUncheckedCreateWithoutCommentsInput>
  }

  export type UserCreateWithoutTaskCommentsInput = {
    name: string
    email: string
    password: string
    systemRole?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clients?: ClientCreateNestedManyWithoutUserInput
    assignedTasks?: TaskCreateNestedManyWithoutUserInput
    timeEntries?: TimeEntryCreateNestedManyWithoutUserInput
    uploadedAttachments?: TaskAttachmentCreateNestedManyWithoutUploadedByUserInput
    taskActivities?: TaskActivityCreateNestedManyWithoutUserInput
    createdTeams?: TeamCreateNestedManyWithoutCreatedByInput
    teamMemberships?: TeamMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTaskCommentsInput = {
    id?: number
    name: string
    email: string
    password: string
    systemRole?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clients?: ClientUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    timeEntries?: TimeEntryUncheckedCreateNestedManyWithoutUserInput
    uploadedAttachments?: TaskAttachmentUncheckedCreateNestedManyWithoutUploadedByUserInput
    taskActivities?: TaskActivityUncheckedCreateNestedManyWithoutUserInput
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatedByInput
    teamMemberships?: TeamMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTaskCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTaskCommentsInput, UserUncheckedCreateWithoutTaskCommentsInput>
  }

  export type TaskCommentCreateWithoutRepliesInput = {
    content: string
    editedAt?: Date | string | null
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutCommentsInput
    user: UserCreateNestedOneWithoutTaskCommentsInput
    parent?: TaskCommentCreateNestedOneWithoutRepliesInput
  }

  export type TaskCommentUncheckedCreateWithoutRepliesInput = {
    id?: number
    taskId: number
    userId: number
    parentId?: number | null
    content: string
    editedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type TaskCommentCreateOrConnectWithoutRepliesInput = {
    where: TaskCommentWhereUniqueInput
    create: XOR<TaskCommentCreateWithoutRepliesInput, TaskCommentUncheckedCreateWithoutRepliesInput>
  }

  export type TaskCommentCreateWithoutParentInput = {
    content: string
    editedAt?: Date | string | null
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutCommentsInput
    user: UserCreateNestedOneWithoutTaskCommentsInput
    replies?: TaskCommentCreateNestedManyWithoutParentInput
  }

  export type TaskCommentUncheckedCreateWithoutParentInput = {
    id?: number
    taskId: number
    userId: number
    content: string
    editedAt?: Date | string | null
    createdAt?: Date | string
    replies?: TaskCommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type TaskCommentCreateOrConnectWithoutParentInput = {
    where: TaskCommentWhereUniqueInput
    create: XOR<TaskCommentCreateWithoutParentInput, TaskCommentUncheckedCreateWithoutParentInput>
  }

  export type TaskCommentCreateManyParentInputEnvelope = {
    data: TaskCommentCreateManyParentInput | TaskCommentCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type TaskUpsertWithoutCommentsInput = {
    update: XOR<TaskUpdateWithoutCommentsInput, TaskUncheckedUpdateWithoutCommentsInput>
    create: XOR<TaskCreateWithoutCommentsInput, TaskUncheckedCreateWithoutCommentsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutCommentsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutCommentsInput, TaskUncheckedUpdateWithoutCommentsInput>
  }

  export type TaskUpdateWithoutCommentsInput = {
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutTasksNestedInput
    user?: UserUpdateOneRequiredWithoutAssignedTasksNestedInput
    labels?: TaskLabelUpdateManyWithoutTasksNestedInput
    attachments?: TaskAttachmentUpdateManyWithoutTaskNestedInput
    activities?: TaskActivityUpdateManyWithoutTaskNestedInput
    timeEntries?: TimeEntryUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    clientId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    labels?: TaskLabelUncheckedUpdateManyWithoutTasksNestedInput
    attachments?: TaskAttachmentUncheckedUpdateManyWithoutTaskNestedInput
    activities?: TaskActivityUncheckedUpdateManyWithoutTaskNestedInput
    timeEntries?: TimeEntryUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type UserUpsertWithoutTaskCommentsInput = {
    update: XOR<UserUpdateWithoutTaskCommentsInput, UserUncheckedUpdateWithoutTaskCommentsInput>
    create: XOR<UserCreateWithoutTaskCommentsInput, UserUncheckedCreateWithoutTaskCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTaskCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTaskCommentsInput, UserUncheckedUpdateWithoutTaskCommentsInput>
  }

  export type UserUpdateWithoutTaskCommentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    systemRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUpdateManyWithoutUserNestedInput
    timeEntries?: TimeEntryUpdateManyWithoutUserNestedInput
    uploadedAttachments?: TaskAttachmentUpdateManyWithoutUploadedByUserNestedInput
    taskActivities?: TaskActivityUpdateManyWithoutUserNestedInput
    createdTeams?: TeamUpdateManyWithoutCreatedByNestedInput
    teamMemberships?: TeamMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTaskCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    systemRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    timeEntries?: TimeEntryUncheckedUpdateManyWithoutUserNestedInput
    uploadedAttachments?: TaskAttachmentUncheckedUpdateManyWithoutUploadedByUserNestedInput
    taskActivities?: TaskActivityUncheckedUpdateManyWithoutUserNestedInput
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatedByNestedInput
    teamMemberships?: TeamMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TaskCommentUpsertWithoutRepliesInput = {
    update: XOR<TaskCommentUpdateWithoutRepliesInput, TaskCommentUncheckedUpdateWithoutRepliesInput>
    create: XOR<TaskCommentCreateWithoutRepliesInput, TaskCommentUncheckedCreateWithoutRepliesInput>
    where?: TaskCommentWhereInput
  }

  export type TaskCommentUpdateToOneWithWhereWithoutRepliesInput = {
    where?: TaskCommentWhereInput
    data: XOR<TaskCommentUpdateWithoutRepliesInput, TaskCommentUncheckedUpdateWithoutRepliesInput>
  }

  export type TaskCommentUpdateWithoutRepliesInput = {
    content?: StringFieldUpdateOperationsInput | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutCommentsNestedInput
    user?: UserUpdateOneRequiredWithoutTaskCommentsNestedInput
    parent?: TaskCommentUpdateOneWithoutRepliesNestedInput
  }

  export type TaskCommentUncheckedUpdateWithoutRepliesInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCommentUpsertWithWhereUniqueWithoutParentInput = {
    where: TaskCommentWhereUniqueInput
    update: XOR<TaskCommentUpdateWithoutParentInput, TaskCommentUncheckedUpdateWithoutParentInput>
    create: XOR<TaskCommentCreateWithoutParentInput, TaskCommentUncheckedCreateWithoutParentInput>
  }

  export type TaskCommentUpdateWithWhereUniqueWithoutParentInput = {
    where: TaskCommentWhereUniqueInput
    data: XOR<TaskCommentUpdateWithoutParentInput, TaskCommentUncheckedUpdateWithoutParentInput>
  }

  export type TaskCommentUpdateManyWithWhereWithoutParentInput = {
    where: TaskCommentScalarWhereInput
    data: XOR<TaskCommentUpdateManyMutationInput, TaskCommentUncheckedUpdateManyWithoutParentInput>
  }

  export type TaskCreateWithoutActivitiesInput = {
    title: string
    descriptionHtml?: string | null
    priority?: $Enums.TaskPriority
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutTasksInput
    user: UserCreateNestedOneWithoutAssignedTasksInput
    labels?: TaskLabelCreateNestedManyWithoutTasksInput
    attachments?: TaskAttachmentCreateNestedManyWithoutTaskInput
    comments?: TaskCommentCreateNestedManyWithoutTaskInput
    timeEntries?: TimeEntryCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutActivitiesInput = {
    id?: number
    title: string
    descriptionHtml?: string | null
    priority?: $Enums.TaskPriority
    status?: $Enums.TaskStatus
    clientId: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    labels?: TaskLabelUncheckedCreateNestedManyWithoutTasksInput
    attachments?: TaskAttachmentUncheckedCreateNestedManyWithoutTaskInput
    comments?: TaskCommentUncheckedCreateNestedManyWithoutTaskInput
    timeEntries?: TimeEntryUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutActivitiesInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutActivitiesInput, TaskUncheckedCreateWithoutActivitiesInput>
  }

  export type UserCreateWithoutTaskActivitiesInput = {
    name: string
    email: string
    password: string
    systemRole?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clients?: ClientCreateNestedManyWithoutUserInput
    assignedTasks?: TaskCreateNestedManyWithoutUserInput
    timeEntries?: TimeEntryCreateNestedManyWithoutUserInput
    uploadedAttachments?: TaskAttachmentCreateNestedManyWithoutUploadedByUserInput
    taskComments?: TaskCommentCreateNestedManyWithoutUserInput
    createdTeams?: TeamCreateNestedManyWithoutCreatedByInput
    teamMemberships?: TeamMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTaskActivitiesInput = {
    id?: number
    name: string
    email: string
    password: string
    systemRole?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clients?: ClientUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    timeEntries?: TimeEntryUncheckedCreateNestedManyWithoutUserInput
    uploadedAttachments?: TaskAttachmentUncheckedCreateNestedManyWithoutUploadedByUserInput
    taskComments?: TaskCommentUncheckedCreateNestedManyWithoutUserInput
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatedByInput
    teamMemberships?: TeamMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTaskActivitiesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTaskActivitiesInput, UserUncheckedCreateWithoutTaskActivitiesInput>
  }

  export type TaskUpsertWithoutActivitiesInput = {
    update: XOR<TaskUpdateWithoutActivitiesInput, TaskUncheckedUpdateWithoutActivitiesInput>
    create: XOR<TaskCreateWithoutActivitiesInput, TaskUncheckedCreateWithoutActivitiesInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutActivitiesInput, TaskUncheckedUpdateWithoutActivitiesInput>
  }

  export type TaskUpdateWithoutActivitiesInput = {
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutTasksNestedInput
    user?: UserUpdateOneRequiredWithoutAssignedTasksNestedInput
    labels?: TaskLabelUpdateManyWithoutTasksNestedInput
    attachments?: TaskAttachmentUpdateManyWithoutTaskNestedInput
    comments?: TaskCommentUpdateManyWithoutTaskNestedInput
    timeEntries?: TimeEntryUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutActivitiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    clientId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    labels?: TaskLabelUncheckedUpdateManyWithoutTasksNestedInput
    attachments?: TaskAttachmentUncheckedUpdateManyWithoutTaskNestedInput
    comments?: TaskCommentUncheckedUpdateManyWithoutTaskNestedInput
    timeEntries?: TimeEntryUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type UserUpsertWithoutTaskActivitiesInput = {
    update: XOR<UserUpdateWithoutTaskActivitiesInput, UserUncheckedUpdateWithoutTaskActivitiesInput>
    create: XOR<UserCreateWithoutTaskActivitiesInput, UserUncheckedCreateWithoutTaskActivitiesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTaskActivitiesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTaskActivitiesInput, UserUncheckedUpdateWithoutTaskActivitiesInput>
  }

  export type UserUpdateWithoutTaskActivitiesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    systemRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUpdateManyWithoutUserNestedInput
    timeEntries?: TimeEntryUpdateManyWithoutUserNestedInput
    uploadedAttachments?: TaskAttachmentUpdateManyWithoutUploadedByUserNestedInput
    taskComments?: TaskCommentUpdateManyWithoutUserNestedInput
    createdTeams?: TeamUpdateManyWithoutCreatedByNestedInput
    teamMemberships?: TeamMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTaskActivitiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    systemRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    timeEntries?: TimeEntryUncheckedUpdateManyWithoutUserNestedInput
    uploadedAttachments?: TaskAttachmentUncheckedUpdateManyWithoutUploadedByUserNestedInput
    taskComments?: TaskCommentUncheckedUpdateManyWithoutUserNestedInput
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatedByNestedInput
    teamMemberships?: TeamMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutTimeEntriesInput = {
    name: string
    email: string
    password: string
    systemRole?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clients?: ClientCreateNestedManyWithoutUserInput
    assignedTasks?: TaskCreateNestedManyWithoutUserInput
    uploadedAttachments?: TaskAttachmentCreateNestedManyWithoutUploadedByUserInput
    taskComments?: TaskCommentCreateNestedManyWithoutUserInput
    taskActivities?: TaskActivityCreateNestedManyWithoutUserInput
    createdTeams?: TeamCreateNestedManyWithoutCreatedByInput
    teamMemberships?: TeamMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTimeEntriesInput = {
    id?: number
    name: string
    email: string
    password: string
    systemRole?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clients?: ClientUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    uploadedAttachments?: TaskAttachmentUncheckedCreateNestedManyWithoutUploadedByUserInput
    taskComments?: TaskCommentUncheckedCreateNestedManyWithoutUserInput
    taskActivities?: TaskActivityUncheckedCreateNestedManyWithoutUserInput
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatedByInput
    teamMemberships?: TeamMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTimeEntriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTimeEntriesInput, UserUncheckedCreateWithoutTimeEntriesInput>
  }

  export type TaskCreateWithoutTimeEntriesInput = {
    title: string
    descriptionHtml?: string | null
    priority?: $Enums.TaskPriority
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutTasksInput
    user: UserCreateNestedOneWithoutAssignedTasksInput
    labels?: TaskLabelCreateNestedManyWithoutTasksInput
    attachments?: TaskAttachmentCreateNestedManyWithoutTaskInput
    comments?: TaskCommentCreateNestedManyWithoutTaskInput
    activities?: TaskActivityCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutTimeEntriesInput = {
    id?: number
    title: string
    descriptionHtml?: string | null
    priority?: $Enums.TaskPriority
    status?: $Enums.TaskStatus
    clientId: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    labels?: TaskLabelUncheckedCreateNestedManyWithoutTasksInput
    attachments?: TaskAttachmentUncheckedCreateNestedManyWithoutTaskInput
    comments?: TaskCommentUncheckedCreateNestedManyWithoutTaskInput
    activities?: TaskActivityUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutTimeEntriesInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutTimeEntriesInput, TaskUncheckedCreateWithoutTimeEntriesInput>
  }

  export type ClientCreateWithoutTimeEntriesInput = {
    name: string
    description?: string | null
    monthlyAllowanceMinutes?: number
    billable?: boolean
    archivedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutClientsInput
    tasks?: TaskCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutTimeEntriesInput = {
    id?: number
    name: string
    description?: string | null
    monthlyAllowanceMinutes?: number
    billable?: boolean
    archivedAt?: Date | string | null
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutTimeEntriesInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutTimeEntriesInput, ClientUncheckedCreateWithoutTimeEntriesInput>
  }

  export type UserUpsertWithoutTimeEntriesInput = {
    update: XOR<UserUpdateWithoutTimeEntriesInput, UserUncheckedUpdateWithoutTimeEntriesInput>
    create: XOR<UserCreateWithoutTimeEntriesInput, UserUncheckedCreateWithoutTimeEntriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTimeEntriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTimeEntriesInput, UserUncheckedUpdateWithoutTimeEntriesInput>
  }

  export type UserUpdateWithoutTimeEntriesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    systemRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUpdateManyWithoutUserNestedInput
    uploadedAttachments?: TaskAttachmentUpdateManyWithoutUploadedByUserNestedInput
    taskComments?: TaskCommentUpdateManyWithoutUserNestedInput
    taskActivities?: TaskActivityUpdateManyWithoutUserNestedInput
    createdTeams?: TeamUpdateManyWithoutCreatedByNestedInput
    teamMemberships?: TeamMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTimeEntriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    systemRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    uploadedAttachments?: TaskAttachmentUncheckedUpdateManyWithoutUploadedByUserNestedInput
    taskComments?: TaskCommentUncheckedUpdateManyWithoutUserNestedInput
    taskActivities?: TaskActivityUncheckedUpdateManyWithoutUserNestedInput
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatedByNestedInput
    teamMemberships?: TeamMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TaskUpsertWithoutTimeEntriesInput = {
    update: XOR<TaskUpdateWithoutTimeEntriesInput, TaskUncheckedUpdateWithoutTimeEntriesInput>
    create: XOR<TaskCreateWithoutTimeEntriesInput, TaskUncheckedCreateWithoutTimeEntriesInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutTimeEntriesInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutTimeEntriesInput, TaskUncheckedUpdateWithoutTimeEntriesInput>
  }

  export type TaskUpdateWithoutTimeEntriesInput = {
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutTasksNestedInput
    user?: UserUpdateOneRequiredWithoutAssignedTasksNestedInput
    labels?: TaskLabelUpdateManyWithoutTasksNestedInput
    attachments?: TaskAttachmentUpdateManyWithoutTaskNestedInput
    comments?: TaskCommentUpdateManyWithoutTaskNestedInput
    activities?: TaskActivityUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutTimeEntriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    clientId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    labels?: TaskLabelUncheckedUpdateManyWithoutTasksNestedInput
    attachments?: TaskAttachmentUncheckedUpdateManyWithoutTaskNestedInput
    comments?: TaskCommentUncheckedUpdateManyWithoutTaskNestedInput
    activities?: TaskActivityUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type ClientUpsertWithoutTimeEntriesInput = {
    update: XOR<ClientUpdateWithoutTimeEntriesInput, ClientUncheckedUpdateWithoutTimeEntriesInput>
    create: XOR<ClientCreateWithoutTimeEntriesInput, ClientUncheckedCreateWithoutTimeEntriesInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutTimeEntriesInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutTimeEntriesInput, ClientUncheckedUpdateWithoutTimeEntriesInput>
  }

  export type ClientUpdateWithoutTimeEntriesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyAllowanceMinutes?: IntFieldUpdateOperationsInput | number
    billable?: BoolFieldUpdateOperationsInput | boolean
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutClientsNestedInput
    tasks?: TaskUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutTimeEntriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyAllowanceMinutes?: IntFieldUpdateOperationsInput | number
    billable?: BoolFieldUpdateOperationsInput | boolean
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateManyUserInput = {
    id?: number
    name: string
    description?: string | null
    monthlyAllowanceMinutes?: number
    billable?: boolean
    archivedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateManyUserInput = {
    id?: number
    title: string
    descriptionHtml?: string | null
    priority?: $Enums.TaskPriority
    status?: $Enums.TaskStatus
    clientId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeEntryCreateManyUserInput = {
    id?: number
    taskId: number
    clientId: number
    startTime: Date | string
    endTime?: Date | string | null
    durationSeconds: number
    totalPausedSeconds?: number
    pausedAt?: Date | string | null
    status?: $Enums.TimeEntryStatus
    description?: string | null
    isManual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskAttachmentCreateManyUploadedByUserInput = {
    id?: number
    taskId: number
    fileName: string
    originalName: string
    fileSize: number
    mimeType: string
    filePath: string
    createdAt?: Date | string
  }

  export type TaskCommentCreateManyUserInput = {
    id?: number
    taskId: number
    parentId?: number | null
    content: string
    editedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type TaskActivityCreateManyUserInput = {
    id?: number
    taskId: number
    action: $Enums.TaskActivityAction
    entityType: string
    entityId?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TeamCreateManyCreatedByInput = {
    id?: number
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamMemberCreateManyUserInput = {
    id?: number
    teamId: number
    role: $Enums.UserRole
    joinedAt?: Date | string
  }

  export type ClientUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyAllowanceMinutes?: IntFieldUpdateOperationsInput | number
    billable?: BoolFieldUpdateOperationsInput | boolean
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutClientNestedInput
    timeEntries?: TimeEntryUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyAllowanceMinutes?: IntFieldUpdateOperationsInput | number
    billable?: BoolFieldUpdateOperationsInput | boolean
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutClientNestedInput
    timeEntries?: TimeEntryUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyAllowanceMinutes?: IntFieldUpdateOperationsInput | number
    billable?: BoolFieldUpdateOperationsInput | boolean
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutTasksNestedInput
    labels?: TaskLabelUpdateManyWithoutTasksNestedInput
    attachments?: TaskAttachmentUpdateManyWithoutTaskNestedInput
    comments?: TaskCommentUpdateManyWithoutTaskNestedInput
    activities?: TaskActivityUpdateManyWithoutTaskNestedInput
    timeEntries?: TimeEntryUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    clientId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    labels?: TaskLabelUncheckedUpdateManyWithoutTasksNestedInput
    attachments?: TaskAttachmentUncheckedUpdateManyWithoutTaskNestedInput
    comments?: TaskCommentUncheckedUpdateManyWithoutTaskNestedInput
    activities?: TaskActivityUncheckedUpdateManyWithoutTaskNestedInput
    timeEntries?: TimeEntryUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    clientId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeEntryUpdateWithoutUserInput = {
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: IntFieldUpdateOperationsInput | number
    totalPausedSeconds?: IntFieldUpdateOperationsInput | number
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTimeEntryStatusFieldUpdateOperationsInput | $Enums.TimeEntryStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isManual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutTimeEntriesNestedInput
    client?: ClientUpdateOneRequiredWithoutTimeEntriesNestedInput
  }

  export type TimeEntryUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    clientId?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: IntFieldUpdateOperationsInput | number
    totalPausedSeconds?: IntFieldUpdateOperationsInput | number
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTimeEntryStatusFieldUpdateOperationsInput | $Enums.TimeEntryStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isManual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeEntryUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    clientId?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: IntFieldUpdateOperationsInput | number
    totalPausedSeconds?: IntFieldUpdateOperationsInput | number
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTimeEntryStatusFieldUpdateOperationsInput | $Enums.TimeEntryStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isManual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskAttachmentUpdateWithoutUploadedByUserInput = {
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutAttachmentsNestedInput
  }

  export type TaskAttachmentUncheckedUpdateWithoutUploadedByUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskAttachmentUncheckedUpdateManyWithoutUploadedByUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCommentUpdateWithoutUserInput = {
    content?: StringFieldUpdateOperationsInput | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutCommentsNestedInput
    parent?: TaskCommentUpdateOneWithoutRepliesNestedInput
    replies?: TaskCommentUpdateManyWithoutParentNestedInput
  }

  export type TaskCommentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: TaskCommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type TaskCommentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskActivityUpdateWithoutUserInput = {
    action?: EnumTaskActivityActionFieldUpdateOperationsInput | $Enums.TaskActivityAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutActivitiesNestedInput
  }

  export type TaskActivityUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    action?: EnumTaskActivityActionFieldUpdateOperationsInput | $Enums.TaskActivityAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskActivityUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    action?: EnumTaskActivityActionFieldUpdateOperationsInput | $Enums.TaskActivityAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUpdateWithoutCreatedByInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: TeamMemberUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: TeamMemberUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateManyWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberUpdateWithoutUserInput = {
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutMembersNestedInput
  }

  export type TeamMemberUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    teamId?: IntFieldUpdateOperationsInput | number
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    teamId?: IntFieldUpdateOperationsInput | number
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberCreateManyTeamInput = {
    id?: number
    userId: number
    role: $Enums.UserRole
    joinedAt?: Date | string
  }

  export type TeamMemberUpdateWithoutTeamInput = {
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTeamMembershipsNestedInput
  }

  export type TeamMemberUncheckedUpdateWithoutTeamInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberUncheckedUpdateManyWithoutTeamInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateManyClientInput = {
    id?: number
    title: string
    descriptionHtml?: string | null
    priority?: $Enums.TaskPriority
    status?: $Enums.TaskStatus
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeEntryCreateManyClientInput = {
    id?: number
    userId: number
    taskId: number
    startTime: Date | string
    endTime?: Date | string | null
    durationSeconds: number
    totalPausedSeconds?: number
    pausedAt?: Date | string | null
    status?: $Enums.TimeEntryStatus
    description?: string | null
    isManual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateWithoutClientInput = {
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAssignedTasksNestedInput
    labels?: TaskLabelUpdateManyWithoutTasksNestedInput
    attachments?: TaskAttachmentUpdateManyWithoutTaskNestedInput
    comments?: TaskCommentUpdateManyWithoutTaskNestedInput
    activities?: TaskActivityUpdateManyWithoutTaskNestedInput
    timeEntries?: TimeEntryUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutClientInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    labels?: TaskLabelUncheckedUpdateManyWithoutTasksNestedInput
    attachments?: TaskAttachmentUncheckedUpdateManyWithoutTaskNestedInput
    comments?: TaskCommentUncheckedUpdateManyWithoutTaskNestedInput
    activities?: TaskActivityUncheckedUpdateManyWithoutTaskNestedInput
    timeEntries?: TimeEntryUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutClientInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeEntryUpdateWithoutClientInput = {
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: IntFieldUpdateOperationsInput | number
    totalPausedSeconds?: IntFieldUpdateOperationsInput | number
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTimeEntryStatusFieldUpdateOperationsInput | $Enums.TimeEntryStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isManual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTimeEntriesNestedInput
    task?: TaskUpdateOneRequiredWithoutTimeEntriesNestedInput
  }

  export type TimeEntryUncheckedUpdateWithoutClientInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: IntFieldUpdateOperationsInput | number
    totalPausedSeconds?: IntFieldUpdateOperationsInput | number
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTimeEntryStatusFieldUpdateOperationsInput | $Enums.TimeEntryStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isManual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeEntryUncheckedUpdateManyWithoutClientInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: IntFieldUpdateOperationsInput | number
    totalPausedSeconds?: IntFieldUpdateOperationsInput | number
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTimeEntryStatusFieldUpdateOperationsInput | $Enums.TimeEntryStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isManual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskAttachmentCreateManyTaskInput = {
    id?: number
    uploadedBy: number
    fileName: string
    originalName: string
    fileSize: number
    mimeType: string
    filePath: string
    createdAt?: Date | string
  }

  export type TaskCommentCreateManyTaskInput = {
    id?: number
    userId: number
    parentId?: number | null
    content: string
    editedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type TaskActivityCreateManyTaskInput = {
    id?: number
    userId: number
    action: $Enums.TaskActivityAction
    entityType: string
    entityId?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TimeEntryCreateManyTaskInput = {
    id?: number
    userId: number
    clientId: number
    startTime: Date | string
    endTime?: Date | string | null
    durationSeconds: number
    totalPausedSeconds?: number
    pausedAt?: Date | string | null
    status?: $Enums.TimeEntryStatus
    description?: string | null
    isManual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskLabelUpdateWithoutTasksInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLabelUncheckedUpdateWithoutTasksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLabelUncheckedUpdateManyWithoutTasksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskAttachmentUpdateWithoutTaskInput = {
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedByUser?: UserUpdateOneRequiredWithoutUploadedAttachmentsNestedInput
  }

  export type TaskAttachmentUncheckedUpdateWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    uploadedBy?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskAttachmentUncheckedUpdateManyWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    uploadedBy?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCommentUpdateWithoutTaskInput = {
    content?: StringFieldUpdateOperationsInput | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTaskCommentsNestedInput
    parent?: TaskCommentUpdateOneWithoutRepliesNestedInput
    replies?: TaskCommentUpdateManyWithoutParentNestedInput
  }

  export type TaskCommentUncheckedUpdateWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: TaskCommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type TaskCommentUncheckedUpdateManyWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskActivityUpdateWithoutTaskInput = {
    action?: EnumTaskActivityActionFieldUpdateOperationsInput | $Enums.TaskActivityAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTaskActivitiesNestedInput
  }

  export type TaskActivityUncheckedUpdateWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    action?: EnumTaskActivityActionFieldUpdateOperationsInput | $Enums.TaskActivityAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskActivityUncheckedUpdateManyWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    action?: EnumTaskActivityActionFieldUpdateOperationsInput | $Enums.TaskActivityAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeEntryUpdateWithoutTaskInput = {
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: IntFieldUpdateOperationsInput | number
    totalPausedSeconds?: IntFieldUpdateOperationsInput | number
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTimeEntryStatusFieldUpdateOperationsInput | $Enums.TimeEntryStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isManual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTimeEntriesNestedInput
    client?: ClientUpdateOneRequiredWithoutTimeEntriesNestedInput
  }

  export type TimeEntryUncheckedUpdateWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    clientId?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: IntFieldUpdateOperationsInput | number
    totalPausedSeconds?: IntFieldUpdateOperationsInput | number
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTimeEntryStatusFieldUpdateOperationsInput | $Enums.TimeEntryStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isManual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeEntryUncheckedUpdateManyWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    clientId?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: IntFieldUpdateOperationsInput | number
    totalPausedSeconds?: IntFieldUpdateOperationsInput | number
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTimeEntryStatusFieldUpdateOperationsInput | $Enums.TimeEntryStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isManual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUpdateWithoutLabelsInput = {
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutTasksNestedInput
    user?: UserUpdateOneRequiredWithoutAssignedTasksNestedInput
    attachments?: TaskAttachmentUpdateManyWithoutTaskNestedInput
    comments?: TaskCommentUpdateManyWithoutTaskNestedInput
    activities?: TaskActivityUpdateManyWithoutTaskNestedInput
    timeEntries?: TimeEntryUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutLabelsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    clientId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: TaskAttachmentUncheckedUpdateManyWithoutTaskNestedInput
    comments?: TaskCommentUncheckedUpdateManyWithoutTaskNestedInput
    activities?: TaskActivityUncheckedUpdateManyWithoutTaskNestedInput
    timeEntries?: TimeEntryUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutLabelsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    clientId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCommentCreateManyParentInput = {
    id?: number
    taskId: number
    userId: number
    content: string
    editedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type TaskCommentUpdateWithoutParentInput = {
    content?: StringFieldUpdateOperationsInput | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutCommentsNestedInput
    user?: UserUpdateOneRequiredWithoutTaskCommentsNestedInput
    replies?: TaskCommentUpdateManyWithoutParentNestedInput
  }

  export type TaskCommentUncheckedUpdateWithoutParentInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: TaskCommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type TaskCommentUncheckedUpdateManyWithoutParentInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TeamCountOutputTypeDefaultArgs instead
     */
    export type TeamCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TeamCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClientCountOutputTypeDefaultArgs instead
     */
    export type ClientCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClientCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskCountOutputTypeDefaultArgs instead
     */
    export type TaskCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskLabelCountOutputTypeDefaultArgs instead
     */
    export type TaskLabelCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskLabelCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskCommentCountOutputTypeDefaultArgs instead
     */
    export type TaskCommentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskCommentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TeamDefaultArgs instead
     */
    export type TeamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TeamDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TeamMemberDefaultArgs instead
     */
    export type TeamMemberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TeamMemberDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClientDefaultArgs instead
     */
    export type ClientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClientDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskDefaultArgs instead
     */
    export type TaskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskLabelDefaultArgs instead
     */
    export type TaskLabelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskLabelDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskAttachmentDefaultArgs instead
     */
    export type TaskAttachmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskAttachmentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskCommentDefaultArgs instead
     */
    export type TaskCommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskCommentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskActivityDefaultArgs instead
     */
    export type TaskActivityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskActivityDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TimeEntryDefaultArgs instead
     */
    export type TimeEntryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TimeEntryDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}