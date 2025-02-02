/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { ESSearchResponse } from '@kbn/core/types/elasticsearch';
import moment from 'moment';
import {
  SERVICE_NAME,
  TRANSACTION_TYPE,
  PROCESSOR_EVENT,
} from '../../../common/elasticsearch_fieldnames';
import { TRANSACTION_PAGE_LOAD } from '../../../common/transaction_types';
import { rangeQuery } from './range_query';

export function formatHasRumResult<T>(
  esResult: ESSearchResponse<T, ReturnType<typeof hasRumDataQuery>>,
  indices?: string
) {
  if (!esResult) return esResult;
  return {
    indices,
    // @ts-ignore total.value is undefined by the returned type, total is a `number`
    hasData: esResult.hits.total > 0,
    serviceName:
      esResult.aggregations?.services?.mostTraffic?.buckets?.[0]?.key,
  };
}

export function hasRumDataQuery({
  start = moment().subtract(24, 'h').valueOf(),
  end = moment().valueOf(),
}: {
  start?: number;
  end?: number;
}) {
  return {
    body: {
      size: 0,
      query: {
        bool: {
          filter: [
            { term: { [TRANSACTION_TYPE]: TRANSACTION_PAGE_LOAD } },
            { term: { [PROCESSOR_EVENT]: 'transaction' } },
          ],
        },
      },
      aggs: {
        services: {
          filter: rangeQuery(start, end)[0],
          aggs: {
            mostTraffic: {
              terms: {
                field: SERVICE_NAME,
                size: 1,
              },
            },
          },
        },
      },
    },
  };
}
