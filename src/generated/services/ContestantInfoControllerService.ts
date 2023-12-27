/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContestantInfoQueryRequest } from '../models/ContestantInfoQueryRequest';
import type { ContestantInfoReq } from '../models/ContestantInfoReq';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { Result_boolean_ } from '../models/Result_boolean_';
import type { Result_long_ } from '../models/Result_long_';
import type { Result_Page_ContestantInfo_ } from '../models/Result_Page_ContestantInfo_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ContestantInfoControllerService {

    /**
     * addContestantInfo
     * @param contestantInfo contestantInfo
     * @returns Result_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addContestantInfoUsingPost(
contestantInfo: ContestantInfoReq,
): CancelablePromise<Result_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contestantInfo/add',
            body: contestantInfo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteContestantInfo
     * @param deleteRequest deleteRequest
     * @returns Result_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteContestantInfoUsingPost(
deleteRequest: DeleteRequest,
): CancelablePromise<Result_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contestantInfo/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listContestantInfoPage
     * @param contestantInfoQueryRequest contestantInfoQueryRequest
     * @returns Result_Page_ContestantInfo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listContestantInfoPageUsingPost(
contestantInfoQueryRequest: ContestantInfoQueryRequest,
): CancelablePromise<Result_Page_ContestantInfo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contestantInfo/list/page',
            body: contestantInfoQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
