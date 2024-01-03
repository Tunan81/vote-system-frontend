/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MatchInfoQueryRequest } from '../models/MatchInfoQueryRequest';
import type { MatchInfoVO } from '../models/MatchInfoVO';
import type { Result_boolean_ } from '../models/Result_boolean_';
import type { Result_MatchInfoVO_ } from '../models/Result_MatchInfoVO_';
import type { Result_Page_MatchInfoVO_ } from '../models/Result_Page_MatchInfoVO_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MatchInfoControllerService {

    /**
     * getCurrentMatch
     * @param matchInfoQueryRequest matchInfoQueryRequest
     * @returns Result_MatchInfoVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getCurrentMatchUsingPost(
matchInfoQueryRequest: MatchInfoQueryRequest,
): CancelablePromise<Result_MatchInfoVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/matchInfo/get/one',
            body: matchInfoQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

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

    /**
     * updateMatchInfo
     * @param matchInfoVo matchInfoVO
     * @returns Result_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateMatchInfoUsingPost(
matchInfoVo: MatchInfoVO,
): CancelablePromise<Result_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/matchInfo/update',
            body: matchInfoVo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
