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
      <!-- <el-form-item label="设备密钥" prop="deviceKey">
        <el-input
          v-model="queryParams.deviceKey"
          placeholder="请输入设备密钥"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="设备类型" prop="deviceType">
        <el-select v-model="queryParams.deviceType" placeholder="请选择设备类型" clearable size="small">
          <el-option
            v-for="dict in deviceTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="设备状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择设备状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item> -->

      <el-form-item label="路数" prop="lineNum">
        <el-input
          v-model="queryParams.lineNum"
          placeholder="请输入路数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <!-- <el-form-item label="最后更新时间" prop="lastTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.lastTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择最后更新时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="去向" prop="sellTo">
        <el-input
          v-model="queryParams.sellTo"
          placeholder="请输入去向"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="出库日期" prop="sellTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.sellTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择出库日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="经手人" prop="seller">
        <el-input
          v-model="queryParams.seller"
          placeholder="请输入经手人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->

      <!-- <el-form-item label="备注" prop="remarks">
        <el-input
          v-model="queryParams.remarks"
          placeholder="请输入备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->

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
          v-hasPermi="['iot_device:device:add']"
        >新增</el-button>
      </el-col>

      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['iot_device:device:edit']"
        >修改</el-button>
      </el-col> -->

      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['iot_device:device:remove']"
        >删除</el-button>
      </el-col> -->

      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['iot_device:device:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="deviceList" :default-sort = "{prop: 'deviceNum', order: 'descending'}" :row-key="getRowKeys" :expand-row-keys="expands" @selection-change="handleSelectionChange" @expand-change="handleExpand">

      <!-- 设备各路状态 -->
      <el-table-column type="expand">
        <template slot-scope="scope">

          <el-table :data="scope.row.circuitData" style="width: 100%;" :header-cell-style="tableHeaderColor" height="300">

            <el-table-column label="第几路" align="center" width="180">

              <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span style="margin-left: 10px">{{ scope.row.lineId }}</span>
              </template>

            </el-table-column>

            <el-table-column label="第几路状态" align="center" width="180">
              <template slot-scope="scope">
                <span>{{scope.row.lineStatus == 1?'开启':'关闭'}}</span>
              </template>
            </el-table-column>

            <el-table-column label="最后操作时间" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.updateTime}}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建人" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.updateBy}}</span>
              </template>
            </el-table-column>

          </el-table>

          <pagination
            v-show="circuittotal>0"
            :total="circuittotal"
            :page.sync="queryParamscircuit.pageNum"
            :limit.sync="queryParamscircuit.pageSize"
            :autoScroll = false
            @pagination="getExpand"
          />

        </template>
      </el-table-column>

      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <!-- <el-table-column label="主键" align="center" prop="id" /> -->
      <el-table-column label="设备编号" align="center" sortable prop="deviceNum" />
      <!-- <el-table-column label="设备密钥" align="center" prop="deviceKey" /> -->
      <el-table-column label="设备类型" align="center" prop="deviceType" :formatter="deviceTypeFormat"/>
      <!-- <el-table-column label="设备状态" align="center" prop="status" :formatter="statusFormat" /> -->
      <el-table-column label="设备状态" align="center" prop="status" :formatter="statusFormat"></el-table-column>

      <el-table-column label="路数" align="center" prop="lineNum" />

      <el-table-column label="最后更新时间" align="center" prop="lastTime" width="98" >
        <template slot-scope="scope">
          <!-- <span>{{ parseTime(scope.row.lastTime, '{y}-{m}-{d}') }}</span>-->
          <span>{{ scope.row.lastTime}}</span>
        </template>
      </el-table-column>

      <el-table-column label="服务器时间" align="center" prop="serverTime"  width="98">
        <template slot-scope="scope">
          <!-- <span>{{ parseTime(scope.row.lastTime, '{y}-{m}-{d}') }}</span>-->
          <span>{{ scope.row.serverTime}}</span>
        </template>
      </el-table-column>

      <el-table-column label="去向" align="center" prop="sellTo" />
      <el-table-column label="出库日期" align="center" prop="sellTime" width="98">
        <template slot-scope="scope">
          <!-- <span>{{ parseTime(scope.row.sellTime, '{y}-{m}-{d}') }}</span> -->
          <span>{{scope.row.sellTime}}</span>

        </template>
      </el-table-column>
      <el-table-column label="经手人" align="center" prop="seller" />
      <el-table-column label="备注" align="center" prop="remarks" />

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">

          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['iot_device:device:edit']"
          >修改</el-button>
          
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['iot_device:device:remove']"
          >删除</el-button>

        </template>
      </el-table-column>

      <el-table-column label="查看" align="center">

        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleUuser(scope.row)"
            style="margin-bottom:5px;"
          >
              查看接入用户
          </el-button>
          <br>
          <el-button
            size="mini"
            type="warning"
            @click="handleDetails(scope.row)"
           >
              查看定时状态
          </el-button>

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


    <!-- 添加或修改物联网设备对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>

      <el-form ref="form" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="设备编号" prop="deviceNum">
          <el-input v-model="form.deviceNum" placeholder="请输入设备编号" />
        </el-form-item>

        <el-form-item label="设备密钥" prop="deviceKey">
          <el-input v-model="form.deviceKey" placeholder="请输入设备密钥" />
        </el-form-item>

        <!-- <el-form-item label="设备类型">
          <el-radio-group v-model="form.deviceType">
            <el-radio
              v-for="dict in deviceTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item> -->

        <el-form-item label="设备类型" prop="deviceType">
          <el-select v-model="form.deviceType" placeholder="请选择设备类型">
            <el-option 
            v-for="dict in deviceTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="路数" prop="lineNum">
          <el-input v-model="form.lineNum" placeholder="请输入路数" />
        </el-form-item> -->

        <el-form-item label="路数" prop="lineNum">
          <el-select v-model="form.lineNum" placeholder="请选择路数" v-bind:disabled="isAble">
            <el-option 
            v-for="dict in circuitNum"
            :key="dict.value"
            :label="dict.value"
            :value="dict.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="设备状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- <el-form-item label="最后更新时间" prop="lastTime" class="uuid_form6">

          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.lastTime"
            type="datetime"
            placeholder="选择最后更新时间"
            align="right"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            >
          </el-date-picker>

        </el-form-item> -->

        <el-form-item label="去向" prop="sellTo">
          <el-input v-model="form.sellTo" placeholder="请输入去向" />
        </el-form-item>
        <el-form-item label="出库日期" prop="sellTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.sellTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right"
            :picker-options="pickerOptions"
            placeholder="选择出库日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="经手人" prop="seller">
          <el-input v-model="form.seller" placeholder="请输入经手人" />
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" placeholder="请输入备注" />
        </el-form-item>


      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <!-- 修改物联网设备对话框 -->
    <el-dialog :title="title" :visible.sync="open_change" width="500px" append-to-body>

      <el-form ref="form" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="设备编号" prop="deviceNum">
          <el-input v-model="form.deviceNum" disabled placeholder="请输入设备编号" />
        </el-form-item>

        <el-form-item label="设备密钥" prop="deviceKey">
          <el-input v-model="form.deviceKey" disabled placeholder="请输入设备密钥" />
        </el-form-item>

        <!-- <el-form-item label="设备类型">
          <el-radio-group v-model="form.deviceType">
            <el-radio
              v-for="dict in deviceTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item> -->

        <el-form-item label="设备类型" prop="deviceType">
          <el-select v-model="form.deviceType" disabled placeholder="请选择设备类型">
            <el-option 
            v-for="dict in deviceTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="路数" prop="lineNum">
          <el-input v-model="form.lineNum" placeholder="请输入路数" />
        </el-form-item> -->

        <el-form-item label="路数" prop="lineNum">
          <el-select v-model="form.lineNum" disabled  placeholder="请选择路数" >
            <el-option 
            v-for="dict in circuitNum"
            :key="dict.value"
            :label="dict.value"
            :value="dict.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="设备状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- <el-form-item label="最后更新时间" prop="lastTime" class="uuid_form6">

          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.lastTime"
            type="datetime"
            placeholder="选择最后更新时间"
            align="right"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            >
          </el-date-picker>

        </el-form-item> -->

        <el-form-item label="去向" prop="sellTo">
          <el-input v-model="form.sellTo" placeholder="请输入去向" />
        </el-form-item>
        <el-form-item label="出库日期" prop="sellTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.sellTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right"
            :picker-options="pickerOptions"
            placeholder="选择出库日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="经手人" prop="seller">
          <el-input v-model="form.seller" placeholder="请输入经手人" />
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" placeholder="请输入备注" />
        </el-form-item>


      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancelchange">取 消</el-button>
      </div>

    </el-dialog>



    <!-- 查看用户接入信息 -->
    <el-dialog title="用户接入信息" :visible.sync="user_open" width="500px" append-to-body>
      
        <el-table :data="tableData" height="200">
          <el-table-column label="手机ID" prop="uuid" align="center"></el-table-column>
          <!-- <el-table-column label="设备名称" prop="deviceName"></el-table-column> -->
        </el-table>

        <pagination
          v-show="uuidtotal>0"
          :total="uuidtotal"
          :page.sync="queryParamsUser.pageNum"
          :limit.sync="queryParamsUser.pageSize"
          :autoScroll = false
          @pagination="getUserPage"
        />

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="user_open = false">确 定</el-button>
          <el-button @click="user_open = false">取 消</el-button>
        </div>

    </el-dialog>

    <!-- 查看设备定时信息 -->
    <el-dialog title="定时信息" :visible.sync="device_open" width="700px" append-to-body @close="cancelTiming">

      <el-table :data="tableTiming2" height="400">

        <el-table-column label="第几路" prop="lineId" align="center" width="80px"></el-table-column>
        <el-table-column label="周几" prop="weeks" align="center" width="80px"></el-table-column>

        <el-table-column label="时间段1" prop="timing1Time" align="center">
           <template slot-scope="scope">
              <span  v-if="scope.row.timing1Time">{{scope.row.timing1Time.time}}</span>
              <br>
              <span  v-if="scope.row.timing1Time.time"> {{scope.row.timing1Time.timingstatus==1?'启用':'未启用'}} <b :class="{'active-b':scope.row.timing1Time.timingstatus==1?true:false,'inactive-b':scope.row.timing1Time.timingstatus==0?true:false}"></b></span>
              <br>
              <span  v-if="scope.row.timing1Time.time && scope.row.timing1Time.timingswitch && scope.row.timing1Time.timingstatus==1">开：
                <el-switch
                  :value="true"
                  active-color="#13ce66"
                  disabled>
                </el-switch>
              </span>
              <span  v-if="scope.row.timing1Time.time && scope.row.timing1Time.timingswitch == 0 && scope.row.timing1Time.timingstatus==1">关：
                <el-switch
                  :value="true"
                  active-color="#ff4949"
                  disabled>
                </el-switch>
              </span>

            </template>
        </el-table-column>

        <el-table-column label="时间段2" prop="timing2Time" align="center">
          <template slot-scope="scope">
              <span  v-if="scope.row.timing2Time">{{scope.row.timing2Time.time}}</span>
              <br>
              <span  v-if="scope.row.timing2Time.time"> {{scope.row.timing2Time.timingstatus==1?'启用':'未启用'}} <b :class="{'active-b':scope.row.timing2Time.timingstatus==1?true:false,'inactive-b':scope.row.timing2Time.timingstatus==0?true:false}"></b></span>
              <br>
              <span  v-if="scope.row.timing2Time.time && scope.row.timing2Time.timingswitch && scope.row.timing2Time.timingstatus==1">开：
                <el-switch
                  :value="true"
                  active-color="#13ce66"
                  disabled>
                </el-switch>
              </span>

              <span  v-if="scope.row.timing2Time.time && scope.row.timing2Time.timingswitch == 0 && scope.row.timing2Time.timingstatus==1">关：
                <el-switch
                  :value="true"
                  active-color="#ff4949"
                  disabled>
                </el-switch>
              </span>
            </template>
          
        </el-table-column>

        <el-table-column label="时间段3" prop="timing3Time" align="center">
          <template slot-scope="scope">
              <span  v-if="scope.row.timing3Time">{{scope.row.timing3Time.time}}</span>
              <br>
              <span  v-if="scope.row.timing3Time.time"> {{scope.row.timing3Time.timingstatus==1?'启用':'未启用'}} <b :class="{'active-b':scope.row.timing3Time.timingstatus==1?true:false,'inactive-b':scope.row.timing3Time.timingstatus==0?true:false}"></b></span>
              <br>
              <span  v-if="scope.row.timing3Time.time && scope.row.timing3Time.timingswitch && scope.row.timing3Time.timingstatus==1">开：
                <el-switch
                  :value="true"
                  active-color="#13ce66"
                  disabled>
                </el-switch>
              </span>
              <span  v-if="scope.row.timing3Time.time && scope.row.timing3Time.timingswitch == 0 && scope.row.timing3Time.timingstatus==1">关：
                <el-switch
                  :value="true"
                  active-color="#ff4949"
                  disabled>
                </el-switch>
              </span>
            </template>
        </el-table-column>

        <el-table-column label="时间段4" prop="timing4Time" align="center">
          <template slot-scope="scope">
              <span  v-if="scope.row.timing4Time">{{scope.row.timing4Time.time}}</span>
              <br>
              <span  v-if="scope.row.timing4Time.time"> {{scope.row.timing4Time.timingstatus==1?'启用':'未启用'}} <b :class="{'active-b':scope.row.timing4Time.timingstatus==1?true:false,'inactive-b':scope.row.timing4Time.timingstatus==0?true:false}"></b></span>
              <br>
              <span  v-if="scope.row.timing4Time.time && scope.row.timing4Time.timingswitch && scope.row.timing4Time.timingstatus==1">开：
                <el-switch
                  :value="true"
                  active-color="#13ce66"
                  disabled>
                </el-switch>
              </span>
              <span  v-if="scope.row.timing4Time.time && scope.row.timing4Time.timingswitch == 0 && scope.row.timing4Time.timingstatus==1">关：
                <el-switch
                  :value="true"
                  active-color="#ff4949"
                  disabled>
                </el-switch>
              </span>
            </template>
        </el-table-column>

      </el-table>

      <pagination
        v-show="timingtotal>0"
        :total="timingtotal"
        :page.sync="queryParamsTiming.pageNum"
        :limit.sync="queryParamsTiming.pageSize"
        :autoScroll = false
        @pagination="getDetailsList"
      />

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitTiming">确 定</el-button>
        <el-button @click="cancelTiming">取 消</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import { listDevice, getDevice, delDevice, addDevice, updateDevice, exportDevice } from "@/api/iot_device/device";

