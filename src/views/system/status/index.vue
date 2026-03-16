<template>
<!--  <div class="app-container">-->
<!--&lt;!&ndash;    <el-card>&ndash;&gt;-->
<!--&lt;!&ndash;      <h1 style="text-align: center; font-size: 40px">生产看板</h1>&ndash;&gt;-->
<!--&lt;!&ndash;    </el-card>&ndash;&gt;-->
<!--    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">-->
<!--      <el-form-item label="订单号" prop="shipmentId">-->
<!--        <el-input-->
<!--          v-model="queryParams.shipmentId"-->
<!--          placeholder="请输入订单号"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="客户编码" prop="customerCode">-->
<!--        <el-input-->
<!--          v-model="queryParams.customerCode"-->
<!--          placeholder="请输入客户编码"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="产品名称" prop="productName">-->
<!--        <el-input-->
<!--          v-model="queryParams.productName"-->
<!--          placeholder="请输入产品名称"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="订单数量" prop="totalNumber">-->
<!--        <el-input-->
<!--          v-model="queryParams.totalNumber"-->
<!--          placeholder="请输入订单数量"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="SMT" prop="smt">-->
<!--        <el-input-->
<!--          v-model="queryParams.smt"-->
<!--          placeholder="请输入SMT"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="DIP" prop="dip">-->
<!--        <el-input-->
<!--          v-model="queryParams.dip"-->
<!--          placeholder="请输入DIP"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>-->
<!--        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->

<!--    <el-row :gutter="10" class="mb8">-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['system:status:add']"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
<!--&lt;!&ndash;      <el-col :span="1.5">&ndash;&gt;-->
<!--&lt;!&ndash;        <el-button&ndash;&gt;-->
<!--&lt;!&ndash;          type="success"&ndash;&gt;-->
<!--&lt;!&ndash;          plain&ndash;&gt;-->
<!--&lt;!&ndash;          icon="el-icon-edit"&ndash;&gt;-->
<!--&lt;!&ndash;          size="mini"&ndash;&gt;-->
<!--&lt;!&ndash;          :disabled="single"&ndash;&gt;-->
<!--&lt;!&ndash;          @click="handleUpdate"&ndash;&gt;-->
<!--&lt;!&ndash;          v-hasPermi="['system:status:edit']"&ndash;&gt;-->
<!--&lt;!&ndash;        >修改</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;      <el-col :span="1.5">&ndash;&gt;-->
<!--&lt;!&ndash;        <el-button&ndash;&gt;-->
<!--&lt;!&ndash;          type="danger"&ndash;&gt;-->
<!--&lt;!&ndash;          plain&ndash;&gt;-->
<!--&lt;!&ndash;          icon="el-icon-delete"&ndash;&gt;-->
<!--&lt;!&ndash;          size="mini"&ndash;&gt;-->
<!--&lt;!&ndash;          :disabled="multiple"&ndash;&gt;-->
<!--&lt;!&ndash;          @click="handleDelete"&ndash;&gt;-->
<!--&lt;!&ndash;          v-hasPermi="['system:status:remove']"&ndash;&gt;-->
<!--&lt;!&ndash;        >删除</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;      <el-col :span="1.5">&ndash;&gt;-->
<!--&lt;!&ndash;        <el-button&ndash;&gt;-->
<!--&lt;!&ndash;          type="warning"&ndash;&gt;-->
<!--&lt;!&ndash;          plain&ndash;&gt;-->
<!--&lt;!&ndash;          icon="el-icon-download"&ndash;&gt;-->
<!--&lt;!&ndash;          size="mini"&ndash;&gt;-->
<!--&lt;!&ndash;          @click="handleExport"&ndash;&gt;-->
<!--&lt;!&ndash;          v-hasPermi="['system:status:export']"&ndash;&gt;-->
<!--&lt;!&ndash;        >导出</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-col>&ndash;&gt;-->
<!--      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
<!--    </el-row>-->

<!--    <el-table v-loading="loading" :data="statusList" @selection-change="handleSelectionChange">-->
<!--      <el-table-column type="selection" width="55" align="center" />-->
<!--      <el-table-column label="id" align="center" prop="id" />-->
<!--      <el-table-column label="订单号" align="center" prop="shipmentId" />-->
<!--      <el-table-column label="客户编码" align="center" prop="customerCode" />-->
<!--      <el-table-column label="产品名称" align="center" prop="productName" />-->
<!--      <el-table-column label="订单数量" align="center" prop="totalNumber" />-->
<!--      <el-table-column label="料况" align="center" prop="materialStatus" />-->
<!--      <el-table-column label="SMT" align="center" prop="smt" />-->
<!--      <el-table-column label="DIP" align="center" prop="dip" />-->
<!--      <el-table-column label="资料状态" align="center" prop="fileStatus" />-->
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-edit"-->
<!--            @click="handleUpdate(scope.row)"-->
<!--            v-hasPermi="['system:status:edit']"-->
<!--          >修改</el-button>-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['system:status:remove']"-->
<!--          >删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->

