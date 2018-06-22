declare namespace RestApi {
    export interface IRestApiRequest {
        count: number;
        next: string;
        previous: string;
        results: any[];
    }
}

export = RestApi;

