<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="物料编码" prop="materialCode">
        <el-input
          v-model="queryParams.materialCode"
          placeholder="请输入物料编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物料料号" prop="materialPartNumber">
        <el-input
          v-model="queryParams.materialPartNumber"
          placeholder="请输入物料料号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>



    <el-table v-loading="loading" :data="recordList">
      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="创建时间" align="center" prop="gmtCreate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtCreate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存记录ID" align="center" prop="stockId" />
      <el-table-column label="物料编码" align="center" prop="materialCode" />
      <el-table-column label="物料料号" align="center" prop="materialPartNumber" />
      <el-table-column label="操作数量" align="center" prop="quantity" />
      <el-table-column label="操作前库存数量" align="center" prop="qtyPre" />
      <el-table-column label="操作后库存数量" align="center" prop="qtyPost" />
      <el-table-column label="操作人" align="center" prop="optUser" />
      <el-table-column label="备注" align="center" prop="remark" />
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { listRecord, getRecord, delRecord, addRecord, updateRecord } from "@/api/system/record";

export default {
  name: "Record",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 库存操作记录表格数据
      recordList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        materialCode: null,
        materialPartNumber: null
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询库存操作记录列表 */
    getList() {
      this.loading = true;
      listRecord(this.queryParams).then(response => {
        this.recordList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    }
  }
};
</script>
