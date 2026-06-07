<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
      <el-form-item label="规格" prop="specification">
        <el-input
          v-model="queryParams.specification"
          placeholder="请输入规格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="封装" prop="packages">
        <el-input
          v-model="queryParams.packages"
          placeholder="请输入封装"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="盘数" prop="panShu">
        <el-input
          v-model="queryParams.panShu"
          placeholder="请输入盘数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="每盘数" prop="meiPanShu">
        <el-input
          v-model="queryParams.meiPanShu"
          placeholder="请输入每盘数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input
          v-model="queryParams.remarks"
          placeholder="请输入备注"
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
          v-hasPermi="['system:inventory:add']"
        >入库</el-button>
      </el-col>
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          plain-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['system:inventory:edit']"-->
<!--        >修改</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          plain-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['system:inventory:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:inventory:export']"
        >导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-upload2"
          size="mini"
          @click="handleDownloadTemplate"
          v-hasPermi="['system:inventory:edit']"
        >下载批量操作模板</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-upload"
          size="mini"
          @click="handleBatchAdjust"
          v-hasPermi="['system:inventory:edit']"
        >批量调整库存</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="inventoryList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="仓类型" align="center" prop="warehouseType">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.warehouseType === '1'" type="primary">电子仓</el-tag>
          <el-tag v-else-if="scope.row.warehouseType === '2'" type="success">机构仓</el-tag>
          <el-tag v-else-if="scope.row.warehouseType === '3'" type="warning">外协仓</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="物料编码" align="center" prop="materialCode" />
      <el-table-column label="物料料号" align="center" prop="materialPartNumber" />
      <el-table-column label="规格" align="center" prop="specification" />
      <el-table-column label="封装" align="center" prop="packages" />
      <el-table-column label="盘数" align="center" prop="panShu" />
      <el-table-column label="每盘数" align="center" prop="meiPanShu" />
      <el-table-column label="备注" align="center" prop="remarks" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:inventory:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-refresh"
            @click="handleAdjust(scope.row)"
            v-hasPermi="['system:inventory:edit']"
          >库存调整</el-button>
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['system:inventory:remove']"-->
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

    <!-- 添加或修改库存管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="仓类型" prop="warehouseType">
          <el-select v-model="form.warehouseType" placeholder="请选择仓类型" style="width: 100%;">
            <el-option label="电子仓" value="1" />
            <el-option label="机构仓" value="2" />
            <el-option label="外协仓" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="物料编码" prop="materialCode">
          <el-input v-model="form.materialCode" placeholder="请输入物料编码" :disabled="form.id != null" />
        </el-form-item>
        <el-form-item label="物料料号" prop="materialPartNumber">
          <el-input v-model="form.materialPartNumber" placeholder="请输入物料料号" :disabled="form.id != null" />
        </el-form-item>
        <el-form-item label="每盘数" prop="meiPanShu">
          <el-input-number v-model="form.meiPanShu" :min="1" :step="1" controls-position="right" placeholder="请输入每盘数" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="规格" prop="specification">
          <el-input v-model="form.specification" placeholder="请输入规格" />
        </el-form-item>
        <el-form-item label="封装" prop="packages">
          <el-input v-model="form.packages" placeholder="请输入封装" />
        </el-form-item>
        <el-form-item label="盘数" prop="panShu">
          <el-input-number v-model="form.panShu" :min="0" :step="1" controls-position="right" placeholder="请输入盘数" style="width: 100%;" :disabled="form.id != null" />
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" type="textarea" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 库存调整对话框 -->
    <el-dialog title="库存调整" :visible.sync="adjustOpen" width="500px" append-to-body>
      <el-form ref="adjustForm" :model="adjustForm" :rules="adjustRules" label-width="100px">
        <el-form-item label="物料编码">
          <el-input v-model="adjustForm.materialCode" disabled />
        </el-form-item>
        <el-form-item label="物料料号">
          <el-input v-model="adjustForm.materialPartNumber" disabled />
        </el-form-item>
        <el-form-item label="当前盘数">
          <el-input v-model="adjustForm.currentPanShu" disabled />
        </el-form-item>
        <el-form-item label="调整数量" prop="quantity">
          <el-input-number
            v-model="adjustForm.quantity"
            placeholder="正数增加，负数减少"
            style="width: 100%;"
            :min="-999999"
            :max="999999"
            :step="1"
            controls-position="right"
          />
          <div style="color: #909399; font-size: 12px; margin-top: 5px;">正数表示增加库存，负数表示减少库存</div>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="adjustForm.remark" type="textarea" placeholder="请输入备注信息" :rows="3" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAdjustForm">确 定</el-button>
        <el-button @click="cancelAdjust">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 批量调整库存对话框 -->
    <el-dialog title="批量调整库存" :visible.sync="batchAdjustOpen" width="500px" append-to-body>
      <el-form ref="batchForm" :model="batchForm" label-width="100px">
        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            drag
            action="#"
            :auto-upload="false"
            :on-change="handleFileChange"
            :file-list="fileList"
            accept=".xlsx,.xls"
            :limit="1"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传xlsx/xls文件，且不超过10MB</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="操作说明">
          <div style="color: #909399; font-size: 12px; line-height: 1.5;">
            <p>1. 请先下载批量操作模板，按照模板格式填写数据</p>
            <p>2. 模板包含六列：仓类型、物料编码、物料料号、每盘数、盘数、备注</p>
            <p>3. 仓类型：电子仓，机构仓，外协仓（必填）</p>
            <p>4. 盘数为正数表示入库，负数表示出库，不能为0</p>
            <p>5. 入库操作：如果唯一键存在则累加盘数，不存在则创建新记录</p>
            <p>6. 出库操作：必须确保库存充足，否则导入失败</p>
            <p>7. 导入完成后会返回带结果的Excel文件</p>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitBatchAdjust" :loading="batchAdjustLoading">确 定</el-button>
        <el-button @click="cancelBatchAdjust">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listInventory, getInventory, delInventory, addInventory, updateInventory, adjustInventory, downloadBatchTemplate, batchImportInventory } from "@/api/system/inventory";
