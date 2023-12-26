/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TimestampReq } from './TimestampReq';

export type CompetitionReq = {
    competitionId?: number;
    competitionInfo?: string;
    competitionName?: string;
    competitionStage?: string;
    createTime?: TimestampReq;
    endTime?: string;
    isDelete?: number;
    isMatchOpen?: boolean;
    isVotingOpen?: boolean;
    startTime?: string;
    updateTime?: TimestampReq;
};
