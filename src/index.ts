import axios, { AxiosProgressEvent } from 'axios'

export interface Error {
    status: number;
    message: String;
}

export interface ObsersableError {
    getError(error: Error): void
}

export interface MessageError { status: number, message: string }

export class Https {
    
    private RouterPrivate: string;
    private Path: string;
    private Method: string;
    private Body: Object;
    private static Authorization: () => string
    private static RouterPrivateGlobal: string;
    private static FunctionMessageError: (messageError: MessageError) => void
    private static Headers: Function;

    public constructor(routerPrive?: string) {
        this.RouterPrivate = routerPrive as string
        this.Path = ''
        this.Method = ''
        this.Body = null as any
    }

    public static config(data: { 
        router: string, auth?: () => string, functionError: (messageError: MessageError) => void, headers?: () => Object 
    }) {
        Https.RouterPrivateGlobal = data.router
        if(data.auth != undefined) {
            Https.Authorization = data.auth
        }
        if(data.functionError != undefined) {
            this.FunctionMessageError = data.functionError
        }

        if(data.headers != undefined) {
            Https.Headers = data.headers
        }
    }
 
    public async Get<G, gMessageSuccess>(path: string,messageSuccess?: (error: gMessageSuccess ) => void, functionsCalculeUpload?: (percentage: number) => void): Promise<G> {
        this.Path = path
        this.Method = 'GET'
        return await this.Builder<G, gMessageSuccess>(messageSuccess, functionsCalculeUpload)
    }

    public async Post<P, pMessageSuccess>(path: string, body: undefined | Object, messageSuccess?: (error: pMessageSuccess ) => void, functionsCalculeUpload?: (percentage: number) => void): Promise<P> {
        this.Path = path
        this.Body = body as Object
        this.Method = 'POST'
        return await this.Builder<P, pMessageSuccess>(messageSuccess, functionsCalculeUpload)
    }

    public async Put<Put, putMessageSuccess>(path: string, body: undefined | Object , messageSuccess?: (error: putMessageSuccess ) => void, functionsCalculeUpload?: (percentage: number) => void): Promise<Put> {
        this.Path = path
        this.Body = body as Object
        this.Method = 'PUT'
        return await this.Builder<Put, putMessageSuccess>(messageSuccess, functionsCalculeUpload)
    }

    public async Delete<D, dMessageSuccess>(path: string, body: undefined | Object,messageSuccess?: (error: dMessageSuccess ) => void, functionsCalculeUpload?: (percentage: number) => void): Promise<D> {
        this.Path = path
        this.Body = body as Object
        this.Method = 'DELETE'
        return await this.Builder<D, dMessageSuccess>(messageSuccess, functionsCalculeUpload)
    }

    public getRouterPrive(): string {
        return this.RouterPrivate
    }

    private async Builder<T, tMessageErrorSuccess>(
        messageErrorSuccess?: (error: tMessageErrorSuccess) => void,
        functionsCalculeUpload?: (percentage: number) => void
    ): Promise<T> {
        const pathServer = this.RouterPrivate === undefined ? Https.RouterPrivateGlobal:this.RouterPrivate
        let otherHeaders = {}
        if(Https.Headers != undefined) {
            otherHeaders = Https.Headers()
        }

        try {
            const token = Https.Authorization()
            const result = (await axios({
                url: `${pathServer}${this.Path}`,
                method: this.Method,
                data: this.Body,
                headers: { 
                    authorization: `Bearer ${token}`,
                    ... otherHeaders
                 }
            })).data

            if(!result.hasOwnProperty('service')) {
                if(messageErrorSuccess != undefined) {
                    messageErrorSuccess(result)
                }
            }
            
            return result.service as T

        } catch (error) {

            console.log(error)

            const errorTemp: { response: { data: { status: number, message: string }} } = error as { response: { data: { status: number, message: string }} }
            const MessageErrorSuccess = { message: errorTemp.response.data.message, status: errorTemp.response.data.status } as tMessageErrorSuccess

            if(Https.FunctionMessageError != undefined) {
                Https.FunctionMessageError(MessageErrorSuccess as MessageError)
            }

            throw(MessageErrorSuccess)
        }
    }
}