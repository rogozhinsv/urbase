declare namespace RestApi {
    export interface IRestApiRequest {
        count: number;
        next: string;
        previous: string;
        results: any[];
    }

    export interface IOkved {
        id: number;
        url: string;
        title: string;
        code: string;
    }
}

export = RestApi;

