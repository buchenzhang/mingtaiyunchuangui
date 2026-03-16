<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="合同时间" prop="contractTime">
        <el-date-picker clearable
          v-model="queryParams.contractTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择合同时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="合同编码" prop="contractCode">
        <el-input
          v-model="queryParams.contractCode"
          placeholder="请输入合同编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同pdf地址" prop="contractAddress">
        <el-input
          v-model="queryParams.contractAddress"
          placeholder="请输入合同pdf地址"
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
      <el-form-item label="客户名称" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入客户名称"
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
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['system:audit:add']"-->
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
<!--          v-hasPermi="['system:audit:edit']"-->
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
<!--          v-hasPermi="['system:audit:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:audit:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="auditList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="合同时间" align="center" prop="contractTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.contractTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同编码" align="center" prop="contractCode" />
      <el-table-column label="合同pdf地址" align="center" prop="contractAddress" />
      <el-table-column label="产品名称" align="center" prop="productName" />
      <el-table-column label="客户名称" align="center" prop="customerName" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-edit"-->
<!--            @click="handleUpdate(scope.row)"-->
<!--            v-hasPermi="['system:audit:edit']"-->
<!--          >修改</el-button>-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['system:audit:remove']"-->
<!--          >删除</el-button>-->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="getContractPdf(scope.row)"
            v-hasPermi="['system:audit:edit']"
          >查看</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleAccept(scope.row)"
            v-hasPermi="['system:audit:edit']"
          >同意</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:audit:edit']"
          >取消</el-button>
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

    <!-- 添加或修改审计对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="合同时间" prop="contractTime">
          <el-date-picker clearable
            v-model="form.contractTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择合同时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同编码" prop="contractCode">
          <el-input v-model="form.contractCode" placeholder="请输入合同编码" />
        </el-form-item>
        <el-form-item label="合同pdf地址" prop="contractAddress">
          <el-input v-model="form.contractAddress" placeholder="请输入合同pdf地址" />
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="form.productName" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入客户名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
<!--    <el-dialog :title="合同信息" :visibel.sync="contractOpen">-->
<!--      <div>-->
<!--        <el-card>-->
<!--          <el-form>-->
<!--            <el-form-item label="选择合同客户" prop="field101">-->
<!--              <el-select v-model="customer" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">-->
<!--                <el-option v-for="(item, index) in allCustomer" :key="index" :label="item.label"-->
<!--                           :value="item.value" :disabled="item.disabled"></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-form>-->

<!--          <div class="table-footer">-->
<!--            <el-button type="success" @click="inputCustomer">确认</el-button>-->
<!--          </div>-->
<!--        </el-card>-->
<!--        <div class="container">-->
<!--          <el-card class="form-card">-->
<!--            &lt;!&ndash; 公司信息和合同标题 &ndash;&gt;-->
<!--            <div class="company-info">-->
<!--              <h1 style="font-size: 32px;">深圳市铭泰云创科技有限公司</h1>-->
<!--              <h2 style="font-size: 30px;">销 售 合 同</h2>-->
<!--            </div>-->

<!--            <el-form ref="form" :model="formData" label-width="120px" class="dual-column-form">-->



<!--              &lt;!&ndash; 需方信息 &ndash;&gt;-->
<!--              <div class="form-column">-->
<!--                <el-form-item label="合同编号:">-->
<!--                  <el-input v-model="formData.contractNumber" style="width: 200px"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="需方">-->
<!--                  &lt;!&ndash;            <el-input v-model="formData.demandCompany"></el-input>&ndash;&gt;-->
<!--                </el-form-item>-->
<!--                <el-form-item label="需方单位名称：">-->
<!--                  <el-input v-model="formData.demandCompany"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="需方地址：">-->
<!--                  <el-input v-model="formData.demandAddress"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="需方代表：">-->
<!--                  <el-input v-model="formData.demandRepresentative"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="需方电话：">-->
<!--                  <el-input v-model="formData.demandPhone"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="需方开户行：">-->
<!--                  <el-input v-model="formData.demandBank"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="需方帐号：">-->
<!--                  <el-input v-model="formData.demandAccount"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="需方税号：">-->
<!--                  <el-input v-model="formData.demandTax"></el-input>-->
<!--                </el-form-item>-->
<!--              </div>-->

