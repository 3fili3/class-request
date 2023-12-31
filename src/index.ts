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
    private static Authorization: string
    private apiKey: string
    private static RouterPrivateGlobal: string;

    public constructor(routerPrive?: string) {
        this.RouterPrivate = routerPrive as string
        Https.Authorization = ''
        this.Path = ''
        this.Method = ''
        this.Body = null as any
        this.apiKey = ''
    }

    public static config(data: { router: string, auth?: string }) {
        Https.RouterPrivateGlobal = data.router
        Https.Authorization = data.auth != undefined ? data.auth:''
    }
 
    public Get(path: string): Https {
        this.Path = path
        this.Method = 'GET'
        return this
    }

    public Post(path: string, body: undefined | Object): Https {
        this.Path = path
        this.Body = body as Object
        this.Method = 'POST'
        return this
    }

    public Put(path: string, body: undefined | Object): Https {
        this.Path = path
        this.Body = body as Object
        this.Method = 'PUT'
        return this
    }

    public Delete(path: string, body: undefined | Object): Https {
        this.Path = path
        this.Body = body as Object
        this.Method = 'DELETE'
        return this
    }

    public Auth(auth: string): Https {
        Https.Authorization = auth
        return this
    }

    public ApiKey(apiKey: string) {
        this.apiKey = apiKey
    }

    public static setAuthorization(auth: string) {
        Https.Authorization = auth
    }

    public getRouterPrive(): string {
        return this.RouterPrivate
    }

    public static Error() {
        
    }

    public async Builder<T>(functionError?: (error: any) => void, functionsCalculeUpload?: (percentage: number) => void): Promise<T> {
        try {
            const result = ((await axios({
                url: `${Https.RouterPrivateGlobal}${this.Path}`,
                method: this.Method,
                data: this.Body,
                headers: Https.Authorization === '' ? { authorization: this.apiKey }:{ authorization: `Bearer ${Https.Authorization}` }
            })).data).service

            return result as T
        } catch (error) {
            if(functionError != undefined) {
                functionError(error)
            }
            throw(error)
        }
    }
}