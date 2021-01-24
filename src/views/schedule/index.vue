<template>
  <el-calendar>
    <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->

    <template slot="dateCell" slot-scope="{ date, data }">
      <div @click="handleExchange(data.day)"> 
        {{ data.day.split("-").slice(1).join("-") }}
        <div :class=" getColor(data.day)">
          {{ getSchedulePerson(data.day) }}
        </div>
      </div>
    </template>
  </el-calendar>
</template>

<script>
import { getScheduleList } from "@/api/schedule";
export default {
  data() {
    return {
      month: null,
      scheduleList: [
        { date: "2021-01-24", content: "放假" },
        { date: "2019-12-26", content: "去交电费" },
        { date: "2019-11-26", content: "去学习vue" },
      ],
    };
  },
  created() {
    this.getList();
  },

  methods: {
    getList() {
      this.listLoading = true;
      getScheduleList(this.month).then((response) => {
        this.list = response.data.items;
        this.scheduleList = response.data.items;

        console.log(this.scheduleList);
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    getColor(date){
      let len = this.scheduleList.length;
      let res = "";
      for (let i = 0; i < len; i++) {
        if (this.scheduleList[i].date == date) {
          res = this.scheduleList[i].type;
          break;
        }
      }
      if (res==="节假日"){
        return 'holiday'
      }
      else if(res==="周末"){
        return 'weekend'
      }
      else{
        return 'workday'
      }
    },
    getSchedulePerson(v) {
      let len = this.scheduleList.length;
      let res = "";
      for (let i = 0; i < len; i++) {
        if (this.scheduleList[i].date == v) {
          res = this.scheduleList[i].name;
          console.log(1111, this.scheduleList[i]);
          break;
        }
      }
      return res;
    },    
    handleEdit(day) {
      if(this.rqineirong[day]){
        console.log(this.rqineirong[day])
        this.form = this.rqineirong[day];
        this.title = '编辑节假日';
      }else{
        let obj = {};
        obj.kssj = day.valueOf();
        obj.jssj = day.valueOf();
        this.form = obj;
        this.form = obj;
        this.title = '新增节假日';
      }
      this.open = true;
    },
  },
};
</script>
<style scoped>
.weekend{
  background-color: green;
}
.holiday{
  background-color:gold;
}
</style>