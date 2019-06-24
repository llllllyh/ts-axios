export type Method = 'get' | 'GET' | 'delete' | 'Delete' | 'head' | 'HEAD' 
  | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH'
export interface AxiosRequestConfig{
    url:string,
    methods?:Method
    data?:any
    params?:any
}