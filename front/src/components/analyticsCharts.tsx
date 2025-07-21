/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,   
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Pie, PieChart } from "recharts"

import {
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

export const description = "A horizontal bar chart"


interface ChartBarHorizontalProps {
  chartData: any[];
}

export function ChartBarHorizontal({ chartData }: ChartBarHorizontalProps) {
  const chartConfig = {
    count: {
      label: "Número de Usuários",
      color: "[var(--ddc-red)]",
    },
    classification: {
      label: "Classificação",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Classificação de Usuários</CardTitle>
        <CardDescription>Mapeamento de atividade de usuários por classificação</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="number" />
            <YAxis
              dataKey="classification"
              type="category"
              tickLine={false}
              tickMargin={0}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="number" fill="var(--color-count)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Análise da distribuição de usuários por classificação.
        </div>
        <div className="text-muted-foreground leading-none">
          Ajuda a entender o nível de contribuição da base de usuários.
        </div>
      </CardFooter>
    </Card>
  );
}


interface ChartPieLegendProps {
  chartData: any[];
}

export function ChartPieLegend({ chartData }: ChartPieLegendProps) {
    const chartConfig = {
        commercial: {
            label: "Comercial",
        },
        domain: {
            label: "Personalizado",
        },
    } satisfies ChartConfig;

    const COLORS = ['#0088FE', '#00C49F'];

    const dataWithColors = chartData.map((entry, index) => ({
        ...entry,
        fill: COLORS[index % COLORS.length],
    }));

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Tipos de Domínio de Email</CardTitle>
                <CardDescription>Distribuição de usuários por tipo de domínio de email.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px]"
                >
                    <PieChart>
                        <Pie
                            data={dataWithColors}
                            dataKey="count"
                            nameKey="domain"
                            label={({ count }) => count}
                            labelLine={false}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent />}
                        />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="domain" />}
                            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Análise da distribuição de usuários por tipo de domínio de email.
                </div>
                <div className="text-muted-foreground leading-none">
                    Ajuda a entender o tipo de público.
                </div>
            </CardFooter>
        </Card>
    );
}