import {getUuid,listTiming} from "@/api/deviceServer/uuid_device";
import { listLine, getLine, delLine, addLine, updateLine, exportLine } from "@/api/iot_device/line";

export default {
  name: "Device",
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
      //定时状态总条数
      timingtotal:0,
      //线路状态总条数
      circuittotal:0,

      //用户uuid总条数
      uuidtotal:0,

      // 物联网设备表格数据
      deviceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //是否显示修改物联网设备弹出层
      open_change:false,

      //是否弹出用户接入信息
      user_open:false,

      //是否弹出设备定时信息
      device_open:false,

      // 设备类型字典
      deviceTypeOptions: [],
      // 设备状态字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deviceNum: undefined,
        deviceKey: undefined,
        deviceType: undefined,
        status: undefined,
        lineNum: undefined,
        lastTime: undefined,
        sellTo: undefined,
        sellTime: undefined,
        seller: undefined,
        remarks: undefined
      },
      //查询定时状态参数
      queryParamsTiming:{
        pageNum: 1,
        pageSize: 10,
        uuid: undefined,
        deviceNum: undefined,
        deviceName: undefined,
      },
      //查询线路状态参数
      queryParamscircuit:{
        pageNum: 1,
        pageSize: 10,
        deviceNum: undefined,
        lineId: undefined,
        lineStatus: undefined,
        video: undefined,
      },
      //查询用户接入参数
      queryParamsUser:{
        pageNum: 1,
        pageSize: 10,
        uuid: undefined,
        deviceNum: undefined,
        deviceName: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        deviceNum:[{ required: true, message: '请输入设备编号', trigger: 'blur'}],
        deviceKey:[{ required: true, message: '请输入设备密钥', trigger: 'blur'}],
        deviceType:[{ required: true, message: '请选择设备类型', trigger: 'change'}],
        lineNum:[{ required: true, message: '请选择设备类型', trigger: 'change'}]
      },
      tableData:[
      ],

      tableTiming:[
        {
          createTime:"2020-05-25 13:48:52",
          deviceNum:"111",
          group:5,
          id:3,
          lineId:2,
          timing1Status:1,
          timing1Switch:1,
          timing1Time:"2020-05-25 13:48:52",

          timing2Status:1,
          timing2Switch:0,
          timing2Time:null,

          timing3Status:0,
          timing3Switch:0,
          timing3Time:"2020-05-25 13:48:52",

          timing4Status:0,
          timing4Switch:0,
          timing4Time:"2020-05-25 13:48:52",

          updateTime:"2020-05-25 13:58:42"
        },
        {
          createTime:"2020-05-25 13:48:52",
          deviceNum:"111",
          group:6,
          id:3,
          lineId:2,
          timing1Status:0,
          timing1Switch:1,
          timing1Time:"2020-05-25 13:48:52",

          timing2Status:1,
          timing2Switch:0,
          timing2Time:"2020-05-25 13:48:52",

          timing3Status:0,
          timing3Switch:0,
          timing3Time:"2020-05-25 13:48:52",

          timing4Status:0,
          timing4Switch:0,
          timing4Time:"2020-05-25 13:48:52",

          updateTime:"2020-05-25 13:58:42"
        }
      ],
      tableTiming2:[],
      circuitData:[
      
      ],
      // 获取row的key值
      getRowKeys(row) {
        return row.id;
      },
      expands: [],
      catchTerm:[{
        name:'RBSC_1W',
        num:[{value:1}]
      },{
        name:'RBSC_6W',
        num:[{value:6}]
      }],
      circuitNum:[],
      isAble:true,
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      currentRow:null,

    };
  },
  watch: {
    form:{  
      handler:function(val,oldval){  
      },  
      deep:true//对象内部的属性监听，也叫深度监听  
    }, 
      
    'form.deviceType':function(val,oldVal){ //监听年级id筛选级联学期选择
        // console.log('val',val);
        let curLabel = ''
        this.deviceTypeOptions.map((item,index)=>{
            if(val == item.dictValue){
                curLabel = item.dictValue
            }
        })
        // // console.log('curLabel',curLabel,'catchTerm',this.catchTerm);
        let cur_data_term = [];
        this.catchTerm.map((item,index)=>{
            if(item.name==curLabel){
                cur_data_term=item.num
            }
        });
        // // console.log('nnnn',cur_data_term);
        this.circuitNum = cur_data_term;
        if(this.circuitNum.length>0){
          this.isAble = false;
        }

        // console.log(this.circuitNum,'aaaa')
    }
  },
  created() {
    this.getList();
    this.getDicts("sys_device_type").then(response => {
      this.deviceTypeOptions = response.data;
    });
    this.getDicts("sys_status").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询物联网设备列表 */
    getList() {
      this.loading = true;
      listDevice(this.queryParams).then(response => {
        console.log('设备列表...',response)
        response.rows.map((item,index)=>{
          item.circuitData = [];
          //判断服务器时间和最后更新时间是否大于30s，若是大于30s,则是离线，小于30s为在线
          // let distTiming = new Date(item.serverTime).getTime() - new Date(item.lastTime).getTime()
          // console.log(distTiming,'时间差。。。。')
        })
        this.deviceList = response.rows;
        this.total = response.total;
        this.loading = false;
        
      });

    },
    // 设备类型字典翻译
    deviceTypeFormat(row, column) {
      return this.selectDictLabel(this.deviceTypeOptions, row.deviceType);
    },
    // 设备状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      this.isAble = true;
    },

    //取消修改物联网设备按钮
    cancelchange() {
      this.open_change = false;
      this.reset();
      this.isAble = true;
    },

    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        deviceNum: undefined,
        deviceKey: undefined,
        createTime: undefined,
        deviceType: "",
        status: "0",
        lineNum: undefined,
        lastTime: undefined,
        sellTo: undefined,
        sellTime: undefined,
        seller: undefined,
        remarks: undefined
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
      this.title = "添加物联网设备";
    },

    /** 查看用户接入*/
    handleUuser(row){
      this.queryParamsUser.deviceNum = row.deviceNum;
      getUuid(this.queryParamsUser).then(response=>{
        console.log('用户接入返回',response);
        this.user_open = true;
        this.tableData = response.rows;
        this.uuidtotal = response.total;
      })
    },

    /** 用户接入分页 */
    getUserPage(){
      getUuid(this.queryParamsUser).then(response=>{
        this.tableData = response.rows;
        this.uuidtotal = response.total;
      })
    },

    /** 查看详情操作*/
    handleDetails(row){
      console.log("查看定时时间",row);
      this.currentRow = row;
      this.queryParamsTiming.deviceNum = row.deviceNum;
      listTiming(this.queryParamsTiming).then(response=>{
        console.log('定时时间返回',response)
        this.device_open = true;
        this.tableTiming2 = [];
        response.rows.map((item,index)=>{
          this.tableTiming2.push({
            weeks:item.weeks,
            lineId:item.lineId,
            timing1Time:{
              time:item.timing1Time,
              timingstatus:item.timing1Status,
              timingswitch:item.timing1Switch
            },
            timing2Time:{
              time:item.timing2Time,
              timingstatus:item.timing2Status,
              timingswitch:item.timing2Switch
            },
            timing3Time:{
              time:item.timing3Time,
              timingstatus:item.timing3Status,
              timingswitch:item.timing3Switch
            },
            timing4Time:{
              time:item.timing4Time,
              timingstatus:item.timing4Status,
              timingswitch:item.timing4Switch
            },
          })
        });
        this.timingtotal = response.total;
      });
    },

    getDetailsList(){
      listTiming(this.queryParamsTiming).then(response=>{
        this.tableTiming2 = [];
        response.rows.map((item,index)=>{
          this.tableTiming2.push({
            weeks:item.weeks,
            lineId:item.lineId,
            timing1Time:{
              time:item.timing1Time,
              timingstatus:item.timing1Status,
              timingswitch:item.timing1Switch
            },
            timing2Time:{
              time:item.timing2Time,
              timingstatus:item.timing2Status,
              timingswitch:item.timing2Switch
            },
            timing3Time:{
              time:item.timing3Time,
              timingstatus:item.timing3Status,
              timingswitch:item.timing3Switch
            },
            timing4Time:{
              time:item.timing4Time,
              timingstatus:item.timing4Status,
              timingswitch:item.timing4Switch
            },
          })
        });

        this.timingtotal = response.total;
      });
    },

    submitTiming(){
      this.device_open = false;
      this.tableTiming2 = [];
      this.queryParamsTiming.pageSize = 10;
    },
    cancelTiming(){
      this.device_open = false;
      this.tableTiming2 = [];
      this.queryParamsTiming.pageSize = 10;
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getDevice(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改物联网设备";
      });
    },

    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            console.log("修改。。。。",this.form)
            updateDevice(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.isAble = true;
                this.open_change = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            console.log(this.form,"新增加。。。。。")
            addDevice(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.isAble = true;
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
      this.$confirm('是否确认删除物联网设备编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(()=> {
          console.log('删除。。。。。')
          this.tableTiming2 = []; //删除设备，清空定时状态列表..
          return delDevice(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {
          console.log('取消。。。。')
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      // console.log(this.queryParams,'ddddd')
      this.$confirm('是否确认导出所有物联网设备数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          // console.log('导出。。。。',exportDevice(queryParams))
          return exportDevice(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },

    /** 表格行展开 */
    handleExpand(row,expandedRows){
      this.currentRow = row;//获取当前表格行
      // 该处是用于判断是展开还是收起行，只有展开的时候做请求，避免多次请求！
      // 展开的时候expandedRows有值，收起的时候为空.

      // if(expandedRows.length>0){
        
      //   this.queryParamscircuit.deviceNum = row.deviceNum;
   
      //   listLine(this.queryParamscircuit).then(response=>{
          
      //     // 遍历当前页面表
      //     this.deviceList.forEach((temp,index)=>{
      //       // 找到当前点击的行，把动态获取到的数据赋值进去
      //       if(temp.id === row.id){
      //         console.log('设备状态信息....',response)
      //         this.deviceList[index].circuitData = response.rows
      //         this.circuittotal = response.total;
      //       }
      //     });

          
      //   })

      // }


      let temp = this.expands;
      this.expands = [];
      this.expands.push(row.id);

      if(temp.length === 1 && temp[0] === row.id){
        this.expands = [];
      }else{
        this.queryParamscircuit.deviceNum = row.deviceNum;
   
        listLine(this.queryParamscircuit).then(response=>{
          // console.log('dddd',response)
          // this.circuitData = response.rows
          this.deviceList.forEach((temps,index)=>{
            // 找到当前点击的行，把动态获取到的数据赋值进去
            if(temps.id === row.id){
              console.log('设备状态信息....',response)
              this.deviceList[index].circuitData = response.rows
              this.circuittotal = response.total;
            }
          });


        })

      }
    },

    /**表格展开分页*/ 
    getExpand(){

        listLine(this.queryParamscircuit).then(response=>{
          // 遍历当前页面表
          this.deviceList.forEach((temp,index)=>{
            // 找到当前点击的行，把动态获取到的数据赋值进去
            if(temp.id === this.currentRow.id){
              console.log('设备状态信息....',response)
              this.deviceList[index].circuitData = response.rows
               this.circuittotal = response.total;
            }
          });

          
        })
    },

    /**表格样式*/
    tableHeaderColor(){
      return 'background-color:#ffffff;color:#909399'
    },
    /**计算时间差*/
    getDistTiming(serverTime,lastTime){
      let dataEnd = new Date(serverTime.replace(/-/g, "/"));
      let dataStat = new Date(lastTime.replace(/-/g, "/"));
      let dataDiff = dataEnd.getTime() - dataStat.getTime();
      let distTim = dataDiff/1000;
      return distTim;
    } 
  }
};
</script>

<style scoped>
  .active-b{width:10px;height:10px;border-radius:5px;background-color:#13ce66;display:inline-block}
  .inactive-b{width:10px;height:10px;border-radius:5px;background-color:#ccc;display:inline-block}


  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .button_mini{
    color: #fff!important;
  }
</style>