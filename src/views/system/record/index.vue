<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="80px">
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
      <el-form-item label="仓类型" prop="warehouseType">
        <el-select v-model="queryParams.warehouseType" placeholder="请选择仓类型" clearable>
          <el-option label="电子仓" value="1" />
          <el-option label="机构仓" value="2" />
          <el-option label="外协仓" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="每盘数" prop="meiPanShu">
        <el-input
          v-model="queryParams.meiPanShu"
          placeholder="请输入每盘数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:record:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="recordList">
      <el-table-column label="创建时间" align="center" prop="gmtCreate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtCreate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="仓类型" align="center" prop="warehouseType" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.warehouseType === '1'" type="primary">电子仓</el-tag>
          <el-tag v-else-if="scope.row.warehouseType === '2'" type="success">机构仓</el-tag>
          <el-tag v-else-if="scope.row.warehouseType === '3'" type="warning">外协仓</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="物料编码" align="center" prop="materialCode" />
      <el-table-column label="物料料号" align="center" prop="materialPartNumber" />
      <el-table-column label="每盘数" align="center" prop="meiPanShu" width="100" />
      <el-table-column label="操作数量" align="center" prop="quantity">
        <template slot-scope="scope">
          <span :style="{ color: scope.row.quantity > 0 ? 'green' : 'red' }">
            {{ scope.row.quantity > 0 ? '+' : '' }}{{ scope.row.quantity }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作前盘数" align="center" prop="qtyPre" />
      <el-table-column label="操作后盘数" align="center" prop="qtyPost" />
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
import { listRecord, getRecord, delRecord, addRecord, updateRecord, exportRecord } from "@/api/system/record";

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
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/record/export', {
        ...this.queryParams
      }, `record_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
