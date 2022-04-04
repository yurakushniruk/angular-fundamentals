import { InjectionToken } from "@angular/core"

export const TOASTR_TOKEN = new InjectionToken<Toastr>('toastr')

export interface Toastr {
    success (msg: string, title?:string): void
    void (msg: string, title?:string): void
    warning (msg: string, title?:string): void
    info (msg: string, title?:string): void
}