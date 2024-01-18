declare module 'class-request' {

    export class Https {

        constructor(routerPrive?: string);
        static config(data: { router: string; auth?: () => string; }): void
        Get<G, gMessageSuccess>(path: string, functionsCalculeUpload?: ((percentage: number) => void) | undefined, messageSuccess?: ((error: gMessageSuccess) => void) | undefined, messageErrorServer?: ((error: gMessageSuccess) => void) | undefined): Promise<G>
        Post<P, pMessageSuccess>(path: string, body: undefined | Object, functionsCalculeUpload?: ((percentage: number) => void) | undefined, messageSuccess?: ((error: pMessageSuccess) => void) | undefined, messageErrorServer?: ((error: pMessageSuccess) => void) | undefined): Promise<P>
        Delete<D, dMessageSuccess>(path: string, body: undefined | Object, functionsCalculeUpload?: ((percentage: number) => void) | undefined, messageSuccess?: ((error: dMessageSuccess) => void) | undefined, messageErrorServer?: ((error: dMessageSuccess) => void) | undefined): Promise<D>
        Put<Put, putMessageSuccess>(path: string, body: undefined | Object, functionsCalculeUpload?: ((percentage: number) => void) | undefined, messageSuccess?: ((error: putMessageSuccess) => void) | undefined, messageErrorServer?: ((error: putMessageSuccess) => void) | undefined): Promise<Put>
        getRouterPrive(): string 
              
    }
}