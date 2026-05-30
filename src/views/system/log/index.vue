<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="客户名称" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入客户名称"
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
      <el-form-item label="本次出货数量" prop="shipNumber">
        <el-input
          v-model="queryParams.shipNumber"
          placeholder="请输入本次出货数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单据日期" prop="flowTimeRange">
        <el-date-picker
          v-model="queryParams.flowTimeRange"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="yyyy年MM月"
          style="width: 240px"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['system:log:add']"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          plain-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['system:log:edit']"-->
<!--        >修改</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          size="mini"
          :disabled="multiple"
          @click="makeInvoice"
          v-hasPermi="['system:log:remove']"
        >开票</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:log:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="logList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="单据编号" align="center" prop="flowCode" />
      <el-table-column label="合同单号" align="center" prop="contractNo" />
      <el-table-column label="客户名称" align="center" prop="customerName" />
      <el-table-column label="物料代号" align="center" prop="materialCode" />
      <el-table-column label="产品名称" align="center" prop="productName" />
      <el-table-column label="订单数量" align="center" prop="totalNumber" />
      <el-table-column label="本次出货数量" align="center" prop="shipNumber" />
      <el-table-column label="产品单价" align="center" prop="productPrice" />
      <el-table-column label="三防漆" align="center" prop="antiPaint" />
      <el-table-column label="物料单价（元）" align="center" prop="materialPrice" />
      <el-table-column label="测试费（元）" align="center" prop="testFee" />
      <el-table-column label="包装费（元）" align="center" prop="packingFee" />
      <el-table-column label="SMT开机费（元）" align="center" prop="smtStartupFee" />
      <el-table-column label="PCB开机费（元）" align="center" prop="pcbStartupFee" />
      <el-table-column label="治具费（元）" align="center" prop="fixtureFee" />
      <el-table-column label="钢网费（元）" align="center" prop="stencilFee" />
      <el-table-column label="备注" align="center" prop="remarkd" />

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="makeInvoice(scope.row)"
            v-hasPermi="['system:log:edit']"
          >开票</el-button>
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['system:log:remove']"-->
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

    <!-- 添加或修改出货记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入客户名称" />
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
        <el-form-item label="本次出货数量" prop="shipNumber">
          <el-input v-model="form.shipNumber" placeholder="请输入本次出货数量" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
<!--    -->
  </div>
</template>

<script>
import { listLog, getLog, delLog, addLog, updateLog } from "@/api/system/log";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {getInvoice} from "../../../api/system/log";

