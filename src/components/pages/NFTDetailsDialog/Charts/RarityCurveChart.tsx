/*-
 *
 * NFT Rarity Inspector
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
import { dictionary } from '@/libs/en';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  type Chart,
  type Scale,
  type CoreScaleOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { YAxisDescription } from '@/components/pages/NFTDetailsDialog/Charts/YAxisDescription';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

const indicatingLinesColor = '#3b95f6c2';
const darkPink = 'rgba(255, 99, 132, 0.5)';
const pink = 'rgb(255, 99, 132)';
const defaultColor = ChartJS.defaults.color.toString();
const tooltipTitleFontSize = 16;
const tooltipFooterFontSize = 14;
const font = ChartJS.defaults.font;

const setTickAsEmptyStrings = (): string => '   ';

function addPercentsToLabels(this: Scale<CoreScaleOptions>, value: string | number): string {
  return `${value}%`;
}

const drawCustomLabelsOnXAxis = (chart: Chart): void => {
  const {
    ctx,
    chartArea: { left, right, width },
    scales: { x },
  } = chart;
  const middle = width / 2 + left;

  ctx.save();

  ctx.fillStyle = defaultColor;

  ctx.textAlign = 'start';
  ctx.fillText(dictionary.nftPreviewPage.rarityChartLabels.leastRare, left, x.bottom);

  ctx.textAlign = 'end';
  ctx.fillText(dictionary.nftPreviewPage.rarityChartLabels.mostRare, right, x.bottom);

  ctx.textAlign = 'center';
  ctx.fillText(dictionary.nftPreviewPage.rarityChartLabels.rarity, middle, x.bottom);
};

export const RarityCurveChart: React.FC<{
  rarities: string[];
  probabilityDistribution: number[];
  rarityScore?: number;
  tooltipData?: {
    name?: string;
    serial?: number;
    totalRarityRank?: string;
  };
}> = ({ rarities, probabilityDistribution, rarityScore, tooltipData }) => {
  const { serial, totalRarityRank, name } = tooltipData || {};
  const handleDrawLines = (chart: Chart): void => {
    const { ctx } = chart;
    const xAxis = chart.scales['x'];
    const yAxis = chart.scales['y'];

    ctx.strokeStyle = indicatingLinesColor;
    ctx.lineWidth = 3;
    ctx.beginPath();

    const rarityIndex = rarities.indexOf(String(rarityScore?.toFixed(2)));
    const tickSpacing = xAxis.width / (rarities.length - 1);

    const xPosition = xAxis.left + rarityIndex * tickSpacing;
    const yPosition = yAxis.getPixelForValue(probabilityDistribution[rarityIndex]);

    ctx.moveTo(xPosition, yAxis.bottom);
    ctx.lineTo(xPosition, yPosition);

    ctx.moveTo(xAxis.left, yPosition);
    ctx.lineTo(xPosition, yPosition);

    ctx.stroke();
  };

  const createDot = (): (number | undefined)[] => {
    return rarities.map((rarity) => (Number(rarity) === rarityScore ? 5 : undefined));
  };

  const displayTooltipContent = (): string =>
    tooltipData && serial && totalRarityRank ? dictionary.nftPreviewPage.rarityChart.tooltipContent(serial, totalRarityRank) : '';
  const displayTooltipTitle = (): string => (tooltipData && name ? name : '');
  const removeDefaultTooltipLabel = (): string => '';

  return (
    <>
      <YAxisDescription color={defaultColor} font={font} tooltipText={dictionary.nftPreviewPage.rarityChart.yAxesLabelTooltip} />

      <Line
        options={{
          responsive: true,
          scales: {
            x: {
              grid: {
                drawOnChartArea: false,
              },
              ticks: {
                callback: setTickAsEmptyStrings,
                maxRotation: 0,
              },
            },
            y: {
              grid: {
                drawOnChartArea: false,
              },
              min: 0,
              max: 100,
              ticks: {
                callback: addPercentsToLabels,
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: removeDefaultTooltipLabel,
                title: displayTooltipTitle,
                footer: displayTooltipContent,
              },
              footerFont: {
                size: tooltipFooterFontSize,
              },
              titleFont: {
                size: tooltipTitleFontSize,
              },
            },
          },
          layout: {
            padding: {
              bottom: 5,
            },
          },
        }}
        data={{
          labels: rarities,
          datasets: [
            {
              data: probabilityDistribution,
              borderColor: pink,
              backgroundColor: darkPink,
              pointRadius: createDot(),
              pointBackgroundColor: indicatingLinesColor,
              pointBorderColor: indicatingLinesColor,
            },
          ],
        }}
        plugins={[
          {
            id: 'pointIndicator',
            afterDatasetDraw: handleDrawLines,
          },
          {
            id: 'xAxisLabelCustomization',
            beforeDatasetDraw: drawCustomLabelsOnXAxis,
          },
        ]}
      />
    </>
  );
};
