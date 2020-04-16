<template>
  <div class="company">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class="home-info">
              <div class="home-info-left">
                <div class="info-left-icon">
                  <i class="el-icon-s-custom">员工</i>
                </div>
              </div>
              <div class="home-info-right">
                <ul class="list">
                  <li>全职(1)</li>
                  <li>兼职(2)</li>
                  <li>离职(3)</li>
                  <li>实习(4)</li>
                </ul>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="home-info">
              <div class="home-info-left">
                <div class="info-left-icon">
                  <i class="el-icon-document-checked">审批</i>
                </div>
              </div>
              <div class="home-info-right">
                <ul class="list">
                  <li>出差(1)</li>
                  <li>加班(2)</li>
                  <li>请假(3)</li>
                  <li>出差(4)</li>
                </ul>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="echarts">
          <Echarts echartsId="attendance" :echartsOption="attendanceOption" :echartsstyle="style" />
        </el-row>
      </el-col>
      <el-col :span="8">
        <div class="card">
          <div class="company-info">
            <div class="company-img">
              <div class="img-box">
                <el-avatar
                  shape="square"
                  :size="110"
                  fit="fill"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                ></el-avatar>
              </div>
            </div>
            <div class="company-name">
              <h2 class="my-title">{{user.company || '测试名'}}</h2>
            </div>
          </div>
          <div class="notice">
            <dl>
              <dt>公司公告</dt>
              <dd>
                <p>元旦放假通知</p>
                <span>2019-12-21</span>
              </dd>
              <dd>
                <p>春节放假通知</p>
                <span>2020-01-21</span>
              </dd>
            </dl>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Echarts from "@/components/echarts/Index.vue";
export default {
  data() {
    return {
      attendanceOption: {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["刘一", "陈二", "张三", "李四", "王五", "赵六", "孙七"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      },
      style: {
        width: "100%",
        height: "400px"
      }
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  components: {
    Echarts
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/company/home.styl';

.echarts {
  margin-top: 20px;
  padding: 20px;
  background: #eee;
}
</style>