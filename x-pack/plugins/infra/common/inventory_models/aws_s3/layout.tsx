/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { i18n } from '@kbn/i18n';
import { withTheme } from '@kbn/kibana-react-plugin/common';
import type { LayoutPropsWithTheme } from '../../../public/pages/metrics/metric_detail/types';
// eslint-disable-next-line @kbn/imports/no_boundary_crossing
import { Section } from '../../../public/pages/metrics/metric_detail/components/section';
// eslint-disable-next-line @kbn/imports/no_boundary_crossing
import { SubSection } from '../../../public/pages/metrics/metric_detail/components/sub_section';
// eslint-disable-next-line @kbn/imports/no_boundary_crossing
import { ChartSectionVis } from '../../../public/pages/metrics/metric_detail/components/chart_section_vis';
// eslint-disable-next-line @kbn/imports/no_boundary_crossing
import { LayoutContent } from '../../../public/pages/metrics/metric_detail/components/layout_content';

export const Layout = withTheme(({ metrics, onChangeRangeTime, theme }: LayoutPropsWithTheme) => (
  <React.Fragment>
    <LayoutContent>
      <Section
        navLabel="AWS S3"
        sectionLabel={i18n.translate(
          'xpack.infra.metricDetailPage.s3MetricsLayout.overviewSection.sectionLabel',
          {
            defaultMessage: 'Aws S3 Overview',
          }
        )}
        metrics={metrics}
        onChangeRangeTime={onChangeRangeTime}
      >
        <SubSection
          id="awsS3BucketSize"
          label={i18n.translate(
            'xpack.infra.metricDetailPage.s3MetricsLayout.bucketSize.sectionLabel',
            {
              defaultMessage: 'Bucket Size',
            }
          )}
        >
          <ChartSectionVis
            type="bar"
            formatter="bytes"
            seriesOverrides={{
              bytes: {
                color: theme.eui.euiColorVis1,
                name: i18n.translate(
                  'xpack.infra.metricDetailPage.s3MetricsLayout.bucketSize.chartLabel',
                  { defaultMessage: 'Total Bytes' }
                ),
              },
            }}
          />
        </SubSection>
        <SubSection
          id="awsS3NumberOfObjects"
          label={i18n.translate(
            'xpack.infra.metricDetailPage.s3MetricsLayout.numberOfObjects.sectionLabel',
            {
              defaultMessage: 'Number of Objects',
            }
          )}
        >
          <ChartSectionVis
            type="bar"
            formatter="abbreviatedNumber"
            seriesOverrides={{
              objects: {
                color: theme.eui.euiColorVis1,
                name: i18n.translate(
                  'xpack.infra.metricDetailPage.s3MetricsLayout.numberOfObjects.chartLabel',
                  { defaultMessage: 'Objects' }
                ),
              },
            }}
          />
        </SubSection>
        <SubSection
          id="awsS3TotalRequests"
          label={i18n.translate(
            'xpack.infra.metricDetailPage.s3MetricsLayout.totalRequests.sectionLabel',
            {
              defaultMessage: 'Total Requests',
            }
          )}
        >
          <ChartSectionVis
            type="bar"
            formatter="abbreviatedNumber"
            seriesOverrides={{
              total: {
                color: theme.eui.euiColorVis1,
                name: i18n.translate(
                  'xpack.infra.metricDetailPage.s3MetricsLayout.totalRequests.chartLabel',
                  { defaultMessage: 'Requests' }
                ),
              },
            }}
          />
        </SubSection>
        <SubSection
          id="awsS3DownloadBytes"
          label={i18n.translate(
            'xpack.infra.metricDetailPage.s3MetricsLayout.downloadBytes.sectionLabel',
            {
              defaultMessage: 'Downloaded Bytes',
            }
          )}
        >
          <ChartSectionVis
            type="bar"
            formatter="bytes"
            seriesOverrides={{
              bytes: {
                color: theme.eui.euiColorVis1,
                name: i18n.translate(
                  'xpack.infra.metricDetailPage.s3MetricsLayout.downloadBytes.chartLabel',
                  { defaultMessage: 'Bytes' }
                ),
              },
            }}
          />
        </SubSection>
        <SubSection
          id="awsS3UploadBytes"
          label={i18n.translate(
            'xpack.infra.metricDetailPage.s3MetricsLayout.uploadBytes.sectionLabel',
            {
              defaultMessage: 'Uploaded Bytes',
            }
          )}
        >
          <ChartSectionVis
            type="bar"
            formatter="bytes"
            seriesOverrides={{
              bytes: {
                color: theme.eui.euiColorVis1,
                name: i18n.translate(
                  'xpack.infra.metricDetailPage.s3MetricsLayout.uploadBytes.chartLabel',
                  { defaultMessage: 'Bytes' }
                ),
              },
            }}
          />
        </SubSection>
      </Section>
    </LayoutContent>
  </React.Fragment>
));
