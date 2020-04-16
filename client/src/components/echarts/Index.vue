<template>
  <div id="workChart" :style="echartsstyle"></div>
</template>

<script>
// 按需加载
import EChart from "echarts/lib/echarts";
import "echarts/lib/chart/line";

export default {
  props: {
    echartsId: {
      type: String
    },
    echartsOption: {
      type: Object
    },
    echartsstyle: {
      type: Object
    }
  },
  mounted() {
    this.buildBarEChart();
  },
  methods: {
    buildBarEChart() {
      const echart = EChart.init(document.getElementById("workChart"));
      echart.setOption(this.echartsOption);
    }
  }
};
</script>