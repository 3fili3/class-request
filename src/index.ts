import axios, { AxiosProgressEvent } from 'axios'

export interface Error {
    status: number;
    message: String;
}

export interface ObsersableError {
    getError(error: Error): void
}

export class Https {
    
    private RouterPrivate: string;
    private Path: string;
    private Method: string;
    private Body: Object;
    private static Authorization: () => string
    private static RouterPrivateGlobal: string;

    public constructor(routerPrive?: string) {
        this.RouterPrivate = routerPrive as string
        this.Path = ''
        this.Method = ''
        this.Body = null as any
    }

    public static config(data: { router: string, auth?: () => string }) {
        Https.RouterPrivateGlobal = data.router
        if(data.auth != undefined) {
            Https.Authorization = data.auth
        }
    }
 
    public async Get<G, gMessageSuccess>(path: string, functionsCalculeUpload?: (percentage: number) => void ,messageSuccess?: (error: gMessageSuccess ) => void, messageErrorServer?: (error: gMessageSuccess) => void): Promise<G> {
        this.Path = path
        this.Method = 'GET'
        return await this.Builder<G, gMessageSuccess>(functionsCalculeUpload, messageSuccess, messageErrorServer)
    }

    public async Post<P, pMessageSuccess>(path: string, body: undefined | Object, functionsCalculeUpload?: (percentage: number) => void ,messageSuccess?: (error: pMessageSuccess ) => void, messageErrorServer?: (error: pMessageSuccess) => void): Promise<P> {
        this.Path = path
        this.Body = body as Object
        this.Method = 'POST'
        return await this.Builder<P, pMessageSuccess>(functionsCalculeUpload, messageSuccess, messageErrorServer)
    }

    public async Put<Put, putMessageSuccess>(path: string, body: undefined | Object, functionsCalculeUpload?: (percentage: number) => void ,messageSuccess?: (error: putMessageSuccess ) => void, messageErrorServer?: (error: putMessageSuccess) => void): Promise<Put> {
        this.Path = path
        this.Body = body as Object
        this.Method = 'PUT'
        return await this.Builder<Put, putMessageSuccess>(functionsCalculeUpload, messageSuccess, messageErrorServer)
    }

    public async Delete<D, dMessageSuccess>(path: string, body: undefined | Object, functionsCalculeUpload?: (percentage: number) => void ,messageSuccess?: (error: dMessageSuccess ) => void, messageErrorServer?: (error: dMessageSuccess) => void): Promise<D> {
        this.Path = path
        this.Body = body as Object
        this.Method = 'DELETE'
        return await this.Builder<D, dMessageSuccess>(functionsCalculeUpload, messageSuccess, messageErrorServer)
    }

    public getRouterPrive(): string {
        return this.RouterPrivate
    }

    private async Builder<T, tMessageErrorSuccess>(
        functionsCalculeUpload?: (percentage: number) => void, messageErrorSuccess?: (error: tMessageErrorSuccess) => void,
        messageErrorServer?: (error: tMessageErrorSuccess) => void
    ): Promise<T> {
        try {
            const token = Https.Authorization()
            const result = ((await axios({
                url: `${Https.RouterPrivateGlobal}${this.Path}`,
                method: this.Method,
                data: this.Body,
                headers: { authorization: token }
            })).data).service

            return result as T

        } catch (error) {

            const errorTemp: { response: { data: { status: number, message: string }} } = error as { response: { data: { status: number, message: string }} }
            const MessageErrorSuccess = { message: errorTemp.response.data.message, status: errorTemp.response.data.status } as tMessageErrorSuccess

            if(errorTemp.response.data.status === 200) {
                
                if(messageErrorSuccess != undefined) {
                    messageErrorSuccess(MessageErrorSuccess)
                    throw(MessageErrorSuccess)
                }
            } else {
                if(messageErrorServer != undefined) {
                    messageErrorServer(MessageErrorSuccess)
                    throw(MessageErrorSuccess)
                }
            }

            throw(MessageErrorSuccess)
        }
    }
}