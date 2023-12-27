/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MatchInfoQueryRequest } from '../models/MatchInfoQueryRequest';
import type { Result_Page_MatchInfoVO_ } from '../models/Result_Page_MatchInfoVO_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MatchInfoControllerService {

    /**
     * listMatchInfoPage
     * @param matchInfoQueryRequest matchInfoQueryRequest
     * @returns Result_Page_MatchInfoVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMatchInfoPageUsingPost(
matchInfoQueryRequest: MatchInfoQueryRequest,
): CancelablePromise<Result_Page_MatchInfoVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/matchInfo/list/page',
            body: matchInfoQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
