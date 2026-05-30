<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="合同号" prop="contractNo">
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入合同号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户编码" prop="customerCode">
        <el-input
          v-model="queryParams.customerCode"
          placeholder="请输入客户编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物料代号" prop="materialCode">
        <el-input
          v-model="queryParams.materialCode"
          placeholder="请输入物料代号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品名称" prop="productName">
        <el-input
          v-model="queryParams.productName"
          placeholder="请输入产品名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单数量" prop="totalNumber">
        <el-input
          v-model="queryParams.totalNumber"
          placeholder="请输入订单数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="已出货数量" prop="shipNumber">
        <el-input
          v-model="queryParams.shipNumber"
          placeholder="请输入已出货数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="未出货数量" prop="notshipNumber">
        <el-input
          v-model="queryParams.notshipNumber"
          placeholder="请输入未出货数量"
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
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:shipment:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:shipment:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:shipment:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:shipment:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="shipmentList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="合同号" align="center" prop="contractNo" />
      <el-table-column label="客户名称" align="center" prop="customerCode" />
      <el-table-column label="物料代号" align="center" prop="materialCode" />
      <el-table-column label="产品名称" align="center" prop="productName" />
      <el-table-column label="订单数量" align="center" prop="totalNumber" />
      <el-table-column label="已出货数量" align="center" prop="shipNumber" />
      <el-table-column label="未出货数量" align="center" prop="notshipNumber" />
      <el-table-column label="资料状态" align="center" prop="fileStatus" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="getContractPdf(scope.row)"
          >查看合同</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="openShipFrom(scope.row)"
          >出货</el-button>
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['system:shipment:remove']"-->
<!--          >删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改出货管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="合同号" prop="contractNo">
          <el-input v-model="form.contractNo" placeholder="请输入合同号" />
        </el-form-item>
        <!-- 原代码位置：约第 246 行 -->
        <el-form-item label="客户名称" prop="customerCode">
          <!-- 修改前 -->
          <!-- <el-input v-model="form.customerCode" placeholder="请输入客户名称" /> -->

          <!-- 修改后 -->
          <el-select
            v-model="form.customerCode"
            placeholder="请选择客户名称"
            clearable
            style="width: 100%"
            filterable
          >
            <el-option
              v-for="item in allCustomer"
              :key="item.value.name"
              :label="item.value.name"
              :value="item.value.name"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="供方" prop="supplyCompany">
          <el-input v-model="form.supplyCompany" placeholder="请输入供方单位名称" />
        </el-form-item>
        <el-form-item label="备注" prop="remarkd">
          <el-input v-model="form.remarkd" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="物料代号" prop="materialCode">
          <el-input v-model="form.materialCode" placeholder="请输入物料代号" />
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="form.productName" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="订单数量" prop="totalNumber">
          <el-input v-model="form.totalNumber" placeholder="请输入订单数量" />
        </el-form-item>
        <el-form-item label="资料状态" prop="last">
          <el-select v-model="form.fileStatus" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">
            <el-option v-for="(item, index) in fileStatusOptions" :key="index" :label="item.label"
                       :value="item.value" :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 出货对话框 -->
    <el-dialog :title="titleShip" :visible.sync="openShip" width="500px" append-to-body>
      <el-form ref="form" :model="shipDTO" label-width="80px">
        <el-form-item label="本次出货数" prop="notshipNumber">
          <el-input v-model="shipDTO.shipNumber" placeholder="请输入出货数量" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitShipForm">确 定</el-button>
        <el-button @click="openShip=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listShipment, getShipment, delShipment, addShipment, updateShipment } from "@/api/system/shipment";
import {Ship} from "../../../api/system/shipment";
import { loadAllCustomer } from "@/api/system/customer";

export default {
  name: "Shipment",
  data() {
    return {
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
      openShip:false,
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
      // 出货管理表格数据
      shipmentList: [],
      // 所有客户
      allCustomer: [],
      // 弹出层标题
      title: "",
      titleShip:'出货',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        contractNo: null,
        customerCode: null,
        materialCode: null,
        productName: null,
        totalNumber: null,
        shipNumber: null,
        notshipNumber: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      shipDTO:{
        shipNumber:'',
        id:''
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    openShipFrom(row){
      this.openShip = true;
      this.shipDTO.id=row.id
    },
    /** 查询出货管理列表 */
    getList() {
      this.loading = true;
      listShipment(this.queryParams).then(response => {
        this.shipmentList = response.rows;
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
        contractNo: null,
        customerCode: null,
        materialCode: null,
        productName: null,
        totalNumber: null,
        shipNumber: null,
        notshipNumber: null
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
      loadAllCustomer().then(response => {
        this.allCustomer = response.data;
      });
      this.open = true;
      this.title = "添加订单";
    },
    getContractPdf(row) {
      if (this.shipmentList[0].supplyCompany !== '铭泰创新'){
        this.$message.error('外部系统订单，无合同数据');
        return
      }
      this.reset();
      const id = row.contractNo
      try {
        this.download('system/audit/getContractPdf/contract/' + id, {
        }, `${row.contractNo}.pdf`)
      } catch (error) {
        console.error('获取PDF失败:', error);
        this.$message.error('获取PDF失败，请稍后重试');
      }
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getShipment(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改出货管理";
      });
    },
    submitShipForm() {
      Ship(this.shipDTO).then(response => {
        this.$modal.msgSuccess("出货成功");
        this.openShip = false;
        this.getList();
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            this.form.shipNumber = 0
            this.form.noShipNumber = this.form.totalNumber
            updateShipment(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addShipment(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除出货管理编号为"' + ids + '"的数据项？').then(function() {
        return delShipment(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/shipment/export', {
        ...this.queryParams
      }, `shipment_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
