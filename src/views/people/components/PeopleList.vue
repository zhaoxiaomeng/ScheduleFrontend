<template>
  <div class="app-container">
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column
        v-loading="loading"
        align="center"
        label="ID"
        width="65"
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="310px" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="310px" align="center" label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column width="310px" align="center" label="单位">
        <template slot-scope="scope">
          <span>{{ scope.row.unit }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { fetchList } from "@/api/article";

import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  components: { Pagination },
  props: {
    type: {
      type: String,
      default: "CN",
    },
  },
  data() {
    return {
      list: null,
      listQuery: {
        page: 1,
        limit: 10,
        type: this.type,
        sort: "+id",
      },
      total:0,
      loading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      this.$emit("create"); // for test
      fetchList(this.listQuery).then((response) => {
        this.list = response.data.items;
        this.total = response.data.total
        this.loading = false;
      });
    },
  },
};
</script>

