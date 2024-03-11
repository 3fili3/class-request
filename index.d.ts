declare module 'class-request' {

    interface MessageError { status: number, message: string }

    export class Https {

        constructor(routerPrive?: string);
        static config(data: { router: string; auth?: (() => string) | undefined; functionError: (messageError: MessageError) => void; headers?: Object | undefined; }): void
        Get<G, gMessageSuccess>(path: string, messageSuccess?: ((error: gMessageSuccess) => void) | undefined, functionsCalculeUpload?: ((percentage: number) => void) | undefined): Promise<G>
        Post<P, pMessageSuccess>(path: string, body: undefined | Object, messageSuccess?: ((error: pMessageSuccess) => void) | undefined, functionsCalculeUpload?: ((percentage: number) => void) | undefined): Promise<P>
        Delete<D, dMessageSuccess>(path: string, body: undefined | Object, messageSuccess?: ((error: dMessageSuccess) => void) | undefined, functionsCalculeUpload?: ((percentage: number) => void) | undefined): Promise<D>
        Put<Put, putMessageSuccess>(path: string, body: undefined | Object, messageSuccess?: ((error: putMessageSuccess) => void) | undefined, functionsCalculeUpload?: ((percentage: number) => void) | undefined): Promise<Put>
        getRouterPrive(): string
              
    }
}