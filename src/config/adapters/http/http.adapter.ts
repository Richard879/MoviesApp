

//creo la clase abstracta porque NO voy a crear instancias de la clase HttpAdapter
export abstract class HttpAdapter {
    abstract get<T>(url:string, options?: Record<string, unknown>): Promise<T>;
}