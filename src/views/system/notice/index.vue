<template>
  <div class="container">
    <el-card class="form-card">
      <!-- 公司信息和合同标题 -->
      <div class="company-info">
        <h1>深圳市铭泰云创科技有限公司</h1>
        <h2>销 售 合 同</h2>
      </div>

      <el-form ref="form" :model="formData" label-width="120px" class="dual-column-form">



        <!-- 需方信息 -->
        <div class="form-column">
          <el-form-item label="合同编号:">
            <el-input v-model="formData.contractNumber" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="需方">
            <!--            <el-input v-model="formData.demandCompany"></el-input>-->
          </el-form-item>
          <el-form-item label="需方单位名称：">
            <el-input v-model="formData.demandCompany"></el-input>
          </el-form-item>
          <el-form-item label="需方地址：">
            <el-input v-model="formData.demandAddress"></el-input>
          </el-form-item>
          <el-form-item label="需方代表：">
            <el-input v-model="formData.demandRepresentative"></el-input>
          </el-form-item>
          <el-form-item label="需方电话：">
            <el-input v-model="formData.demandPhone"></el-input>
          </el-form-item>
          <el-form-item label="需方开户行：">
            <el-input v-model="formData.demandBank"></el-input>
          </el-form-item>
          <el-form-item label="需方帐号：">
            <el-input v-model="formData.demandAccount"></el-input>
          </el-form-item>
          <el-form-item label="需方税号：">
            <el-input v-model="formData.demandTax"></el-input>
          </el-form-item>
        </div>

        <!-- 供方信息 -->
        <div class="form-column">
          <el-form-item label="签订时间：" style="margin-left: 50px">
            <el-date-picker v-model="formData.signDate" type="date" value-format="yyyy-MM-dd" style="width: 200px"></el-date-picker>
          </el-form-item>
          <el-form-item label="供方">
            <!--            <el-input v-model="formData.supplyCompany" disabled value="深圳市铭泰云创科技有限公司"></el-input>-->
          </el-form-item>
          <el-form-item label="供方单位名称：">
            <el-input v-model="formData.supplyCompany" disabled value="深圳市铭泰云创科技有限公司"></el-input>
          </el-form-item>
          <el-form-item label="供方地址：">
            <el-input v-model="formData.supplyAddress" disabled value="深圳市宝安区航城街道钟屋泰兴隆工业城D栋6楼"></el-input>
          </el-form-item>
          <el-form-item label="供方代表：">
            <el-input v-model="formData.supplyRepresentative"></el-input>
          </el-form-item>
          <el-form-item label="供方电话：">
            <el-input v-model="formData.supplyPhone"></el-input>
          </el-form-item>
          <el-form-item label="供方开户行：">
            <el-input v-model="formData.supplyBank" disabled value="招商银行股份有限公司深圳南海支行"></el-input>
          </el-form-item>
          <el-form-item label="供方帐号：">
            <el-input v-model="formData.supplyAccount" disabled value="755976430810001"></el-input>
          </el-form-item>
          <el-form-item label="供方税号：">
            <el-input v-model="formData.supplyTax" disabled value="91440300MAE2QKQ221"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <el-card class="table-card">
      <div class="table-title">产品明细</div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        class="product-table"
        @cell-mouse-enter="handleMouseEnter"
        @cell-mouse-leave="handleMouseLeave"
      >
        <el-table-column
          prop="index"
          label="序号"
          width="60"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>

        <el-table-column
          prop="nameModel"
          label="名称/型号"
          width="150"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.nameModel" placeholder="请输入名称/型号"></el-input>
          </template>
        </el-table-column>

        <el-table-column
          prop="materialType"
          label="物料种类"
          width="120"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.materialType" placeholder="请输入物料种类"></el-input>
          </template>
        </el-table-column>

        <el-table-column
          prop="smtPoints"
          label="贴片点数"
          width="100"
          align="right"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.smtPoints"
              :controls="false"
              :precision="0"
              @change="calculateRow(scope.row)"
            ></el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="smtUnitPrice"
          label="贴片单点单价(元)"
          width="120"
          align="right"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.smtUnitPrice"
              :controls="false"
              :precision="3"
              @change="calculateRow(scope.row)"
            ></el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="smtPrice"
          label="SMT单价(元)"
          width="120"
          align="right"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.smtPrice" readonly></el-input>
          </template>
        </el-table-column>

        <el-table-column
          prop="dipPoints"
          label="DIP点数"
          width="100"
          align="right"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.dipPoints"
              :controls="false"
              :precision="0"
              @change="calculateRow(scope.row)"
            ></el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="dipUnitPrice"
          label="DIP单点单价(元)"
          width="120"
          align="right"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.dipUnitPrice"
              :controls="false"
              :precision="3"
              @change="calculateRow(scope.row)"
            ></el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="dipPrice"
          label="DIP单价(元)"
          width="120"
          align="right"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.dipPrice" readonly></el-input>
          </template>
        </el-table-column>

        <el-table-column
          prop="antiPaint"
          label="三防漆"
          width="100"
          align="right"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.antiPaint"
              :controls="false"
              :precision="2"
              @change="calculateRow(scope.row)"
            ></el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="materialPrice"
          label="物料单价(元)"
          width="120"
          align="right"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.materialPrice"
              :controls="false"
              :precision="2"
              @change="calculateRow(scope.row)"
            ></el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="pcbUnit"
          label="PCB单机(元/张)"
          width="120"
          align="right"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.pcbUnit"
              :controls="false"
              :precision="2"
              @change="calculateRow(scope.row)"
            ></el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="testFee"
          label="测试费(元)"
          width="100"
          align="right"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.testFee"
              :controls="false"
              :precision="2"
              @change="calculateRow(scope.row)"
            ></el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="packingFee"
          label="包装费(元)"
          width="100"
          align="right"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.packingFee"
              :controls="false"
              :precision="2"
              @change="calculateRow(scope.row)"
            ></el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="productPrice"
          label="产品单价(元)"
          width="120"
          align="right"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.productPrice" readonly></el-input>
          </template>
        </el-table-column>

        <el-table-column
          prop="productQuantity"
          label="产品数量(PCS)"
          width="120"
          align="right"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.productQuantity"
              :controls="false"
              :precision="0"
              @change="calculateRow(scope.row)"
            ></el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="smtStartupFee"
          label="SMT开机/工程费(元)"
          width="150"
          align="right"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.smtStartupFee"
              :controls="false"
              :precision="2"
              @change="calculateRow(scope.row)"
            ></el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="pcbStartupFee"
          label="PCB开机/工程费(元)"
          width="150"
          align="right"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.pcbStartupFee"
              :controls="false"
              :precision="2"
              @change="calculateRow(scope.row)"
            ></el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="fixtureFee"
          label="治具费(元)"
          width="100"
          align="right"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.fixtureFee"
              :controls="false"
              :precision="2"
              @change="calculateRow(scope.row)"
            ></el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="stencilFee"
          label="钢网费(元)"
          width="100"
          align="right"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.stencilFee"
              :controls="false"
              :precision="2"
              @change="calculateRow(scope.row)"
            ></el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="totalAmount"
          label="合计金额(元)"
          width="120"
          align="right"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.totalAmount" readonly></el-input>
          </template>
        </el-table-column>

        <el-table-column
          prop="remark"
          label="备注"
          width="150"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" placeholder="请输入备注"></el-input>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          width="80"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>


      <!-- 合计信息 -->
      <div class="summary-info">
        <el-form :model="formData" label-width="120px" class="summary-form">
          <el-form-item label="备注">
            <el-input v-model="formData.remark" type="textarea" :rows="2"></el-input>
          </el-form-item>
          <div class="summary-row">
            <span>合计：</span>
            <span class="summary-value">{{ totalAmount }} 元</span>
            <span style="margin-left: 100px">含13%增值税报价</span>
          </div>
          <div class="summary-row">
            <span>合计金额RMB(大写)：</span>
            <span class="summary-value">{{ totalAmount }}</span>
          </div>
        </el-form>
      </div>

      <div class="table-footer">
        <el-button type="primary" @click="handleAddRow">新增一行</el-button>
        <el-button type="success" @click="handleSave">保存数据</el-button>
        <el-button type="warning" @click="handlePrint">打印</el-button>
        <div class="total-amount">
          总金额：<span class="amount">{{ totalAmount }}</span> 元
        </div>
      </div>
    </el-card>

    <el-card>
      <!-- 合同条款 -->
      <div class="contract-terms">
        <h3>经双方协商，按以下条款订立本合同：</h3>
        <p>一、交货期限：料齐7天交首批。</p>
        <p>二、交货地点：需方公司所在地或指定地点（海外、港澳台、新疆、西藏、县级以下城市除外）。</p>
        <p>三、运输方式、运费承担、包装方式：供方为需方代办托运或快递；正常交货时间内，运费由供方承担，特殊情况下（如交货地点是上一条指定地点范围外的地点）由双方协商解决；按照供方标准包装方式或需方要求方式。</p>
        <p>四、付款时间、付款方式、开票时间、开票形式：</p>
        <p>1、付款时间：另议</p>
        <p>2、付款方式：电汇</p>
        <p>3、开票时间：协商开票</p>
        <p>4、开票形式：含13%增值税发票</p>
        <p>五、违约责任：供方超过合同规定的交货日期,罚款按总金额的1%/天计算。需方若逾期付款,按合同总金额的1%/天支付违约金给供方。</p>
        <p>六、质量保证及产品验收：本产品质量保修期为 12个月，(易损件、人为因素损坏、非正常环境及状态下使用造成故障、无授权自行拆卸、修理或修改不属于保修范围内)，保修期过后付费维修；按照行业标准验收。</p>
        <p>七、保密约定: 供需双方均应对本次交易的情况保密,不得以任何形式向第三方透露。</p>
        <p>八、知识产权保护：需方提供给供方的产品、软件、图纸、资料等如涉及专利、商标、软件版权等知识产权，供方不得侵犯需方的权利，否则需方有权要求停止侵权行为，由此造成的一切后果及损失由供方承担。</p>
        <p>九、合同生效：本合同自双方签字盖章之日起生效。一式两份，双方各执一份。传真件有效。</p>
        <p>十、本合同未尽事宜，由双方协商解决，如协商不能解决时，按《合同法》裁决，仲裁地点：深圳 。</p>
      </div>

      <!-- 签字盖章 -->
      <div class="signature-area">
        <div class="signature-left">
          <p>需方（盖章)：</p>
          <div style="height: 100px;"></div>
          <p>需方代表：</p>
        </div>
        <div class="signature-right">
          <p>供方（盖章）：</p>
          <div style="height: 100px;"></div>
          <p>供方代表：</p>
        </div>
      </div>
    </el-card>





  </div>
