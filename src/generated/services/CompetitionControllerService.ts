/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompetitionQueryRequest } from '../models/CompetitionQueryRequest';
import type { CompetitionReq } from '../models/CompetitionReq';
import type { CompetitionUpdateDTO } from '../models/CompetitionUpdateDTO';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { Result_boolean_ } from '../models/Result_boolean_';
import type { Result_List_CompetitionDTO_ } from '../models/Result_List_CompetitionDTO_';
import type { Result_long_ } from '../models/Result_long_';
import type { Result_Page_Competition_ } from '../models/Result_Page_Competition_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CompetitionControllerService {

    /**
     * addCompetition
     * @param competition competition
     * @returns Result_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addCompetitionUsingPost(
competition: CompetitionReq,
): CancelablePromise<Result_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competition/add',
            body: competition,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteCompetition
     * @param deleteRequest deleteRequest
     * @returns Result_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteCompetitionUsingPost(
deleteRequest: DeleteRequest,
): CancelablePromise<Result_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competition/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * list
     * @returns Result_List_CompetitionDTO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUsingPost(): CancelablePromise<Result_List_CompetitionDTO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competition/list',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * page
     * @param competitionQueryRequest competitionQueryRequest
     * @returns Result_Page_Competition_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static pageUsingPost(
competitionQueryRequest: CompetitionQueryRequest,
): CancelablePromise<Result_Page_Competition_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competition/list/page',
            body: competitionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateCompetition
     * @param competitionUpdateDto competitionUpdateDTO
     * @returns Result_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateCompetitionUsingPost(
competitionUpdateDto: CompetitionUpdateDTO,
): CancelablePromise<Result_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competition/update',
            body: competitionUpdateDto,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * upload
     * @param competitionId competitionId
     * @param file file
     * @returns Result_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static uploadUsingPost(
competitionId?: number,
file?: Blob,
): CancelablePromise<Result_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competition/upload',
            query: {
                'competitionId': competitionId,
            },
            body: file,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