export default {
  name: "Log",
  data() {
    return {
      // qinazi: true,
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
      // 出货记录表格数据
      logList: [],
      invoiceLogList:[],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        customerName: null,
        materialCode: null,
        productName: null,
        totalNumber: null,
        shipNumber: null,
        flowTimeRange: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      invoiceData:[{
        id:'',
        contractNo: '',
        customerName: '',
        materialCode: '',
        productName: '',
        totalNumber: '',
        shipNumber: '',
        noShipNumber: '',
        flowCode: '',
        flowTime: '',
      }],
      invoiceId:'',
      dataId:'',
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询出货记录列表 */
    getList() {
      this.loading = true;
      // 处理日期范围参数
      const params = { ...this.queryParams };
      if (params.flowTimeRange && params.flowTimeRange.length === 2) {
        params.beginFlowTime = params.flowTimeRange[0];
        params.endFlowTime = params.flowTimeRange[1];
      }
      // 删除flowTimeRange字段，避免传递数组给后端
      delete params.flowTimeRange;
      
      listLog(params).then(response => {
        this.logList = response.rows;
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
        customerName: null,
        materialCode: null,
        productName: null,
        totalNumber: null,
        shipNumber: null
      };
      this.resetForm("form");
    },
    /** 重置查询条件 */
    resetQuery() {
      this.queryParams.flowTimeRange = null;
      this.resetForm("queryForm");
      this.handleQuery();
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
      this.title = "添加出货记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLog(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改出货记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLog(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLog(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    async generateInvoicePDF() {
      try {
        const printContent = document.createElement('div');
        const uniqueId = 'print-' + Math.random().toString(36).substr(2, 8);
        printContent.className = `print-container-${uniqueId}`;
        printContent.style.width = '180mm';
        printContent.style.padding = '10px';
        printContent.style.fontSize = '12px';
        printContent.style.background = 'white';

        // 1. 添加公司信息和合同标题
        printContent.innerHTML = `

      <div style="text-align: center; margin-bottom: 5px;">  <!-- 缩小整体底部间距 -->
  <div>
    <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 2px;">  <!-- 缩小Logo和公司名的底部间距 -->
      <img src="/company-logo.png" style="width: 80px; height: 20px; margin-right: 10px;">
      <h1 style="margin: 0; font-size: 24px; line-height: 1.2;">深圳市铭泰创新技术有限公司</h1>  <!-- 固定行高 -->
    </div>
    <h4 style="margin: 2px 0; font-size: 12px; line-height: 1.2;">公司地址:深圳市宝安区航城街道钟屋泰兴隆工业城D栋6楼公司电话:0755-23082174</h4>  <!-- 缩小边距和字号 -->
    <h2 style="margin: 5px 0; font-size: 18px; line-height: 1.2;">送货单</h2>  <!-- 调整标题间距 -->
  </div>
</div>

<div>
  <div style="display: flex; justify-content: flex-start; margin-bottom: 5px; gap: 20px;"">  <!-- 缩小客户信息区块的底部间距 -->
    <div style="font-size: 12px; line-height: 1.2;">客户名称: ${this.invoiceData[0].customerName || ''}</div>
    <div style="font-size: 12px; line-height: 1.2;">单据编号: ${this.invoiceId || ''}</div>
    <div style="font-size: 12px; line-height: 1.2;">单据日期: ${this.dataId || ''}</div>
  </div>
</div>
      <div class="product-table">
        <table border="1" cellspacing="0" cellpadding="4" style="width: 90%; border-collapse: collapse; margin-bottom: 15px; font-size: 12px">
          <thead>
            <tr>
              <th>订单号</th>
              <th>产品名称</th>
              <th>物料编号</th>
              <th>单位</th>
              <th>总数量</th>
              <th>本次出货数</th>
              <th>已出货数</th>
              <th>待出货数</th>
              <th>备注</th>
            </tr>
          </thead>
          <tbody>
            ${this.invoiceData.map((row, index) => `
              <tr>
                <td>${row.contractNo || ''}</td>
                <td>${row.productName || ''}</td>
                <td>${row.materialCode || 0}</td>
                <td>pcs</td>
                <td>${row.totalNumber || 0}</td>
                <td>${row.shipNumber || 0}</td>
                <td>${row.totalNumber - row.noShipNumber || 0}</td>
                <td>${row.noShipNumber || 0}</td>
                <td>${row.remark || 0}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
<div style="display: flex; justify-content: space-between; margin-top: 110px">
  <div style="width: 48%; text-align: center; font-size: 14px; margin-bottom: 0">
    <p style="margin: 0">出单人（盖章）：</p>
  </div>
  <div style="width: 48%; text-align: center; font-size: 14px; margin-bottom: 0">
    <p style="margin: 0">签收人（盖章）：</p>
  </div>
</div>
<div style="margin-top: 10px"> <!-- 调整备注与上方内容的间距 -->
  <h4 style="margin: 5px 0; font-size: 12px">备注:1.本送货单经贵司代表签字或单位盖章后，即为我司收款收账之依据。</h4>
  <h4 style="margin: 5px 0; font-size: 12px">    2.如有质量问题或数量问题请在7天之内通知我司处理</h4>
</div>
    `;

        printContent.style.position = 'fixed';
        printContent.style.left = '-9999px';
        document.body.appendChild(printContent);

        const canvas = await html2canvas(printContent, {
          scale: 2,
          logging: false,
          useCORS: true,
          backgroundColor: '#FFFFFF',
          allowTaint: true // 允许跨域图片
        });

        document.body.removeChild(printContent);

        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210;
        const imgHeight = canvas.height * imgWidth / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        // 直接返回PDF数据URI而不是Blob
        return pdf.output('datauristring');
      } catch (error) {
        console.error('生成PDF失败:', error);
        throw error;
      }
    },

    async downloadPDF(pdfDataUri) {
      try {
        // 直接从data URI创建下载
        const a = document.createElement('a');
        a.href = pdfDataUri;
        a.download = `开票_${this.invoiceId || '未命名'}_${new Date().toISOString().slice(0, 10)}.pdf`;
        document.body.appendChild(a);
        a.click();

        // 清理
        setTimeout(() => {
          document.body.removeChild(a);
        }, 100);
      } catch (error) {
        console.error('保存PDF到本地失败:', error);
        throw error;
      }
    },

    async makeInvoice(row) {
      try {
        const ids = row.id || this.ids;
        await this.$modal.confirm('是否确认开票');

        await this.doInvoice(ids);
        this.$modal.msgSuccess("开票成功");
      } catch (error) {
        if (error !== 'cancel') {
          this.$modal.msgError("开票失败: " + (error.message || error));
        }
      }
    },
    async doInvoice(ids) {
      try {
        const response = await getInvoice(ids);
        this.invoiceData = response.data;

        this.dataId = response.data[0].flowTime;
        console.log(this.dataId)
        this.invoiceId = response.data[0].flowCode;

        const pdfDataUri = await this.generateInvoicePDF();
        await this.downloadPDF(pdfDataUri);
      } catch (error) {
        console.error('开票过程出错:', error);
        throw error;
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除出货记录编号为"' + ids + '"的数据项？').then(function() {
        return delLog(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      // 处理导出时的日期范围参数
      const exportParams = { ...this.queryParams };
      if (exportParams.flowTimeRange && exportParams.flowTimeRange.length === 2) {
        exportParams.beginFlowTime = exportParams.flowTimeRange[0];
        exportParams.endFlowTime = exportParams.flowTimeRange[1];
      }
      // 删除flowTimeRange字段
      delete exportParams.flowTimeRange;
      
      this.download('system/log/export', exportParams, `log_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style scoped>
.product-table >>> .el-input__inner {
  border: none;
  padding: 0;
  height: auto;
}

.product-table >>> .el-input-number {
  width: 100%;
}

.product-table >>> .el-input.is-disabled .el-input__inner {
  background-color: #fff;
  color: #606266;
  cursor: text;
}
/* 容器样式 */
.company-header {
  text-align: center;
  margin: 0 auto;
  padding: 20px 0;
  width: 100%;
  max-width: 800px; /* 可根据需要调整 */
}

/* Logo和文字容器 */
.company-logo-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px; /* Logo和文字间距 */
}

/* Logo样式 */
.company-logo {
  width: 80px;  /* 根据实际图片调整 */
  height: 80px; /* 保持正方形 */
  object-fit: contain; /* 保持图片比例 */
}

/* 文字样式 */
.company-text h1 {
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 10px 0;
  color: #333;
}

.company-text h2 {
  font-size: 20px;
  margin: 15px 0 0 0;
  color: #2c3e50;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

.company-text h4 {
  font-size: 14px;
  margin: 0;
  color: #666;
  line-height: 1.6;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .company-logo-title {
    flex-direction: column;
    gap: 10px;
  }

  .company-logo {
    width: 60px;
    height: 60px;
  }
}
</style>
