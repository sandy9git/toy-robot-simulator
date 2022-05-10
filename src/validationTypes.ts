export type ValidationResult<T> = 
    | { ok: true, value: T }
    | { ok: false, errorMessages: string[]}