<!--    <pagination-->
<!--      v-show="total>0"-->
<!--      :total="total"-->
<!--      :page.sync="queryParams.pageNum"-->
<!--      :limit.sync="queryParams.pageSize"-->
<!--      @pagination="getList"-->
<!--    />-->

<!--    &lt;!&ndash; 添加或修改生产看板对话框 &ndash;&gt;-->
<!--    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>-->
<!--      <el-form ref="form" :model="form" :rules="rules" label-width="80px">-->
<!--        <el-form-item label="订单号" prop="shipmentId">-->
<!--          <el-input v-model="form.shipmentId" placeholder="请输入订单号" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="客户编码" prop="customerCode">-->
<!--          <el-input v-model="form.customerCode" placeholder="请输入客户编码" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="产品名称" prop="productName">-->
<!--          <el-input v-model="form.productName" placeholder="请输入产品名称" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="订单数量" prop="totalNumber">-->
<!--          <el-input v-model="form.totalNumber" placeholder="请输入订单数量" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="料况" prop="materialStatus">-->
<!--          <el-select v-model="form.materialStatus" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">-->
<!--            <el-option v-for="(item, index) in LKOptions" :key="index" :label="item.label"-->
<!--                       :value="item.value" :disabled="item.disabled"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="smt" prop="smt">-->
<!--          <el-select v-model="form.smt" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">-->
<!--            <el-option v-for="(item, index) in SMTOptions" :key="index" :label="item.label"-->
<!--                       :value="item.value" :disabled="item.disabled"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="dip" prop="dip">-->
<!--          <el-select v-model="form.dip" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">-->
<!--            <el-option v-for="(item, index) in DIPOptions" :key="index" :label="item.label"-->
<!--                       :value="item.value" :disabled="item.disabled"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--&lt;!&ndash;        <el-form-item label="后段" prop="last">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-select v-model="form.last" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-option v-for="(item, index) in LsatOptions" :key="index" :label="item.label"&ndash;&gt;-->
<!--&lt;!&ndash;                       :value="item.value" :disabled="item.disabled"></el-option>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-select>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--        <el-form-item label="资料状态" prop="last">-->
<!--          <el-select v-model="form.fileStatus" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">-->
<!--            <el-option v-for="(item, index) in fileStatusOptions" :key="index" :label="item.label"-->
<!--                       :value="item.value" :disabled="item.disabled"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button type="primary" @click="submitForm">确 定</el-button>-->
<!--        <el-button @click="cancel">取 消</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
<!--  </div>-->
</template>

<script>
import { listStatus, getStatus, delStatus, addStatus, updateStatus } from "@/api/system/status";

export default {
  name: "Status",
  data() {
    return {
      LKOptions: [{
        "label": "板齐料齐",
        "value": "板齐料齐"
      }, {
        "label": "板缺料缺",
        "value": "板缺料缺"
      }, {
        "label": "板缺料齐",
        "value": "板缺料齐"
      }, {
        "label": "板齐料缺",
        "value": "板齐料缺"
      }],
      SMTOptions: [{
        "label": "未上线",
        "value": "未上线"
      }, {
        "label": "已上线",
        "value": "已上线"
      }, {
        "label": "已下线",
        "value": "已下线"
      }],
      DIPOptions: [{
        "label": "待后焊",
        "value": "待后焊"
      }, {
        "label": "已后焊",
        "value": "已后焊"
      }, {
        "label": "无",
        "value": "无"
      }],
      LsatOptions: [{
        "label": "包裹",
        "value": "包裹"
      }, {
        "label": "三防漆",
        "value": "三防漆"
      }, {
        "label": "测试",
        "value": "测试"
      }, {
        "label": "无",
        "value": "无"
      }],
      fileStatusOptions: [{
        "label": "返单无改",
        "value": "返单无改"
      }, {
        "label": "新单",
        "value": "新单"
      }, {
        "label": "返单有改",
        "value": "返单有改"
      }],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 生产看板表格数据
      statusList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 50,
        shipmentId: null,
        customerCode: null,
        productName: null,
        totalNumber: null,
        materialStatus: null,
        smt: null,
        dip: null,
        last: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询生产看板列表 */
    getList() {
      this.loading = true;
      listStatus(this.queryParams).then(response => {
        this.statusList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        shipmentId: null,
        customerCode: null,
        productName: null,
        totalNumber: null,
        materialStatus: null,
        smt: null,
        dip: null,
        last: null
      };
      this.resetForm("form");
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加生产看板";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getStatus(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改生产看板";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateStatus(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStatus(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除生产看板编号为"' + ids + '"的数据项？').then(function() {
        return delStatus(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/status/export', {
        ...this.queryParams
      }, `status_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