<!--              &lt;!&ndash; 供方信息 &ndash;&gt;-->
<!--              <div class="form-column">-->
<!--                <el-form-item label="签订时间：" style="margin-left: 50px">-->
<!--                  <el-date-picker v-model="formData.signDate" type="date" value-format="yyyy-MM-dd" style="width: 200px"></el-date-picker>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="供方">-->
<!--                  &lt;!&ndash;            <el-input v-model="formData.supplyCompany" disabled value="深圳市铭泰云创科技有限公司"></el-input>&ndash;&gt;-->
<!--                </el-form-item>-->
<!--                <el-form-item label="供方单位名称：">-->
<!--                  <el-input v-model="formData.supplyCompany" disabled value="深圳市铭泰云创科技有限公司"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="供方地址：">-->
<!--                  <el-input v-model="formData.supplyAddress" disabled value="深圳市宝安区航城街道钟屋泰兴隆工业城D栋6楼"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="供方代表：">-->
<!--                  <el-input v-model="formData.supplyRepresentative"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="供方电话：">-->
<!--                  <el-input v-model="formData.supplyPhone"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="供方开户行：">-->
<!--                  <el-input v-model="formData.supplyBank" disabled value="招商银行股份有限公司深圳南海支行"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="供方帐号：">-->
<!--                  <el-input v-model="formData.supplyAccount" disabled value="755976430810001"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="供方税号：">-->
<!--                  <el-input v-model="formData.supplyTax" disabled value="91440300MAE2QKQ221"></el-input>-->
<!--                </el-form-item>-->
<!--              </div>-->
<!--            </el-form>-->
<!--          </el-card>-->

