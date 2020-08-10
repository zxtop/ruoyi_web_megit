<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="设备编号" prop="deviceNum">
        <el-input
          v-model="queryParams.deviceNum"
          placeholder="请输入设备编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="第几路" prop="lineId">
        <el-input
          v-model="queryParams.lineId"
          placeholder="请输入第几路"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="周几" prop="group">
        <el-input
          v-model="queryParams.group"
          placeholder="请输入周几"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="时间段1 是否启用" prop="timing1Status" class="uuid_form3">
        <el-select v-model="queryParams.timing1Status" placeholder="请选择时间段1 是否启用" clearable size="small">
          <el-option
            v-for="dict in timing1StatusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="时间段1 时间" prop="timing1Time" class="uuid_form4">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.timing1Time"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择时间段1 时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="时间段1 执行开还是关" prop="timing1Switch" class="uuid_form5">
        <el-select v-model="queryParams.timing1Switch" placeholder="请选择时间段1 执行开还是关" clearable size="small">
          <el-option
            v-for="dict in timing1SwitchOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="时间段1 执行开还是关" prop="timing2Status" class="uuid_form5">
        <el-select v-model="queryParams.timing2Status" placeholder="请选择时间段1 执行开还是关" clearable size="small">
          <el-option
            v-for="dict in timing2StatusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="时间段1 执行开还是关" prop="timing2Time" class="uuid_form5">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.timing2Time"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择时间段1 执行开还是关">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="时间段1 执行开还是关" prop="timing2Switch" class="uuid_form5">
        <el-select v-model="queryParams.timing2Switch" placeholder="请选择时间段1 执行开还是关" clearable size="small">
          <el-option
            v-for="dict in timing2SwitchOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="时间段1 执行开还是关" prop="timing3Status" class="uuid_form5">
        <el-select v-model="queryParams.timing3Status" placeholder="请选择时间段1 执行开还是关" clearable size="small">
          <el-option
            v-for="dict in timing3StatusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="时间段1 执行开还是关" prop="timing3Time" class="uuid_form5">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.timing3Time"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择时间段1 执行开还是关">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="时间段1 执行开还是关" prop="timing3Switch" class="uuid_form5">
        <el-select v-model="queryParams.timing3Switch" placeholder="请选择时间段1 执行开还是关" clearable size="small">
          <el-option
            v-for="dict in timing3SwitchOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="时间段1 执行开还是关" prop="timing4Status" class="uuid_form5">
        <el-select v-model="queryParams.timing4Status" placeholder="请选择时间段1 执行开还是关" clearable size="small">
          <el-option
            v-for="dict in timing4StatusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="时间段1 执行开还是关" prop="timing4Time" class="uuid_form5">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.timing4Time"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择时间段1 执行开还是关">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="时间段1 执行开还是关" prop="timing4Switch" class="uuid_form5">
        <el-select v-model="queryParams.timing4Switch" placeholder="请选择时间段1 执行开还是关" clearable size="small">
          <el-option
            v-for="dict in timing4SwitchOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
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
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['iot_device:timing:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['iot_device:timing:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['iot_device:timing:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['iot_device:timing:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="timingList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="设备编号" align="center" prop="deviceNum" />
      <el-table-column label="第几路" align="center" prop="lineId" />
      <el-table-column label="周几" align="center" prop="group" />
      <el-table-column label="时间段1 是否启用" align="center" prop="timing1Status" :formatter="timing1StatusFormat" />
      <el-table-column label="时间段1 时间" align="center" prop="timing1Time" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.timing1Time, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间段1 执行开还是关" align="center" prop="timing1Switch" :formatter="timing1SwitchFormat" />
      <el-table-column label="时间段1 执行开还是关" align="center" prop="timing2Status" :formatter="timing2StatusFormat" />
      <el-table-column label="时间段1 执行开还是关" align="center" prop="timing2Time" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.timing2Time, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间段1 执行开还是关" align="center" prop="timing2Switch" :formatter="timing2SwitchFormat" />
      <el-table-column label="时间段1 执行开还是关" align="center" prop="timing3Status" :formatter="timing3StatusFormat" />
      <el-table-column label="时间段1 执行开还是关" align="center" prop="timing3Time" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.timing3Time, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间段1 执行开还是关" align="center" prop="timing3Switch" :formatter="timing3SwitchFormat" />
      <el-table-column label="时间段1 执行开还是关" align="center" prop="timing4Status" :formatter="timing4StatusFormat" />
      <el-table-column label="时间段1 执行开还是关" align="center" prop="timing4Time" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.timing4Time, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间段1 执行开还是关" align="center" prop="timing4Switch" :formatter="timing4SwitchFormat" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['iot_device:timing:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['iot_device:timing:remove']"
          >删除</el-button>
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

    <!-- 添加或修改timing对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="设备编号" prop="deviceNum">
          <el-input v-model="form.deviceNum" placeholder="请输入设备编号" />
        </el-form-item>
        <el-form-item label="第几路" prop="lineId">
          <el-input v-model="form.lineId" placeholder="请输入第几路" />
        </el-form-item>
        <el-form-item label="周几" prop="group">
          <el-input v-model="form.group" placeholder="请输入周几" />
        </el-form-item>
        <el-form-item label="时间段1 是否启用" class="uuid_form3">
          <el-radio-group v-model="form.timing1Status">
            <el-radio
              v-for="dict in timing1StatusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="时间段1 时间" prop="timing1Time" class="uuid_form4">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.timing1Time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择时间段1 时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="时间段1 执行开还是关" class="uuid_form5">
          <el-radio-group v-model="form.timing1Switch">
            <el-radio
              v-for="dict in timing1SwitchOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="时间段1 执行开还是关" class="uuid_form5">
          <el-radio-group v-model="form.timing2Status">
            <el-radio
              v-for="dict in timing2StatusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="时间段1 执行开还是关" prop="timing2Time" class="uuid_form5">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.timing2Time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择时间段1 执行开还是关">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="时间段1 执行开还是关" class="uuid_form5">
          <el-radio-group v-model="form.timing2Switch">
            <el-radio
              v-for="dict in timing2SwitchOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="时间段1 执行开还是关" class="uuid_form5">
          <el-radio-group v-model="form.timing3Status">
            <el-radio
              v-for="dict in timing3StatusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="时间段1 执行开还是关" prop="timing3Time" class="uuid_form5">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.timing3Time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择时间段1 执行开还是关" >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="时间段1 执行开还是关" class="uuid_form5">
          <el-radio-group v-model="form.timing3Switch">
            <el-radio
              v-for="dict in timing3SwitchOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="时间段1 执行开还是关" class="uuid_form5">
          <el-radio-group v-model="form.timing4Status">
            <el-radio
              v-for="dict in timing4StatusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="时间段1 执行开还是关" prop="timing4Time" class="uuid_form5">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.timing4Time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择时间段1 执行开还是关">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="时间段1 执行开还是关" class="uuid_form5">
          <el-radio-group v-model="form.timing4Switch">
            <el-radio
              v-for="dict in timing4SwitchOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listTiming, getTiming, delTiming, addTiming, updateTiming, exportTiming } from "@/api/iot_device/timing";

export default {
  name: "Timing",
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
      // 总条数
      total: 0,
      // timing表格数据
      timingList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 时间段1 是否启用字典
      timing1StatusOptions: [],
      // 时间段1 执行开还是关字典
      timing1SwitchOptions: [],
      // 时间段1 执行开还是关字典
      timing2StatusOptions: [],
      // 时间段1 执行开还是关字典
      timing2SwitchOptions: [],
      // 时间段1 执行开还是关字典
      timing3StatusOptions: [],
      // 时间段1 执行开还是关字典
      timing3SwitchOptions: [],
      // 时间段1 执行开还是关字典
      timing4StatusOptions: [],
      // 时间段1 执行开还是关字典
      timing4SwitchOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deviceNum: undefined,
        lineId: undefined,
        group: undefined,
        timing1Status: undefined,
        timing1Time: undefined,
        timing1Switch: undefined,
        timing2Status: undefined,
        timing2Time: undefined,
        timing2Switch: undefined,
        timing3Status: undefined,
        timing3Time: undefined,
        timing3Switch: undefined,
        timing4Status: undefined,
        timing4Time: undefined,
        timing4Switch: undefined,
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
    this.getDicts("sys_timing_status").then(response => {
      this.timing1StatusOptions = response.data;
    });
    this.getDicts("sys_timing_switch").then(response => {
      this.timing1SwitchOptions = response.data;
    });
    this.getDicts("sys_timing_status").then(response => {
      this.timing2StatusOptions = response.data;
    });
    this.getDicts("sys_timing_switch").then(response => {
      this.timing2SwitchOptions = response.data;
    });
    this.getDicts("sys_timing_status").then(response => {
      this.timing3StatusOptions = response.data;
    });
    this.getDicts("sys_timing_switch").then(response => {
      this.timing3SwitchOptions = response.data;
    });
    this.getDicts("sys_timing_status").then(response => {
      this.timing4StatusOptions = response.data;
    });
    this.getDicts("sys_timing_switch").then(response => {
      this.timing4SwitchOptions = response.data;
    });
  },
  methods: {
    /** 查询timing列表 */
    getList() {
      this.loading = true;
      listTiming(this.queryParams).then(response => {
        this.timingList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 时间段1 是否启用字典翻译
    timing1StatusFormat(row, column) {
      return this.selectDictLabel(this.timing1StatusOptions, row.timing1Status);
    },
    // 时间段1 执行开还是关字典翻译
    timing1SwitchFormat(row, column) {
      return this.selectDictLabel(this.timing1SwitchOptions, row.timing1Switch);
    },
    // 时间段1 执行开还是关字典翻译
    timing2StatusFormat(row, column) {
      return this.selectDictLabel(this.timing2StatusOptions, row.timing2Status);
    },
    // 时间段1 执行开还是关字典翻译
    timing2SwitchFormat(row, column) {
      return this.selectDictLabel(this.timing2SwitchOptions, row.timing2Switch);
    },
    // 时间段1 执行开还是关字典翻译
    timing3StatusFormat(row, column) {
      return this.selectDictLabel(this.timing3StatusOptions, row.timing3Status);
    },
    // 时间段1 执行开还是关字典翻译
    timing3SwitchFormat(row, column) {
      return this.selectDictLabel(this.timing3SwitchOptions, row.timing3Switch);
    },
    // 时间段1 执行开还是关字典翻译
    timing4StatusFormat(row, column) {
      return this.selectDictLabel(this.timing4StatusOptions, row.timing4Status);
    },
    // 时间段1 执行开还是关字典翻译
    timing4SwitchFormat(row, column) {
      return this.selectDictLabel(this.timing4SwitchOptions, row.timing4Switch);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        deviceNum: undefined,
        lineId: undefined,
        group: undefined,
        timing1Status: "0",
        timing1Time: undefined,
        timing1Switch: "0",
        timing2Status: "0",
        timing2Time: undefined,
        timing2Switch: "0",
        timing3Status: "0",
        timing3Time: undefined,
        timing3Switch: "0",
        timing4Status: "0",
        timing4Time: undefined,
        timing4Switch: "0",
        createTime: undefined,
        createBy: undefined,
        updateTime: undefined,
        updateBy: undefined
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
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加timing";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getTiming(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改timing";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateTiming(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addTiming(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除timing编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delTiming(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有timing数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportTiming(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>