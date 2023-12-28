/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Result_long_ } from '../models/Result_long_';
import type { Voting } from '../models/Voting';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class VotingControllerService {

    /**
     * addVote
     * @param voting voting
     * @returns Result_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addVoteUsingPost(
voting: Voting,
): CancelablePromise<Result_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/voting/add',
            body: voting,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
