/*-
 *
 * Hedera Rarity Inspector
 *
 * Copyright (C) 2024 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { AttributeWithOccurrence } from '@/utils/types/attributes';
import { dictionary } from '@/libs/en';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const NFTAttributesRarity: React.FC<{ attributesData: AttributeWithOccurrence[] }> = ({ attributesData }) => {
  const labels = attributesData.map(({ traitName }) => traitName);
  const maxValueOnYAxis = Math.floor(Math.max(...attributesData.map(({ occurrence }) => occurrence)) * 1.2);
  return (
    <>
      <p className="mb-2 text-lg font-bold">{dictionary.nftPreviewPage.attributesOccurrence}</p>
      <Bar
        options={{
          responsive: true,
          scales: {
            y: {
              grid: {
                drawOnChartArea: false,
              },
              min: 0,
              max: maxValueOnYAxis < 1 ? 1 : maxValueOnYAxis,
              ticks: {
                callback: (value) => `${value}%`,
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => `${context.parsed.y}%`,
                title: (context) => {
                  const data = context[0].raw as { traitValue: string };
                  return `${data.traitValue}`;
                },
              },
            },
          },
          parsing: {
            xAxisKey: 'traitName',
            yAxisKey: 'occurrence',
          },
        }}
        data={{
          labels,
          datasets: [
            {
              data: attributesData.map((item) => item),
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
          ],
        }}
      />
    </>
  );
};
