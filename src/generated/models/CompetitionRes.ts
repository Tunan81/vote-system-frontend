/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TimestampRes } from './TimestampRes';

export type CompetitionRes = {
    competitionId?: number;
    competitionInfo?: string;
    competitionName?: string;
    competitionStage?: string;
    createTime?: TimestampRes;
    endTime?: string;
    isDelete?: number;
    isMatchOpen?: boolean;
    isVotingOpen?: boolean;
    startTime?: string;
    updateTime?: TimestampRes;
};