</template>

<script>
export default {
  name: 'SupplyDemandForm',
  data() {
    return {
      formData: {
        contractNumber:'',
        signDate:new Date().toISOString().split('T')[0],
        demandCompany: '',
        demandAddress: '',
        demandRepresentative: '',
        demandPhone: '',
        demandBank: '',
        demandAccount: '',
        demandTax: '',
        supplyCompany: '深圳市铭泰云创科技有限公司',
        supplyAddress: '深圳市宝安区航城街道钟屋泰兴隆工业城D栋6楼',
        supplyRepresentative: '',
        supplyPhone: '',
        supplyBank: '招商银行股份有限公司深圳南海支行',
        supplyAccount: '755976430810001',
        supplyTax: '91440300MAE2QKQ221'
      },
      tableData: [
        {
          nameModel: 'ABC',
          materialType: '',
          smtPoints: 1020,
          smtUnitPrice: 0.008,
          smtPrice: 8.16,
          dipPoints: 150,
          dipUnitPrice: 0.055,
          dipPrice: 8.25,
          antiPaint: 0,
          materialPrice: 0,
          pcbUnit: 0,
          testFee: 0,
          packingFee: 0,
          productPrice: 16.41,
          productQuantity: 50,
          smtStartupFee: 0,
          pcbStartupFee: 0,
          fixtureFee: 0,
          stencilFee: 0,
          totalAmount: 821,
          remark: '试产'
        },
        {
          nameModel: '',
          materialType: '',
          smtPoints: 0,
          smtUnitPrice: 0,
          smtPrice: 0,
          dipPoints: 0,
          dipUnitPrice: 0,
          dipPrice: 0,
          antiPaint: 0,
          materialPrice: 0,
          pcbUnit: 0,
          testFee: 0,
          packingFee: 0,
          productPrice: 0,
          productQuantity: 0,
          smtStartupFee: 0,
          pcbStartupFee: 0,
          fixtureFee: 0,
          stencilFee: 0,
          totalAmount: 0,
          remark: ''
        }
      ]
    }
  },
  computed: {
    totalAmount() {
      return this.tableData.reduce((sum, row) => {
        return sum + (parseFloat(row.totalAmount) || 0);
      }, 0).toFixed(2);
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      const savedFormData = localStorage.getItem('supplyDemandFormData');
      const savedTableData = localStorage.getItem('supplyDemandTableData');

      if (savedFormData) {
        this.formData = JSON.parse(savedFormData);
      }

      if (savedTableData) {
        this.tableData = JSON.parse(savedTableData);
      }
    },
    handleSave() {
      localStorage.setItem('supplyDemandFormData', JSON.stringify(this.formData));
      localStorage.setItem('supplyDemandTableData', JSON.stringify(this.tableData));
      this.$message.success('数据保存成功！');
    },
    handlePrint() {
      // 创建打印内容
      const printContent = document.createElement('div');
      printContent.className = 'print-container';

      // 1. 添加公司信息和合同标题
      const companyInfo = `
    <div class="company-info">
      <h1>${this.formData.supplyCompany}</h1>
      <h2>销 售 合 同</h2>
    </div>
  `;
      printContent.innerHTML += companyInfo;

      // 2. 添加合同基本信息
      const contractInfo = `
    <div class="contract-info">
      <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
        <div>合同编号: ${this.formData.contractNumber || ''}</div>
        <div>签订时间: ${this.formData.signDate || ''}</div>
      </div>
    </div>
  `;
      printContent.innerHTML += contractInfo;

      // 3. 添加供需方信息
      const partyInfo = `
    <div class="party-info" style="display: flex; justify-content: space-between; margin-bottom: 30px;">
      <!-- 需方信息 -->
      <div style="width: 48%;">
        <h3>需方</h3>
        <p>单位名称: ${this.formData.demandCompany || ''}</p>
        <p>地址: ${this.formData.demandAddress || ''}</p>
        <p>代表: ${this.formData.demandRepresentative || ''}</p>
        <p>电话: ${this.formData.demandPhone || ''}</p>
        <p>开户行: ${this.formData.demandBank || ''}</p>
        <p>帐号: ${this.formData.demandAccount || ''}</p>
        <p>税号: ${this.formData.demandTax || ''}</p>
      </div>

      <!-- 供方信息 -->
      <div style="width: 48%;">
        <h3>供方</h3>
        <p>单位名称: ${this.formData.supplyCompany}</p>
        <p>地址: ${this.formData.supplyAddress}</p>
        <p>代表: ${this.formData.supplyRepresentative || ''}</p>
        <p>电话: ${this.formData.supplyPhone || ''}</p>
        <p>开户行: ${this.formData.supplyBank}</p>
        <p>帐号: ${this.formData.supplyAccount}</p>
        <p>税号: ${this.formData.supplyTax}</p>
      </div>
    </div>
  `;
      printContent.innerHTML += partyInfo;

      // 4. 添加产品明细表格
      let tableHTML = `
    <div class="product-table">
      <h3>产品明细</h3>
      <table border="1" cellspacing="0" cellpadding="8" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr>
            <th>序号</th>
            <th>名称/型号</th>
            <th>物料种类</th>
            <th>贴片点数</th>
            <th>贴片单点单价(元)</th>
            <th>SMT单价(元)</th>
            <th>DIP点数</th>
            <th>DIP单点单价(元)</th>
            <th>DIP单价(元)</th>
            <th>三防漆</th>
            <th>物料单价(元)</th>
            <th>PCB单机(元/张)</th>
            <th>测试费(元)</th>
            <th>包装费(元)</th>
            <th>产品单价(元)</th>
            <th>产品数量(PCS)</th>
            <th>SMT开机/工程费(元)</th>
            <th>PCB开机/工程费(元)</th>
            <th>治具费(元)</th>
            <th>钢网费(元)</th>
            <th>合计金额(元)</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
  `;

      // 添加表格数据行
      this.tableData.forEach((row, index) => {
        tableHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${row.nameModel || ''}</td>
        <td>${row.materialType || ''}</td>
        <td>${row.smtPoints || 0}</td>
        <td>${row.smtUnitPrice || 0}</td>
        <td>${row.smtPrice || 0}</td>
        <td>${row.dipPoints || 0}</td>
        <td>${row.dipUnitPrice || 0}</td>
        <td>${row.dipPrice || 0}</td>
        <td>${row.antiPaint || 0}</td>
        <td>${row.materialPrice || 0}</td>
        <td>${row.pcbUnit || 0}</td>
        <td>${row.testFee || 0}</td>
        <td>${row.packingFee || 0}</td>
        <td>${row.productPrice || 0}</td>
        <td>${row.productQuantity || 0}</td>
        <td>${row.smtStartupFee || 0}</td>
        <td>${row.pcbStartupFee || 0}</td>
        <td>${row.fixtureFee || 0}</td>
        <td>${row.stencilFee || 0}</td>
        <td>${row.totalAmount || 0}</td>
        <td>${row.remark || ''}</td>
      </tr>
    `;
      });

      tableHTML += `
        </tbody>
      </table>
      <div style="text-align: right; font-weight: bold; margin-bottom: 20px;">
        总金额: ${this.totalAmount} 元
      </div>
    </div>
  `;
      printContent.innerHTML += tableHTML;

      // 5. 添加合同条款
      const terms = document.querySelector('.contract-terms').cloneNode(true);
      printContent.appendChild(terms);

      // 6. 添加签字区域
      const signature = document.querySelector('.signature-area').cloneNode(true);
      printContent.appendChild(signature);

      // 创建打印窗口
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>销售合同打印</title>
        <style>
          body {
            font-family: "Microsoft YaHei", Arial, sans-serif;
            margin: 20px;
            color: #333;
            font-size: 14px;
          }
          .company-info h1 {
            font-size: 24px;
            margin-bottom: 10px;
            text-align: center;
          }
          .company-info h2 {
            font-size: 20px;
            margin-top: 0;
            text-align: center;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            font-size: 13px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 6px;
            text-align: center;
          }
          th {
            background-color: #f5f5f5;
            font-weight: bold;
          }
          .contract-terms {
            margin: 30px 0;
            line-height: 1.8;
          }
          .contract-terms h3 {
            text-align: center;
            margin-bottom: 20px;
          }
          .signature-area {
            display: flex;
            justify-content: space-between;
            margin-top: 80px;
          }
          .signature-left, .signature-right {
            width: 48%;
            text-align: center;
          }
          @page {
            size: A4;
            margin: 10mm;
          }
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
      </body>
    </html>
  `);

      printWindow.document.close();

      // 延迟打印以确保样式加载完成
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        // printWindow.close(); // 可以选择不自动关闭，方便用户查看
      }, 500);
    },
    handleAddRow() {
      this.tableData.push({
        nameModel: '',
        materialType: '',
        smtPoints: 0,
        smtUnitPrice: 0,
        smtPrice: 0,
        dipPoints: 0,
        dipUnitPrice: 0,
        dipPrice: 0,
        antiPaint: 0,
        materialPrice: 0,
        pcbUnit: 0,
        testFee: 0,
        packingFee: 0,
        productPrice: 0,
        productQuantity: 0,
        smtStartupFee: 0,
        pcbStartupFee: 0,
        fixtureFee: 0,
        stencilFee: 0,
        totalAmount: 0,
        remark: ''
      });
    },
    handleDelete(index) {
      this.tableData.splice(index, 1);
    },
    calculateRow(row) {
      // 计算SMT单价
      row.smtPrice = (row.smtPoints * row.smtUnitPrice).toFixed(3);

      // 计算DIP单价
      row.dipPrice = (row.dipPoints * row.dipUnitPrice).toFixed(3);

      // 计算产品单价
      const smtPrice = parseFloat(row.smtPrice) || 0;
      const dipPrice = parseFloat(row.dipPrice) || 0;
      const antiPaint = parseFloat(row.antiPaint) || 0;
      const materialPrice = parseFloat(row.materialPrice) || 0;
      const pcbUnit = parseFloat(row.pcbUnit) || 0;
      const testFee = parseFloat(row.testFee) || 0;
      const packingFee = parseFloat(row.packingFee) || 0;

      row.productPrice = (smtPrice + dipPrice + antiPaint + materialPrice + pcbUnit + testFee + packingFee).toFixed(2);

      // 计算合计金额
      const productPrice = parseFloat(row.productPrice) || 0;
      const productQuantity = parseFloat(row.productQuantity) || 0;
      const smtStartupFee = parseFloat(row.smtStartupFee) || 0;
      const pcbStartupFee = parseFloat(row.pcbStartupFee) || 0;
      const fixtureFee = parseFloat(row.fixtureFee) || 0;
      const stencilFee = parseFloat(row.stencilFee) || 0;

      row.totalAmount = (productPrice * productQuantity + smtStartupFee + pcbStartupFee + fixtureFee + stencilFee).toFixed(2);
    },
    handleMouseEnter(row, column, cell, event) {
      // 鼠标悬停效果
      cell.style.backgroundColor = '#f5f7fa';
    },
    handleMouseLeave(row, column, cell, event) {
      // 鼠标离开效果
      cell.style.backgroundColor = '';
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}

.form-card, .table-card {
  margin-bottom: 20px;
}

.form-title, .table-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  border-left: 4px solid #409EFF;
  padding-left: 10px;
}

.dual-column-form {
  display: flex;
  justify-content: space-between;
}

.form-column {
  width: 48%;
}

.table-footer {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.total-amount {
  margin-left: auto;
  font-size: 16px;
  font-weight: bold;
}

.amount {
  color: #F56C6C;
  font-size: 18px;
}



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

.company-info {
  text-align: center;
  margin-bottom: 30px;
}

.company-info h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.company-info h2 {
  font-size: 20px;
  margin-top: 0;
}

@media print {
  .table-footer .el-button {
    display: none;
  }
}

.contract-terms {
  margin: 30px 0;
  line-height: 1.8;
}

.contract-terms h3 {
  text-align: center;
  margin-bottom: 20px;
}

.signature-area {
  display: flex;
  justify-content: space-between;
  margin-top: 100px;
}

.signature-left, .signature-right {
  width: 48%;
  text-align: center;
}

</style>
