/* tslint:disable */
/* eslint-disable */
export class SnowSystem {
  free(): void;
  constructor(width: number, height: number, snow_level_min: number, snow_level_max: number);
  update(delta_time: number): void;
  get_snowflakes(): Float64Array;
  set_dimensions(width: number, height: number): void;
  set_snow_level(min: number, max: number): void;
  clear(): void;
}
export class Snowflake {
  private constructor();
  free(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_snowflake_free: (a: number, b: number) => void;
  readonly __wbg_snowsystem_free: (a: number, b: number) => void;
  readonly snowsystem_new: (a: number, b: number, c: number, d: number) => number;
  readonly snowsystem_update: (a: number, b: number) => void;
  readonly snowsystem_get_snowflakes: (a: number) => any;
  readonly snowsystem_set_dimensions: (a: number, b: number, c: number) => void;
  readonly snowsystem_set_snow_level: (a: number, b: number, c: number) => void;
  readonly snowsystem_clear: (a: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