<!--          <el-card class="table-card">-->
<!--            <div class="table-title">产品明细</div>-->
<!--            <el-table-->
<!--              :data="tableData"-->
<!--              border-->
<!--              style="width: 100%"-->
<!--              class="product-table"-->
<!--              @cell-mouse-enter="handleMouseEnter"-->
<!--              @cell-mouse-leave="handleMouseLeave"-->
<!--            >-->
<!--              <el-table-column-->
<!--                prop="index"-->
<!--                label="序号"-->
<!--                width="60"-->
<!--                align="center"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  {{ scope.$index + 1 }}-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="nameModel"-->
<!--                label="名称/型号"-->
<!--                width="150"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input v-model="scope.row.nameModel" placeholder="请输入名称/型号"></el-input>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="materialCode"-->
<!--                label="物料代号"-->
<!--                width="150"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input v-model="scope.row.materialCode" placeholder="请输入物料代号"></el-input>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="materialType"-->
<!--                label="物料种类"-->
<!--                width="120"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input v-model="scope.row.materialType" placeholder="请输入物料种类"></el-input>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="smtPoints"-->
<!--                label="贴片点数"-->
<!--                width="100"-->
<!--                align="right"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input-number-->
<!--                    v-model="scope.row.smtPoints"-->
<!--                    :controls="false"-->
<!--                    :precision="0"-->
<!--                    @change="calculateRow(scope.row)"-->
<!--                  ></el-input-number>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="smtUnitPrice"-->
<!--                label="贴片单点单价(元)"-->
<!--                width="120"-->
<!--                align="right"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input-number-->
<!--                    v-model="scope.row.smtUnitPrice"-->
<!--                    :controls="false"-->
<!--                    :precision="3"-->
<!--                    @change="calculateRow(scope.row)"-->
<!--                  ></el-input-number>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="smtPrice"-->
<!--                label="SMT单价(元)"-->
<!--                width="120"-->
<!--                align="right"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input v-model="scope.row.smtPrice" readonly></el-input>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="dipPoints"-->
<!--                label="DIP点数"-->
<!--                width="100"-->
<!--                align="right"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input-number-->
<!--                    v-model="scope.row.dipPoints"-->
<!--                    :controls="false"-->
<!--                    :precision="0"-->
<!--                    @change="calculateRow(scope.row)"-->
<!--                  ></el-input-number>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="dipUnitPrice"-->
<!--                label="DIP单点单价(元)"-->
<!--                width="120"-->
<!--                align="right"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input-number-->
<!--                    v-model="scope.row.dipUnitPrice"-->
<!--                    :controls="false"-->
<!--                    :precision="3"-->
<!--                    @change="calculateRow(scope.row)"-->
<!--                  ></el-input-number>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="dipPrice"-->
<!--                label="DIP单价(元)"-->
<!--                width="120"-->
<!--                align="right"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input v-model="scope.row.dipPrice" readonly></el-input>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="antiPaint"-->
<!--                label="三防漆"-->
<!--                width="100"-->
<!--                align="right"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input-number-->
<!--                    v-model="scope.row.antiPaint"-->
<!--                    :controls="false"-->
<!--                    :precision="2"-->
<!--                    @change="calculateRow(scope.row)"-->
<!--                  ></el-input-number>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="materialPrice"-->
<!--                label="物料单价(元)"-->
<!--                width="120"-->
<!--                align="right"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input-number-->
<!--                    v-model="scope.row.materialPrice"-->
<!--                    :controls="false"-->
<!--                    :precision="2"-->
<!--                    @change="calculateRow(scope.row)"-->
<!--                  ></el-input-number>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="pcbUnit"-->
<!--                label="PCB单机(元/张)"-->
<!--                width="120"-->
<!--                align="right"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input-number-->
<!--                    v-model="scope.row.pcbUnit"-->
<!--                    :controls="false"-->
<!--                    :precision="2"-->
<!--                    @change="calculateRow(scope.row)"-->
<!--                  ></el-input-number>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="testFee"-->
<!--                label="测试费(元)"-->
<!--                width="100"-->
<!--                align="right"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input-number-->
<!--                    v-model="scope.row.testFee"-->
<!--                    :controls="false"-->
<!--                    :precision="2"-->
<!--                    @change="calculateRow(scope.row)"-->
<!--                  ></el-input-number>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="packingFee"-->
<!--                label="包装费(元)"-->
<!--                width="100"-->
<!--                align="right"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input-number-->
<!--                    v-model="scope.row.packingFee"-->
<!--                    :controls="false"-->
<!--                    :precision="2"-->
<!--                    @change="calculateRow(scope.row)"-->
<!--                  ></el-input-number>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="productPrice"-->
<!--                label="产品单价(元)"-->
<!--                width="120"-->
<!--                align="right"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input v-model="scope.row.productPrice" readonly></el-input>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="productQuantity"-->
<!--                label="产品数量(PCS)"-->
<!--                width="120"-->
<!--                align="right"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input-number-->
<!--                    v-model="scope.row.productQuantity"-->
<!--                    :controls="false"-->
<!--                    :precision="0"-->
<!--                    @change="calculateRow(scope.row)"-->
<!--                  ></el-input-number>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="smtStartupFee"-->
<!--                label="SMT开机/工程费(元)"-->
<!--                width="150"-->
<!--                align="right"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input-number-->
<!--                    v-model="scope.row.smtStartupFee"-->
<!--                    :controls="false"-->
<!--                    :precision="2"-->
<!--                    @change="calculateRow(scope.row)"-->
<!--                  ></el-input-number>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="pcbStartupFee"-->
<!--                label="PCB开机/工程费(元)"-->
<!--                width="150"-->
<!--                align="right"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input-number-->
<!--                    v-model="scope.row.pcbStartupFee"-->
<!--                    :controls="false"-->
<!--                    :precision="2"-->
<!--                    @change="calculateRow(scope.row)"-->
<!--                  ></el-input-number>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="fixtureFee"-->
<!--                label="治具费(元)"-->
<!--                width="100"-->
<!--                align="right"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input-number-->
<!--                    v-model="scope.row.fixtureFee"-->
<!--                    :controls="false"-->
<!--                    :precision="2"-->
<!--                    @change="calculateRow(scope.row)"-->
<!--                  ></el-input-number>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="stencilFee"-->
<!--                label="钢网费(元)"-->
<!--                width="100"-->
<!--                align="right"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input-number-->
<!--                    v-model="scope.row.stencilFee"-->
<!--                    :controls="false"-->
<!--                    :precision="2"-->
<!--                    @change="calculateRow(scope.row)"-->
<!--                  ></el-input-number>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="totalAmount"-->
<!--                label="合计金额(元)"-->
<!--                width="120"-->
<!--                align="right"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input v-model="scope.row.totalAmount" readonly></el-input>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                prop="remark"-->
<!--                label="备注"-->
<!--                width="150"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-input v-model="scope.row.remark" placeholder="请输入备注"></el-input>-->
<!--                </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column-->
<!--                label="操作"-->
<!--                width="80"-->
<!--                fixed="right"-->
<!--                align="center"-->
<!--              >-->
<!--                <template slot-scope="scope">-->
<!--                  <el-button-->
<!--                    size="mini"-->
<!--                    type="danger"-->
<!--                    @click="handleDelete(scope.$index)"-->
<!--                  >删除</el-button>-->
<!--                </template>-->
<!--              </el-table-column>-->
<!--            </el-table>-->


<!--            &lt;!&ndash; 合计信息 &ndash;&gt;-->
<!--            <div class="summary-info">-->
<!--              <el-form :model="formData" label-width="120px" class="summary-form">-->
<!--                <el-form-item label="备注">-->
<!--                  <el-input v-model="formData.remark" type="textarea" :rows="2"></el-input>-->
<!--                </el-form-item>-->
<!--                <div class="summary-row">-->
<!--                  <span>合计：</span>-->
<!--                  <span class="summary-value">{{ totalAmount }} 元</span>-->
<!--                  <span style="margin-left: 100px">含13%增值税报价</span>-->
<!--                </div>-->
<!--                <div class="summary-row">-->
<!--                  <span>合计金额RMB(大写)：</span>-->
<!--                  <span class="summary-value">{{ formData.totalAmountCH }}</span>-->
<!--                </div>-->
<!--              </el-form>-->
<!--            </div>-->

