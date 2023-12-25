/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeleteRequest } from '../models/DeleteRequest';
import type { Result_boolean_ } from '../models/Result_boolean_';
import type { Result_LoginUserVO_ } from '../models/Result_LoginUserVO_';
import type { Result_long_ } from '../models/Result_long_';
import type { Result_Page_User_ } from '../models/Result_Page_User_';
import type { Result_Page_UserVO_ } from '../models/Result_Page_UserVO_';
import type { Result_User_ } from '../models/Result_User_';
import type { Result_UserVO_ } from '../models/Result_UserVO_';
import type { UserAddRequest } from '../models/UserAddRequest';
import type { UserLoginRequest } from '../models/UserLoginRequest';
import type { UserQueryRequest } from '../models/UserQueryRequest';
import type { UserRegisterRequest } from '../models/UserRegisterRequest';
import type { UserUpdateMyRequest } from '../models/UserUpdateMyRequest';
import type { UserUpdateRequest } from '../models/UserUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserControllerService {

    /**
     * addUser
     * @param userAddRequest userAddRequest
     * @returns Result_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUserUsingPost(
userAddRequest: UserAddRequest,
): CancelablePromise<Result_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/add',
            body: userAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteUser
     * @param deleteRequest deleteRequest
     * @returns Result_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteUserUsingPost(
deleteRequest: DeleteRequest,
): CancelablePromise<Result_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getUserById
     * @param id id
     * @returns Result_User_ OK
     * @throws ApiError
     */
    public static getUserByIdUsingGet(
id?: number,
): CancelablePromise<Result_User_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/get',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getLoginUser
     * @returns Result_LoginUserVO_ OK
     * @throws ApiError
     */
    public static getLoginUserUsingGet(): CancelablePromise<Result_LoginUserVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/get/login',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getUserVOById
     * @param id id
     * @returns Result_UserVO_ OK
     * @throws ApiError
     */
    public static getUserVoByIdUsingGet(
id?: number,
): CancelablePromise<Result_UserVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/get/vo',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listUserByPage
     * @param userQueryRequest userQueryRequest
     * @returns Result_Page_User_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUserByPageUsingPost(
userQueryRequest: UserQueryRequest,
): CancelablePromise<Result_Page_User_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/list/page',
            body: userQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listUserVOByPage
     * @param userQueryRequest userQueryRequest
     * @returns Result_Page_UserVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUserVoByPageUsingPost(
userQueryRequest: UserQueryRequest,
): CancelablePromise<Result_Page_UserVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/list/page/vo',
            body: userQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * userLogin
     * @param userLoginRequest userLoginRequest
     * @returns Result_LoginUserVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userLoginUsingPost(
userLoginRequest: UserLoginRequest,
): CancelablePromise<Result_LoginUserVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/login',
            body: userLoginRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * userLogout
     * @returns Result_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userLogoutUsingPost(): CancelablePromise<Result_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/logout',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * userRegister
     * @param userRegisterRequest userRegisterRequest
     * @returns Result_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userRegisterUsingPost(
userRegisterRequest: UserRegisterRequest,
): CancelablePromise<Result_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/register',
            body: userRegisterRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateUser
     * @param userUpdateRequest userUpdateRequest
     * @returns Result_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUserUsingPost(
userUpdateRequest: UserUpdateRequest,
): CancelablePromise<Result_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/update',
            body: userUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateMyUser
     * @param userUpdateMyRequest userUpdateMyRequest
     * @returns Result_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateMyUserUsingPost(
userUpdateMyRequest: UserUpdateMyRequest,
): CancelablePromise<Result_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/update/my',
            body: userUpdateMyRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
