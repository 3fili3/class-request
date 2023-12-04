declare module 'class-request' {

    export class Https {

        constructor(routerPrive?: string);
        static config(data: { router: string, auth?: string }): void
        Get(path: string): Https
        Post(path: string, body: undefined | Object): Https
        Delete(path: string, body: undefined | Object): Https
        Put(path: string, body: undefined | Object): Https
        static ApiKey(apiKey: string): Https
        getRouterPrive(): string
        static setAuthorization(auth: string): void
        Builder<T>(functionError?: (error: any) => void, functionsCalculeUpload?: (percentage: number) => void): Promise<T>
        
    }
}