import { saveAs } from 'file-saver';
import { blobValidate } from "@/utils/ruoyi";

export default {
  name: "Inventory",
  data() {
    return {
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
      // 库存管理表格数据
      inventoryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 库存调整弹出层
      adjustOpen: false,
      // 库存调整表单
      adjustForm: {},
      // 批量操作模板下载
      batchTemplateLoading: false,
      // 批量调整库存弹出层
      batchAdjustOpen: false,
      // 批量调整库存表单
      batchForm: {},
      // 文件列表
      fileList: [],
      // 批量调整加载状态
      batchAdjustLoading: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        warehouseType: null,
        materialCode: null,
        materialPartNumber: null,
        specification: null,
        packages: null,
        panShu: null,
        meiPanShu: null,
        remarks: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        warehouseType: [
          { required: true, message: '请选择仓类型', trigger: 'change' }
        ],
        materialCode: [
          { required: true, message: '物料编码不能为空', trigger: 'blur' }
        ],
        meiPanShu: [
          { required: true, message: '每盘数不能为空', trigger: 'blur' }
        ]
      },
      // 库存调整表单校验
      adjustRules: {
        quantity: [
          { required: true, message: '调整数量不能为空', trigger: 'blur' },
          { type: 'number', message: '调整数量必须为数字值', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value === 0) {
                callback(new Error('调整数量不能为0'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询库存管理列表 */
    getList() {
      this.loading = true;
      listInventory(this.queryParams).then(response => {
        this.inventoryList = response.rows;
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
        name: null,
        warehouseType: null,
        materialCode: null,
        materialPartNumber: null,
        specification: null,
        packages: null,
        panShu: null,
        meiPanShu: null,
        remarks: null
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
      this.title = "添加库存管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getInventory(id).then(response => {
        this.form = response.data;
        // 确保盘数字段是数字类型
        if (this.form.panShu !== null && this.form.panShu !== undefined) {
          this.form.panShu = Number(this.form.panShu);
        }
        // 确保每盘数字段是数字类型
        if (this.form.meiPanShu !== null && this.form.meiPanShu !== undefined) {
          this.form.meiPanShu = Number(this.form.meiPanShu);
        }
        this.open = true;
        this.title = "修改库存管理";
      });
    },
    /** 库存调整按钮操作 */
    handleAdjust(row) {
      this.resetAdjust();
      this.adjustForm = {
        inventoryId: row.id,
        materialCode: row.materialCode,
        materialPartNumber: row.materialPartNumber,
        currentPanShu: row.panShu,
        quantity: null,
        remark: null
      };
      this.adjustOpen = true;
    },
    // 库存调整表单重置
    resetAdjust() {
      this.adjustForm = {
        inventoryId: null,
        materialCode: null,
        materialPartNumber: null,
        currentPanShu: null,
        quantity: null,
        remark: null
      };
      this.resetForm("adjustForm");
    },
    // 取消库存调整
    cancelAdjust() {
      this.adjustOpen = false;
      this.resetAdjust();
    },
    /** 提交库存调整表单 */
    submitAdjustForm() {
      this.$refs["adjustForm"].validate(valid => {
        if (valid) {
          // 确保数量字段是数字类型
          if (this.adjustForm.quantity !== null && this.adjustForm.quantity !== undefined) {
            this.adjustForm.quantity = Number(this.adjustForm.quantity);
          }

          const data = {
            inventoryId: this.adjustForm.inventoryId,
            quantity: this.adjustForm.quantity,
            remark: this.adjustForm.remark
          };

          adjustInventory(data).then(response => {
            this.$modal.msgSuccess("调整成功");
            this.adjustOpen = false;
            this.getList();
          });
        }
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          // 确保盘数字段是数字类型
          if (this.form.panShu !== null && this.form.panShu !== undefined) {
            this.form.panShu = Number(this.form.panShu);
          }
          // 确保每盘数字段是数字类型
          if (this.form.meiPanShu !== null && this.form.meiPanShu !== undefined) {
            this.form.meiPanShu = Number(this.form.meiPanShu);
          }

          if (this.form.id != null) {
            updateInventory(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addInventory(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除库存管理编号为"' + ids + '"的数据项？').then(function() {
        return delInventory(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/inventory/export', {
        ...this.queryParams
      }, `inventory_${new Date().getTime()}.xlsx`)
    },
    /** 下载批量操作模板 */
    handleDownloadTemplate() {
      this.batchTemplateLoading = true;
      downloadBatchTemplate().then(response => {
        // 重新创建 Blob 并指定正确的 MIME 类型
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        saveAs(blob, '批量操作模板.xlsx');
        this.$modal.msgSuccess("模板下载成功");
      }).catch(error => {
        this.$modal.msgError("模板下载失败：" + error.message);
      }).finally(() => {
        this.batchTemplateLoading = false;
      });
    },
    /** 批量调整库存按钮操作 */
    handleBatchAdjust() {
      this.batchAdjustOpen = true;
      this.fileList = [];
      this.batchForm = {};
    },
    // 文件选择变化
    handleFileChange(file, fileList) {
      this.fileList = fileList;
      this.batchForm.file = file.raw;
    },
    // 取消批量调整
    cancelBatchAdjust() {
      this.batchAdjustOpen = false;
      this.fileList = [];
      this.batchForm = {};
    },
    /** 提交批量调整表单 */
    submitBatchAdjust() {
      console.log('=== 开始批量调整 ===');
      console.log('选择的文件:', this.batchForm.file);

      if (!this.batchForm.file) {
        console.log('未选择文件');
        this.$modal.msgError("请先选择要上传的文件");
        return;
      }

      // 检查文件大小（10MB）
      if (this.batchForm.file.size > 10 * 1024 * 1024) {
        console.log('文件过大:', this.batchForm.file.size);
        this.$modal.msgError("文件大小不能超过10MB");
        return;
      }

      console.log('准备发送请求...');
      this.batchAdjustLoading = true;
      const formData = new FormData();
      formData.append('file', this.batchForm.file);
      console.log('FormData 已创建');

      batchImportInventory(formData)
        .then(async (response) => {
          console.log('=== 收到响应 ===');
          console.log('响应类型:', typeof response);
          console.log('响应对象:', response);

          if (response instanceof Blob) {
            console.log('响应是 Blob 类型');
            console.log('Blob type:', response.type);
            console.log('Blob size:', response.size);
          }

          // 验证是否为有效的blob
          const isBlob = blobValidate(response);
          console.log('是否为有效Blob:', isBlob);

          if (isBlob) {
            console.log('开始下载文件...');
            // 重要：重新创建 Blob 并指定正确的 MIME 类型，与下载模板保持一致
            const blob = new Blob([response], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            saveAs(blob, '批量导入结果.xlsx');
            console.log('文件下载完成');
            this.$modal.msgSuccess("批量调整完成，结果文件已下载");
            this.batchAdjustOpen = false;
            this.fileList = [];
            this.batchForm = {};
            this.getList(); // 刷新列表
          } else {
            console.log('响应不是有效的 Blob，尝试解析为 JSON');
            // 如果返回的是JSON错误信息
            try {
              const resText = await response.text();
              console.log('错误响应内容:', resText);
              const rspObj = JSON.parse(resText);
              this.$modal.msgError(rspObj.msg || "批量调整失败");
            } catch (e) {
              console.error('解析错误响应失败:', e);
              this.$modal.msgError("批量调整失败，请稍后重试");
            }
          }
        })
        .catch(error => {
          console.error('=== 请求失败 ===');
          console.error('错误对象:', error);
          console.error('错误消息:', error.message);
          console.error('错误详情:', JSON.stringify(error, null, 2));
          this.$modal.msgError("批量调整失败：" + (error.message || '未知错误'));
        })
        .finally(() => {
          console.log('=== 请求结束 ===');
          this.batchAdjustLoading = false;
        });
    }
  }
};
</script>
