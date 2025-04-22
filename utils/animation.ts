export const chartAnimation = (dataLength = 6) => {
  const totalDuration = 500;
  const delayBetweenPoints = totalDuration / dataLength;
  const previousY = (ctx: any) =>
    ctx.index === 0
      ? ctx.chart.scales.y.getPixelForValue(100)
      : ctx.chart
          .getDatasetMeta(ctx.datasetIndex)
          .data[ctx.index - 1].getProps(["y"], true).y;
  return {
    x: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx: any) {
        if (ctx.type !== "data" || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
    y: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx: any) {
        if (ctx.type !== "data" || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
  };
};

export const chartOptions = (dataLength = 6) => ({
  responsive: true,
  // animation: chartAnimation(dataLength),
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      border: {
        display: true,
      },
      grid: {
        display: false,
      },
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        display: true,
      },
    },
  },
});

export const chartHeight =
  typeof window !== 'undefined'
    ? window.innerWidth > 1024
      ? 400
      : window.innerWidth < 1024 && window.innerWidth > 600
      ? 700
      : 1000
    : 400;