<!--            <div class="table-footer">-->
<!--              <el-button type="primary" @click="handleAddRow">新增一行</el-button>-->
<!--              &lt;!&ndash;          <el-button type="success" @click="handleDownload">下载合同PDF</el-button>&ndash;&gt;-->
<!--              <el-button type="success" @click="handleSave">发送到审计</el-button>-->
<!--              <el-button type="warning" @click="handlePrint">打印/另存PDF</el-button>-->
<!--            </div>-->
<!--          </el-card>-->

<!--          <el-card>-->
<!--            &lt;!&ndash; 合同条款 &ndash;&gt;-->
<!--            <div class="contract-terms">-->
<!--              <h3>经双方协商，按以下条款订立本合同：</h3>-->
<!--              <p>一、交货期限：料齐7天交首批。</p>-->
<!--              <p>二、交货地点：需方公司所在地或指定地点（海外、港澳台、新疆、西藏、县级以下城市除外）。</p>-->
<!--              <p>三、运输方式、运费承担、包装方式：供方为需方代办托运或快递；正常交货时间内，运费由供方承担，特殊情况下（如交货地点是上一条指定地点范围外的地点）由双方协商解决；按照供方标准包装方式或需方要求方式。</p>-->
<!--              <p>四、付款时间、付款方式、开票时间、开票形式：</p>-->
<!--              <p>1、付款时间：另议</p>-->
<!--              <p>2、付款方式：电汇</p>-->
<!--              <p>3、开票时间：协商开票</p>-->
<!--              <p>4、开票形式：含13%增值税发票</p>-->
<!--              <p>五、违约责任：供方超过合同规定的交货日期,罚款按总金额的1%/天计算。需方若逾期付款,按合同总金额的1%/天支付违约金给供方。</p>-->
<!--              <p>六、质量保证及产品验收：本产品质量保修期为 12个月，(易损件、人为因素损坏、非正常环境及状态下使用造成故障、无授权自行拆卸、修理或修改不属于保修范围内)，保修期过后付费维修；按照行业标准验收。</p>-->
<!--              <p>七、保密约定: 供需双方均应对本次交易的情况保密,不得以任何形式向第三方透露。</p>-->
<!--              <p>八、知识产权保护：需方提供给供方的产品、软件、图纸、资料等如涉及专利、商标、软件版权等知识产权，供方不得侵犯需方的权利，否则需方有权要求停止侵权行为，由此造成的一切后果及损失由供方承担。</p>-->
<!--              <p>九、合同生效：本合同自双方签字盖章之日起生效。一式两份，双方各执一份。传真件有效。</p>-->
<!--              <p>十、本合同未尽事宜，由双方协商解决，如协商不能解决时，按《合同法》裁决，仲裁地点：深圳 。</p>-->
<!--            </div>-->

<!--            &lt;!&ndash; 签字盖章 &ndash;&gt;-->
<!--            <div class="signature-area">-->
<!--              <div class="signature-left">-->
<!--                <p>需方（盖章)：</p>-->
<!--                <div style="height: 100px;"></div>-->
<!--                <p>需方代表：</p>-->
<!--              </div>-->
<!--              <div class="signature-right">-->
<!--                <p>供方（盖章）：</p>-->
<!--                <div style="height: 100px;"></div>-->
<!--                <p>供方代表：</p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </el-card>-->


<!--        </div>-->
<!--      </div>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
import { listAudit, getAudit, delAudit, addAudit, updateAudit } from "@/api/system/audit";
import {acceptAudit} from "../../../api/system/audit";

export default {
  name: "Audit",
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
      // 审计表格数据
      auditList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      contractOpen:false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        contractTime: null,
        contractCode: null,
        contractAddress: null,
        productName: null,
        customerName: null
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
    /** 查询审计列表 */
    getList() {
      this.loading = true;
      listAudit(this.queryParams).then(response => {
        this.auditList = response.rows;
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
        contractTime: null,
        contractCode: null,
        contractAddress: null,
        productName: null,
        customerName: null
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
      this.title = "添加审计";
    },
    getContractPdf(row) {
      this.reset();
      const id = row.id || this.ids
      try {
        // 1. 从后端获取PDF
        this.download('system/audit/getContractPdf/' + id, {
        }, `${row.contractCode}.pdf`)
      } catch (error) {
        console.error('获取PDF失败:', error);
        this.$message.error('获取PDF失败，请稍后重试');
      }
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getAudit(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改审计";
      });
    },
    handleAccept(row) {
      const id = row.id || this.ids
      acceptAudit(id).then(response => {
        this.getList();
        this.$modal.msgSuccess("同意成功");
      }).catch(() => {});
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateAudit(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAudit(this.form).then(response => {
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
      this.$modal.confirm('是否确认取消审计编号为"' + ids + '"的数据项？').then(function() {
        return delAudit(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("取消成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/audit/export', {
        ...this.queryParams
      }, `audit_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
