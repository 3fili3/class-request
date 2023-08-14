import axios from 'axios'

export class Https {
    
    private RouterPrivate: string;
    private Path: string;
    private Method: string;
    private Body: Object;
    private Authorization: string
    private static Authorization: string
    private apiKey: string
    private static RouterPrivateGlobal: string;

    public constructor(routerPrive?: string) {
        this.RouterPrivate = 'https://clicko.com.mx/storage/v1/'
        this.Authorization = ''
        if(routerPrive != undefined) {
            this.RouterPrivate = routerPrive
        }
        if(Https.RouterPrivateGlobal != undefined) {
            this.RouterPrivate = Https.RouterPrivateGlobal
        }
        if(Https.Authorization != '') {
            this.Authorization = Https.Authorization
        }

        this.Path = ''
        this.Method = ''
        this.Body = null as any
        this.apiKey = ''
    }

    public static config(data: { router: string, auth?: string }) {
        this.RouterPrivateGlobal = data.router
        this.Authorization = data.auth != undefined ? data.auth:''
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
        this.Authorization = auth
        return this
    }

    public ApiKey(apiKey: string): Https {
        this.apiKey = apiKey
        return this
    }

    public getRouterPrive(): string {
        return this.RouterPrivate
    }

    public async Builder<T>(): Promise<T> {
        try {
            const result = ((await axios({
                url: `${this.RouterPrivate}${this.Path}`,
                method: this.Method,
                data: this.Body,
                headers: this.apiKey === '' ? { authorization: `Bearer ${this.Authorization}` }:{ authorization: this.apiKey }
            })).data).service

            return result as T
        } catch (error) {
            throw({ message: error })
        }
    }
}